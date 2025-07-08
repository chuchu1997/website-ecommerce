import type { Metadata } from "next";

import TileComponent from "@/components/layouts/TileComponent";
// import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";

// const baseUrl = "https://happyfurniture.logtech.vn";

// export async function generateMetadata(): Promise<Metadata> {
//   const category = await getCategoryWithSlug("danh-muc");

//   if (!category) {
//     return {
//       title: "Danh Mục Không Tồn Tại | Happy Furniture",
//       description: "Danh mục sản phẩm không tồn tại hoặc đã bị xoá.",
//     };
//   }

//   return {
//     title: `${category.name} - Nội Thất Cao Cấp & Hiện Đại | Happy Furniture`,
//     description:
//       category.name ||
//       `Khám phá các sản phẩm thuộc danh mục ${category.name} với thiết kế hiện đại, chất lượng cao, phù hợp với mọi không gian sống.`,
//     metadataBase: new URL(baseUrl),
//     alternates: {
//       canonical: `/danh-muc`,
//       languages: {
//         "vi-VN": `/danh-muc`,
//       },
//     },
//     openGraph: {
//       type: "website",
//       locale: "vi_VN",
//       url: `${baseUrl}/danh-muc`,
//       siteName: "Happy Furniture",
//       title: `${category.name} - Nội Thất Cao Cấp & Hiện Đại | Happy Furniture`,
//       description:
//         category.name ||
//         `Tìm kiếm sản phẩm nội thất theo danh mục ${category.name}. Chất lượng hàng đầu, thiết kế đa dạng.`,
//       images: [
//         {
//           url: category.billboard?.imageUrl || `${baseUrl}/images/banner-category.jpg`,
//           width: 1200,
//           height: 630,
//           alt: `${category.name} - Happy Furniture`,
//         },
//       ],
//     },
//     applicationName: "Happy Furniture",
//     keywords: [
//       category.name,
//       "danh mục nội thất",
//       "nội thất cao cấp",
//       "nội thất phòng khách",
//       "sofa đẹp",
//       "giường ngủ hiện đại",
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

const DanhMucPage = async () => {

  return (
    <div className="container mx-auto">
      {/* <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục: ${category.name}`}
          />
          <ProductList title={category.name} products={products} />
        </section>
      </Suspense> */}
    </div>
  );
};

export default DanhMucPage;