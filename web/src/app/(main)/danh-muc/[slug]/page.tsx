import { CategoryAPI } from "@/api/categories/category.api";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import { Metadata } from "next";
import DanhMucPageClient from "./DanhmucClient";

const getCachedCategoryWithSlug = async (
  slug: string
): Promise<CategoryInterface | undefined> => {
  const res = await fetchSafe(() => CategoryAPI.getCategoryWithSlug(slug, 1, 1), {
    category: undefined,
  });

  return res ?? undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCachedCategoryWithSlug(resolvedParams.slug);


  if (category?.seo && category.seo.title !== "" && typeof category.seo === "object") {
    return generateSeoForPage(category.seo);
  }

  return {
    title: category?.name
      ? `${category.name} | ${process.env.STORE_NAME}`
      : `Danh mục | ${process.env.STORE_NAME}`,
    description: category?.description ?? "",
  };
}

const DanhMucPageSSR = async  (
    {params}:{
        params:Promise<{slug:string}>
    }
)  => {
    const resolvedParams = await params;
    const category:CategoryInterface = await getCachedCategoryWithSlug(resolvedParams.slug) as CategoryInterface ?? undefined;
  
  return <div className="min-h-screen container mx-auto pt-[60px]">
    <DanhMucPageClient categoryProps={category}/>
  </div>;
};
export default DanhMucPageSSR;
