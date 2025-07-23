/** @format */

import { PromotionTypeEnum } from "@/types/promotion";
import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;
const url = `/promotion`;
console.log("STORE", storeID);

// STORE_ID=2

export interface GetPromotionDTO {
  limit?: number;
  currentPage?: number;
  promotionType?: PromotionTypeEnum;
}
export const PromotionAPI = {
  getAllPromotionsFromStore: async ({
    currentPage = 1,
    limit = 3,
    promotionType = PromotionTypeEnum.FLASHSALE,
  }: GetPromotionDTO) => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        isActive: true,
        storeID: storeID,
        currentPage,
        limit,
        promotionType,
      },
    });
  },
};
