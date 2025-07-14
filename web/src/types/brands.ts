import { ProductInterface } from "./product";

 interface BrandBase {
  name: string;
  description: string;
  imageUrl: string;
  position: number;
  linkHref?: string;
  storeId: number;
}

export interface BrandInterface extends BrandBase {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  products?: ProductInterface[];
}