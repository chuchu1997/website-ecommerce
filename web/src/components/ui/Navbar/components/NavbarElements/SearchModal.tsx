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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[var(--color-bg)] rounded-3xl shadow-[var(--shadow-strong)] border border-[var(--color-border-light)] w-full max-w-2xl max-h-[70vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--color-primary-light)] rounded-xl border border-[var(--color-border-light)]">
              <Search className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
              Tìm kiếm nội thất
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--color-bg-hover)] rounded-xl transition-all duration-200 border border-transparent hover:border-[var(--color-border-light)]">
            <X className="h-5 w-5 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-[var(--color-border-light)]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] w-6 h-6" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm sofa, bàn ăn, tủ quần áo, đèn trang trí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg border border-[var(--color-border-light)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all duration-200 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] bg-[var(--color-bg-input)]"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="animate-spin rounded-full h-10 w-10 border-3 border-[var(--color-primary)] border-t-transparent mb-4"></div>
              <p className="text-[var(--color-primary)] font-medium">
                Đang tìm kiếm nội thất...
              </p>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div className="p-6 space-y-4 animate-fadeIn">
              <p className="text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-bg-secondary)] px-3 py-2 rounded-lg border border-[var(--color-border-light)]">
                Tìm thấy {searchResults.length} sản phẩm nội thất
              </p>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/san-pham/${result.slug}`}
                  className="group flex items-center gap-4 p-4 hover:bg-[var(--color-bg-hover)] rounded-xl transition-all duration-200 border border-transparent hover:border-[var(--color-border-light)] hover:shadow-[var(--shadow-hover)] transform hover:scale-[1.01]">
                  <ImageLoader
                    src={result.images[0].url}
                    alt={result.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover shadow-[var(--shadow-default)] group-hover:shadow-[var(--shadow-hover)] transition-all duration-200 flex-shrink-0 border border-[var(--color-border-light)]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 truncate text-lg">
                      {result.name}
                    </h4>
                    <p className="text-[var(--color-text-muted)] mt-1 text-sm line-clamp-1">
                      {result.shortDescription}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-[var(--color-accent)]">
                      {FormatUtils.formatPriceVND(result.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="w-20 h-20 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-4 border border-[var(--color-border-light)]">
                <Sofa className="h-10 w-10 text-[var(--color-primary)]" />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold mb-2 text-lg">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-[var(--color-text-muted)] text-center px-4">
                Không có nội thất nào phù hợp với từ khóa "{searchQuery}"
              </p>
            </div>
          )}

          {!searchQuery && (
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="w-20 h-20 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-4 border border-[var(--color-border-light)]">
                <Search className="h-10 w-10 text-[var(--color-primary)]" />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold mb-2 text-lg">
                Khám phá nội thất
              </p>
              <p className="text-[var(--color-text-muted)] text-center px-4">
                Nhập tên sản phẩm để tìm kiếm nội thất yêu thích
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
