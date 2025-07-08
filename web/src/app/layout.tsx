/** @format */

import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { BodyContainer } from "@/components/BodyContainer";
import Footer from "@/components/layouts/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import CookiesClientWrapper from "@/provider/cookie-provider-wrapper";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: {
//     default:
//       "Nội Thất Đẹp - Nội Thất Gỗ Cao Cấp | Thiết Kế & Thi Công Trọn Gói",
//     template: "%s | Nội Thất Đẹp",
//   },
//   description:
//     "Chuyên cung cấp nội thất gỗ cao cấp: sofa, bàn ghế, tủ, giường, kệ TV... Thiết kế và thi công nội thất trọn gói cho căn hộ, nhà phố, biệt thự. Uy tín - chất lượng - giá tốt.",

//   metadataBase: new URL(baseUrl),
//   alternates: {
//     canonical: "/",
//     languages: {
//       "vi-VN": "/",
//     },
//   },

//   openGraph: {
//     type: "website",
//     locale: "vi_VN",
//     url: baseUrl,
//     siteName: "Nội Thất Đẹp",
//     title: "Nội Thất Đẹp - Nội Thất Gỗ Cao Cấp | Thiết Kế & Thi Công Trọn Gói",
//     description:
//       "Chuyên cung cấp nội thất gỗ cao cấp: sofa, bàn ăn, tủ bếp, giường ngủ... Dịch vụ thiết kế & thi công nội thất chuyên nghiệp. Cam kết uy tín, giá tốt, bảo hành dài hạn.",
//     images: [
//       // {
//       //   url: `${baseUrl}/og-image.jpg`,
//       //   width: 1200,
//       //   height: 630,
//       //   alt: "Nội Thất Gỗ Cao Cấp - Thiết Kế & Thi Công Nội Thất Trọn Gói",
//       // },
//     ],
//   },

//   applicationName: "Nội Thất Đẹp",
//   keywords: [
//     "nội thất",
//     "nội thất gỗ",
//     "thiết kế nội thất",
//     "thi công nội thất",
//     "sofa gỗ",
//     "bàn ăn",
//     "giường ngủ",
//     "tủ quần áo",
//     "nội thất căn hộ",
//     "nội thất nhà phố",
//     "nội thất biệt thự",
//   ],
//   authors: [{ name: "Nội Thất Đẹp" }],
//   creator: "Nội Thất Đẹp Team",
//   publisher: "Nội Thất Đẹp Co., Ltd",

//   formatDetection: {
//     telephone: true,
//     date: true,
//     address: true,
//     email: true,
//     url: true,
//   },

//   verification: {
//     google: "GOOGLE_VERIFICATION_CODE_HERE",
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },

//   category: "shopping",
// };
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative `}>
        {/* Bọc toàn bộ ứng dụng với CookiesProvider */}
        <CookiesClientWrapper>
          <CartProvider>
            <SidebarProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <div className="flex flex-col  w-full">
                <Navbar />
                <BodyContainer className="mt-[90px] sm:mt-[65px]">
                  {children}
                </BodyContainer>
                {/* <BlockSidebar />
                <MobileGroupButton /> */}

                <Footer />
              </div>
            </SidebarProvider>
          </CartProvider>
        </CookiesClientWrapper>
      </body>
    </html>
  );
}
