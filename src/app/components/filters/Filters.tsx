"use client";
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import FilterCategories from './FilterCategories';
import FilterDate from './FilterDate';
import FilterAuthors from './FilterAuthors';
import FilterTags from './FilterTags';
import FilterReadingTime from './FilterReadingTime';
import SortBy from './SortBy';
import { FilterData } from './../../types/filters';
import { fetcher } from "@/app/utils/api";

type FilterType = 'categories' | 'authors' | 'tags' | 'readingTime' | 'dateRange' | 'sortBy';
type FilterValue = string[] | { start: Date | null; end: Date | null } | string;

interface FiltersProps {
  onFiltersChange: (filters: {
    categories: string[];
    authors: string[];
    tags: string[];
    readingTime: string[];
    dateRange: { start: Date | null; end: Date | null };
    sortBy: string;
  }) => void;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedReadingTime, setSelectedReadingTime] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [sortBy, setSortBy] = useState('Newest First');


  const { data: filterData, isLoading, error } = useQuery({
    queryKey: ['filters'],
    queryFn: () => fetcher<FilterData>( new URL('/api/filters', window.location.origin).toString()),
  });

  const handleFilterChange = useCallback((type: FilterType, value: FilterValue) => {
    switch (type) {
      case 'categories':
        setSelectedCategories(value as string[]);
        break;
      case 'authors':
        setSelectedAuthors(value as string[]);
        break;
      case 'tags':
        setSelectedTags(value as string[]);
        break;
      case 'readingTime':
        setSelectedReadingTime(value as string[]);
        break;
      case 'dateRange':
        setDateRange(value as { start: Date | null; end: Date | null });
        break;
      case 'sortBy':
        setSortBy(value as string);
        break;
    }

    // Notify parent component of filter changes
    onFiltersChange({
      categories: type === 'categories' ? value as string[] : selectedCategories,
      authors: type === 'authors' ? value as string[] : selectedAuthors,
      tags: type === 'tags' ? value as string[] : selectedTags,
      readingTime: type === 'readingTime' ? value as string[] : selectedReadingTime,
      dateRange: type === 'dateRange' ? value as { start: Date | null; end: Date | null } : dateRange,
      sortBy: type === 'sortBy' ? value as string : sortBy,
    });
  }, [selectedCategories, selectedAuthors, selectedTags, selectedReadingTime, dateRange, sortBy, onFiltersChange]);

  if (isLoading) {
    return (
      <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="text-red-500 dark:text-red-400">
          Error loading filters. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Filters</h2>
        <SortBy
          selectedValue={sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          options={filterData?.sortOptions || []}
        />
      </div>

      <FilterCategories
        title="Categories"
        selectedValues={selectedCategories}
        onChange={(value) => handleFilterChange('categories', value)}
        options={filterData?.categories || []}
      />

      <FilterAuthors
        title="Authors"
        selectedValues={selectedAuthors}
        onChange={(value) => handleFilterChange('authors', value)}
        options={filterData?.authors || []}
      />

      <FilterTags
        title="Tags"
        selectedValues={selectedTags}
        onChange={(value) => handleFilterChange('tags', value)}
        options={filterData?.tags || []}
      />

      <FilterReadingTime
        title="Reading Time"
        selectedValues={selectedReadingTime}
        onChange={(value) => handleFilterChange('readingTime', value)}
        options={filterData?.readingTime || []}
      />

      <FilterDate
        dateRange={dateRange}
        onChange={(value) => handleFilterChange('dateRange', value)}
      />
    </motion.div>
  );
} 