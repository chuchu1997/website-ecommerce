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
import { cache } from "react"; // <- quan trọng

/**
 * Cache categories 5 phút, coalesce với cache()
 */

export const revalidate = 360; // 5 phút

// export const getCachedCategories = cache(
//   unstable_cache(
//     async (limit?: number): Promise<CategoryInterface[]> => {
//       const vnTime = new Date().toLocaleString("vi-VN", {
//         timeZone: "Asia/Ho_Chi_Minh",
//         hour12: false,
//       });

//       console.log(`🕒 [Categories] GỌI API lúc: ${vnTime}`);

//       try {
//         const res = await fetchSafe(
//           () =>
//             CategoryAPI.getAllCategoriesOfStore({
//               currentPage: 1,
//               limit: limit ?? 999,
//               justGetParent: false,
//             }),
//           { categories: [] }
//         );

//         return Array.isArray(res?.categories) ? res.categories : [];
//       } catch (error) {
//         console.error("❌ [Categories] Lỗi khi gọi API:", error);
//         return [];
//       }
//     },
//     ["categories-cache"],
//     {
//       revalidate: 120,
//       tags: ["categories"],
//     }
//   )
// );

export const getCachedCategories = async (
  limit?: number
): Promise<CategoryInterface[]> => {
  const vnTime = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });

  console.log(`🕒 [Categories] GỌI API lúc: ${vnTime}`);

  try {
    const res = await fetchSafe(
      () =>
        CategoryAPI.getAllCategoriesOfStore({
          currentPage: 1,
          limit: limit ?? 999,
          justGetParent: false,
        }),
      { categories: [] }
    );

    return Array.isArray(res?.categories) ? res.categories : [];
  } catch (error) {
    console.error("❌ [Categories] Lỗi khi gọi API:", error);
    return [];
  }
};

export const getCachedStoreInfo = async (): Promise<StoreInterface> => {
  const vnTime = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });

  console.log(`🕒 [StoreInfo] GỌI API lúc: ${vnTime}`);

  const res = await fetchSafe(() => StoreAPI.getStoreInfo(), {
    store: { industry: "Nội thất" },
  });
  return res.store ?? { industry: "Nội thát" };
};

/**
 * Cache store info 5 phút, coalesce với cache()
 */
// export const getCachedStoreInfo = cache(
//   unstable_cache(
//     async (): Promise<StoreInterface> => {
//       const res = await fetchSafe(() => StoreAPI.getStoreInfo(), {
//         store: { industry: "Xây dựng" },
//       });

//       return res.store ?? { industry: "Xây dựng" };
//     },
//     ["store-info-cache"],
//     { revalidate: 120, tags: ["store-info"] }
//   )
// );

export async function generateMetadata(): Promise<Metadata> {
  const store = await getCachedStoreInfo();

  if (store?.seo && typeof store.seo === "object") {
    return generateSeoForPage(store.seo as SeoInterface);
  }
  return {
    title: "Máy xây dựng mới ",
    description: "Máy xây dựng mới description ",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Promise.all để fetch song song
  const [storeInfo, categories] = await Promise.all([
    getCachedStoreInfo(),
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
                <BodyContainer className="mt-0 sm:mt-[70px]">
                  {children}
                </BodyContainer>
              </SidebarProvider>
              <ZaloPhoneWidget storeInfo={storeInfo} />
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
