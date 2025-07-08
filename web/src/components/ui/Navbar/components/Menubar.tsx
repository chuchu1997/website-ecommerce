"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menubar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex sm:hidden justify-between items-center">
      <Link
        href="/"
        className={`flex-1 p-4 text-center font-semibold border-b-2 cursor-pointer ${
          isActive("/") ? "border-black text-black " : "border-transparent text-gray-500"
        }`}
      >
        Trang chủ
      </Link>
      <Link
        href="/danh-muc/san-pham"
        className={`flex-1 p-4 text-center  font-semibold border-b-2 cursor-pointer ${
          isActive("/danh-muc/san-pham") ? "border-black text-black " : "border-transparent text-gray-500"
        }`}
      >
        Sản phẩm
      </Link>
    
    </div>
  );
};

export default Menubar;
