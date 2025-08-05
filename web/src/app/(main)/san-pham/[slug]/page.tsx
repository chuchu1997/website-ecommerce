/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProjectAPI } from "@/api/projects/projects.api";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { ImageLoader } from "@/components/ui/image-loader";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { NewsInterface } from "@/types/news";
import { ProductInterface } from "@/types/product";
import { ProjectInterface } from "@/types/project";
import { fetchSafe } from "@/utils/fetchSafe";
import { FormatUtils } from "@/utils/format";
import { Metadata } from "next";
import Link from "next/link";
import { ProductClient } from "./components/productClient";

const fetchProductWithSlug = async (
  slug: string
): Promise<ProductInterface> => {
  const res = await fetchSafe(() => ProductAPI.getProductBySlug(slug), {
    product: undefined,
  });
  return res.product ?? undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const product = await fetchProductWithSlug(resolvedParams.slug);

    if (product && typeof product.seo === "object") {
      return generateSeoForPage(product.seo);
    }

    return {
      title: product?.name ?? "Sản phẩm ",
      description: product?.shortDescription ?? "",
    };
  } catch (error) {
    console.error("Lỗi khi gọi getNewsWithSlug:", error);
    return {
      title: "Sản phẩm  không tồn tại",
    };
  }
}

const SanPhamSlugSSR = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;

  const product = await fetchProductWithSlug(resolvedParams.slug);

  if (!product) {
    return (
      <div className="container mx-auto max-w-6xl py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Không tìm thấy sản phẩm này
        </h1>
        <p className="text-gray-600 mb-6">
          Sản phẩm có thể đã bị xoá hoặc không tồn tại. Mời bạn xem các sản phẩm
          khác
        </p>

        <Link
          prefetch={true}
          href="/danh-muc/san-pham"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Quay về trang sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-[20px]">
      <ProductClient product={product} />
    </div>
  );
};
export default SanPhamSlugSSR;
