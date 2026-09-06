import Link from "next/link";
import { getChildById } from "@/app/_actions/children";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { ChevronLeftIcon, AlertTriangleIcon, EditIcon, SunLogo } from "@/components/shared/icons";
import ParentsSection from "@/components/kids/ParentsSection";

const AVATAR_COLORS = [
  "#A9D9E8",
  "#F4B8CC",
  "#B9DEC4",
  "#F4DC8E",
  "#C9B6E8",
];

const AVATAR_COLOR_MAP: Record<string, string> = {
  "#A9D9E8": "#1F7A93",
  "#F4B8CC": "#C44A7A",
  "#B9DEC4": "#3E8B62",
  "#F4DC8E": "#9A7B1E",
  "#C9B6E8": "#7B5FC0",
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getAvatarBg(name: string): string {
  const hash = hashString(name);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getAvatarColor(bg: string): string {
  return AVATAR_COLOR_MAP[bg] ?? "#333333";
}

function calculateAge(birthDate: string): number {
  const parts = birthDate.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const birth = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age < 0 ? 0 : age;
}

function formatBirthDateDisplay(isoDate: string): string {
  const parts = isoDate.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

interface KidProfileProps {
  params: Promise<{ id: string }>;
}

export default async function KidProfile({ params }: KidProfileProps) {
  const { id } = await params;
  const child = await getChildById(id);

  if (!child) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar activeNav="kids" />
        <MobileNav activeNav="kids" />
        <main className="flex-1 min-w-0 h-screen overflow-y-auto">
          <div className="max-w-[820px] w-full mx-auto pt-[34px] px-5 pb-[80px] md:px-[40px]">
            <Link
              href="/kids"
              className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px] mb-5"
            >
              <ChevronLeftIcon className="w-[18px] h-[18px]" />
              Volver a Niños
            </Link>
            <div className="text-center py-20">
              <p className="text-[18px] text-[#94887B]">Niño no encontrado</p>
              <Link href="/kids" className="text-accent font-bold mt-2 inline-block">
                Volver a la lista
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const avatarBg = getAvatarBg(child.full_name);
  const avatarColor = getAvatarColor(avatarBg);
  const initial = child.full_name.charAt(0).toUpperCase();
  const age = calculateAge(child.birth_date);
  const birthDisplay = formatBirthDateDisplay(child.birth_date);
  const hasAllergies = child.allergy_tags && child.allergy_tags.length > 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeNav="kids" />
      <MobileNav activeNav="kids" />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[820px] w-full mx-auto pt-[34px] px-5 pb-[80px] md:px-[40px]">
          <Link
            href="/kids"
            className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px] mb-5"
          >
            <ChevronLeftIcon className="w-[18px] h-[18px]" />
            Volver a Niños
          </Link>

          <div className="flex gap-[26px] items-start flex-wrap">
            <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background: avatarBg,
                    color: avatarColor,
                    fontFamily: "var(--font-fredoka)",
                    fontWeight: 600,
                    fontSize: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                  }}
                >
                  {initial}
                </div>
                <div className="flex-1">
                  <h1 className="font-headings font-semibold text-[28px] m-0 text-foreground">
                    {child.full_name}
                  </h1>
                  <p className="m-0 mt-[3px] text-[#94887B] text-[15px]">
                    {age} años · Sala Soles
                  </p>
                </div>
                <Link
                  href={`/kids/${child.id}/editar`}
                  className="border border-solid border-[#ECE0D0] bg-surface text-[#6E6359] font-bold text-[14px] p-[9px_16px] rounded-[12px] flex items-center gap-2"
                >
                  <EditIcon className="w-[16px] h-[16px]" />
                  Editar
                </Link>
              </div>

              {hasAllergies && (
                <div className="flex gap-[14px] bg-[#FBDAD6] rounded-[16px] p-4">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 11,
                      background: "#F4A8A0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                    }}
                  >
                    <AlertTriangleIcon className="w-[22px] h-[22px] text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[#C5413A] text-[15px] mb-[2px]">
                      Alergias y notas
                    </div>
                    <div className="text-[#B25249] text-[14.5px] leading-[1.5]">
                      {child.medical_notes}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-surface border border-[#ECE0D0] rounded-[16px] overflow-hidden">
                <div className="flex justify-between p-[15px_18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">Fecha de nacimiento</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">{birthDisplay}</span>
                </div>
                <div className="flex justify-between p-[15px_18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">Sala</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">Soles</span>
                </div>
                <div className="flex justify-between p-[15px_18px]">
                  <span className="text-[#94887B] text-[14.5px]">Ingreso</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">{formatBirthDateDisplay(child.enrolled_at)}</span>
                </div>
              </div>
            </div>

            <div className="w-[300px] flex-none flex flex-col gap-[14px]">
              <Link
                href={`/kids/${child.id}/resumen-dia`}
                className="flex items-center justify-center gap-[9px] w-full p-[13px] rounded-[14px] bg-[#3F362E] text-white font-extrabold text-[15px]"
              >
                <SunLogo className="w-[18px] h-[18px]" />
                Resumen del día
              </Link>

              <ParentsSection child={child} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
