import { SeoInterface } from "./seo";

export interface NewsInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string; // optional
  storeId?: number;  // optional
  createdAt: Date;
  updatedAt: Date;
  shortDescription?:string;
  
  seo?: SeoInterface;


  store?: {
    id: number;
    name: string;
    // Thêm các field khác của store nếu cần
  };
}