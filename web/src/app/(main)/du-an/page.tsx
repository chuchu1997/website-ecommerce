import { StoreAPI } from "@/api/stores/store.api";
import ProjectPageClient from "./DuAnClient";

import { Metadata } from "next";
import { StoreInterface } from "@/types/store";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectInterface } from "@/types/project";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import { CategoryAPI } from "@/api/categories/category.api";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";



const getCachedCategoryWithSlug = async (
  slug: string
): Promise<CategoryInterface | undefined> => {
  const res = await fetchSafe(() => CategoryAPI.getCategoryWithSlug(slug, 1, 1), {
    category: undefined,
  });
  return res ?? undefined;
};

export async function generateMetadata(): Promise<Metadata> {

  const category = await getCachedCategoryWithSlug("du-an");


  if (category?.seo && category.seo.title !== "" && typeof category.seo === "object") {
    return generateSeoForPage(category.seo);
  }

  return {
    title: category?.name
      ? `${category.name} | ${process.env.STORE_NAME}`
      : `Dự án | ${process.env.STORE_NAME}`,
    description: category?.description ?? "",
  };
}

const DuAnPageSSR = async () =>{
  return <div className = "container mx-auto">
    <ProjectPageClient/>
  </div>
}
export default DuAnPageSSR;
