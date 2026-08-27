import Link from "next/link";
import { getKidById, ALLERGY_BADGE, PARENT_STATUS_BADGE, PARENT_STATUS_LABEL } from "@/app/_data/kids";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { ChevronLeftIcon, AlertTriangleIcon, EditIcon, PlusIcon, SunLogo } from "@/components/shared/icons";

interface KidProfileProps {
  params: { id: string };
}

export default function KidProfile({ params }: KidProfileProps) {
  const kid = getKidById(params.id);

  if (!kid) {
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

  const hasAllergies = kid.allergies.length > 0;

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
            {/* Columna izquierda */}
            <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
              {/* Avatar + nombre + editar */}
              <div className="flex items-center gap-[18px]">
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background: kid.avatarBg,
                    color: kid.avatarColor,
                    fontFamily: "var(--font-fredoka)",
                    fontWeight: 600,
                    fontSize: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                  }}
                >
                  {kid.initial}
                </div>
                <div className="flex-1">
                  <h1 className="font-headings font-semibold text-[28px] m-0 text-foreground">
                    {kid.fullName}
                  </h1>
                  <p className="m-0 mt-[3px] text-[#94887B] text-[15px]">
                    {kid.age} años · Sala {kid.room}
                  </p>
                </div>
                <a
                  href="#"
                  className="border border-solid border-[#ECE0D0] bg-surface text-[#6E6359] font-bold text-[14px] p-[9px_16px] rounded-[12px] flex items-center gap-2"
                >
                  <EditIcon className="w-[16px] h-[16px]" />
                  Editar
                </a>
              </div>

              {/* Alergias y notas */}
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
                      {kid.medicalNotes}
                    </div>
                  </div>
                </div>
              )}

              {/* Tabla de datos */}
              <div className="bg-surface border border-[#ECE0D0] rounded-[16px] overflow-hidden">
                <div className="flex justify-between p-[15px_18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">Fecha de nacimiento</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">{kid.birthDate}</span>
                </div>
                <div className="flex justify-between p-[15px_18px] border-b border-[#F0E6D8]">
                  <span className="text-[#94887B] text-[14.5px]">Sala</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">{kid.room}</span>
                </div>
                <div className="flex justify-between p-[15px_18px]">
                  <span className="text-[#94887B] text-[14.5px]">Ingreso</span>
                  <span className="font-extrabold text-foreground text-[14.5px]">{kid.enrollmentDate}</span>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="w-[300px] flex-none flex flex-col gap-[14px]">
              {/* Resumen del día */}
              <a
                href="#"
                className="flex items-center justify-center gap-[9px] w-full p-[13px] rounded-[14px] bg-[#3F362E] text-white font-extrabold text-[15px]"
              >
                <SunLogo className="w-[18px] h-[18px]" />
                Resumen del día
              </a>

              {/* Padres vinculados */}
              <div className="bg-surface border border-[#ECE0D0] rounded-[16px] p-[16px_18px]">
                <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D] mb-[14px]">
                  PADRES VINCULADOS
                </div>
                <div className="flex flex-col gap-[14px]">
                  {kid.linkedParents.map((parent, i) => (
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
                          {parent.status === "active" ? "activa" : "invitación enviada"}
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
                  <a href="#" className="flex items-center gap-[12px] pt-2">
                    <span
                      className="w-[40px] h-[40px] rounded-[50%] border border-dashed border-[#D8CBBA] flex items-center justify-center text-[#B0A290]"
                    >
                      <PlusIcon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="font-extrabold text-[14.5px] text-[#C5503A]">
                      Vincular otro padre
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
