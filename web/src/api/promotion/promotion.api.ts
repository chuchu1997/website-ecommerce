/** @format */

import { PromotionTypeEnum } from "@/types/promotion";
import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;
const url = `/promotion`;

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
