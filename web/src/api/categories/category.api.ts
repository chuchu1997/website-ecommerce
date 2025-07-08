/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

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
  }: {
    justGetParent: boolean;
  }) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        justGetParent,
        storeID,

        //     justGetParent,
        //   process.env.STORE_ID
      },
    });
  },
};
