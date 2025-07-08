import { ProductInterface } from "./product";
import { ProductPromotion, PromotionInterface } from "./promotion";




export interface CartItemType {
  id: number;
  stockQuantity: number;
  isSelect: boolean;
  product:ProductInterface[]

  
}
export interface CartTotals {
  totalItems: number;
  totalPrice: number;
}

