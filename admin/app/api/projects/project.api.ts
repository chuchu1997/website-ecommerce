/** @format */

import { m } from "framer-motion";
import api from "../interceptor";
import {
  CreateProjectInterface,
  UpdateProjectInterface,
} from "@/types/project";

// import { CreateBannerInterface, UpdateBannerInterface } from "@/types/banner";

let url = "/projects";

const ProjectAPI = {
  getProjectsRelateWithStoreID: async ({ storeID }: { storeID: number }) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        storeId: storeID,
      },
    });
  },

  createProject: async (data: CreateProjectInterface) => {
    console.log("DATA", data);
    return await api({
      method: "POST",
      url: url,
      data,
    });
  },
  updateProject: async ({
    id,
    data,
  }: {
    id: number;
    data: UpdateProjectInterface;
  }) => {
    return await api({
      method: "PATCH",
      url: `${url}/${id}`,
      data,
    });
  },
  deleteProjectFromID: async (id: number) => {
    return await api({
      method: "DELETE",
      url: `${url}/${id}`,
    });
  },
};

export default ProjectAPI;
