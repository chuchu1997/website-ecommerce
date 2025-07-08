// context/cart-context.tsx
"use client";

import { UserCartAPI } from "@/api/cart/cart.api";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface CartContextProps {
  cartQuantity: number;
  setCartQuantity: (qty: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
     const [cookies] = useCookies(["userInfo"]);
  useEffect(() => {
    const user = cookies["userInfo"];
    if (!user?.id) return;

    const fetchCart = async () => {
      try {
        const res = await UserCartAPI.getAllCartItemsOfUser(user.id);
        if (res.status === 200) {
          const items = res.data.cart?.items ?? [];
          const total = items.reduce(
            (acc: number, item: any) =>
              item.isSelect ? acc + item.quantity : acc,
            0
          );
          setCartQuantity(total);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [cookies]);
  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};
