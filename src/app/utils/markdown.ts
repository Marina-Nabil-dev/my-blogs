import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function parseMarkdown(content: string) {
  const { data, content: mdContent } = matter(content);
  const processedContent = await remark().use(html).process(mdContent);
  const contentHtml = processedContent.toString();
  return { metadata: data, contentHtml };
}
