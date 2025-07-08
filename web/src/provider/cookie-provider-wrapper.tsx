"use client";  // Đảm bảo component này được xử lý trên client

import { CookiesProvider } from "react-cookie";

export default function CookiesClientWrapper({ children }: { children: React.ReactNode }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}