/** @format */

import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;
const url = `/banners`;

export const BannerAPI = {
  getAllBannerFromStore: async () => {
    const fullUrl = `${api.defaults.baseURL}${url}?storeID=${storeID}`;
    console.log("FULL URL GET BANNER ", fullUrl);

    return await api({
      method: "GET",
      url: url,
      params: {
        storeID: storeID,
      },
    });
  },
};
