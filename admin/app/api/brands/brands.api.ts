/** @format */

import { CreateBrandInterface, UpdateBrandInterface } from "@/types/brand";
import api from "../interceptor";

let url = "/brands";

const BrandAPI = {
  getBrandWithStoreID: async (storeID: number) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        storeID: storeID,
      },
    });
  },
  createBrand: async (data: CreateBrandInterface) => {
    return await api({
      method: "POST",
      url: url,
      data: data,
    });
  },

  getBrandById: async (id: number) => {
    return await api({
      method: "GET",
      url: `${url}/${id}`,
    });
  },
  updateBrand: async (id: number, data: UpdateBrandInterface) => {
    return await api({
      method: "PATCH",
      url: `${url}/${id}`,
      data: data,
    });
  },
  deleteBrand: async (id: number) => {
    return await api({
      method: "DELETE",
      url: `${url}/${id}`,
    });
  },
};

export default BrandAPI;
