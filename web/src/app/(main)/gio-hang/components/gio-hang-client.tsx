/** @format */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartComponent from "./cart";
import OrderHistory from "./order-history";
// import OrderHistory from "./order-history";

const GioHangClient = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <Tabs defaultValue="cart" className="w-full">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center md:justify-start">
            <TabsList className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm px-2 py-1">
              <TabsTrigger
                value="cart"
                className="data-[state=active]:bg-accent/10 data-[state=active]:text-accent px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Giỏ hàng
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-accent/10 data-[state=active]:text-accent px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Đơn hàng đã đặt
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Nội dung Tab */}
          <div>
            <TabsContent value="cart">
              {/* Cart content ở đây (toàn bộ phần giỏ hàng của bạn) */}
              <div className="animate-fade-in-up">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-fade-in-up">
                  <CartComponent />
                </div>
                {/* COPY PHẦN GIỎ HÀNG Ở ĐÂY */}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="rounded-lg p-6  animate-fade-in-up">
                <OrderHistory />
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default GioHangClient;
