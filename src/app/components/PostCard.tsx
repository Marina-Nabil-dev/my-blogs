"use client";

import Image from "next/image";
import { FiClock, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    created_at: string;
    author: {
      name: string | null;
      image: string | null;
    };
    tags : {
      id :string,
      name :string
    }
    category: string;
    time_to_read: string;
    image: string; // Assuming an image URL for the card header
  };
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
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 overflow-hidden">
          {post.imageUrl ? (
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
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-sm mb-3">
            {post.category && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-100">
                {post.category}
              </span>
            )}
            {post.readingTime && (
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" />
                <span>{post.time_to_read} min read</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
            <ul className="flex flex-wrap gap-2 text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
              {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                <li key={tag.id} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                  {tag.name}
                </li>
              ))}
            </ul>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <div className="flex items-center mr-4">
              {/* {post?.author?.image && (
                <Image
                  src={post?.author?.image || ""}
                  alt={post?.author?.name || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
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
