import { CategoryInterface } from "./categories";
import { SeoType } from "./seo";




export enum ProjectType {
  HOME = "HOME",             // Nhà ở
  APARTMENT = "APARTMENT",   // Chung cư
  HOTEL = "HOTEL",           // Khách sạn
  INTERIOR = "INTERIOR",     // Nội thất
  COMMERCIAL = "COMMERCIAL", // Thương mại
  RESTAURANT = "RESTAURANT", // Nhà hàng

}

 interface ProjectBase {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  type: ProjectType;
  seo?:SeoType;
  storeId:number;
  categoryId: number;
  category?: CategoryInterface; // optional
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateProjectInterface extends Omit<ProjectInterface,"id">{
    updatedAt:Date;
}
export interface CreateProjectInterface extends Omit<ProjectBase,"createdAt"|"updatedAt">{
};

export interface ProjectInterface extends ProjectBase { 
 id:number;
}
