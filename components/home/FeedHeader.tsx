import { feedSubtitle } from "@/app/_data/mock";

export default function FeedHeader() {
  return (
    <div className="mb-6">
      <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-accent mb-1">
        GUARDERÍA · SALA SOLES
      </div>
      <h1 className="font-headings font-semibold text-[30px] text-foreground">
        Buenas, Caro
      </h1>
      <p className="mt-[5px] text-[#94887B] text-[14.5px]">{feedSubtitle}</p>
    </div>
  );
}
