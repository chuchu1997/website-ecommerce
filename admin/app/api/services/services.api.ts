/** @format */

import api from "../interceptor";

import { CreateBannerInterface, UpdateBannerInterface } from "@/types/banner";

let url = "/banners";

const ServiceAPI = {
  getBannerWithStoreID: async (storeID: number) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        storeID: storeID,
      },
    });
  },
};

export default ServiceAPI;
