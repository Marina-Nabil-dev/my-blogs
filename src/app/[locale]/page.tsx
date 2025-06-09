"use client";

import FeaturedPost from "@/app/components/FeaturedPost";
import TrendingNow from "@/app/components/TrendingNow";
import { useQuery } from '@tanstack/react-query';
import { fetcher, queryKeys } from "@/app/utils/api";
import {PostWithDetails} from "@/app/types/post"


export default function IndexPage() {

  const { data:posts, isLoading, error } = useQuery<PostWithDetails[]>({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>("api/posts"),
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts!</p>;

  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const trendingPosts = posts && posts.length > 1 ? posts.slice(1, 4) : []; // Get next 3 for trending

  return (
    <main className="container p-4 mx-auto">
      {featuredPost && (
          <FeaturedPost post={featuredPost} />
       
      )}

      {trendingPosts.length > 0 && <TrendingNow posts={trendingPosts} />}
    </main>
  );
}
