import { CategoryInterface } from "./category";
import { SeoInterface } from "./seo";


export enum ProjectType {
  HOME = "HOME",             // Nhà ở
  APARTMENT = "APARTMENT",   // Chung cư
  HOTEL = "HOTEL",           // Khách sạn
  INTERIOR = "INTERIOR",     // Nội thất
  COMMERCIAL = "COMMERCIAL", // Thương mại
  RESTAURANT = "RESTAURANT", // Nhà hàng

}


 export interface ProjectInterface {
  id:number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  type: ProjectType;
  seo?:SeoInterface;
  storeId:number;
  shortDescription:string;
  
  categoryId: number;
  category?: CategoryInterface; // optional
  createdAt?: Date;
  updatedAt?: Date;
}


