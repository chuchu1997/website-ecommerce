"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { NewsAPI } from "@/api/news/news.api";
import PaginationCustom from "@/common/PaginationCustom";
import { NewsCard } from "@/components/ui/NewsCard";
import { NewsInterface } from "@/types/news";
import { Newspaper, Megaphone, Globe } from "lucide-react";

const NewsSection = () => {
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isMountedRef = useRef(false);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const limit = 8;

      const res = await NewsAPI.getNews({ currentPage, limit });

      if (res.status === 200) {
        const { articles, total } = res.data as {
          articles: NewsInterface[];
          total: number;
        };
        setNews(articles);
        setTotalPages(Math.ceil(total / limit));
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isMountedRef.current) {
      fetchNews();
    } else {
      isMountedRef.current = true;
      fetchNews();
    }
  }, [fetchNews]);

  const NewsSkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-48 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
          <div className="h-4 w-3/4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
          <div className="h-3 w-1/2 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Megaphone className="w-4 h-4" />
            <span>Tin tức mới nhất</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Cập nhật{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Tin tức
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Nắm bắt xu hướng, thông tin và hoạt động mới nhất của chúng tôi
          </p>

          {/* Optional Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-red-100 p-2 rounded-full">
                <Newspaper className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">120+</div>
                <div className="text-sm">Bài viết đã đăng</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-pink-100 p-2 rounded-full">
                <Globe className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10+</div>
                <div className="text-sm">Chuyên mục nội dung</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <NewsSkeletonLoader />
        ) : (
          <>
            <div className="grid gap-8 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>

            {/* Empty State */}
            {news.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-600">Vui lòng thử lại sau.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationCustom
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-50 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsSection;
