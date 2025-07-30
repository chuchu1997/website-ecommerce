/** @format */

import { Geist, Geist_Mono, Inter, Noto_Sans, Roboto } from "next/font/google";

import "./globals.css";
import CookiesClientWrapper from "@/provider/cookie-provider-wrapper";
import { CartProvider } from "@/context/cart-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layouts/Footer";
import { ZaloPhoneWidget } from "@/common/ZaloPhoneFloating";
import { Metadata } from "next";
import { StoreAPI } from "@/api/stores/store.api";
import { StoreInterface } from "@/types/store";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { SeoInterface } from "@/types/seo";
import { BodyContainer } from "@/components/BodyContainer";
import { LoadingProvider } from "@/context/loading-context";
import { LoadingOverlay } from "@/components/loading-overlay";
import NavbarClient3 from "@/components/ui/Navbar/components/NavbarVer3";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import Navbar from "@/components/ui/Navbar/components/NavbarClientVer2";
import NavbarComponent from "@/components/ui/Navbar";

export const revalidate = 300; // 1 hour
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const store = (await StoreAPI.getStoreInfo()).data.store as StoreInterface;

  if (!store) return {};

  if (store.seo && typeof store.seo === "object") {
    return generateSeoForPage(store.seo as SeoInterface);
  }

  return {};
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeInfo: StoreInterface = (await StoreAPI.getStoreInfo()).data.store;
  const { data } = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
    currentPage: 1,
    limit: 9999,
  });
  const categories: CategoryInterface[] = data.categories;
  console.log(
    "🔥 Fetch categories at:",
    new Date().toLocaleTimeString("vi-VN", { hour12: false })
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} ${notoSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative min-h-screen`}>
        <LoadingProvider>
          <LoadingOverlay />
          <CookiesClientWrapper>
            <CartProvider>
              <NavbarComponent storeInfo={storeInfo} categories={categories} />
              <SidebarProvider>
                <Toaster position="top-center" reverseOrder={false} />

                <BodyContainer className="mt-0 sm:mt-[100px]">
                  {children}
                </BodyContainer>
              </SidebarProvider>

              <ZaloPhoneWidget />
            </CartProvider>
            <Footer />
          </CookiesClientWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
