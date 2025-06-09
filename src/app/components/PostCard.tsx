"use client";

import Image from "next/image";
import { FiClock, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { PostWithDetails } from "../types/post";

interface PostCardProps {
  post : PostWithDetails
}

export default function PostCard({ post }: PostCardProps) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg"
    >
      <Link href={`/post/${post.slug}`} className="block">
        <div className="relative flex items-center justify-center w-full h-48 overflow-hidden text-gray-500 bg-gray-200 dark:bg-gray-700">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <FiUser size={50} /> // Placeholder icon if no image
          )}
        </div>
        </Link>
        <div className="flex flex-col flex-grow p-6">
          <div className="flex items-center mb-3 text-sm">
            {post.category && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-100">
                {post.category}
              </span>
            )}
            {post.time_to_read && (
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" />
                <span>{post.time_to_read} min read</span>
              </div>
            )}
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
            <ul className="flex flex-wrap flex-grow gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                <li key={tag.id} className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                  {tag.name}
                </li>
              ))}
            </ul>
          <div className="flex items-center mt-auto text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              {/* {post?.author?.image && (
                <Image
                  src={post?.author?.image || ""}
                  alt={post?.author?.name || "Author"}
                  width={24}
                  height={24}
                  className="mr-2 rounded-full"
                />
              )} */}
              <span>{post?.author?.name || "Anonymous"}</span>
            </div>
            <div className="flex items-center">
              <span>{new Date(post.created_at).toLocaleDateString("en-US", dateOptions)}</span>
            </div>
          </div>
        </div>
      
    </motion.article>
  );
}
