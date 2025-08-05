import { StoreAPI } from "@/api/stores/store.api";


import { Metadata } from "next";
import { StoreInterface } from "@/types/store";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectInterface } from "@/types/project";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import { CategoryAPI } from "@/api/categories/category.api";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import DichVuPageClient from "./DichVuClient";



const getCachedCategoryWithSlug = async (
  slug: string
): Promise<CategoryInterface | undefined> => {
  const res = await fetchSafe(() => CategoryAPI.getCategoryWithSlug(slug, 1, 1), {
    category: undefined,
  });
  return res ?? undefined;
};

export async function generateMetadata(): Promise<Metadata> {

  const category = await getCachedCategoryWithSlug("dich-vu");


  if (category?.seo && category.seo.title !== "" && typeof category.seo === "object") {
    return generateSeoForPage(category.seo);
  }

  return {
    title: category?.name
      ? `${category.name} | ${process.env.STORE_NAME}`
      : `Dịch vụ | ${process.env.STORE_NAME}`,
    description: category?.description ?? "",
  };
}

const DichVuPageSSR = async () =>{
  return <div className = "container mx-auto">
    <DichVuPageClient/>
  </div>
}
export default DichVuPageSSR;
