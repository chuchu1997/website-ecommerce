/** @format */
"use client";
import { NewsAPI } from "@/api/news/news.api";
import { NewsInterface } from "@/types/news";
import { fetchSafe } from "@/utils/fetchSafe";
import { Metadata } from "next";
import { FormatUtils } from "@/utils/format";
import Link from "next/link";

const NewsPage = async () => {
  const data = await fetchSafe(
    () => NewsAPI.getNews({ currentPage: 1, limit: 9 }),
    {
      article: null,
    }
  );

  const news = (data?.articles ?? []) as NewsInterface[];

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white">
      <div className="text-gray-800 container mx-auto">
        {/* Header */}
        <div className="py-16 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tin Tức & Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất, bài viết hữu ích và kinh nghiệm
            chơi nhạc cụ từ Guitar Sài Thành.
          </p>
        </div>

        {/* News List */}
        <section className="py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/tin-tuc/${item.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {item.shortDescription}
                </p>

                <p className="text-xs text-gray-400">
                  {FormatUtils.formatDate(item.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
