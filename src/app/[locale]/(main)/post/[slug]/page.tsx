"use client";
import {use} from "react";
import { BlogPostHeader } from '@/app/components/post/BlogPostHeader';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/app/api/posts/apis';
import {Comments} from "@/app/components/post/Comments"

interface BlogPostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function PostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const result = await getPostBySlug(slug);
      if (!result) throw new Error('Post not found');
      return result;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching post!</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <main className="flex mt-10 bg-gray-50 dark:bg-gray-900">
      <article className="py-8">
        <BlogPostHeader
          title={post.title}
          author={{
            name: post.author.name || 'Anonymous',
            avatar: post.author.image || '/default-avatar.png'
          }}
          publishedAt={post.created_at}
          readTime={`${post.time_to_read} min read`}
          categories={[post.category]}
          featuredImage={post.image}
          tags={post.tags}
        />
        
        <div className="w-full max-w-4xl px-4 py-8 mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            {post.content}
          </div>
        </div>
        <Comments postSlug={post.slug} comments={post.comments}/>

      </article>
    </main>
  );
}
