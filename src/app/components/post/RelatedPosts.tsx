import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getRelatedPosts } from "@/app/api/posts/apis";
import { PostWithDetails } from "@/app/types/post";
import { useQuery } from "@tanstack/react-query";

interface RelatedPostsProps {
  post: PostWithDetails;
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  const {
    data: relatedPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["relatedPosts", post.slug],
    queryFn: async () => {
      const result = await getRelatedPosts(post.slug, post.category);
      return result;
    },
  });

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Related Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !relatedPosts || relatedPosts.length === 0) {
    return null;
  }
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.created_at)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
