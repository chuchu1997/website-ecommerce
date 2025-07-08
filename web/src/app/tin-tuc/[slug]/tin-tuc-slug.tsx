/** @format */

import { NewsAPI } from "@/api/news/news.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { NewsInterface } from "@/types/news";
import { FormatUtils } from "@/utils/format";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

const TintucSlug = async (props: Props) => {
  const { params } = props;
  const { slug } = await params;

  const res = await NewsAPI.getNewsWithSlug({ slug });
  const news = res?.data?.article as NewsInterface | undefined;

  if (!news) return notFound();

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4  overflow-hidden">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {news.title}
        </h1>
        <div className="text-sm text-gray-500 flex items-center gap-4">
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
        <div className="mb-6">
          <ImageLoader
            src={news.imageUrl}
            alt={news.title}
            height={300}
            width={500}
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      )}

      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        <EditorClientWrapper jsonString={news.description} />
      </div>
    </div>
  );
};

export default TintucSlug;
