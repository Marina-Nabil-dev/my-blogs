export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("An error occurred while fetching data.");
  return res.json();
}

export const queryKeys = {
  posts: "posts",
  post: (slug: string) => `post-${slug}`,
  search: (term: string) => `search-${term}`,
} as const;

export async function fetchPosts() {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();

}
