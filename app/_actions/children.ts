import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/types/supabase";

type Room = Database["public"]["Tables"]["rooms"]["Row"];
type Child = Database["public"]["Tables"]["children"]["Row"];

export interface CreateChildInput {
  room_id: string;
  full_name: string;
  birth_date: string;
  enrolled_at: string;
  medical_notes?: string;
  allergy_tags?: string[];
  photo_consent?: boolean;
  status?: "active" | "archived";
}

export async function getRooms(daycareId: string): Promise<Room[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("daycare_id", daycareId)
    .order("name");

  if (error) throw new Error(`Failed to fetch rooms: ${error.message}`);
  return data ?? [];
}

export async function getChildrenByRoom(roomId: string): Promise<Child[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("room_id", roomId)
    .eq("status", "active")
    .order("full_name");

  if (error) throw new Error(`Failed to fetch children: ${error.message}`);
  return data ?? [];
}

export async function getAllChildren(
  daycareId: string
): Promise<{ room: Room; children: Child[] }[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: rooms, error: roomsError } = await supabase
    .from("rooms")
    .select("*")
    .eq("daycare_id", daycareId)
    .order("name");

  if (roomsError) throw new Error(`Failed to fetch rooms: ${roomsError.message}`);

  if (!rooms || rooms.length === 0) return [];

  const { data: children, error: childrenError } = await supabase
    .from("children")
    .select("*")
    .eq("status", "active")
    .order("full_name");

  if (childrenError)
    throw new Error(`Failed to fetch children: ${childrenError.message}`);

  return rooms.map((room) => ({
    room,
    children: (children ?? []).filter((c) => c.room_id === room.id),
  }));
}

export async function getChildById(id: string): Promise<Child | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch child: ${error.message}`);
  }

  return data;
}

export async function createChild(input: CreateChildInput): Promise<Child> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("children")
    .insert({
      room_id: input.room_id,
      full_name: input.full_name,
      birth_date: input.birth_date,
      enrolled_at: input.enrolled_at,
      medical_notes: input.medical_notes ?? null,
      allergy_tags: input.allergy_tags ?? [],
      photo_consent: input.photo_consent ?? true,
      status: input.status ?? "active",
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create child: ${error.message}`);

  revalidatePath("/kids");

  return data;
}
