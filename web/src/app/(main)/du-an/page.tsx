import { StoreAPI } from "@/api/stores/store.api";
import ProjectPage from "./du-an-page";

import { Metadata } from "next";
import { StoreInterface } from "@/types/store";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectInterface } from "@/types/project";

export async function generateMetadata(): Promise<Metadata> {
  const website_domain = process.env.NEXT_PUBLIC_BASE_URL || "";
  let storeName = "Tên cửa hàng";

  // Metadata mặc định
  let metadata: Metadata = {
    title: `${storeName} | Dự án thiết kế & thi công nội thất`,
    description: `${storeName} chuyên cung cấp thông tin các dự án thiết kế, thi công nội thất hiện đại, đẹp và tối ưu không gian sống.`,
    keywords: [
      "dự án nội thất",
      "thiết kế nội thất",
      "nội thất phòng khách",
      "thi công nội thất",
      "nội thất hiện đại",
      "trang trí nhà cửa",
      "nội thất đẹp",
    ],
    openGraph: {
      title: `Dự án nội thất mới nhất | ${storeName}`,
      description:
        "Khám phá các dự án thiết kế và thi công nội thất thực tế từ cửa hàng của chúng tôi.",
      type: "website",
      url: `${website_domain}/du-an`,
      siteName: storeName,
    },
    twitter: {
      card: "summary_large_image",
      title: `Dự án thiết kế nội thất | ${storeName}`,
      description:
        "Tổng hợp các dự án nổi bật về thiết kế thi công nội thất, xu hướng và phong cách mới nhất.",
    },
    alternates: {
      canonical: `${website_domain}/du-an`,
    },
  };

  // ✅ Skip gọi API lúc build để tránh ENOTFOUND
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    console.log("⚠️ Skip fetch API trong lúc build (du-an/metadata)");
    return metadata;
  }

  try {
    // Lấy thông tin store
    const res = await StoreAPI.getStoreInfo();
    const store = res?.data?.store as StoreInterface | undefined;
    if (store?.name) {
      storeName = store.name;
    }

    // Update metadata với storeName
    metadata.title = `${storeName} | Dự án thiết kế & thi công nội thất`;
    metadata.openGraph = {
      ...metadata.openGraph,
      siteName: storeName,
      title: `Dự án nội thất mới nhất | ${storeName}`,
    };
    metadata.twitter = {
      ...metadata.twitter,
      title: `Dự án thiết kế nội thất | ${storeName}`,
    };

    // Lấy project theo slug
    const resProject = await ProjectAPI.getProjectWithSlug({ slug: "du-an" });
    const project: ProjectInterface | undefined = resProject?.data?.project;

    if (project?.seo) {
      metadata.title = project.seo.title || metadata.title;
      metadata.description = project.seo.description || metadata.description;

      if (project.seo.keywords) {
        metadata.keywords = project.seo.keywords;
      }

      metadata.openGraph = {
        ...metadata.openGraph,
        title: project.seo.title || metadata.openGraph?.title,
        description: project.seo.description || metadata.openGraph?.description,
        url: `${website_domain}/du-an`,
      };

      metadata.twitter = {
        ...metadata.twitter,
        title: project.seo.title || metadata.twitter?.title,
        description: project.seo.description || metadata.twitter?.description,
      };

      metadata.alternates = {
        canonical: project.seo.canonicalUrl || `${website_domain}/du-an`,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return metadata;
}

export default ProjectPage;
