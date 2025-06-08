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
  }