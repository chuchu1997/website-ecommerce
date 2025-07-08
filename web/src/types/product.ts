import { CategoryInterface } from "./category";
import { FakeComment } from "./fakecomment";
import { ProductPromotion } from "./promotion";
import { SeoInterface } from "./seo";




export interface ImageInterface { 
    url:string;

}

export interface ProductInterface extends ProductBase{
    id:number

};

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
    category?:CategoryInterface
    reviews:[];
    fakeComments:FakeComment[]
    
    sku:string;

    seo?:SeoInterface
    

    promotionProducts:ProductPromotion[]
    storeId:number;
    //sản phẩm này có tặng quà nào không?
    giftProducts?:any[];
    //sản phẩm này có phải quà tặng của sản phẩm nào không?
    giftedIn?:any[]



//       giftProducts GiftProduct[] @relation("ProductWithGifts")

//   // B: sản phẩm này có phải quà tặng của sản phẩm nào không?
//   giftedIn     GiftProduct[] @relation("GiftedToProduct")


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


export interface ProductQuickView {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}
