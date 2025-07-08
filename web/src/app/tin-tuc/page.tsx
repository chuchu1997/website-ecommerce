import { StoreAPI } from "@/api/stores/store.api";
import NewsPage from "./tin-tuc-page";


/** @format */

import { Metadata } from "next";
import { StoreInterface } from "@/types/store";

export async function generateMetadata(
 
): Promise<Metadata> {


  const res = await StoreAPI.getStoreInfo();
  const store = res.data.store as StoreInterface;
  const storeName = store ? store.name :"Tên cửa hàng";
  const website_domain = process.env.NEXT_PUBLIC_BASE_URL || ""
    return {
    title: ` ${storeName} | Tin tức nhạc cụ, guitar mới nhất `,
    description: `${storeName} cập nhật nhanh các tin tức, xu hướng mới nhất về nhạc cụ, đặc biệt là guitar, phụ kiện và các sự kiện âm nhạc.`,
    keywords: [
      "tin tức guitar",
      "tin tức nhạc cụ",
      "guitar sài thành",
      "cửa hàng guitar",
      "phụ kiện guitar",
      "tin tức âm nhạc",
      "guitar mới",
    ],
    openGraph: {
      title: `Tin tức nhạc cụ & guitar mới nhất | ${storeName}`,
      description:
        "Theo dõi các xu hướng, mẹo vặt, đánh giá và sự kiện về guitar & nhạc cụ tại Guitar Sài Thành.",
      type: "website",
      url: `${website_domain}/tin-tuc`,
      siteName: storeName,
    },
    twitter: {
      card: "summary_large_image",
      title: `Tin tức về guitar & nhạc cụ mới nhất | ${storeName}`,
      description:
        "Tổng hợp thông tin hữu ích về guitar, phụ kiện, xu hướng và các dòng sản phẩm mới.",
    },
    alternates: {
      canonical: `${website_domain}/tin-tuc`,
    },
  };

}

export default NewsPage;
