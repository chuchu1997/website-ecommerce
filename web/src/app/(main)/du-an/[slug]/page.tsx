import { ProjectAPI } from "@/api/projects/projects.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { NewsInterface } from "@/types/news";
import { ProjectInterface } from "@/types/project";
import { fetchSafe } from "@/utils/fetchSafe";
import { FormatUtils } from "@/utils/format";
import { Metadata } from "next";
import Link from "next/link";



const fetchProjectWithSlug = async (slug:string):Promise<ProjectInterface> =>{

  const res = await fetchSafe(() => ProjectAPI.getProjectWithSlug({slug}), {
    project: undefined,
  });
  return res.project ?? undefined;


}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const project =  await fetchProjectWithSlug(resolvedParams.slug);


    if (project && typeof project.seo === "object") {
      return generateSeoForPage(project.seo);
    }

    return {
      title: project?.title ?? "Dự án ",
      description: project?.shortDescription ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Dự án  không tồn tại",
      description: "Bài viết của dự án không tồn tại hoặc đã bị xoá.",
    };
  }
}


const DuAnSlugSSR = async ({params}:{
  params:Promise<{slug:string}>
})=>{
  const resolvedParams = await params;

  const project = await fetchProjectWithSlug(resolvedParams.slug);


  if (!project) {
    return (
      <div className="container mx-auto max-w-6xl py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Không tìm thấy dự án này 
        </h1>
        <p className="text-gray-600 mb-6">
          Bài viết có thể đã bị xoá hoặc không tồn tại. Mời bạn xem các tin tức
          nổi bật khác.
        </p>

        <Link
        prefetch={true}
          href="/danh-muc/du-an"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Quay về trang dự án 
        </Link>
      </div>
    );
  }

  return <div className = "container mx-auto py-[35px] sm:py-[70px]">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {project.title}
        </h1>
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>Ngày đăng: {FormatUtils.formatDate(project.createdAt ?? "")}</span>
          {project.updatedAt !== project.createdAt && (
            <span>Cập nhật: {FormatUtils.formatDate(project.updatedAt ?? "")}</span>
          )}
       
        </div>
      </div>

      {project.imageUrl && (
        <div className="mb-6 relative h-[400px] md:h-[500px] w-full">
          <ImageLoader
            fill
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover rounded-lg shadow-sm relative z-0"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative text-gray-700 leading-relaxed whitespace-pre-line">
        <EditorClientWrapper jsonString={project.description} />
      </div>
  
  </div>
}
export default DuAnSlugSSR