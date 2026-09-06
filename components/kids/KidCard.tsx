import Link from "next/link";
import { ChevronRightIcon } from "@/components/shared/icons";

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
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age < 0 ? 0 : age;
}

interface KidCardProps {
  child: {
    id: string;
    full_name: string;
    birth_date: string;
    allergy_tags: string[] | null;
    room_id: string;
  };
  roomName: string;
  noParentsPlaceholder?: boolean;
}

export default function KidCard({ child, noParentsPlaceholder }: KidCardProps) {
  const avatarBg = getAvatarBg(child.full_name);
  const avatarColor = getAvatarColor(avatarBg);
  const initial = child.full_name.charAt(0).toUpperCase();
  const age = calculateAge(child.birth_date);
  const hasAllergies = child.allergy_tags && child.allergy_tags.length > 0;
  const firstAllergy = hasAllergies ? child.allergy_tags![0] : null;

  let badge = null;
  if (hasAllergies && firstAllergy) {
    badge = (
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          padding: "5px 9px",
          borderRadius: 999,
          background: "#FBD8CC",
          color: "#D9684A",
        }}
      >
        {firstAllergy.toUpperCase()}
      </span>
    );
  } else if (noParentsPlaceholder) {
    badge = (
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          padding: "5px 9px",
          borderRadius: 999,
          background: "#F9D2DE",
          color: "#C56486",
        }}
      >
        VINCULAR
      </span>
    );
  } else {
    badge = <ChevronRightIcon style={{ flex: "none" }} className="w-[18px] h-[18px]" />;
  }

  return (
    <Link
      href={`/kids/${child.id}`}
      className="kid flex items-center gap-[14px] min-w-0 bg-surface border border-[#ECE0D0] rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition-[.15s] hover:border-[#F2A78E] hover:translate-y-[-2px]"
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: avatarBg,
          color: avatarColor,
          fontFamily: "var(--font-fredoka)",
          fontWeight: 600,
          fontSize: 19,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-headings font-semibold text-[16px] text-foreground"
        >
          {child.full_name}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {age} años · sin padres vinculados
        </div>
      </div>
      {badge}
    </Link>
  );
}
