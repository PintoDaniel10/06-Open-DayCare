"use client";

import { useState } from "react";
import { posts } from "@/app/_data/mock";
import Composer from "@/components/home/Composer";
import FeedDivider from "@/components/home/FeedDivider";
import FeedHeader from "@/components/home/FeedHeader";
import PostCard from "@/components/home/PostCard";
import NewPostModal from "@/components/home/NewPostModal";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";

export default function Home() {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeNav="home" onOpenNewPost={() => setShowNewPost(true)} />
      <MobileNav activeNav="home" />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[760px] w-full mx-auto pt-[64px] px-5 pb-[80px] md:pt-[34px] md:px-[40px]">
          <FeedHeader />
          <Composer />
          <FeedDivider />
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <NewPostModal
        open={showNewPost}
        onClose={() => setShowNewPost(false)}
        onPublish={() => setShowNewPost(false)}
      />
    </div>
  );
}
