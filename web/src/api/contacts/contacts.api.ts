/** @format */

import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;

const url = `/contacts`;

export const ContactAPI = {
  sendContact: async ({
    name,
    email,
    phone,
    subject,
    content,
  }: {
    name: string;
    email: string;
    phone: string;
    content: string;
    subject: string;
  }) => {
    return await api({
      method: "POST",
      url: url,
      data: {
        storeId: storeID,
        name,
        email,
        phone,
        subject,
        content,
      },
    });
  },
};
