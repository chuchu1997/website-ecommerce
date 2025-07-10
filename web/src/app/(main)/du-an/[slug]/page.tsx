/** @format */

import { Metadata } from "next";
import TintucSlug from "./du-an-slug";
import { NewsAPI } from "@/api/news/news.api";
import { NewsInterface } from "@/types/news";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const res = await NewsAPI.getNewsWithSlug({ slug: resolvedParams.slug });
    const news = res.data.article as NewsInterface | null;

    if (news && typeof news.seo === "object") {
      return generateSeoForPage(news.seo);
    }

    return {
      title: news?.title ?? "Tin tức",
      description: news?.shortDescription ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Tin tức không tồn tại",
      description: "Bài viết không tồn tại hoặc đã bị xoá.",
    };
  }
}

export default TintucSlug;
