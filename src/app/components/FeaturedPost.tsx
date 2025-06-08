"use client";

import Image from "next/image";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface FeaturedPostProps {
  post: {
    id: string;
    slug: string;
    title: string;
    content: string;
    image: string;
    created_at: string | Date;
    author: {
      name: string | null;
    };
    tags: { name: string }[];
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const t = useTranslations("FeaturedPost");

  const category =
    post.tags && post.tags.length > 0
      ? post.tags[0].name.toUpperCase()
      : "TECHNOLOGY";

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t("featuredPost")}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <span className="text-xs font-semibold text-primary-500 uppercase mb-2">
            {category}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">
            {post.content.substring(0, 200)}...
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>{post.author.name || "Anonymous"}</span>
            <FiCalendar className="ml-4 mr-1" />
            <span>{post.created_at}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Read More <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
