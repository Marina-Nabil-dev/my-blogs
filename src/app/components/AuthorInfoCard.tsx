"use client";

import Image from "next/image";
import { FiUser, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Author } from "../types/post";

interface AuthorInfoCardProps {
  author: Author;
}

export default function AuthorInfoCard({ author }: AuthorInfoCardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={` top-4 grid items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
      >
        <h2 className="text-md font-bold">Author Info</h2>
        {/* Author Image */}
        <div className=" flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {author.image ? (
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src={author.image}
                alt={author.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
              <FiUser size={24} />
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {author.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {author.bio}
          </p>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            <FiEdit3 className="mr-1" size={14} />
            <span>
              {author.no_of_posts} {author.no_of_posts === 1 ? "post" : "posts"}
            </span>
          </div>
        </div>
        <button className="hover:underline text-blue-500 hover:cursor-pointer">
          View All Posts
        </button>
      </motion.div>
    </>
  );
}
