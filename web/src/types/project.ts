import { CategoryInterface } from "./category";


export enum ProjectType {
  HOME = "HOME",             // Nhà ở
  APARTMENT = "APARTMENT",   // Chung cư
  HOTEL = "HOTEL",           // Khách sạn
  INTERIOR = "INTERIOR",     // Nội thất
  COMMERCIAL = "COMMERCIAL", // Thương mại
  RESTAURANT = "RESTAURANT", // Nhà hàng

}
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  slug:string;
  type:ProjectType;
  storeId?:number;
  category?:CategoryInterface;

}

