import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getAllChildren } from "@/app/_actions/children";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import KidsClient from "./KidsClient";

export default async function KidsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: userProfile, error: userError } = await supabase
    .from("users")
    .select("daycare_id, role")
    .eq("id", user.id)
    .single();

  if (userError || !userProfile?.daycare_id) redirect("/login");

  const groupedData = await getAllChildren(userProfile.daycare_id);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeNav="kids" />
      <MobileNav activeNav="kids" />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[880px] w-full mx-auto pt-[34px] px-5 pb-[80px] md:px-[40px]">
          <KidsClient groupedData={groupedData} userRole={userProfile.role} />
        </div>
      </main>
    </div>
  );
}
