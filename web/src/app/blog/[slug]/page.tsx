/** @format */

import EditorClientWrapper from "@/components/editor/editor-wrapper";
import TileComponent from "@/components/layouts/TileComponent";
import CircleLoading from "@/components/ui/circle-loading";
import { Metadata } from "next";
import { Suspense } from "react";
import { format } from "date-fns";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}
const baseUrl = "https://happyfurniture.logtech.vn";

// export async function generateMetadata(
//   props: BlogPageProps
// ): Promise<Metadata> {
//   const { params } = props;
//   const { slug } = await params;

//   const title = `${article.title} - Dịch Vụ Nội Thất | Happy Furniture`;
//   const description = `${article.title} từ Happy Furniture – chuyên nghiệp, tận tâm và chất lượng cao.`;

//   return {
//     title,
//     description,
//     metadataBase: new URL(baseUrl),
//     alternates: {
//       canonical: `${baseUrl}/blog/${slug}`,
//       languages: {
//         "vi-VN": `${baseUrl}/blog/${slug}`,
//       },
//     },
//     openGraph: {
//       type: "website",
//       locale: "vi_VN",
//       url: `${baseUrl}/blog/${slug}`,
//       siteName: "Happy Furniture",
//       title,
//       description,
//       images: [
//         {
//           url: article.imageUrl || `${baseUrl}/images/banner-service.jpg`,
//           width: 1200,
//           height: 630,
//           alt: `${article.title} - Dịch Vụ | Happy Furniture`,
//         },
//       ],
//     },
//     applicationName: "Happy Furniture",
//     keywords: [
//       article.title.toLowerCase(),
//       "dịch vụ nội thất",
//       "thiết kế nội thất",
//       "thi công nội thất",
//       "nội thất trọn gói",
//       "happy furniture",
//     ],
//     authors: [{ name: "Happy Furniture Team" }],
//     creator: "Happy Furniture",
//     publisher: "Happy Furniture Việt Nam",
//     formatDetection: {
//       telephone: true,
//       date: true,
//       address: true,
//       email: true,
//       url: true,
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//         "max-video-preview": -1,
//       },
//     },
//     category: "shopping",
//   };
// }

const BlogPageWithSlug = async (props: BlogPageProps) => {
  const { params } = props;
  const { slug } = await params;
  // const article = await getArticleWithSlug(slug);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<CircleLoading />}>
        <section className="list-products space-y-8 py-10">
          blog
          {/* Tiêu đề bài viết */}
          {/* <TileComponent title={`Bài viết: ${article.title}`} /> */}
          {/* Ngày viết */}
          {/* <p className="text-gray-600 text-sm sm:text-base">
            Được viết vào ngày: {format(article.createdAt, "dd/MM/yyyy HH:mm")}
          </p> */}
          {/* Nội dung bài viết */}
          {/* <div className="flex flex-col gap-6 md:flex-row md:gap-10  items-center justify-center">
            <EditorClientWrapper jsonString={article.content} />
          </div> */}
        </section>
      </Suspense>
    </div>
  );
};

export default BlogPageWithSlug;
