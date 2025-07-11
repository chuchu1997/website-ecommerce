/** @format */

"use-client";
import { NewsAPI } from "@/api/news/news.api";
import PaginationCustom from "@/common/PaginationCustom";
import { NewsCard } from "@/components/ui/NewsCard";
import { NewsInterface } from "@/types/news";
import { ProjectInterface } from "@/types/project";
import { useEffect, useState } from "react";

const NewsSection = () => {
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);
  const fetchProjects = async () => {
    try {
      const limit = 8;

      setLoading(true);
      let res = await NewsAPI.getNews({
        currentPage: currentPage,
        limit: limit,
      });

      if (res.status === 200) {
        const { articles, total } = res.data as {
          articles: NewsInterface[];
          total: number;
        };
        // const totalPagesCal = Math.ceil(total / limit);
        setTotalPages(Math.ceil(total / limit));
        setNews(articles);
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">
          {news.length > 0 ? news[0].title : "Tin tức"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Khám phá những tin tức mà chúng tôi đã thực hiện
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {news.map((newItem) => (
          <NewsCard news={newItem} key={newItem.id} />
        ))}
      </div>
      <PaginationCustom
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default NewsSection;
