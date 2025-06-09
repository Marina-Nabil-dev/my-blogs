import { Author } from "./authors";
import { Comment } from './comments';
export interface PostWithDetails {
    slug: string;
    title : string;
    content : string;
    time_to_read : number;
    published : boolean;
    created_at: string;
    image : string;
    category: string;
    tags: { id: string; name: string }[];
    author : {
      name: string | null;
      image: string | null;
    };
    comments: Comment[];
  }

  export interface Post {
    title: string;
    slug: string;
    content: string;
    category :string
    image: string;
    author: Author;
    published : boolean;
    created_at: string;
    updatedAt?: string;
    time_to_read: string;
    categories: string[];
    comments: Comment[];
    tags?: string[];
  } 