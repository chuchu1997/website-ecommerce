/** @format */

import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { ProductInterface } from "@/types/product";
import { useCartContext } from "@/context/cart-context";
import { UserCartAPI } from "@/api/cart/cart.api";
import { CartItemSSR } from "@/app/(main)/gio-hang/components/cart";

export function useAddToCart() {
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const { setCartQuantity } = useCartContext();
  const router = useRouter();

  const addToCart = async ({
    product,
    isCheckout,
  }: {
    product: ProductInterface;
    isCheckout: boolean;
  }) => {
    try {
      let userID = cookies.userInfo?.id ?? 0;
      const res = await UserCartAPI.getAllCartItemsOfUser(userID);
      if (userID === 0) {
        setCookie(
          "userInfo",
          { id: res.data.cart.userId },
          {
            path: "/",
            maxAge: 60 * 60 * 24 * 365 * 5,
            sameSite: "lax",
          }
        );
      }

      userID = res.data.cart.userId;
      const currentItems = Array.isArray(res.data?.cart?.items)
        ? res.data.cart.items
        : [];

      const existingIndex = currentItems.findIndex(
        (item: any) => item.product.id === product.id
      );

      let updatedItems: CartItemSSR[] = [];

      if (existingIndex !== -1) {
        updatedItems = currentItems.map((item: any, index: number) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                isSelect: true,
              }
            : {
                ...item,
                isSelect: false,
              }
        );
      } else {
        updatedItems = [
          ...currentItems.map((item: any) => ({
            ...item,
            isSelect: false,
          })),
          {
            isSelect: true,
            product,
            quantity: 1,
          },
        ];
      }

      await UserCartAPI.updateCartItems(userID, res.data.cart.id, updatedItems);

      setCartQuantity(updatedItems.length);
      toast.success("Đã thêm sản phẩm vào giỏ hàng");

      if (isCheckout) {
        router.push("/checkout");
      }
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
    }
  };

  return { addToCart };
}
