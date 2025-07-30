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
import NavbarComponent from "@/components/ui/Navbar";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";

export const revalidate = 300; // cache fallback 5 phút

// Fetch storeInfo có check SKIP_BUILD_STATIC_GENERATION
const getStoreInfo = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    console.log("⚠️ Skip fetch API trong lúc build (storeInfo)");
    return { industry: "" } as StoreInterface;
  }

  return (await StoreAPI.getStoreInfo()).data.store as StoreInterface;
};

// Fetch categories có check SKIP_BUILD_STATIC_GENERATION
const getCategories = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    console.log("⚠️ Skip fetch API trong lúc build (categories)");
    return [] as CategoryInterface[];
  }

  const { data } = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
    currentPage: 1,
    limit: 9999,
  });
  return data.categories as CategoryInterface[];
};

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreInfo();

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
  const storeInfo = await getStoreInfo();
  const categories = await getCategories();

  console.log(
    "🔥 Fetch storeInfo & categories (TTL 300s) at:",
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
            <Footer storeInfo={storeInfo} />
          </CookiesClientWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}

// Fonts setup
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
