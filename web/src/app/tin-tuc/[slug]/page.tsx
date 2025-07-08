/** @format */

import { Metadata } from "next";
import TintucSlug from "./tin-tuc-slug";
import { NewsAPI } from "@/api/news/news.api";
import { NewsInterface } from "@/types/news";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params first
  const resolvedParams = await params;

  const res = await NewsAPI.getNewsWithSlug({ slug: resolvedParams.slug });
  const news = res.data.article as NewsInterface;
  if (news.seo && typeof news.seo === "object") {
    return generateSeoForPage(news.seo);
  }
  return {
    title: "Tin tức",
    description: "",
  };
}

export default TintucSlug;
