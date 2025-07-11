/** @format */

import api from "../interceptor";

import {
  CreateServiceInterface,
  UpdateServiceInterface,
} from "@/types/service";

// import { CreateBannerInterface, UpdateBannerInterface } from "@/types/banner";

let url = "/services";

const ServiceAPI = {
  getServicesRelateWithStoreID: async ({
    storeID,
    currentPage = 1,
    limit = 4,
  }: {
    storeID: number;
    currentPage?: number;
    limit?: number;
  }) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        currentPage,
        limit,
        storeId: storeID,
      },
    });
  },

  createService: async (data: CreateServiceInterface) => {
    return await api({
      method: "POST",
      url: url,
      data,
    });
  },
  updateService: async ({
    id,
    data,
  }: {
    id: number;
    data: UpdateServiceInterface;
  }) => {
    return await api({
      method: "PATCH",
      url: `${url}/${id}`,
      data,
    });
  },
  deleteServiceFromID: async (id: number) => {
    return await api({
      method: "DELETE",
      url: `${url}/${id}`,
    });
  },
};

export default ServiceAPI;
