/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ImageInterface, ProductInterface } from "@/types/product";

import { useState } from "react";
import { ProductClient } from "./components/productClient";

interface SanPhamPageWithProps {
  params: Promise<{ slug: string }>;
}

const SanPhamPageWithSlug = async (props: SanPhamPageWithProps) => {
  const { params } = props;
  const { slug } = await params;

  let product: ProductInterface | null = null;

  const response = await ProductAPI.getProductBySlug(slug);
  if (response.status === 200) {
    product = response.data.product as ProductInterface;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Sản phẩm không tồn tại
          </h2>
          <p className="text-gray-500">Vui lòng kiểm tra lại đường dẫn</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <ProductClient product={product} />

      {/* Mobile Header */}
    </div>
  );
};

// Mobile Header Component

// Utility Functions

export default SanPhamPageWithSlug;
