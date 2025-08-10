import { Comment } from "./comments";

export interface Author {
  name: string;
  bio: string;
  image: string;
  no_of_posts: number;
}
export interface PostWithDetails {
  slug: string;
  title: string;
  content: string;
  time_to_read: number;
  published: boolean;
  created_at: string;
  image: string;
  category: string;
  tags: { id: string; name: string }[];
  author: Author;
  comments: Comment[];
}

export interface Post {
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string;
  author: Author;
  published: boolean;
  created_at: string;
  updatedAt?: string;
  time_to_read: string;
  categories: string[];
  comments: Comment[];
  tags?: string[];
}
