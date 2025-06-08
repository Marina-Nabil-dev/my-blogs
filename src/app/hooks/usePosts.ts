import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";
import { fetcher, queryKeys } from "@/app/utils/api";

interface PostWithDetails extends Post {
  slug: string;
  created_at: Date;
  author: {
    name: string | null;
    image: string | null;
  };
  tags: { id: string; name: string }[];
  _count: {
    comments: number;
    favorites: number;
  };
}

export function usePosts() {
  return useQuery<PostWithDetails[]>({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>("/api/posts"),
  });
}
