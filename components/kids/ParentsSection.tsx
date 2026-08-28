"use client";

import { useState } from "react";
import type { Kid, LinkedParent } from "@/app/_data/kids";
import { PARENT_STATUS_BADGE, PARENT_STATUS_LABEL } from "@/app/_data/kids";
import { PlusIcon } from "@/components/shared/icons";
import LinkParentModal from "@/components/kids/LinkParentModal";

interface ParentsSectionProps {
  kid: Kid;
}

export default function ParentsSection({ kid }: ParentsSectionProps) {
  const [showLinkParent, setShowLinkParent] = useState(false);
  const [linkedParents, setLinkedParents] = useState(kid.linkedParents);

  function handleLink(parent: LinkedParent) {
    setLinkedParents((prev) => [...prev, parent]);
    setShowLinkParent(false);
  }

  return (
    <>
      <div className="bg-surface border border-[#ECE0D0] rounded-[16px] p-[16px_18px]">
        <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D] mb-[14px]">
          PADRES VINCULADOS
        </div>
        <div className="flex flex-col gap-[14px]">
          {linkedParents.map((parent, i) => (
            <div key={i} className="flex items-center gap-[12px]">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: parent.avatarBg,
                  color: "#fff",
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                }}
              >
                {parent.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-[14.5px] text-foreground">
                  {parent.name}
                </div>
                <div className="text-[12.5px] text-[#A89A8B]">
                  {parent.role} ·{" "}
                  {parent.status === "active"
                    ? "activa"
                    : "invitación enviada"}
                </div>
              </div>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  padding: "4px 9px",
                  borderRadius: 999,
                  background: PARENT_STATUS_BADGE[parent.status].bg,
                  color: PARENT_STATUS_BADGE[parent.status].color,
                }}
              >
                {PARENT_STATUS_LABEL[parent.status]}
              </span>
            </div>
          ))}
          <button
            onClick={() => setShowLinkParent(true)}
            className="flex items-center gap-[12px] pt-2 bg-transparent border-none cursor-pointer p-0"
          >
            <span className="w-[40px] h-[40px] rounded-[50%] border border-dashed border-[#D8CBBA] flex items-center justify-center text-[#B0A290]">
              <PlusIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="font-extrabold text-[14.5px] text-[#C5503A]">
              Vincular otro padre
            </span>
          </button>
        </div>
      </div>

      <LinkParentModal
        open={showLinkParent}
        kidName={kid.fullName}
        onClose={() => setShowLinkParent(false)}
        onLink={handleLink}
      />
    </>
  );
}
