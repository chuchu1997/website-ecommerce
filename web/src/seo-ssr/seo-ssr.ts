/** @format */

import { SeoInterface } from "@/types/seo";
import { Metadata } from "next";

export const generateSeoForPage = (seo: SeoInterface): Metadata => {
  return {
    title: seo.title,
    description: seo.description,

    keywords: seo.keywords, // <-- dùng trực tiếp chuỗi từ khóa
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonicalUrl,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      type: "website",
    },
    alternates: {
      canonical: seo.canonicalUrl,
    },
  };
};

export const generateProductSchema = (product: {
  name: string;
  description: string;
  slug: string;
  sku?: string;
  brand?: string | null;
  price: number;
  currency?: string;
  imageUrls: string[];
  inStock?: boolean;
  priceValidUntil?: string; // YYYY-MM-DD
}): SeoInterface["schema"] => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.imageUrls,
    description: product.description,
    sku: product.sku ?? undefined,
    brand: {
      "@type": "Brand",
      name: product.brand || "Không xác định",
    },
    offers: {
      "@type": "Offer",
      url: `https://happyfurniture.vn/san-pham/${product.slug}`,
      priceCurrency: product.currency || "VND",
      price: product.price.toString(),
      priceValidUntil: product.priceValidUntil || "2025-12-31",
      availability:
        product.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
};
