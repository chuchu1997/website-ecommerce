/** @format */

import { Metadata } from "next";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { SeoInterface } from "@/types/seo";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import DanhMucPage from "./danh-muc-client";
import { fetchSafe } from "@/utils/fetchSafe";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params first
  const resolvedParams = await params;

  const data = await fetchSafe(
    () => CategoryAPI.getCategoryWithSlug(resolvedParams.slug, 1, 1),
    { category: null } // Fallback trả về đầy đủ key
  );

  const category = data.category;

  if (
    category.seo &&
    category.seo.title != "" &&
    typeof category.seo === "object"
  ) {
    return generateSeoForPage(category.seo);
  }

  return {
    title: `${category.name} | ${process.env.STORE_NAME}`,
    description: category.description ?? "",
  };
}
export default DanhMucPage;
