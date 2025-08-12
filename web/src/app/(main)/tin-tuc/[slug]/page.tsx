import { NewsAPI } from "@/api/news/news.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { NewsInterface } from "@/types/news";
import { fetchSafe } from "@/utils/fetchSafe";
import { FormatUtils } from "@/utils/format";
import { Metadata } from "next";
import Link from "next/link";



const fetchNewsWithSlug = async (slug:string):Promise<NewsInterface> =>{



  const res = await fetchSafe(() => NewsAPI.getNewsWithSlug({slug}), {
    article: undefined,
  });
  return res.article ?? undefined;


    // const res = await NewsAPI.getNewsWithSlug({ slug: resolvedParams.slug });
    // const news = res.data.article as NewsInterface | null;


}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const news =  await fetchNewsWithSlug(resolvedParams.slug);


    if (news && typeof news.seo === "object") {
      return generateSeoForPage(news.seo);
    }

    return {
      title: news?.title ?? "Tin tức",
      description: news?.shortDescription ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Tin tức không tồn tại",
      description: "Bài viết không tồn tại hoặc đã bị xoá.",
    };
  }
}


const TinTucSlugSSR = async ({params}:{
  params:Promise<{slug:string}>
})=>{
  const resolvedParams = await params;

  const news = await fetchNewsWithSlug(resolvedParams.slug);


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
        prefetch={true}
          href="/danh-muc/tin-tuc"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Quay về trang Tin tức
        </Link>
      </div>
    );
  }

  return <div className = "container mx-auto py-[35px] sm:py-[70px] px-2">
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
}
export default TinTucSlugSSR