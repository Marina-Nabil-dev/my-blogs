"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PostCard from "@/app/components/PostCard";

interface TrendingNowProps {
  posts: {
    slug: string;
    title: string;
    content: string;
    created_at: Date;
    author: {
      name: string | null;
      image: string | null;
    };
    time_to_read : integer
  }[];
}

export default function TrendingNow({ posts }: TrendingNowProps) {
  const t = useTranslations("HomePage");

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("trendingNow")}
          </h2>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
