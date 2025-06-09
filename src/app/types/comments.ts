import { Author } from "./authors";
export interface Comment {
  id: string;
  user: Author;
  text: string;
  timestamp: string;
  parentId?: string;
}