import { useQuery } from "@tanstack/react-query";
import { fetcher, queryKeys } from "@/app/utils/api";
import { PostWithDetails } from '@/app/types/post';

export const useFetchPosts = () => {
  return useQuery<PostWithDetails[]>({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>("api/posts"),
  });
};
