/** @format */

"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product/product-card";
import { ProductInterface } from "@/types/product";
import { useEffect, useState } from "react";

export function ProductListMotionWrapper({
  products,
}: {
  products: ProductInterface[];
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className="columns-2 sm:columns-2 lg:columns-4 gap-1 md:gap-4 space-y-4  ">
      {products.map((product) => {
        const endDate = product.promotionProducts[0]?.promotion?.endDate;
        const isExpired = endDate
          ? new Date(endDate).getTime() < Date.now()
          : false;

        const promotion =
          product.promotionProducts &&
          !isExpired &&
          product.promotionProducts.length > 0
            ? product.promotionProducts[0].promotion
            : undefined;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <ProductCard product={product} promotion={promotion} />
          </motion.div>
        );
      })}
    </div>
  );
}
