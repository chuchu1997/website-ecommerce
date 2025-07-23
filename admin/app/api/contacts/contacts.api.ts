/** @format */

import api from "../interceptor";
const url = "/contacts";

const ContactAPI = {
  getContactByID: async (id: number) => {
    return await api({
      method: "GET",
      url: `${url}/${id}`,
    });
  },
  getContactByQuery: async ({
    currentPage = 1,
    limit = 8,
    storeID = 1,
  }: {
    currentPage: number;
    limit: number;
    storeID: number;
  }) => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        storeID,
        currentPage,
        limit,
      },
    });
  },
};
export default ContactAPI;
