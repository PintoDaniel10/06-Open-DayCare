"use client";

import { useEffect, useState } from "react";
import {
  NewPostType,
  NEW_POST_TYPE_LABEL,
  NEW_POST_TYPE_COLORS,
  NewPostTarget,
  getNewPostTargets,
} from "@/app/_data/newPost";

interface NewPostModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: () => void;
}

export default function NewPostModal({
  open,
  onClose,
  onPublish,
}: NewPostModalProps) {
  const [selectedTarget, setSelectedTarget] = useState<NewPostTarget | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<NewPostType | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleCancel() {
    resetForm();
    onClose();
  }

  function resetForm() {
    setSelectedTarget(null);
    setSelectedType(null);
    setDescription("");
  }

  function handlePublish() {
    if (selectedTarget && selectedType && description.trim()) {
      onPublish();
      resetForm();
    }
  }

  if (!open) return null;

  const targets = getNewPostTargets();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-[580px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden my-8">
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <button
            onClick={handleCancel}
            className="text-[#94887B] font-bold text-[15px] bg-transparent border-none cursor-pointer"
          >
            Cancelar
          </button>
          <span className="font-headings font-semibold text-[18px] text-[#3F362E]">
            Nueva publicación
          </span>
          <button
            onClick={handlePublish}
            className="text-[#D9583C] font-extrabold text-[15px] bg-transparent border-none cursor-pointer"
          >
            Publicar
          </button>
        </div>

        <div className="px-[26px] py-[24px]">
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2.5">
            PARA
          </div>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {targets.map((target) => {
              const isSelected =
                target.type === "all"
                  ? selectedTarget?.type === "all"
                  : selectedTarget?.type === "kid" && selectedTarget.id === target.id;

              if (target.type === "all") {
                return (
                  <button
                    key="all"
                    onClick={() => setSelectedTarget(target)}
                    className={`px-4 py-1.5 rounded-full border-[1.5px] font-bold text-[14px] cursor-pointer ${
                      isSelected
                        ? "border-[#3F362E] bg-[#3F362E] text-white"
                        : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                    }`}
                  >
                    {target.label}
                  </button>
                );
              }

              return (
                <button
                  key={target.id}
                  onClick={() => setSelectedTarget(target)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border-[1.5px] font-bold text-[14px] cursor-pointer ${
                    isSelected
                      ? "border-[#3F362E] bg-[#3F362E] text-white"
                      : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                  }`}
                >
                  <span
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center font-headings font-semibold text-[13px]"
                    style={{
                      backgroundColor: target.avatarBg,
                      color: target.avatarColor,
                    }}
                  >
                    {target.initial}
                  </span>
                  {target.name}
                </button>
              );
            })}
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2.5">
            TIPO
          </div>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {(["meal", "nap", "activity", "achievement", "mood", "photo", "announcement"] as NewPostType[]).map(
              (type) => {
                const isSelected = selectedType === type;
                const colors = NEW_POST_TYPE_COLORS[type];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full border-none font-extrabold text-[13.5px] cursor-pointer ${
                      isSelected
                        ? "text-white"
                        : "border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }
                        : undefined
                    }
                  >
                    {NEW_POST_TYPE_LABEL[type]}
                  </button>
                );
              }
            )}
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2.5">
            DESCRIPCIÓN
          </div>
          <textarea
            placeholder="Contá cómo le fue hoy…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] resize-vertical px-4 py-3.5 rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] leading-relaxed mb-5 placeholder:text-[#B6A99B]"
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2.5">
            FOTOS
          </div>
          <div className="flex gap-3">
            <div className="w-[96px] h-[96px] rounded-[14px] bg-[#F4ECE1] border border-[#ECE0D0] flex items-center justify-center text-[#CBB89F]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            <div className="w-[96px] h-[96px] rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] flex flex-col items-center justify-center gap-1.5 text-[#B0A290] cursor-pointer">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[12px]">Agregar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
