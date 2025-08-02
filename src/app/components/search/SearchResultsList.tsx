"use client";

import PostCard from "@/app/components/PostCard";
import { PostWithDetails } from "@/app/types/post";

interface SearchResultsListProps {
  results?: PostWithDetails[];
}

export default function SearchResultsList({
  results,
}: SearchResultsListProps) {
  if (!results?.length)
    return <div className="py-4 text-center text-gray-500 dark:text-gray-400">No results found.</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
         <PostCard key={result.slug} post={result} />
      ))}
    </div>
  );
}
