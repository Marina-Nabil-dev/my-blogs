import { PostWithDetails } from '@/app/types/post';

export async function getPostBySlug(slug: string): Promise<PostWithDetails | null> {
  try {
    const response = await fetch("https://dummyjson.com/c/63dc-8803-4502-9ca7");
    
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts: PostWithDetails[] = await response.json();
    const post = posts.find(post => post.slug === slug);
    
    return post || null;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}