import Link from "next/link";
import Image from "next/image";
import { parseMarkdown } from "@/app/utils/markdown"; // Adjust path
import { FiCalendar, FiUser, FiTag } from "react-icons/fi";

interface PostCardProps {
  post: Omit<
    Awaited<ReturnType<typeof parseMarkdown>>["metadata"],
    "contentHtml"
  > & { slug: string };
  locale: string;
}

export default function PostCard({ post, locale }: PostCardProps) {
  return (
    <article className="bg-card dark:bg-card-dark shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      {post.image && (
        <Link
          href={`/blog/${post.slug}`}
          locale={locale}
          className="block relative w-full h-48"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy" // Lazy loading by default
          />
        </Link>
      )}
      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-1 flex items-center">
          <FiCalendar className="mr-1.5" />
          {new Date(post.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="text-2xl font-semibold mb-2 leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            locale={locale}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground mb-3 text-sm flex items-center">
          <FiUser className="mr-1.5" /> {post.author}
        </p>
        <p className="text-foreground/80 mb-4 text-base leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-primary mb-4">
          <FiTag className="mr-1.5" />
          <span>{post.category}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          locale={locale}
          className="inline-block text-primary hover:underline font-medium"
        >
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
}
