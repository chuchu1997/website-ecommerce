/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `/products`;

export const ProductAPI = {
  getProductBySlug: async (slug: string) => {
    return await api({
      method: "GET",
      url: `${url}/${slug}`,
    });
  },

  getProductByIDS: async (ids: number[]) => {
    console.log("IDSSS", ids);
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        currentPage: 1,
        limit: 10,
        storeID,
        ids: ids.join(","), // <-- CHUYỂN MẢNG THÀNH CHUỖI
      },
    });
  },
  getProductByName: async (name: string) => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        currentPage: 1,
        limit: 4,
        storeID,
        name: name,
      },
    });
  },

  getFeatureProducts: async ({ currentPage = 1, limit = 6 }) => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        currentPage,
        limit,
        storeID,
        isFeature: true,
      },
    });
  },
};
