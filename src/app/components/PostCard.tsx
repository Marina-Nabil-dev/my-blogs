"use client";

import Image from "next/image";
import {  FiHeart, FiCalendar } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    content: string;
    created_at: Date;
    author: {
      name: string | null;
      image: string | null;
    };
    _count: {
      comments: number;
      favorites: number;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
//   const postDate = post.created_at.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 overflow-hidden">
          {/* Placeholder for image if post.image exists, otherwise a generic icon */}
          {post?.author?.image ? (
            <Image
              src={post?.author?.image || ""}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <FiHeart size={50} /> // Placeholder icon
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
            {post.content.substring(0, 150)}...
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <div className="flex items-center mr-4">
              {post?.author?.image && (
                <Image
                  src={post?.author?.image || ""}
                  alt={post?.author?.name || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
              )}
              <span>{post?.author?.name || "Anonymous"}</span>
            </div>
            <div className="flex items-center mr-4">
              <FiCalendar className="mr-1" />
              {/* <span>{postDate}</span> */}
            </div>
            
    
          </div>
        </div>
      </article>
    </Link>
  );
}
