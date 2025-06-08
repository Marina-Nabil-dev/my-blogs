import { useQuery } from "@tanstack/react-query";
import { fetcher, queryKeys } from "@/app/utils/api";

interface PostWithDetails extends Post {
  slug: string;
  title : string;
  content : string;
  time_to_read : int;
  published : bool;
  created_at: string;
  image : string;
  tags: { id: string; name: string }[];
  author : {name : string , image : string};
}

export function usePosts() {
  return useQuery<PostWithDetails[]>({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>("https://dummyjson.com/c/0419-3b64-4989-9a04"),
  });
}
