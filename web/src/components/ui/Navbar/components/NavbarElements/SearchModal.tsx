/** @format */

import React, { useEffect, useRef } from "react";
import { Search, X, Sofa } from "lucide-react";
import Link from "next/link";
import { FormatUtils } from "@/utils/format";
import { ImageLoader } from "../../../image-loader";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  isSearching: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-amber-900/20 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-amber-200 w-full max-w-2xl max-h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50/90 to-rose-50/90">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-rose-100 rounded-xl border border-amber-300">
              <Search className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Tìm kiếm nội thất
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-200">
            <X className="h-5 w-5 text-amber-700" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-amber-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-6 h-6" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm sofa, bàn ăn, tủ quần áo, đèn trang trí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 text-amber-900 placeholder-amber-600"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto">
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-3 border-amber-600 border-t-transparent mb-4"></div>
              <p className="text-amber-700 font-medium">
                Đang tìm kiếm nội thất...
              </p>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div className="p-6 space-y-4">
              <p className="text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                Tìm thấy {searchResults.length} sản phẩm nội thất
              </p>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/san-pham/${result.slug}`}
                  className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-amber-50 hover:to-rose-50 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-300 hover:shadow-lg transform hover:scale-[1.02]">
                  <ImageLoader
                    src={result.images[0].url}
                    alt={result.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-200 flex-shrink-0 border border-amber-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-200 truncate text-lg">
                      {result.name}
                    </h4>
                    <p className="text-amber-700 mt-1 text-sm line-clamp-1">
                      {result.shortDescription}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                      {FormatUtils.formatPriceVND(result.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mb-4 border-2 border-amber-200">
                <Sofa className="h-10 w-10 text-amber-600" />
              </div>
              <p className="text-amber-900 font-bold mb-2 text-lg">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-amber-700 text-center px-4">
                Không có nội thất nào phù hợp với từ khóa "{searchQuery}"
              </p>
            </div>
          )}

          {!searchQuery && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mb-4 border-2 border-amber-200">
                <Search className="h-10 w-10 text-amber-600" />
              </div>
              <p className="text-amber-900 font-bold mb-2 text-lg">
                Khám phá nội thất
              </p>
              <p className="text-amber-700 text-center px-4">
                Nhập tên sản phẩm để tìm kiếm nội thất yêu thích
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
