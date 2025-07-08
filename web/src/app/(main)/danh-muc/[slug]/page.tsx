import { Metadata } from "next";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { SeoInterface } from "@/types/seo";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import DanhMucPage from "./danhmuc-slug";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params first
  const resolvedParams = await params;
  
  const res = await CategoryAPI.getCategoryWithSlug(resolvedParams.slug, 1, 1);
  const category = res.data;
   

if(category.seo && typeof category.seo ==="object"){
  return generateSeoForPage(category.seo)
}

  return {
    title: `${category.name} | Guitar Sài Thành`,
    description: category.description ?? "",
  };
}
export default DanhMucPage;