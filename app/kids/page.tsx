"use client";

import { useState } from "react";
import { kids } from "@/app/_data/kids";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import KidCard from "@/components/kids/KidCard";
import { PlusIcon, SearchIcon } from "@/components/shared/icons";

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function KidsPage() {
  const [search, setSearch] = useState("");

  const filtered = kids.filter((k) =>
    normalize(k.fullName).includes(normalize(search))
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeNav="kids" />
      <MobileNav activeNav="kids" />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[880px] w-full mx-auto pt-[34px] px-5 pb-[80px] md:px-[40px]">
          <div className="flex items-end justify-between gap-4 mb-[22px]">
            <div>
              <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
                GESTIÓN
              </div>
              <h1 className="font-headings font-semibold text-[30px] m-0 text-foreground">
                Niños
              </h1>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 p-[11px_18px] rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
            >
              <PlusIcon className="w-[17px] h-[17px]" />
              Agregar niño
            </a>
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

          <div className="flex items-center gap-3 mb-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-foreground">
              SALA SOLES
            </span>
            <span className="text-[13px] text-[#A89A8B]">
              {filtered.length} niños
            </span>
            <span className="flex-1 h-px bg-[#E7DAC8]" />
          </div>

          <div className="grid grid-cols-[repeat(2,1fr)] gap-[14px]">
            {filtered.map((kid) => (
              <KidCard key={kid.id} kid={kid} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
