/** @format */

import { Metadata } from "next";
import { SeoInterface } from "@/types/seo";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";

import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";
import { ProductClient } from "./ProductWithSlugClient";
import { fetchSafe } from "@/utils/fetchSafe";

export const revalidate = 120; // 5 phút

const getCachedProductWithSlug = async (
  slug: string
): Promise<ProductInterface | undefined> => {
  const res = await fetchSafe(() => ProductAPI.getProductBySlug(slug), {
    product: undefined,
  });

  const vnTime = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });

  console.log(`🕒 [PRODUCT SAN PHAM] GỌI API lúc: ${vnTime}`);
  return res?.product ?? undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getCachedProductWithSlug(resolvedParams.slug);

  if (product?.seo && product.seo.title && typeof product.seo === "object") {
    return generateSeoForPage(product.seo as SeoInterface);
  }

  return {
    title: `Sản phẩm | ${process.env.STORE_NAME}`,
    description: product?.shortDescription || "Chi tiết sản phẩm",
  };
}

const ProductWithSlugSSR = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const product = await getCachedProductWithSlug(resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Sản phẩm không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto">
      <ProductClient product={product} />
    </div>
  );
};

export default ProductWithSlugSSR;
