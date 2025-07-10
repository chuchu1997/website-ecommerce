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
const fetchNewsCategories = async (
  page: number,
  limit: number
): Promise<{ items: NewsItem[]; hasMore: boolean; total: number }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockNews: NewsItem[] = [
    {
      id: "news-1",
      title: "Xu hướng công nghệ mới năm 2025",
      excerpt:
        "Khám phá những xu hướng công nghệ đột phá sẽ định hình tương lai trong năm 2025...",
      publishedAt: "2025-01-15",
      imageUrl: "/images/news/tech-trends-2025.jpg",
      slug: "xu-huong-cong-nghe-moi-nam-2025",
    },
    {
      id: "news-2",
      title: "Thành công của dự án AI tại Việt Nam",
      excerpt:
        "Dự án trí tuệ nhân tạo đầu tiên tại Việt Nam đã đạt được những thành tựu đáng kể...",
      publishedAt: "2025-01-12",
      imageUrl: "/images/news/ai-project-vietnam.jpg",
      slug: "thanh-cong-du-an-ai-viet-nam",
    },
    {
      id: "news-3",
      title: "Khởi nghiệp công nghệ: Cơ hội và thách thức",
      excerpt:
        "Phân tích về cơ hội và thách thức mà các startup công nghệ đang phải đối mặt...",
      publishedAt: "2025-01-10",
      imageUrl: "/images/news/startup-challenges.jpg",
      slug: "khoi-nghiep-cong-nghe-co-hoi-thach-thuc",
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = mockNews.slice(startIndex, endIndex);

  return {
    items: paginatedNews,
    hasMore: endIndex < mockNews.length,
    total: mockNews.length,
  };
};

const fetchCourseCategories = async (
  page: number,
  limit: number
): Promise<{ items: Course[]; hasMore: boolean; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockCourses: Course[] = [
    {
      id: "course-1",
      title: "Lập trình React từ cơ bản đến nâng cao",
      description:
        "Học React từ những khái niệm cơ bản đến các kỹ thuật nâng cao và thực hành dự án thực tế",
      duration: "12 tuần",
      price: 2500000,
      instructor: "Nguyễn Văn A",
      imageUrl: "/images/courses/react-course.jpg",
      level: "Trung cấp",
    },
    {
      id: "course-2",
      title: "Thiết kế UX/UI chuyên nghiệp",
      description:
        "Khóa học toàn diện về thiết kế trải nghiệm người dùng và giao diện người dùng",
      duration: "8 tuần",
      price: 1800000,
      instructor: "Trần Thị B",
      imageUrl: "/images/courses/ux-ui-course.jpg",
      level: "Cơ bản",
    },
    {
      id: "course-3",
      title: "Marketing Digital và Social Media",
      description:
        "Nắm vững các chiến lược marketing kỹ thuật số và quản lý mạng xã hội hiệu quả",
      duration: "10 tuần",
      price: 2200000,
      instructor: "Lê Văn C",
      imageUrl: "/images/courses/digital-marketing.jpg",
      level: "Nâng cao",
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCourses = mockCourses.slice(startIndex, endIndex);

  return {
    items: paginatedCourses,
    hasMore: endIndex < mockCourses.length,
    total: mockCourses.length,
  };
};

const fetchServiceCategories = async (
  page: number,
  limit: number
): Promise<{ items: Service[]; hasMore: boolean; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockServices: Service[] = [
    {
      id: "service-1",
      title: "Phát triển website doanh nghiệp",
      description:
        "Thiết kế và phát triển website chuyên nghiệp cho doanh nghiệp với công nghệ hiện đại",
      price: 15000000,
      duration: "4-6 tuần",
      imageUrl: "/images/services/web-development.jpg",
      features: [
        "Thiết kế responsive",
        "SEO tối ưu",
        "Bảo mật cao",
        "Hỗ trợ 24/7",
      ],
    },
    {
      id: "service-2",
      title: "Tư vấn chuyển đổi số",
      description:
        "Hỗ trợ doanh nghiệp chuyển đổi số toàn diện với giải pháp công nghệ phù hợp",
      price: 25000000,
      duration: "8-12 tuần",
      imageUrl: "/images/services/digital-transformation.jpg",
      features: [
        "Phân tích hiện trạng",
        "Lập kế hoạch",
        "Triển khai",
        "Đào tạo nhân viên",
      ],
    },
    {
      id: "service-3",
      title: "Quản lý hệ thống IT",
      description:
        "Dịch vụ quản lý và vận hành hệ thống công nghệ thông tin cho doanh nghiệp",
      price: 8000000,
      duration: "Theo tháng",
      imageUrl: "/images/services/it-management.jpg",
      features: [
        "Giám sát 24/7",
        "Bảo trì định kỳ",
        "Backup dữ liệu",
        "Hỗ trợ kỹ thuật",
      ],
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedServices = mockServices.slice(startIndex, endIndex);

  return {
    items: paginatedServices,
    hasMore: endIndex < mockServices.length,
    total: mockServices.length,
  };
};

const fetchPromotionCategories = async (
  page: number,
  limit: number
): Promise<{ items: Promotion[]; hasMore: boolean; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockPromotions: Promotion[] = [
    {
      id: "promotion-1",
      title: "Giảm giá 50% khóa học lập trình",
      description:
        "Ưu đãi đặc biệt cho tất cả khóa học lập trình trong tháng 1",
      discountPercent: 50,
      validUntil: "2025-01-31",
      imageUrl: "/images/promotions/programming-discount.jpg",
      terms: "Áp dụng cho học viên mới đăng ký trong tháng 1/2025",
    },
    {
      id: "promotion-2",
      title: "Miễn phí tư vấn dự án",
      description: "Nhận tư vấn miễn phí cho dự án công nghệ của bạn",
      discountPercent: 100,
      validUntil: "2025-02-15",
      imageUrl: "/images/promotions/free-consultation.jpg",
      terms: "Áp dụng cho dự án có giá trị từ 10 triệu đồng trở lên",
    },
    {
      id: "promotion-3",
      title: "Combo dịch vụ với giá ưu đãi",
      description: "Đăng ký combo 3 dịch vụ và tiết kiệm đến 30%",
      discountPercent: 30,
      validUntil: "2025-03-01",
      imageUrl: "/images/promotions/service-combo.jpg",
      terms: "Không áp dụng đồng thời với các ưu đãi khác",
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPromotions = mockPromotions.slice(startIndex, endIndex);

  return {
    items: paginatedPromotions,
    hasMore: endIndex < mockPromotions.length,
    total: mockPromotions.length,
  };
};

const fetchProjectCategories = async (
  page: number,
  limit: number
): Promise<{ items: Project[]; hasMore: boolean; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockProjects: Project[] = [
    {
      id: "project-1",
      title: "Hệ thống E-commerce cho ABC Corp",
      description:
        "Phát triển nền tảng thương mại điện tử toàn diện với tính năng thanh toán và quản lý đơn hàng",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      completedAt: "2024-12-15",
      imageUrl: "/images/projects/ecommerce-platform.jpg",
      clientName: "ABC Corporation",
    },
    {
      id: "project-2",
      title: "Ứng dụng mobile quản lý tài chính",
      description:
        "Ứng dụng di động giúp người dùng quản lý tài chính cá nhân với AI phân tích chi tiêu",
      technologies: ["React Native", "Python", "TensorFlow", "Firebase"],
      completedAt: "2024-11-20",
      imageUrl: "/images/projects/finance-app.jpg",
      clientName: "FinTech Startup",
    },
    {
      id: "project-3",
      title: "Hệ thống CRM cho doanh nghiệp",
      description:
        "Hệ thống quản lý quan hệ khách hàng tích hợp với các công cụ marketing tự động",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
      completedAt: "2024-10-30",
      imageUrl: "/images/projects/crm-system.jpg",
      clientName: "Marketing Solutions Ltd",
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProjects = mockProjects.slice(startIndex, endIndex);

  return {
    items: paginatedProjects,
    hasMore: endIndex < mockProjects.length,
    total: mockProjects.length,
  };
};

// Contact variant doesn't need a fetch function as it's typically a static form
const fetchContactCategories = async (): Promise<{ contactInfo: any }> => {
  return {
    contactInfo: {
      phone: "+84 123 456 789",
      email: "contact@company.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:00",
      socialMedia: {
        facebook: "https://facebook.com/company",
        linkedin: "https://linkedin.com/company",
        twitter: "https://twitter.com/company",
      },
    },
  };
};

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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {category.variant ? (
          <div className="space-y-8">{renderVariantContent()}</div>
        ) : (
          <div className="space-y-8">
            <ScrollToLoadProductsWithCategory
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
