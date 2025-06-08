"use client";

import PostCard from "@/app/components/PostCard";

interface SearchResult {
  title: string;
  created_at: string;
  author: {
    name: string | null;
    image: string | null;
  };
  slug: string;
  category: string;
  time_to_read: string;
  image: string;
  tags : {
    id :string,
    name :string
  }
}

interface SearchResultsListProps {
  results?: SearchResult[];
}

export default function SearchResultsList({
  results,
}: SearchResultsListProps) {
  if (!results?.length)
    return <div className="text-center py-4 text-gray-500 dark:text-gray-400">No results found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
         <PostCard key={result.slug} post={result} />
      ))}
    </div>
  );
}
