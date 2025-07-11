import { CategoryInterface } from "./categories";

interface ServiceBase {
  title: string;
  slug: string;
  shortDescription?: string;
  description: any; // JSON content (rich text)
  imageUrl: string;
  seo?: Record<string, any>; // Meta SEO info
  storeId:number;
  price?: number;
  categoryId: number;
  category?: CategoryInterface; // optional if included
  createdAt?: Date;
  updatedAt?: Date;
}


export interface UpdateServiceInterface extends Omit<ServiceInterface,"id">{
    updatedAt:Date;
}
export interface CreateServiceInterface extends Omit<ServiceBase,"createdAt"|"updatedAt">{
};

export interface ServiceInterface extends ServiceBase { 
 id:number;
}



