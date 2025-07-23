/** @format */

"use client";
import { useEffect, useState } from "react";

import { ProductInterface } from "@/types/product";

import React from "react";

import ProductMobile from "./productClientMobile";
import { ProductClientPC } from "./productClientPC";
interface propsClient {
  product: ProductInterface;
}
export const ProductClient = ({ product }: propsClient) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  if (!isMount) return null;
  return (
    <div className="container mx-auto ">
      {/* <ProductClientPC product={product} /> */}
      {/* <ProductClientPC product={product} /> */}

      {isMobile ? (
        <ProductMobile product={product} />
      ) : (
        <ProductClientPC product={product} />
      )}
    </div>
  );
};
