import { PostWithDetails } from "@/app/types/post";
import postsData from "@/data/posts.json";
import relatedPostsData from "@/data/related-posts.json";
import { log } from "console";

export async function getPostBySlug(
  slug: string
): Promise<PostWithDetails | null> {
  try {
    const posts: PostWithDetails[] = postsData as unknown as PostWithDetails[];
    const post = posts.find((post) => post.slug === slug);

    return post || null;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export async function getRelatedPosts(
  currentSlug: string,
  category?: string,
  limit: number = 3
): Promise<PostWithDetails[]> {
  try {
    const posts: PostWithDetails[] = postsData as unknown as PostWithDetails[];
    const relatedPostsMap = relatedPostsData.related_posts as Record<
      string,
      string[]
    >;

    // Get related post slugs for the current post
    const relatedSlugs = relatedPostsMap[currentSlug] || [];

    // Find the actual posts from the slugs
    let relatedPosts = posts.filter((post) => relatedSlugs.includes(post.slug));
    console.log(relatedSlugs);
    console.log(relatedPosts);

    // If category filter is specified, apply it
    if (category) {
      relatedPosts = relatedPosts.filter((post) => post.category === category);
    }

    // If we don't have enough related posts, fill with other posts from same category
    if (relatedPosts.length < limit) {
      const additionalPosts = posts
        .filter(
          (post) =>
            post.slug !== currentSlug &&
            !relatedSlugs.includes(post.slug) &&
            (!category || post.category === category)
        )
        .slice(0, limit - relatedPosts.length);

      relatedPosts = [...relatedPosts, ...additionalPosts];
    }
    console.log(relatedPosts);

    return relatedPosts.slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch related posts:", error);
    return [];
  }
}
