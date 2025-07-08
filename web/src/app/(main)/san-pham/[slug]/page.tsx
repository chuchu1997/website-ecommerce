/** @format */

import { Metadata } from "next";

import { SeoInterface } from "@/types/seo";
import { generateProductSchema, generateSeoForPage } from "@/seo-ssr/seo-ssr";
import SanPhamPageWithSlug from "./san-pham-slug";
import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params first
  const resolvedParams = await params;

  const res = await ProductAPI.getProductBySlug(resolvedParams.slug);
  const product = res.data.product as ProductInterface;

  if (product.seo && typeof product.seo === "object") {
    return generateSeoForPage(product.seo as SeoInterface);
  }

  return {
    title: "Sản phẩm",
    description: "",
  };
}

export default SanPhamPageWithSlug;
