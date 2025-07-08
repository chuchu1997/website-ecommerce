/** @format */

import api from "../interceptor";

const url = "/articles";
const storeID = process.env.STORE_ID || 1;

export const NewsAPI = {
  getNewsWithSlug: ({ slug }: { slug: string }) => {
    return api({
      method: "GET",
      url: `${url}/${slug}`,
    });
  },

  getNews: ({
    currentPage,
    limit = 3,
  }: {
    currentPage: number;
    limit: number;
  }) => {
    return api({
      method: "GET",
      url: url,
      params: {
        currentPage,
        limit,
        storeId: storeID,
      },
    });
  },
};
