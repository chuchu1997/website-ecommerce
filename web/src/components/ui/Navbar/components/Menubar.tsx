"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menubar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="sm:hidden bg-white border-t border-gray-100 shadow-sm">
      <div className="flex">
        <Link
          prefetch={true}
          href="/"
          className={`
            flex-1 relative py-2 px-6 text-center transition-all duration-200 ease-in-out
            ${isActive("/") 
              ? "text-blue-600 bg-blue-50" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            }
          `}
        >
          <span className="text-sm font-medium">Trang chủ</span>
          {isActive("/") && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </Link>
        
        <div className="w-px bg-gray-200" />
        
        <Link
          prefetch={true}
          href="/danh-muc/san-pham"
          className={`
            flex-1 relative py-2 px-6 text-center transition-all duration-200 ease-in-out
            ${isActive("/danh-muc/san-pham") 
              ? "text-blue-600 bg-blue-50" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            }
          `}
        >
          <span className="text-sm font-medium">Sản phẩm</span>
          {isActive("/danh-muc/san-pham") && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Menubar;