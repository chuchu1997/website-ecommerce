import { CategoryInterface } from "./categories";

export interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  description: any; // JSON content (rich text)
  imageUrl: string;
  seo?: Record<string, any>; // Meta SEO info
  price?: number;
  categoryId: number;
  category?: CategoryInterface; // optional if included
  createdAt: Date;
  updatedAt: Date;
}