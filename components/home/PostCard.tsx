import { POST_TYPE_LABEL, type FeedPost, type PostType } from "@/app/_data/mock";
import { CommentIcon, HeartIcon, MegaphoneIcon } from "@/components/shared/icons";
import PhotoPlaceholder from "./PhotoPlaceholder";

const BADGE_STYLES: Record<PostType, { bg: string; color: string }> = {
  achievement: { bg: "#CFEBD8", color: "#3E9B6C" },
  activity: { bg: "#C7E7F1", color: "#2E89A6" },
  announcement: { bg: "#CCD8F4", color: "#4E72C8" },
};

export default function PostCard({ post }: { post: FeedPost }) {
  const badge = BADGE_STYLES[post.type];

  return (
    <article className="bg-surface border border-[#ECE0D0] rounded-[20px] py-[20px] px-[22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <header className="flex items-center gap-3 mb-[14px]">
        <span
          className="flex-none w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: post.avatarBg, color: post.avatarColor }}
        >
          {post.avatarIcon === "megaphone" ? (
            <MegaphoneIcon className="w-5 h-5" />
          ) : (
            <span className="font-headings font-semibold text-[17px]">
              {post.authorInitial}
            </span>
          )}
        </span>
        <div className="flex-1">
          <div className="font-headings font-semibold text-[16.5px] text-foreground">
            {post.authorName}
          </div>
          <div className="text-[12.5px] text-[#A89A8B]">
            {post.time}
            {post.publishedByMe ? " · publicado por vos" : ""}
          </div>
        </div>
        <div
          className="flex items-center gap-[7px] py-[6px] px-3 rounded-full"
          style={{ backgroundColor: badge.bg, color: badge.color }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: badge.color }}
          />
          <span className="text-[12px] font-extrabold tracking-[0.5px]">
            {POST_TYPE_LABEL[post.type]}
          </span>
        </div>
      </header>

      <div className="text-[12.5px] text-[#A89A8B] mb-[10px]">
        Para: {post.audience}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-[#4A4038]">{post.text}</p>

      {post.photoPlaceholder && (
        <PhotoPlaceholder label={post.photoPlaceholder.label} />
      )}

      <footer className="flex items-center gap-[18px] mt-4 pt-[14px] border-t border-[#F0E6D8]">
        <span className="flex items-center gap-[7px] text-[#E0654A] font-bold text-[14px]">
          <HeartIcon className="w-[19px] h-[19px]" />
          {post.hearts}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px]"
        >
          <CommentIcon className="w-[18px] h-[18px]" />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-[#C5503A] font-extrabold text-[14px]">
          Editar
        </a>
      </footer>
    </article>
  );
}
