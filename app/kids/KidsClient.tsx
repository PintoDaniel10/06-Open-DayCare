"use client";

import { useState } from "react";
import type { Room, Child } from "@/types/supabase";
import KidCard from "@/components/kids/KidCard";
import AddKidModal from "@/components/kids/AddKidModal";
import { PlusIcon, SearchIcon } from "@/components/shared/icons";
import { createChild } from "@/app/_actions/children";

interface KidsClientProps {
  groupedData: { room: Room; children: Child[] }[];
  userRole: string;
}

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function KidsClient({ groupedData, userRole }: KidsClientProps) {
  const [search, setSearch] = useState("");
  const [showAddKid, setShowAddKid] = useState(false);

  const isStaffOrAdmin = userRole === "staff" || userRole === "admin";

  const allChildren = groupedData.flatMap((g) => g.children);
  const filteredChildren = allChildren.filter((c) =>
    normalize(c.full_name).includes(normalize(search))
  );

  function handleAdd(childData: {
    full_name: string;
    birth_date: string;
    room_id: string;
    enrolled_at: string;
    medical_notes?: string;
    allergy_tags?: string[];
  }) {
    createChild(childData).then(() => {
      setShowAddKid(false);
      window.location.reload();
    });
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4 mb-[22px]">
        <div>
          <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
            GESTIÓN
          </div>
          <h1 className="font-headings font-semibold text-[30px] m-0 text-foreground">
            Niños
          </h1>
        </div>
        {isStaffOrAdmin && (
          <button
            onClick={() => setShowAddKid(true)}
            className="flex items-center gap-2 p-[11px_18px] rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)] border-none cursor-pointer"
          >
            <PlusIcon className="w-[17px] h-[17px]" />
            Agregar niño
          </button>
        )}
      </div>

      <div className="flex items-center gap-[11px] bg-surface border border-[#ECE0D0] rounded-[14px] p-3 mb-[22px]">
        <SearchIcon className="w-[18px] h-[18px] text-[#B0A290]" />
        <input
          placeholder="Buscar niño…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-none bg-none text-[15px] text-foreground placeholder-[#B6A999] focus:outline-none"
        />
      </div>

      {search ? (
        <>
          {filteredChildren.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-[14px]">
                <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-foreground">
                  RESULTADOS
                </span>
                <span className="text-[13px] text-[#A89A8B]">
                  {filteredChildren.length} niño{filteredChildren.length !== 1 ? "s" : ""}
                </span>
                <span className="flex-1 h-px bg-[#E7DAC8]" />
              </div>
              <div className="grid grid-cols-[repeat(2,1fr)] gap-[14px]">
                {filteredChildren.map((child) => {
                  const room = groupedData.find(
                    (g) => g.room.id === child.room_id
                  )?.room.name;
                  return (
                    <KidCard
                      key={child.id}
                      child={child}
                      roomName={room ?? ""}
                    />
                  );
                })}
              </div>
            </>
          )}
          {filteredChildren.length === 0 && (
            <div className="text-center py-12 text-[#A89A8B]">
              No se encontraron niños con &ldquo;{search}&rdquo;
            </div>
          )}
        </>
      ) : (
        groupedData.map(({ room, children }) => (
          <div key={room.id} className="mb-[26px] last:mb-0">
            <div className="flex items-center gap-3 mb-[14px]">
              <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-foreground">
                SALA {room.name.toUpperCase()}
              </span>
              <span className="text-[13px] text-[#A89A8B]">
                {children.length} niño{children.length !== 1 ? "s" : ""}
              </span>
              <span className="flex-1 h-px bg-[#E7DAC8]" />
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] gap-[14px]">
              {children.map((child) => (
                <KidCard
                  key={child.id}
                  child={child}
                  roomName={room.name}
                />
              ))}
            </div>
            {children.length === 0 && (
              <div className="text-[14px] text-[#A89A8B] italic py-4">
                No hay niños en esta sala
              </div>
            )}
          </div>
        ))
      )}

      <AddKidModal
        open={showAddKid}
        onClose={() => setShowAddKid(false)}
        onAdd={handleAdd}
        rooms={groupedData.map((g) => g.room)}
      />
    </>
  );
}
