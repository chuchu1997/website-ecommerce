/** @format */

import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;

const url = `/categories`;

export const CategoryAPI = {
  getCategoryWithSlug: async (slug: string, currentPage: number, limit = 4) => {
    return await api({
      method: "GET",
      url: `${url}/${slug}`,
      params: {
        storeID,
        currentPage,
        limit,
      },
    });
  },

  getAllCategoriesOfStore: async ({
    justGetParent,
    currentPage,
    limit,
  }: {
    justGetParent: boolean;
    currentPage?: number;
    limit?: number;
  }) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        justGetParent,
        storeID,
        limit,
        currentPage,

        //     justGetParent,
        //   process.env.STORE_ID
      },
    });
  },
};
