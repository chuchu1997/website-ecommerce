/** @format */

import { Metadata } from "next";
import DuAnSlug from "./du-an-slug";

import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectInterface } from "@/types/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const res = await ProjectAPI.getProjectWithSlug({
      slug: resolvedParams.slug,
    });
    const project = res.data.project as ProjectInterface | null;

    if (project && typeof project.seo === "object") {
      return generateSeoForPage(project.seo);
    }

    return {
      title: project?.title ?? "Dự án ",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Tin tức không tồn tại",
      description: "Bài viết không tồn tại hoặc đã bị xoá.",
    };
  }
}

export default DuAnSlug;
