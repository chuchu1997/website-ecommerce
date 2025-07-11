/** @format */

import { Metadata } from "next";
import DuAnSlug from "./du-an-slug";

import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectInterface } from "@/types/project";
import { ServiceAPI } from "@/api/services/services.api";
import { ServiceInterface } from "@/types/service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const res = await ServiceAPI.getServiceWithSlug({
      slug: resolvedParams.slug,
    });
    const service = res.data.service as ServiceInterface | null;

    if (service && typeof service.seo === "object") {
      return generateSeoForPage(service.seo);
    }

    return {
      title: service?.title ?? "Dịch vụ  ",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Dịch vụ không tồn tại",
      description: "Bài viết không tồn tại hoặc đã bị xoá.",
    };
  }
}

export default DuAnSlug;
