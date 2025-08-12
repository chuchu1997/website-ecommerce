/** @format */

"use client";
import React, { useEffect, useState } from "react";
import {
  Building2,
  Sparkles,
  TrendingUp,
  Award,
  Grid3X3,
  List,
  Search,
  Filter,
  Eye,
  Calendar,
  MapPin,
  Layers,
} from "lucide-react";
import { ProjectAPI } from "@/api/projects/projects.api";
import PaginationCustom from "@/common/PaginationCustom";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectInterface } from "@/types/project";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", label: "Tất cả dự án", count: 0 },
    { id: "residential", label: "Căn hộ & Nhà ở", count: 45 },
    { id: "commercial", label: "Thương mại", count: 28 },
    { id: "office", label: "Văn phòng", count: 32 },
    { id: "hospitality", label: "Khách sạn & Resort", count: 15 },
    { id: "retail", label: "Showroom & Cửa hàng", count: 22 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const limit = 3;
      setLoading(true);

      let res = await ProjectAPI.getProjects({
        currentPage: currentPage,
        limit: limit,
      });

      if (res.status === 200) {
        const { projects, total } = res.data as {
          projects: ProjectInterface[];
          total: number;
        };
        setTotalPages(Math.ceil(total / limit));
        setProjects(projects);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const ProjectsSkeletonLoader = () => (
    <div
      className={`grid gap-4 sm:gap-6 lg:gap-8 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 lg:grid-cols-2"
      }`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div
            className="h-48 sm:h-56 lg:h-64 rounded-2xl mb-4 bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
            style={{
              background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
              backgroundSize: "200% 100%",
            }}
          />
          <div className="space-y-3">
            <div
              className="h-5 rounded-lg bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: "200% 100%",
              }}
            />
            <div
              className="h-4 rounded-lg w-3/4 bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: "200% 100%",
              }}
            />
            <div
              className="h-3 rounded-lg w-1/2 bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--gradient-secondary)" }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div
          className="absolute top-20 right-20 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div
          className="absolute bottom-32 left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: "var(--color-accent-green)",
            animationDelay: "1.5s",
          }}
        />

        {/* Architectural grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-current" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className="inline-flex items-center justify-center space-x-3 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
              border: "1px solid var(--color-border-light)",
            }}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Dự án đã thực hiện</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ color: "var(--color-text-primary)" }}>
            Kiến tạo
            <br className="sm:hidden" />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-primary)" }}>
              {" "}
              không gian sống
            </span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4"
            style={{ color: "var(--color-text-secondary)" }}>
            Khám phá bộ sưu tập những dự án thiết kế nội thất xuất sắc, từ căn
            hộ hiện đại đến biệt thự sang trọng, được thực hiện bởi đội ngũ kiến
            trúc sư chuyên nghiệp.
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{
                    backgroundColor: "var(--color-accent-green-light)",
                  }}>
                  <TrendingUp
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: "var(--color-accent-green)" }}
                  />
                </div>
                <div
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}>
                  200+
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  Dự án hoàn thành
                </div>
              </div>
            </div>

            <div className="group">
              <div
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: "var(--color-accent-red-light)" }}>
                  <Award
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: "var(--color-accent-red)" }}
                  />
                </div>
                <div
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}>
                  98%
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  Hài lòng
                </div>
              </div>
            </div>

            <div className="group col-span-2 sm:col-span-1">
              <div
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: "var(--color-primary-light)" }}>
                  <Building2
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}>
                  15
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  Năm kinh nghiệm
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Section */}
        <div
          className="rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12"
          style={{
            backgroundColor: "var(--color-bg)",
            boxShadow: "var(--shadow-default)",
            border: "1px solid var(--color-border-light)",
          }}>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto sm:max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className="h-5 w-5"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm dự án theo tên, địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "2px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm sm:text-base font-semibold"
                style={{ color: "var(--color-text-primary)" }}>
                Danh mục dự án
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-bg-accent)",
                  color: "var(--color-text-secondary)",
                }}>
                <Filter className="w-4 h-4" />
                <span className="text-sm">Lọc</span>
              </button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.id
                        ? "shadow-md"
                        : "hover:shadow-sm"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === category.id
                          ? "var(--color-primary)"
                          : "var(--color-bg-secondary)",
                      color:
                        selectedCategory === category.id
                          ? "var(--color-text-white)"
                          : "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }}>
                    {category.label}
                    {category.count > 0 && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          selectedCategory === category.id ? "bg-white/20" : ""
                        }`}
                        style={{
                          backgroundColor:
                            selectedCategory === category.id
                              ? "rgba(255,255,255,0.2)"
                              : "var(--color-bg-accent)",
                        }}>
                        {category.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Controls & Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div
              className="text-sm sm:text-base"
              style={{ color: "var(--color-text-secondary)" }}>
              Hiển thị{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}>
                {projects.length}
              </span>{" "}
              dự án
              {searchQuery && (
                <span>
                  {" "}
                  cho từ khóa "
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary)" }}>
                    "{searchQuery}"
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div
                className="text-xs sm:text-sm"
                style={{ color: "var(--color-text-muted)" }}>
                Trang {currentPage} / {totalPages}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? "shadow-sm" : ""
                  }`}
                  style={{
                    backgroundColor:
                      viewMode === "grid"
                        ? "var(--color-primary)"
                        : "var(--color-bg-secondary)",
                    color:
                      viewMode === "grid"
                        ? "var(--color-text-white)"
                        : "var(--color-text-muted)",
                  }}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" ? "shadow-sm" : ""
                  }`}
                  style={{
                    backgroundColor:
                      viewMode === "list"
                        ? "var(--color-primary)"
                        : "var(--color-bg-secondary)",
                    color:
                      viewMode === "list"
                        ? "var(--color-text-white)"
                        : "var(--color-text-muted)",
                  }}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <ProjectsSkeletonLoader />
        ) : (
          <>
            {/* Projects Grid */}
            <div
              className={`grid gap-4 sm:gap-6 lg:gap-8 mb-12 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 "
                  : "grid-cols-1 lg:grid-cols-2"
              }`}>
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>

            {/* Enhanced Empty State */}
            {projects.length === 0 && !loading && (
              <div
                className="text-center py-12 sm:py-16 lg:py-20 rounded-3xl"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-bg-accent)" }}>
                  <Building2
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: "var(--color-text-primary)" }}>
                  Không tìm thấy dự án phù hợp
                </h3>
                <p
                  className="text-sm sm:text-base mb-6 max-w-md mx-auto"
                  style={{ color: "var(--color-text-secondary)" }}>
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để khám
                  phá thêm dự án tuyệt vời
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="inline-flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundImage: "var(--gradient-primary)",
                    color: "var(--color-text-white)",
                    boxShadow: "var(--shadow-default)",
                  }}>
                  <Eye className="w-5 h-5 mr-2" />
                  Xem tất cả dự án
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <PaginationCustom
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Enhanced hover effects */
        .group:hover {
          transform: translateY(-2px);
        }

        /* Smooth transitions */
        * {
          transition: all 0.2s ease-in-out;
        }

        /* Custom scrollbar for mobile */
        @media (max-width: 640px) {
          .overflow-x-auto::-webkit-scrollbar {
            height: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: var(--color-bg-secondary);
            border-radius: 8px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: var(--color-primary);
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsSection;
