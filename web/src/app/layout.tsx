/** @format */

import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";

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
export const dynamic = "force-dynamic";
export const revalidate = 60;
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable}  ${geistMono.variable} ${roboto.variable} antialiased relative min-h-screen`}>
        <LoadingProvider>
          <LoadingOverlay />
          <CookiesClientWrapper>
            <CartProvider>
              <SidebarProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <BodyContainer className="">{children}</BodyContainer>
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
