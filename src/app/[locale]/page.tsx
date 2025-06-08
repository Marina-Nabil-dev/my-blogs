"use client";

import { useTranslations } from "next-intl";
import FeaturedPost from "@/app/components/FeaturedPost";
import TrendingNow from "@/app/components/TrendingNow";
import { usePosts } from "@/app/hooks/usePosts";

export default function IndexPage() {
  const t = useTranslations("HomePage");
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const trendingPosts = posts && posts.length > 1 ? posts.slice(1, 4) : []; // Get next 3 for trending

  return (
    <main className="container mx-auto p-4">
      {featuredPost && (
          <FeaturedPost post={featuredPost} />
       
      )}

      {trendingPosts.length > 0 && <TrendingNow posts={trendingPosts} />}
    </main>
  );
}
