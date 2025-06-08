"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/app/utils/api";
import { useState, useCallback } from "react";
import SearchBar from "@/app/components/search/SearchBar";
import SearchResultsList from "@/app/components/search/SearchResultsList";
import Filters from './../../../components/filters/Filters';
import { PostWithDetails } from "@/app/api/types/post";
import { fetcher } from "@/app/utils/api";
import { 
  filterBySearchTerm, 
  filterByCategories,
  filterByAuthors,
  filterByTags,
  filterByReadingTime,
  filterByDateRange,
  sortPosts 
} from "@/app/utils/filterUtils";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    authors: [] as string[],
    tags: [] as string[],
    readingTime: [] as string[],
    dateRange: { start: null as Date | null, end: null as Date | null },
    sortBy: "Newest First",
  });

  // Fetch all posts
  const { data: posts } = useQuery({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>(new URL('/api/posts', window.location.origin).toString()),
  });

  // Apply all filters
  const filteredPosts = posts?.filter(post => 
    filterBySearchTerm(post, searchTerm) &&
    filterByCategories(post, activeFilters.categories) &&
    filterByAuthors(post, activeFilters.authors) &&
    filterByTags(post, activeFilters.tags) &&
    filterByReadingTime(post, activeFilters.readingTime) &&
    filterByDateRange(post, activeFilters.dateRange)
  );

  // Sort posts
  const sortedPosts = filteredPosts ? sortPosts(filteredPosts, activeFilters.sortBy) : undefined;

  const handleFiltersChange = useCallback((filters: typeof activeFilters) => {
    setActiveFilters(filters);
  }, []);

  return (
    <div className="container mx-auto mt-20 px-4 py-8 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0">
        <Filters onFiltersChange={handleFiltersChange} posts={posts} />
      </aside>
      <main className="flex-grow">
        <SearchBar onSearch={setSearchTerm} />
        <SearchResultsList results={sortedPosts} />
      </main>
    </div>
  );
}
