import type { Metadata } from "next";





const baseUrl = "https://happyfurniture.logtech.vn";

export const metadata: Metadata = {
  title: {
    default: "Tin Tức Nội Thất - Xu Hướng Thiết Kế & Mẹo Trang Trí | Happy Furniture",
    template: "%s | Happy Furniture",
  },
  description:
    "Khám phá tin tức mới nhất về nội thất, xu hướng thiết kế nhà ở, mẹo trang trí không gian sống và phong cách sống hiện đại từ Happy Furniture.",

  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/news",
    languages: {
      "vi-VN": "/news",
    },
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${baseUrl}/blog`,
    siteName: "Happy Furniture",
    title: "Tin Tức Nội Thất - Xu Hướng Thiết Kế & Mẹo Trang Trí | Happy Furniture",
    description:
      "Cập nhật những bài viết mới nhất về nội thất, thiết kế không gian, lựa chọn sản phẩm và phong cách sống hiện đại. Được biên soạn bởi đội ngũ chuyên gia từ Happy Furniture.",
    images: [
    //   {
    //     url: `${baseUrl}/images/banner-news.jpg`,
    //     width: 1200,
    //     height: 630,
    //     alt: "Tin Tức Nội Thất - Happy Furniture",
    //   },
    ],
  },

  applicationName: "Happy Furniture",
  keywords: [
    "tin tức nội thất",
    "thiết kế nội thất",
    "xu hướng nội thất",
    "mẹo trang trí nhà",
    "nội thất hiện đại",
    "trang trí phòng khách",
    "phong cách Scandinavian",
    "gợi ý bài trí nhà cửa",
    "màu sắc trong thiết kế",
    "tin tức happy furniture",
  ],
  authors: [{ name: "Happy Furniture Team" }],
  creator: "Happy Furniture",
  publisher: "Happy Furniture Việt Nam",

  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE_HERE", // thay bằng mã Google Search Console nếu có
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "blog",
};


const TinTucPage = ()=>{
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">Tin tức</h1>
            <p className="text-lg">Đây là trang tin tức.</p>
        </div>
    )
}


export default TinTucPage