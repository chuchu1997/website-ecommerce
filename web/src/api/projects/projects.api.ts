/** @format */

import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;

const url = `/projects`;

export const ProjectAPI = {
  getProjectWithSlug: ({ slug }: { slug: string }) => {
    return api({
      method: "GET",
      url: `${url}/${slug}`,
    });
  },

  getProjects: ({
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
