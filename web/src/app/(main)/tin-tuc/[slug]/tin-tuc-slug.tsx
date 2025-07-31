/** @format */

import { NewsAPI } from "@/api/news/news.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { NewsInterface } from "@/types/news";
import { FormatUtils } from "@/utils/format";
import { fetchSafe } from "@/utils/fetchSafe";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Tạo metadata động
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Dùng fetchSafe để tránh crash build khi API lỗi
  const data = await fetchSafe(() => NewsAPI.getNewsWithSlug({ slug }), {
    article: null,
  });

  const news = data?.article as NewsInterface | null;

  if (news && typeof news.seo === "object") {
    // Nếu có dữ liệu SEO từ backend
    return {
      title: news.seo.title ?? news.title,
      description: news.seo.description ?? news.shortDescription,
      openGraph: {
        title: news.seo.title ?? news.title,
        description: news.seo.description ?? news.shortDescription,
        images: news.imageUrl ? [{ url: news.imageUrl }] : [],
      },
    };
  }

  return {
    title: news?.title ?? "Tin tức",
    description: news?.shortDescription ?? "Tin tức và bài viết mới nhất.",
  };
}

const TintucSlug = async ({ params }: Props) => {
  const { slug } = await params;

  let news: NewsInterface | undefined;

  const data = await fetchSafe(() => NewsAPI.getNewsWithSlug({ slug }), {
    article: null,
  });

  news = data?.article as NewsInterface | undefined;

  if (!news) {
    return (
      <div className="container mx-auto max-w-6xl py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Không tìm thấy tin tức này
        </h1>
        <p className="text-gray-600 mb-6">
          Bài viết có thể đã bị xoá hoặc không tồn tại. Mời bạn xem các tin tức
          nổi bật khác.
        </p>

        <Link
          href="/tin-tuc"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Quay về trang Tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4 ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {news.title}
        </h1>
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>Ngày đăng: {FormatUtils.formatDate(news.createdAt)}</span>
          {news.updatedAt !== news.createdAt && (
            <span>Cập nhật: {FormatUtils.formatDate(news.updatedAt)}</span>
          )}
          {news.store && (
            <span className="text-blue-600 font-medium">
              Nguồn: {news.store.name}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      {news.imageUrl && (
        <div className="mb-6 relative h-[400px] md:h-[500px] w-full">
          <ImageLoader
            fill
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-auto object-cover rounded-lg shadow-sm relative z-0"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative text-gray-700 leading-relaxed whitespace-pre-line">
        <EditorClientWrapper jsonString={news.description} />
      </div>
    </div>
  );
};

export default TintucSlug;
