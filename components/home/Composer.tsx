import { sidebarUser } from "@/app/_data/mock";
import { CameraIcon } from "@/components/shared/icons";

export default function Composer() {
  return (
    <a
      href="#"
      className="flex items-center gap-[14px] bg-surface border border-[#ECE0D0] rounded-[18px] py-[14px] px-[18px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <span className="flex-none w-10 h-10 rounded-full flex items-center justify-center text-white font-headings font-semibold text-[16px] bg-accent-warm">
        {sidebarUser.initial}
      </span>
      <span className="flex-1 text-[#A89A8B] text-[15px]">Compartí un momento…</span>
      <span className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center bg-[#FBE3D8] text-[#E0654A]">
        <CameraIcon className="w-[19px] h-[19px]" />
      </span>
    </a>
  );
}
