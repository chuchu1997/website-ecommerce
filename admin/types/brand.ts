import { ProductInterface } from "./product";









export interface BrandBase {
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
export interface CreateBrandInterface
  extends Omit<BrandInterface, 'id' | 'createdAt' | 'updatedAt' | 'products'> {}


  export interface UpdateBrandInterface
  extends Omit<BrandInterface, 'id'> {
  updatedAt: Date;
}