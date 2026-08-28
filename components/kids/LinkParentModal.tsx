"use client";

import { useEffect, useState } from "react";
import type { LinkedParent, ParentStatus } from "@/app/_data/kids";
import { isValidEmail, randomAvatarBg, randomAvatarColor } from "@/app/_data/kids";

interface LinkParentModalProps {
  open: boolean;
  kidName: string;
  onClose: () => void;
  onLink: (parent: LinkedParent) => void;
}

export default function LinkParentModal({
  open,
  kidName,
  onClose,
  onLink,
}: LinkParentModalProps) {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Mamá");
  const [errors, setErrors] = useState({
    parentName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleClose() {
    resetForm();
    onClose();
  }

  function resetForm() {
    setParentName("");
    setEmail("");
    setRole("Mamá");
    setErrors({ parentName: "", email: "", role: "" });
  }

  function handleSubmit() {
    const nameErr = !parentName.trim() ? "El nombre es obligatorio" : "";
    const emailErr =
      !email.trim()
        ? "El email es obligatorio"
        : !isValidEmail(email)
        ? "El formato del email no es válido"
        : "";
    const roleErr = !role ? "Debes seleccionar un parentesco" : "";

    setErrors({ parentName: nameErr, email: emailErr, role: roleErr });
    if (nameErr || emailErr || roleErr) return;

    const initial = parentName.trim().charAt(0).toUpperCase();
    const newParent: LinkedParent = {
      name: parentName.trim(),
      initial,
      role,
      status: "pending" as ParentStatus,
      avatarBg: randomAvatarBg(),
      avatarColor: randomAvatarColor(),
    };

    onLink(newParent);
    resetForm();
  }

  if (!open) return null;

  const kidFirstName = kidName.split(" ")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div
        className="w-full max-w-[480px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <div>
            <div className="font-headings font-semibold text-[18px] text-foreground">
              Vincular padre
            </div>
            <div className="text-[13px] text-[#A89A8B]">a {kidName}</div>
          </div>
          <button
            onClick={handleClose}
            className="w-[34px] h-[34px] rounded-[10px] bg-[#F0E6D8] text-[#94887B] flex items-center justify-center border-none cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-[26px] py-[22px]">
          {/* Info banner */}
          <div className="flex gap-[11px] bg-[#E3ECFB] rounded-[14px] p-[13px_16px] mb-[20px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E72C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none mt-[1px]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span className="text-[13.5px] text-[#3F5694] leading-[1.45]">
              Le enviaremos un correo con un código para que active su cuenta.
              Solo verá el feed de {kidFirstName}.
            </span>
          </div>

          {/* Parent name */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            NOMBRE DEL PADRE/MADRE
          </div>
          <input
            placeholder="Ej. Diego Fernández"
            value={parentName}
            onChange={(e) => {
              setParentName(e.target.value);
              if (errors.parentName)
                setErrors((prev) => ({ ...prev, parentName: "" }));
            }}
            className={`w-full px-[16px] py-[13px] rounded-[14px] border bg-white text-[15px] text-foreground mb-[18px] ${errors.parentName ? "border-red-500" : "border-[#EADFD0]"}`}
          />
          {errors.parentName && (
            <p className="text-red-500 text-[13px] mt-[-14px] mb-[14px]">
              {errors.parentName}
            </p>
          )}

          {/* Email */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={`w-full px-[16px] py-[13px] rounded-[14px] border bg-white text-[15px] text-foreground mb-[18px] ${errors.email ? "border-red-500" : "border-[#EADFD0]"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-[13px] mt-[-14px] mb-[14px]">
              {errors.email}
            </p>
          )}

          {/* Role */}
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            PARENTESCO
          </div>
          <div className="flex gap-[9px] mb-[20px]">
            {["Mamá", "Papá", "Tutor/a"].map((r) => {
              const isSelected = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    if (errors.role)
                      setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                  className={`flex-1 py-[11px] rounded-[999px] text-[14px] font-extrabold cursor-pointer border ${
                    isSelected
                      ? "border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8]"
                      : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
          {errors.role && (
            <p className="text-red-500 text-[13px] mt-[-16px] mb-[14px]">
              {errors.role}
            </p>
          )}

          {/* Invitation code */}
          <div className="bg-[#FBF1D6] border-[1.5px] border-dashed border-[#E6D08A] rounded-[16px] p-[18px] text-center mb-[20px]">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#A88526] mb-[8px]">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-headings font-semibold text-[34px] tracking-[7px] text-[#8A7234]">
              7K4P9
            </div>
            <div className="text-[13px] text-[#A88526] mt-[6px]">
              Vence en 7 días
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-[9px] w-full py-[14px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[15.5px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] border-none cursor-pointer"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </button>
        </div>
      </div>
    </div>
  );
}
