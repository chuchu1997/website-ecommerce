/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `/services`;

export const ServiceAPI = {
  getServiceWithSlug: ({ slug }: { slug: string }) => {
    return api({
      method: "GET",
      url: `${url}/${slug}`,
    });
  },

  getServices: ({
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
