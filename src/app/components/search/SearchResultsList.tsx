"use client";

import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}

interface SearchResultsListProps {
  results?: SearchResult[];
  locale?: string;
}

export default function SearchResultsList({
  results,
  locale = "en",
}: SearchResultsListProps) {
  if (!results?.length)
    return <div className="text-center py-4">No results found</div>;

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <article
          key={result.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <Link
            href={`/blog/${result.slug}`}
            locale={locale}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
          </Link>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <FiCalendar className="mr-1.5" />
            <time dateTime={result.date}>
              {new Date(result.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <FiUser className="mr-1.5" />
            <span>{result.author}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{result.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
