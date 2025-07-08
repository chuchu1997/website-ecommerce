/** @format */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { FormatUtils } from "@/utils/format";
import { CartItem } from "./cart-item";
import { ProductInterface } from "@/types/product";
import { UserCartAPI } from "@/api/cart/cart.api";
import { discountTypeEnum } from "@/types/promotion";
import { useCartContext } from "@/context/cart-context";

export type CartItemSSR = {
  id?: number;
  isSelect: boolean;
  product: ProductInterface;
  quantity: number;
};

const CartComponent = () => {
  const router = useRouter();
  const [isMouted, setIsMounted] = useState(true);
  const [totalBill, setTotalBill] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [cookies] = useCookies(["userInfo"]);
  const cartIDRef = useRef<number>(0);
  const [cartItems, setCartItems] = useState<CartItemSSR[]>([]);
  const { setCartQuantity, cartQuantity } = useCartContext();

  useEffect(() => {
    const user = cookies["userInfo"];
    if (user?.id) {
      fetchCart(user.id);
    }
  }, [cookies]);

  const fetchCart = async (userID: number) => {
    const res = await UserCartAPI.getAllCartItemsOfUser(userID);
    if (res.status === 200) {
      const resCart = res.data.cart;
      if (!resCart) return;

      cartIDRef.current = resCart.id;
      const mappedItems: CartItemSSR[] = resCart.items.map((item: any) => ({
        id: item.id,
        isSelect: item.isSelect,
        quantity: item.quantity,
        product: item.product,
      }));
      setCartItems(mappedItems);
      setCartQuantity(mappedItems.length); // cập nhật lên context
    }
  };

  // Cập nhật ref mỗi khi cartItems thay đổi
  useEffect(() => {
    if (!cartItems.length) {
      setTotalBill(0);
      setTotalQuantity(0);
      return;
    }

    let totalQuantity = 0;
    let totalBill = 0;
    cartItems.forEach((item) => {
      if (item.isSelect) {
        totalQuantity += item.quantity;
        const price = item.product.price;

        const promotion = item.product.promotionProducts?.[0];

        let finalPrice = item.product.price;
        if (promotion) {
          const { discountType, discount } = promotion;

          if (discountType === discountTypeEnum.PERCENT) {
            finalPrice = price - (price * discount) / 100;
          } else if (discountType === "FIXED") {
            finalPrice = price - discount;
          }

          // Đảm bảo không có giá âm
          finalPrice = Math.max(finalPrice, 0);
        }
        totalBill += item.quantity * finalPrice;
      }
    });

    setTotalQuantity(totalQuantity);
    setTotalBill(totalBill);
  }, [cartItems]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpdateQuantity = (productId: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    debouncedUpdateRef.current(updatedItems); // Truyền trực tiếp
  };

  function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): T {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    } as T;
  }

  const onUpdateCart = async (itemsToUpdate: CartItemSSR[]) => {
    const user = cookies["userInfo"];
    await UserCartAPI.updateCartItems(
      user.id,
      cartIDRef.current,
      itemsToUpdate
    );
  };

  const debouncedUpdateRef = useRef(
    debounce((items: CartItemSSR[]) => {
      onUpdateCart(items);
    }, 300)
  );

  const toggleSelectItem = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, isSelect: !item.isSelect } : item
    );
    setCartItems(updatedItems);
    debouncedUpdateRef.current(updatedItems); // Truyền trực tiếp
  };

  const onCheckout = async () => {
    router.push(`/checkout`);
  };

  if (!isMouted) return null;

  return (
    <>
      <div className="flex items-center justify-center md:justify-start mb-8">
        <ShoppingBag className="mr-2 text-accent" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
          Giỏ Hàng <span className="text-accent">({cartItems.length})</span>
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">
            Giỏ hàng của bạn đang trống
          </h2>
          <Button className="text-accent" onClick={() => router.push("/")}>
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start bg-white shadow-sm hover:shadow-md rounded-xl p-4 gap-4 border border-gray-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={item.isSelect}
                    onCheckedChange={() => toggleSelectItem(item.id ?? 0)}
                  />
                </div>
                <div className="flex-grow">
                  <CartItem
                    quantity={item.quantity}
                    product={item.product}
                    onUpdateQuantity={onUpdateQuantity}
                    onDeleteCartItem={(productID) => {
                      const updatedItems = cartItems.filter(
                        (item) => item.product.id !== productID
                      );

                      setCartItems(updatedItems);
                      setCartQuantity(updatedItems.length);
                      debouncedUpdateRef.current(updatedItems); // Truyền trực tiếp
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tổng đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-100">
                Tổng Thanh Toán
              </h2>

              <div className="space-y-3 mb-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({totalQuantity} sản phẩm):</span>
                  <span>{FormatUtils.formatPriceVND(totalBill)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">
                    {totalBill > 0 ? "Miễn phí" : "0₫"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-accent">
                    {FormatUtils.formatPriceVND(totalBill)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Đã bao gồm VAT (nếu có)
                </p>
              </div>

              <Button
                className="w-full py-6 text-lg text-accent transition-all duration-300 rounded-lg disabled:opacity-50"
                disabled={totalQuantity === 0}
                onClick={onCheckout}>
                Tiến hành thanh toán ({totalQuantity})
              </Button>

              <div className="mt-4 text-center">
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => router.push("/")}>
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;
