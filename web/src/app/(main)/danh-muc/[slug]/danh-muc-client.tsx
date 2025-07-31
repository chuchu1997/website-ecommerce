/** @format */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ProductWidgets } from "@/components/ui/product/product";
import { useParams } from "next/navigation";
import {
  ApiResponseProductScroll,
  ScrollToLoadProductsWithCategory,
} from "@/components/scrollToLoad/scrollToLoadProductWithCategoryComponent";
import { ProductInterface } from "@/types/product";
import ServicesSection from "./components/ServiceSection";
import ProjectsSection from "./components/ProjectsSection";
import NewsSection from "./components/NewsSection";

export enum CategoryVariant {
  NEWS = "NEWS",
  COURSES = "COURSES",
  SERVICES = "SERVICES",
  PROMOTION = "PROMOTION",
  CONTACT = "CONTACT",
  PROJECTS = "PROJECTS",
}

// Mock data interfaces
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  imageUrl: string;
  slug: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  instructor: string;
  imageUrl: string;
  level: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  features: string[];
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  validUntil: string;
  imageUrl: string;
  terms: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  completedAt: string;
  imageUrl: string;
  clientName: string;
}

// Fetch functions for each variant

const DanhMucPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductsFromCategory(1, 4);
  }, [slug]);

  // Fetch products by page for ScrollToLoad
  const fetchProductsFromCategory = async (
    page: number,
    limit: number
  ): Promise<ApiResponseProductScroll> => {
    try {
      const res = await CategoryAPI.getCategoryWithSlug(
        slug?.toString() || "",
        page,
        limit
      );

      const categoryData = res.data;
      const products = categoryData.products;
      setCategory(categoryData);

      return {
        products: products ?? [],
        hasMore: categoryData.products?.length === limit,
        nextPage:
          categoryData.products?.length === limit ? page + 1 : undefined,
        total: categoryData.totalProducts,
      };
    } catch (err) {
      console.error("Error fetching products:", err);
      return {
        products: [],
        hasMore: false,
        nextPage: undefined,
        total: 0,
      };
    }
  };

  const handleProductsLoaded = (
    newProducts: ProductInterface[],
    totalLoaded: number
  ) => {
    console.log(
      `Loaded ${newProducts.length} new products. Total: ${totalLoaded}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductWidgets.cardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-16 ">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-50 to-white rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.468-.94-6.017-2.471L12 9.529l6.017 2.471C16.468 14.06 14.34 15 12 15z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Không tìm thấy danh mục
          </h1>
          <p className="text-gray-600">
            Danh mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }
  const renderVariantContent = () => {
    switch (category?.variant) {
      case CategoryVariant.NEWS:
        return <NewsSection />;
      // case CategoryVariant.COURSES:
      //   return <CoursesSection />;
      case CategoryVariant.SERVICES:
        return <ServicesSection />;
      // case CategoryVariant.PROMOTION:
      //   return <PromotionSection />;
      case CategoryVariant.PROJECTS:
        return <ProjectsSection />;
      // case CategoryVariant.CONTACT:
      //   return <ContactSection />;
      default:
        return <div>Variant not supported</div>;
    }
  };
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-2 ">
        {category.variant ? (
          <div className="space-y-8">{renderVariantContent()}</div>
        ) : (
          <div className="space-y-8">
            <ScrollToLoadProductsWithCategory
              categoryName={category.name}
              fetchProducts={fetchProductsFromCategory}
              itemsPerPage={8}
              containerClassName="mb-8"
              loadOffset={150}
              onProductsLoaded={handleProductsLoaded}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DanhMucPage;
