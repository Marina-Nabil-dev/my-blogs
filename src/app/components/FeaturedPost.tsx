"use client";

import Image from "next/image";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface FeaturedPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    image: string;
    created_at: string;
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
      <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        {t("featuredPost")}
      </h2>
      <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 md:flex-row">
        <div className="relative flex items-center justify-center w-full h-64 overflow-hidden text-gray-500 bg-gray-200 md:w-1/2 md:h-auto dark:bg-gray-700">
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
        <div className="flex flex-col justify-center p-6 md:w-1/2">
          <span className="mb-2 text-xs font-semibold uppercase text-primary-500">
            {category}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300 line-clamp-3">
            {post.content.substring(0, 200)}...
          </p>
          <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
            <span>{post.author.name || "Anonymous"}</span>
            <FiCalendar className="ml-4 mr-1" />
            <span>{post.created_at}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center font-medium transition-colors text-primary-600 hover:text-primary-700"
          >
            Read More <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
