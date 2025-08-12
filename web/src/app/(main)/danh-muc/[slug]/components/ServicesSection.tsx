/** @format */
"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Wrench,
  ThumbsUp,
  Globe,
  LayoutGrid,
  List,
} from "lucide-react";

import { ServiceAPI } from "@/api/services/services.api";
import PaginationCustom from "@/common/PaginationCustom";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceInterface } from "@/types/service";

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchServices = async () => {
    try {
      const limit = 8;
      setLoading(true);

      const res = await ServiceAPI.getServices({
        currentPage,
        limit,
      });

      if (res.status === 200) {
        const { services, total } = res.data as {
          services: ServiceInterface[];
          total: number;
        };
        setTotalPages(Math.ceil(total / limit));
        setServices(services);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const ServicesSkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div
            className="h-48 sm:h-56 lg:h-64 rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)] via-[var(--color-bg-accent)] to-[var(--color-bg-secondary)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
            style={{ boxShadow: "var(--shadow-default)" }}
          />
          <div className="h-4 rounded-lg w-3/4 bg-gradient-to-r from-[var(--color-bg-secondary)] via-[var(--color-bg-accent)] to-[var(--color-bg-secondary)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
          <div className="h-3 rounded-lg w-1/2 bg-gradient-to-r from-[var(--color-bg-secondary)] via-[var(--color-bg-accent)] to-[var(--color-bg-secondary)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen  w-full"
      style={{
        background: "var(--gradient-secondary)",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-accent-green-light)",
              color: "var(--color-accent-green)",
              border: "1px solid var(--color-border-light)",
            }}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Dịch vụ nổi bật</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ color: "var(--color-text-primary)" }}>
            Giải pháp{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-primary)" }}>
              Nội thất
            </span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0"
            style={{ color: "var(--color-text-secondary)" }}>
            Nâng tầm không gian sống với các dịch vụ thiết kế nội thất chuyên
            nghiệp, hiện đại và sang trọng.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 group">
              <div
                className="p-2 sm:p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "var(--color-accent-green-light)",
                  boxShadow: "var(--shadow-default)",
                }}>
                <Wrench
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "var(--color-accent-green)" }}
                />
              </div>
              <div className="text-center sm:text-left">
                <div
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}>
                  50+
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  Dự án hoàn thành
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div
                className="p-2 sm:p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "var(--color-accent-red-light)",
                  boxShadow: "var(--shadow-default)",
                }}>
                <ThumbsUp
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "var(--color-accent-red)" }}
                />
              </div>
              <div className="text-center sm:text-left">
                <div
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}>
                  95%
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  Khách hàng hài lòng
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div
                className="p-2 sm:p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "var(--color-primary-light)",
                  boxShadow: "var(--shadow-default)",
                }}>
                <Globe
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div className="text-center sm:text-left">
                <div
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}>
                  15+
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

        {/* Content */}
        {loading ? (
          <ServicesSkeletonLoader />
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && !loading && (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <div
                  className="rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-bg-accent)",
                    boxShadow: "var(--shadow-default)",
                  }}>
                  <Wrench
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>
                <h3
                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}>
                  Không tìm thấy dịch vụ
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "var(--color-text-secondary)" }}>
                  Vui lòng thử lại sau.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <PaginationCustom
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="absolute -top-20 sm:-top-32 lg:-top-40 -right-20 sm:-right-32 lg:-right-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full opacity-50 animate-pulse"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        />
        <div
          className="absolute -bottom-20 sm:-bottom-32 lg:-bottom-40 -left-20 sm:-left-32 lg:-left-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full opacity-50 animate-pulse"
          style={{
            backgroundImage: "var(--gradient-accent)",
            animationDelay: "2s",
          }}
        />

        {/* Additional decorative elements for interior design feel */}
        <div
          className="absolute top-1/4 right-1/4 w-2 h-16 sm:h-24 lg:h-32 rounded-full opacity-20 transform rotate-45"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-2 h-12 sm:h-16 lg:h-20 rounded-full opacity-20 transform -rotate-45"
          style={{ backgroundColor: "var(--color-accent-green)" }}
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

        /* Enhanced hover effects for professional feel */
        .group:hover {
          transform: translateY(-2px);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
