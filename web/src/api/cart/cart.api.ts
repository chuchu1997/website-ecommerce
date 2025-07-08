/** @format */

// import { CartItemSSR } from "@/app/(routes)/gio-hang/components/cart";

import { CartItemSSR } from "@/app/gio-hang/components/cart";
import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `/cart`;

export const UserCartAPI = {
  getAllCartItemsOfUser: async (userID: number, isSelect?: boolean) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        userId: userID,
        isSelect,
      },
    });
  },
  updateCartItems: async (
    userID: number,
    cartID: number,
    items: CartItemSSR[]
  ) => {
    return await api({
      method: "PATCH",
      url: `${url}/${cartID}`,
      data: {
        userId: userID,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          isSelect: item.isSelect ?? true,
        })),
      },
    });

    // CartItemSSR
  },

  //   getAllCategoriesOfStore: async ({
  //     justGetParent,
  //   }: {
  //     justGetParent: boolean;
  //   }) => {
  //     console.log("URL GET CATEGORIES", url);
  //     console.log("STORE BUILD", storeID);
  //     return await api({
  //       method: "GET",
  //       url: url,
  //       params: {
  //         justGetParent,
  //         storeID,

  //         //     justGetParent,
  //         //   process.env.STORE_ID
  //       },
  //     });
  //   },
};
