import { PostWithDetails } from "@/app/api/types/post";

export const filterBySearchTerm = (post: PostWithDetails, searchTerm: string) => {
  return searchTerm === "" || 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase());
};

export const filterByCategories = (post: PostWithDetails, categories: string[]) => {
  return categories.length === 0 || categories.includes(post.category);
};

export const filterByAuthors = (post: PostWithDetails, authors: string[]) => {
  return authors.length === 0 || (post.author && authors.includes(post.author.name || ''));
};

export const filterByTags = (post: PostWithDetails, tags: string[]) => {
  return tags.length === 0 || (post.tags && post.tags.some(tag => tags.includes(tag.name)));
};

export const filterByReadingTime = (post: PostWithDetails, readingTimes: string[]) => {
  if (readingTimes.length === 0) return true;
  
  const time = post.time_to_read;
  return readingTimes.some(range => {
    switch (range) {
      case "Under 5 min": return time < 5;
      case "5-10 min": return time >= 5 && time <= 10;
      case "10-15 min": return time > 10 && time <= 15;
      case "15-20 min": return time > 15 && time <= 20;
      case "Over 20 min": return time > 20;
      default: return false;
    }
  });
};

export const filterByDateRange = (post: PostWithDetails, dateRange: { start: Date | null; end: Date | null }) => {
  const postDate = new Date(post.created_at);
  return (!dateRange.start || postDate >= dateRange.start) &&
    (!dateRange.end || postDate <= dateRange.end);
};

export const sortPosts = (posts: PostWithDetails[], sortBy: string) => {
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case "Newest First":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "Oldest First":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "Most Popular":
        return (b.views || 0) - (a.views || 0);
      case "Most Commented":
        return (b.comments?.length || 0) - (a.comments?.length || 0);
      case "Most Liked":
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  });
}; 