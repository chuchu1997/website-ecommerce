import { FakeComment } from "./fake-comments";
import { SeoType } from "./seo";






export enum ImageMediaType {
 PRODUCT="PRODUCT",
 CATEGORY="CATEGORY",
 BANNER="BANNER",
 BRAND="BRAND",
 NEWS="NEWS",
 SERVICE="SERVICE",
 PROJECT="PROJECT",
 NONE="NONE"
}
export interface ImageInterface { 
    url:string;
    type?:ImageMediaType

}

export enum discountTypeEnum {
  PERCENT = "PERCENT",
  FIXED = "FIXED",
}
export interface PromotionInterface {
  id:number;
  name: String;
  slug: String;
  isActive: Boolean;
  promotionProducts: ProductPromotion[];
  startDate: Date;
  endDate: Date;
  storeId: number;
  createdAt?: Date;
}


export interface ProductPromotion {
  promotionId: number;
  productId: number;
  promotion?:PromotionInterface;
  discountType: discountTypeEnum;
  discount: number;
  product: ProductInterface;
}

interface ProductBase { 
    name:string;
    description:string;
    shortDescription:string;
    
    price:number;
    originalPrice?:number;

    isFeatured:boolean;
    slug:string;
    discount:number;
    viewCount:number;
    ratingCount:number;
    orderItems:[];
    colors:ProductColorInterface[],
    sizes:ProductSizeInterface[]
    stock:number;
    images:ImageInterface[],
    categoryId:number;
    reviews:[]
    sku:string;
    storeId:number;
    seo?:SeoType
    fakeCommens:FakeComment[]
    promotionProducts:ProductPromotion[]
    saleCount?:number;


        //sản phẩm này có tặng quà nào không?
    giftProducts?:any[];
    //sản phẩm này có phải quà tặng của sản phẩm nào không?
    giftedIn?:any[]
    createdAt?: Date;
    updatedAt?: Date;


}

export interface ProductColorInterface {
    id?:number;
    name:string;
    productId?:number;
    hex:string;
    price?:number;
    stock:number;
}
export interface ProductSizeInterface {  
    id?:number;
    name:string;
    productId?:number;
    price?:number;
    stock:number;

}


export interface ProductInterface extends ProductBase{
    id:number

};
export interface CreateProductInterface extends Partial<Omit<ProductBase, 'createdAt' | 'updatedAt' | 'orderItems' | 'reviews'>> {

}
export interface UpdateProductInterface extends Partial<Omit<ProductInterface,"id">> {
  updatedAt:Date;
  
}