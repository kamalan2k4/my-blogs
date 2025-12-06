"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const { slug, title, subtitle } = props;

  const [views, setViews] = useState<number | null>(null);

  // Fetch views when component mounts
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views?slug=${slug}`);
        const data = await res.json();
        if (typeof data.views === "number") setViews(data.views);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchViews();
  }, [slug]);

  return (
    <div
      className="relative border border-black p-4 rounded-md shadow-sm
        bg-post transform hover:scale-105 transition-transform duration-300"
    >
      {/* Title */}
      <Link href={`/posts/${slug}`}>
        <h1 className="text-[#adff2f] hover:underline mb-4">{title}</h1>
      </Link>

      {/* Subtitle */}
      <p className="text-[#deb887]">{subtitle}</p>

      {/* Bottom-right view count */}
      <p className="absolute bottom-2 right-2 text-xs text-[#deb887] opacity-80">
        {views === null ? "…" : `${views} views`}
      </p>
    </div>
  );
};

export default PostPreview;
