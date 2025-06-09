"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PostCard from "@/app/components/PostCard";
import { PostWithDetails } from "../types/post";

interface TrendingNowProps {
  posts: PostWithDetails[]
}

export default function TrendingNow({ posts }: TrendingNowProps) {
  const t = useTranslations("HomePage");

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("trendingNow")}
          </h2>
          <Link
            href="/blog"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post :PostWithDetails) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
