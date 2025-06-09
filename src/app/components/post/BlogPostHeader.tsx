import Image from 'next/image';
import { FaTwitter, FaFacebook, FaLinkedin, FaLink as LinkIcon } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';

interface BlogPostHeaderProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  categories: string[];
  tags : {
    id :string,
    name:string
  }[]
  featuredImage: string;
}

export function BlogPostHeader({
  title,
  author,
  publishedAt,
  readTime,
  categories,
  featuredImage,
  tags
}: BlogPostHeaderProps) {
  

  return (
    <header className="w-full max-w-4xl px-4 py-8 mx-auto">
      <div className="space-y-6">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <ul className="flex flex-wrap flex-grow gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {tags && tags.length > 0 && tags.map((tag) => (
                <li key={tag.id} className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                  {tag.name}
                </li>
              ))}
            </ul>
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          {title}
        </h1>
        
        <div className="flex items-center space-x-4">
    
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{author.name}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
            >
              {category}
            </span>
          ))}
        </div>
    

        <div className="flex items-center space-x-4">
          <button
           
            className="p-2 text-gray-600 transition-colors hover:text-primary"
            aria-label="Share on Twitter"
          >
            <FaTwitter size={20} />
          </button>
          <button
            className="p-2 text-gray-600 transition-colors hover:text-primary"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={20} />
          </button>
          <button
            className="p-2 text-gray-600 transition-colors hover:text-primary"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={20} />
          </button>
          <button
            className="p-2 text-gray-600 transition-colors hover:text-primary"
            aria-label="Copy link"
          >
            <LinkIcon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
} 