/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";
import { ProductClient } from "./components/productClient";
import { fetchSafe } from "@/utils/fetchSafe";
import { Metadata } from "next";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";

interface SanPhamPageWithProps {
  params: Promise<{ slug: string }>;
}

// ✅ Generate metadata (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const data = await fetchSafe(() =>
      ProductAPI.getProductBySlug(resolvedParams.slug)
    );

    const product = data?.product as ProductInterface | null;

    // Nếu có SEO custom
    if (product && typeof product.seo === "object") {
      return generateSeoForPage(product.seo);
    }

    return {
      title: product?.name ?? "Sản phẩm",
      description: product?.description ?? "Chi tiết sản phẩm",
    };
  } catch (error) {
    console.error("Lỗi khi generateMetadata cho sản phẩm:", error);
    return {
      title: "Sản phẩm không tồn tại",
      description: "Sản phẩm không tồn tại hoặc đã bị xoá.",
    };
  }
}

// ✅ Page Component
const SanPhamPageWithSlug = async (props: SanPhamPageWithProps) => {
  const { params } = props;
  const { slug } = await params;

  const data = await fetchSafe(() => ProductAPI.getProductBySlug(slug));

  const product = data?.product as ProductInterface | null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Sản phẩm không tồn tại
          </h2>
          <p className="text-gray-500">Vui lòng kiểm tra lại đường dẫn</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductClient product={product} />
    </div>
  );
};

export default SanPhamPageWithSlug;
