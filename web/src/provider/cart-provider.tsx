




"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  
  type CartContextType = {
    productCart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
  };
const CartContext = createContext<CartContextType | undefined>(undefined);

export const  CartProvider = ({children}:{children:ReactNode})=>{

    const [isMounted , setIsMounted]  = useState(false);

    const [productCart, setProductCart] = useState<CartItem[]>([]);
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setProductCart(JSON.parse(storedCart));
        }
      }, []);
    
      // ✅ Save cart to localStorage whenever it changes
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(productCart));
      }, [productCart]);
    
    useEffect(()=>{
        setIsMounted(true)
    },[])
    const addToCart = (item: CartItem) => {
        setProductCart((prev) => {
          const found = prev.find((i) => i.id === item.id);
          if (found) {
            return prev.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            );
          }
          return [...prev, item];
        });
      };
    
      const removeFromCart = (id: string) => {
        setProductCart((prev) => prev.filter((item) => item.id !== id));
      };
      const updateQuantity = (id: string, quantity: number) => {
        setProductCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
          );
      };    

      const clearCart = () => setProductCart([]);

      if(!isMounted) return null;
      return (
        <CartContext.Provider
          value={{ productCart, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
          {children}
        </CartContext.Provider>
      );
  
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
  };
  