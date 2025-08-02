import { Metadata } from "next";
import { generateMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Search",
  description: "Search through our collection of articles, insights, and resources. Filter by categories, authors, tags, and more.",
  keywords: ["search", "articles", "blog", "filter", "categories", "authors", "tags"],
  image: "/images/search-og.jpg",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 