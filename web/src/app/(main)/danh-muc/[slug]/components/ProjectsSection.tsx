/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { Building2, Sparkles, TrendingUp, Award } from "lucide-react";
import { ProjectAPI } from "@/api/projects/projects.api";
import PaginationCustom from "@/common/PaginationCustom";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectInterface } from "@/types/project";

// Mock API and interfaces for demo

// Mock PaginationCustom component

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const limit = 8;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-48 rounded-2xl mb-4 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-1/2 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Dự án nổi bật</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Dự Án
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Thành Công
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Khám phá những dự án xuất sắc mà chúng tôi đã thực hiện thành công,
            từ thiết kế nội thất hiện đại đến các giải pháp không gian sống hoàn
            hảo
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm">Dự án hoàn thành</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-blue-100 p-2 rounded-full">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm">Khách hàng hài lòng</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-purple-100 p-2 rounded-full">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm">Đối tác tin cậy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <ProjectsSkeletonLoader />
        ) : (
          <>
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-gray-600">
                Hiển thị{" "}
                <span className="font-semibold text-gray-900">
                  {projects.length}
                </span>{" "}
                dự án
                {searchQuery && (
                  <span>
                    {" "}
                    cho từ khóa "
                    <span className="font-semibold text-blue-600">
                      {searchQuery}
                    </span>
                    "
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Trang {currentPage} / {totalPages}
              </div>
            </div>

            {/* Projects Grid */}
            <div
              className={`grid gap-8 mb-12 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}>
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Không tìm thấy dự án
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200">
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationCustom
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectsSection;
