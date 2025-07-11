/** @format */

import { CategoryInterface } from "./category";
import { SeoInterface } from "./seo";

export interface ServiceInterface {
  id: number;

  title: string;
  slug: string;
  shortDescription?: string;
  description: any; // JSON content (rich text)
  imageUrl: string;
  seo?: SeoInterface;
  storeId: number;
  price?: number;
  categoryId: number;
  category?: CategoryInterface; // optional if included
  createdAt?: Date;
  updatedAt?: Date;
}
