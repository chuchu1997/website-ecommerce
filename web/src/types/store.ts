import { SeoInterface } from "./seo";





export interface StoreInterface {
  id: number;
  name: string;
  description: string | null;
  userID: number;
  email: string | null;
  industry:string|null;
  tags:string[]
  phone: string | null;
  address: string | null;
  logo: string | null;
  favicon: string | null;
  seo: SeoInterface;
  createdAt: string; // hoặc Date nếu bạn muốn dùng kiểu Date
  updatedAt: string; // hoặc Date
  socials: SocialInterface[]; // Nếu biết rõ cấu trúc của `socials`, bạn nên định nghĩa rõ hơn thay vì dùng `any[]`
}


export  interface SocialInterface {  
  id:number;
  storeId:number;
  type:"FACEBOOK"|"ZALO"|"YOUTUBE"|"TIKTOK"
  url:string;

}