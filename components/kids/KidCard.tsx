import Link from "next/link";
import { type Kid, ALLERGY_BADGE, parentCountLabel } from "@/app/_data/kids";
import { ChevronRightIcon } from "@/components/shared/icons";

interface KidCardProps {
  kid: Kid;
}

export default function KidCard({ kid }: KidCardProps) {
  const hasAllergy = kid.allergies.length > 0;
  const firstAllergy = hasAllergy ? kid.allergies[0] : null;
  const noParents = kid.linkedParents.length === 0;

  let badge = null;
  if (firstAllergy) {
    const colors = ALLERGY_BADGE[firstAllergy];
    badge = (
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          padding: "5px 9px",
          borderRadius: 999,
          background: colors.bg,
          color: colors.color,
        }}
      >
        {firstAllergy === "peanut" ? "MANÍ" : firstAllergy === "lactose" ? "LACTOSA" : "GLUTEN"}
      </span>
    );
  } else if (noParents) {
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
      href={`/kids/${kid.id}`}
      className="kid flex items-center gap-[14px] min-w-0 bg-surface border border-[#ECE0D0] rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition-[.15s] hover:border-[#F2A78E] hover:translate-y-[-2px]"
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: kid.avatarBg,
          color: kid.avatarColor,
          fontFamily: "var(--font-fredoka)",
          fontWeight: 600,
          fontSize: 19,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {kid.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-headings font-semibold text-[16px] text-foreground"
        >
          {kid.fullName}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {kid.age} años · {parentCountLabel(kid.linkedParents)}
        </div>
      </div>
      {badge}
    </Link>
  );
}
