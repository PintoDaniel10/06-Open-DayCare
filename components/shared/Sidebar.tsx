import type { ComponentType, SVGProps } from "react";
import { navItems, sidebarUser } from "@/app/_data/mock";
import type { NavIcon } from "@/app/_data/mock";
import {
  BellIcon,
  HomeIcon,
  KidsIcon,
  LogoutIcon,
  PlusIcon,
  SunLogo,
  UserIcon,
} from "./icons";

const NAV_ICONS: Record<NavIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  kids: KidsIcon,
  bell: BellIcon,
  user: UserIcon,
};

export function SidebarContent() {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      <a
        href="#"
        className="flex items-center gap-[11px] pt-1 px-2 pb-[22px]"
      >
        <span className="flex-none w-[38px] h-[38px] rounded-[12px] flex items-center justify-center text-white bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
          <SunLogo className="w-[21px] h-[21px]" />
        </span>
        <span className="block">
          <span className="block font-headings font-semibold text-[17px] leading-none text-foreground">
            OpenDayCare
          </span>
          <span className="block text-[11.5px] text-[#A89A8B] mt-[2px]">
            Sala Soles
          </span>
        </span>
      </a>

      <a
        href="#"
        className="flex items-center justify-center gap-2 w-full p-3 rounded-[14px] mb-[18px] text-white font-extrabold text-[14.5px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon className="w-[17px] h-[17px]" />
        Nueva publicación
      </a>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = NAV_ICONS[item.icon];
          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={
                "flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[14.5px] " +
                (item.active
                  ? "bg-[#FBE3D8] text-accent font-extrabold"
                  : "text-[#6E6359] font-semibold")
              }
            >
              <Icon className="w-[19px] h-[19px]" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-[#ECE0D0] pt-[14px] mt-[10px]">
        <div className="flex items-center gap-[11px] py-[6px] px-2">
          <span className="flex-none w-[38px] h-[38px] rounded-full flex items-center justify-center text-white font-headings font-semibold text-[16px] bg-accent-warm">
            {sidebarUser.initial}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-extrabold text-[14px] text-foreground">
              {sidebarUser.name}
            </span>
            <span className="block text-[12px] text-[#A89A8B]">
              {sidebarUser.role}
            </span>
          </span>
          <a
            href="#"
            title="Cerrar sesión"
            className="flex-none w-8 h-8 rounded-[10px] flex items-center justify-center bg-background text-[#94887B]"
          >
            <LogoutIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[248px] flex-none bg-surface border-r border-[#ECE0D0] sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}
