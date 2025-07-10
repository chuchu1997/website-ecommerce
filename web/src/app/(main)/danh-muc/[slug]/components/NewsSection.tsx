/** @format */

"use-client";
import { NewsCard } from "@/components/ui/NewsCard";
import { NewsInterface } from "@/types/news";
import { useEffect, useState } from "react";

const NewsSection = () => {
  const mockNews: NewsInterface[] = [
    {
      id: 1,
      title: "Xu hướng công nghệ mới năm 2025",
      description:
        "Khám phá những xu hướng công nghệ đột phá sẽ định hình tương lai trong năm 2025...",
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
      slug: "xu-huong-cong-nghe-moi-nam-2025",
    },
    {
      id: 2,

      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Thành công của dự án AI tại Việt Nam",
      description:
        "Dự án trí tuệ nhân tạo đầu tiên tại Việt Nam đã đạt được những thành tựu đáng kể...",
      imageUrl:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
      slug: "thanh-cong-du-an-ai-viet-nam",
    },
    {
      id: 3,
      title: "Khởi nghiệp công nghệ: Cơ hội và thách thức",
      description:
        "Phân tích về cơ hội và thách thức mà các startup công nghệ đang phải đối mặt...",
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
      slug: "khoi-nghiep-cong-nghe-co-hoi-thach-thuc",
    },
  ];

  const [news, setNews] = useState(mockNews);
  const [loading, setLoading] = useState(false);

  //  useEffect(() => {
  //   fetchProjectCategories(1, 6).then(data => {
  //     setProjects(data.items);
  //     setLoading(false);
  //   });
  // }, []);

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
        <h2 className="text-4xl font-bold text-gray-900">Tin tức & Sự kiện</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Cập nhật những tin tức mới nhất và sự kiện quan trọng trong ngành
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <NewsCard news={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
