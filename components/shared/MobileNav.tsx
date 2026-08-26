"use client";

import { useState } from "react";
import { SidebarContent } from "./Sidebar";
import { CloseIcon, MenuIcon } from "./icons";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        className="md:hidden fixed top-3 left-3 z-40 w-10 h-10 rounded-[10px] flex items-center justify-center bg-surface border border-[#ECE0D0] text-foreground shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="md:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!open}
        className={
          "md:hidden fixed top-0 left-0 z-50 h-screen w-[248px] flex-none bg-surface border-r border-[#ECE0D0] transition-transform duration-200 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-[10px] flex items-center justify-center bg-background text-[#94887B]"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>
    </>
  );
}
