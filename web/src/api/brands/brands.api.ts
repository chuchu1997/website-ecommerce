/** @format */

import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;
const url = `/brands`;

export const BrandAPI = {
  getAllBrandsFromStore: async () => {
    return await api({
      method: "GET",
      url: url,
      params: {
        storeID: storeID,
      },
    });
  },
};
