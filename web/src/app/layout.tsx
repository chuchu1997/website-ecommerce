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
import { fetchSafe } from "@/utils/fetchSafe";
import { unstable_cache } from "next/cache";

/**
 * Cache categories 5 phút, có thể invalidate bằng tag
 */
const getCachedCategories = unstable_cache(
  async (): Promise<CategoryInterface[]> => {
    const now = new Date();
    // Format giờ theo VN
    const vnTime = now.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });

    console.log(`🕒 [Categories] GỌI API lúc: ${vnTime}`);

    const res = await fetchSafe(
      () =>
        CategoryAPI.getAllCategoriesOfStore({
          currentPage: 1,
          limit: 999,
          justGetParent: false,
        }),
      { categories: [] }
    );

    return res?.categories ?? [];
  },
  ["categories-cache"],
  { revalidate: 100, tags: ["categories-v1"] } // TTL 5 phút
);

/**
 * Cache store info 5 phút
 */
const getCacheStoreInfoSSR = unstable_cache(
  async (): Promise<StoreInterface> => {
    const res = await fetchSafe(() => StoreAPI.getStoreInfo(), {
      store: { industry: "Xây dựng" },
    });

    return res.store ?? { industry: "Xây dựng" };
  },
  ["store-info-cache"],
  { revalidate: 100, tags: ["store-info-v1"] }
);

export async function generateMetadata(): Promise<Metadata> {
  const store = await getCacheStoreInfoSSR();

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
  const [storeInfo, categories] = await Promise.all([
    getCacheStoreInfoSSR(),
    getCachedCategories(),
  ]);

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
