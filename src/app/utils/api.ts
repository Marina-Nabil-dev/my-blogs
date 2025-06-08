export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("An error occurred while fetching data.");
  return res.json();
}

export const queryKeys = {
  posts: "posts",
  post: (slug: string) => `post-${slug}`,
  search: (term: string) => `search-${term}`,
  filters : "filters"
} as const;
