"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/app/utils/api";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import SearchBar from "@/app/components/search/SearchBar";
import SearchResultsList from "@/app/components/search/SearchResultsList";
import Filters from './../../../components/filters/Filters';
import { PostWithDetails } from "@/app/types/post";
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
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from "@/app/components/ui/skeleton";

// Constants
const POSTS_PER_LOAD = 3;
const INTERSECTION_THRESHOLD = 0.5;
const DEBOUNCE_DELAY = 300;

// Types
interface FilterState {
  categories: string[];
  authors: string[];
  tags: string[];
  readingTime: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  sortBy: string;
}

interface SearchPageProps {
  initialFilters?: Partial<FilterState>;
}



// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
    <h2 className="font-semibold text-red-800">Something went wrong:</h2>
    <pre className="mt-2 text-red-600">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
    >
      Try again
    </button>
  </div>
);

// Loading Skeleton Component
const SearchSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="w-full h-12" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="w-full h-48" />
      ))}
    </div>
  </div>
);

export default function SearchPage({ initialFilters }: SearchPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    authors: [],
    tags: [],
    readingTime: [],
    dateRange: { start: null, end: null },
    sortBy: "Newest First",
    ...initialFilters,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Fetch posts with error handling
  const { 
    data: allPosts, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: [queryKeys.posts],
    queryFn: () => fetcher<PostWithDetails[]>(new URL('/api/posts', window.location.origin).toString()),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3,
  });

  // Memoized filter functions
  const filterFunctions = useMemo(() => [
    (post: PostWithDetails) => filterBySearchTerm(post, searchTerm),
    (post: PostWithDetails) => filterByCategories(post, activeFilters.categories),
    (post: PostWithDetails) => filterByAuthors(post, activeFilters.authors),
    (post: PostWithDetails) => filterByTags(post, activeFilters.tags),
    (post: PostWithDetails) => filterByReadingTime(post, activeFilters.readingTime),
    (post: PostWithDetails) => filterByDateRange(post, activeFilters.dateRange),
  ], [searchTerm, activeFilters]);

  // Optimized filtered and sorted posts
  const filteredAndSortedPosts = useMemo(() => {
    
    if (!allPosts) return [];
    
    const filtered = allPosts.filter(post => 
      filterFunctions.every(filterFn => filterFn(post))
    );
    
    return sortPosts(filtered, activeFilters.sortBy);
  }, [allPosts, filterFunctions, activeFilters.sortBy]);

  // Optimized displayed posts with virtualization consideration
  
  const displayedPosts = useMemo(() => {
    // If no filters are applied, show all posts
    const hasActiveFilters = activeFilters.categories.length > 0 || 
                           activeFilters.authors.length > 0 || 
                           activeFilters.tags.length > 0 || 
                           activeFilters.readingTime.length > 0 || 
                           (activeFilters.dateRange.start || activeFilters.dateRange.end) ||
                           searchTerm;
    
    if (!hasActiveFilters) {
      return filteredAndSortedPosts
    }
    
    return filteredAndSortedPosts.slice(0, currentPage * POSTS_PER_LOAD);
  }, [filteredAndSortedPosts, currentPage, activeFilters, searchTerm]);

  

  // Debounced search handler
  const handleSearch = useCallback((term: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, DEBOUNCE_DELAY);
  }, []);

  // Optimized filter change handler
  const handleFiltersChange = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  }, []);

  // Improved intersection observer setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loadingRef.current && !isLoading) {
        loadingRef.current = true;
        setCurrentPage(prev => prev + 1);
        loadingRef.current = false;
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: INTERSECTION_THRESHOLD,
      rootMargin: '100px',
    });

    const loadMoreTrigger = document.getElementById('load-more-trigger');
    if (loadMoreTrigger) {
      observerRef.current.observe(loadMoreTrigger);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  if (error) {
    return <ErrorFallback error={error as Error} resetErrorBoundary={() => refetch()} />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container flex flex-col gap-6 px-4 py-8 mx-auto mt-20 md:flex-row">
        <aside className="flex-shrink-0 w-full md:w-64">
          <Filters 
            onFiltersChange={handleFiltersChange}
          />
        </aside>
        <main className="flex-grow">
          <SearchBar onSearch={handleSearch} />
          {isLoading ? (
            <SearchSkeleton />
          ) : (
            <>
              <SearchResultsList 
                results={displayedPosts}
              />
              {displayedPosts.length < filteredAndSortedPosts.length && (
                <div id="load-more-trigger" className="w-full h-10" />
              )}
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
