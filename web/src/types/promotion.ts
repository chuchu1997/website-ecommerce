import { ProductInterface } from "./product";

export enum PromotionTypeEnum {
  FLASHSALE = "FLASHSALE", // Giảm giá trong khung giờ giới hạn
  PERCENTAGE = "PERCENTAGE", // Giảm theo phần trăm
  FIXED_AMOUNT = "FIXED_AMOUNT", // Giảm giá theo số tiền cố định
  BUY_ONE_GET_ONE = "BUY_ONE_GET_ONE", // Mua 1 tặng 1
  FREE_SHIPPING = "FREE_SHIPPING", // Miễn phí vận chuyển
  VOUCHER_CODE = "OUCHER_CODE", // Áp dụng mã giảm giá
  QUANTITY_BASED = "QUANTITY_BASED", // Giảm khi mua số lượng lớn
  COMBO = "COMBO", // Giảm khi mua theo combo
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