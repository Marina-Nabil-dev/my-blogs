import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseMarkdown } from "@/app/utils/markdown";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((name) => ({ slug: name.replace(/\.md$/, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return {};
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { metadata, contentHtml } = await parseMarkdown(fileContent);

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto p-4">
      <h1>{metadata.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
