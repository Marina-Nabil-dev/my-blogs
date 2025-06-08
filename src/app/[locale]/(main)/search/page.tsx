"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/app/utils/api";
import { useState } from "react";
import { useParams } from "next/navigation";
import SearchBar from "@/app/components/search/SearchBar";
import SearchResultsList from "@/app/components/search/SearchResultsList";
export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const params = useParams();
  const locale = params.locale as string;

  const { data } = useQuery({
    queryKey: [queryKeys.search(searchTerm)],
    queryFn: () =>
      fetch(`/api/search?term=${searchTerm}`).then((res) => res.json()),
    enabled: !!searchTerm, // Only fetch when searchTerm exists
  });

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <SearchResultsList results={data} locale={locale} />
    </div>
  );
}
