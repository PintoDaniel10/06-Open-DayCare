"use client";

import { useEffect, useState } from "react";
import type { Kid } from "@/app/_data/kids";
import {
  randomAvatarBg,
  randomAvatarColor,
  generateKidId,
  calculateAge,
  formatBirthDateDisplay,
  parseAllergyText,
} from "@/app/_data/kids";

const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

interface AddKidModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (kid: Kid) => void;
}

export default function AddKidModal({ open, onClose, onAdd }: AddKidModalProps) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [room, setRoom] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    birthDate: "",
    room: "",
  });

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function handleBirthDateChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    let formatted = "";
    for (let i = 0; i < digits.length; i++) {
      if (i === 2 || i === 4) formatted += "/";
      formatted += digits[i];
    }
    setBirthDate(formatted);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function resetForm() {
    setFullName("");
    setBirthDate("");
    setRoom("");
    setAllergies("");
    setMedicalNotes("");
    setErrors({ fullName: "", birthDate: "", room: "" });
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSave() {
    const nameErr = !fullName.trim() ? "El nombre es obligatorio" : "";
    const dateErr = birthDate.length < 10 ? "La fecha es obligatoria (dd/mm/aaaa)" : "";
    const roomErr = !room ? "La sala es obligatoria" : "";

    setErrors({ fullName: nameErr, birthDate: dateErr, room: roomErr });
    if (nameErr || dateErr || roomErr) return;

    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ");

    const now = new Date();
    const enrollmentDate = `${MONTHS_ES[now.getMonth()]} ${now.getFullYear()}`;

    const newKid: Kid = {
      id: generateKidId(fullName),
      firstName,
      lastName,
      fullName: fullName.trim(),
      initial: fullName.trim().charAt(0).toUpperCase(),
      age: calculateAge(birthDate),
      room,
      birthDate: formatBirthDateDisplay(birthDate),
      enrollmentDate,
      allergies: parseAllergyText(allergies),
      medicalNotes,
      linkedParents: [],
      avatarBg: randomAvatarBg(),
      avatarColor: randomAvatarColor(),
    };

    onAdd(newKid);
    resetForm();
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-[520px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-[20px] border-b border-[#ECE0D0]">
          <button
            onClick={handleClose}
            className="text-[#94887B] font-bold text-[15px] bg-transparent border-none cursor-pointer"
          >
            Cancelar
          </button>
          <span className="font-headings font-semibold text-[18px] text-foreground">
            Agregar niño
          </span>
          <button
            onClick={handleSave}
            className="text-[#D9583C] font-extrabold text-[15px] bg-transparent border-none cursor-pointer"
          >
            Guardar
          </button>
        </div>

        <div className="px-[26px] py-[24px]">
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            NOMBRE COMPLETO
          </div>
          <input
            placeholder="Ej. Martina López"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            className={`w-full px-[16px] py-[13px] rounded-[14px] border bg-white text-[15px] text-foreground mb-[18px] ${errors.fullName ? "border-red-500" : "border-[#EADFD0]"}`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-[13px] mt-[-14px] mb-[14px]">{errors.fullName}</p>
          )}

          <div className="flex gap-[14px] mb-[18px]">
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
                FECHA DE NACIMIENTO
              </div>
              <input
                placeholder="dd/mm/aaaa"
                value={birthDate}
                onChange={(e) => {
                  handleBirthDateChange(e.target.value);
                  if (errors.birthDate) setErrors((prev) => ({ ...prev, birthDate: "" }));
                }}
                maxLength={10}
                className={`w-full px-[16px] py-[13px] rounded-[14px] border bg-white text-[15px] text-foreground ${errors.birthDate ? "border-red-500" : "border-[#EADFD0]"}`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-[13px] mt-1">{errors.birthDate}</p>
              )}
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
                SALA
              </div>
              <div className="relative">
                <select
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value);
                    if (errors.room) setErrors((prev) => ({ ...prev, room: "" }));
                  }}
                  className={`w-full appearance-none px-[16px] py-[13px] rounded-[14px] border bg-white text-[15px] text-foreground font-bold pr-[40px] ${errors.room ? "border-red-500" : "border-[#EADFD0]"}`}
                >
                  <option value="" disabled>Seleccionar</option>
                  <option value="Soles">Soles</option>
                  <option value="Estrellas">Estrellas</option>
                  <option value="Arcoíris">Arcoíris</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-[14px] flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0A290" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
              {errors.room && (
                <p className="text-red-500 text-[13px] mt-1">{errors.room}</p>
              )}
            </div>
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            ALERGIAS (ETIQUETAS)
          </div>
          <input
            placeholder="Ej. Maní, Lactosa"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full px-[16px] py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-foreground mb-[18px]"
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            NOTAS MÉDICAS
          </div>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            value={medicalNotes}
            onChange={(e) => setMedicalNotes(e.target.value)}
            className="w-full min-h-[90px] resize-vertical px-[16px] py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-foreground leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
