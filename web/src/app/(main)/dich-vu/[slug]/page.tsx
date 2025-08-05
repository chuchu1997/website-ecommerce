import { ProjectAPI } from "@/api/projects/projects.api";
import { ServiceAPI } from "@/api/services/services.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { ServiceInterface } from "@/types/service";
import { fetchSafe } from "@/utils/fetchSafe";
import { FormatUtils } from "@/utils/format";
import { Metadata } from "next";
import Link from "next/link";



const fetchServiceWithSlug = async (slug:string):Promise<ServiceInterface> =>{

  const res = await fetchSafe(() => ServiceAPI.getServiceWithSlug({slug}), {
    service: undefined,
  });
  return res.service ?? undefined;


}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const service =  await fetchServiceWithSlug(resolvedParams.slug);


    if (service && typeof service.seo === "object") {
      return generateSeoForPage(service.seo);
    }

    return {
      title: service?.title ?? "Dịch vụ ",
      description: service?.shortDescription ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Dịch vụ không tồn tại",
      description: "Bài viết của dịch vụ không tồn tại hoặc đã bị xoá.",
    };
  }
}


const DichVuSlugSSR = async ({params}:{
  params:Promise<{slug:string}>
})=>{
  const resolvedParams = await params;

  const service = await fetchServiceWithSlug(resolvedParams.slug);


  if (!service) {
    return (
      <div className="container mx-auto max-w-6xl py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Không tìm thấy dịch vụ này 
        </h1>
        <p className="text-gray-600 mb-6">
          Bài viết có thể đã bị xoá hoặc không tồn tại. Mời bạn xem các tin tức
          nổi bật khác.
        </p>

        <Link
        prefetch={true}
          href="/danh-muc/dich-vu"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Quay về trang dịch vụ
        </Link>
      </div>
    );
  }

  return <div className = "container mx-auto py-[20px]">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {service.title}
        </h1>
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>Ngày đăng: {FormatUtils.formatDate(service.createdAt ?? "")}</span>
          {service.updatedAt !== service.createdAt && (
            <span>Cập nhật: {FormatUtils.formatDate(service.updatedAt ?? "")}</span>
          )}
       
        </div>
      </div>

      {service.imageUrl && (
        <div className="mb-6 relative h-[400px] md:h-[500px] w-full">
          <ImageLoader
            fill
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-auto object-cover rounded-lg shadow-sm relative z-0"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative text-gray-700 leading-relaxed whitespace-pre-line">
        <EditorClientWrapper jsonString={service.description} />
      </div>
  
  </div>
}
export default DichVuSlugSSR