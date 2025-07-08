/** @format */

import { Geist, Geist_Mono, Roboto } from "next/font/google";

import "./globals.css";
import CookiesClientWrapper from "@/provider/cookie-provider-wrapper";
import { CartProvider } from "@/context/cart-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative min-h-screen`}>
        <CookiesClientWrapper>
          <CartProvider>
            <SidebarProvider>
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </SidebarProvider>
          </CartProvider>
          <Footer />
        </CookiesClientWrapper>
      </body>
    </html>
  );
}
