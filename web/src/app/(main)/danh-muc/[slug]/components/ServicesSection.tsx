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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-48 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
          <div className="h-4 rounded-lg w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
          <div className="h-3 rounded-lg w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Dịch vụ nổi bật</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Giải pháp{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Công nghệ
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Nâng tầm doanh nghiệp với các dịch vụ công nghệ hiện đại, tối ưu và
            hiệu quả.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-green-100 p-2 rounded-full">
                <Wrench className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm">Dịch vụ triển khai</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-blue-100 p-2 rounded-full">
                <ThumbsUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm">Khách hàng hài lòng</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="bg-purple-100 p-2 rounded-full">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm">Ngành nghề phục vụ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <ServicesSkeletonLoader />
        ) : (
          <>
            <div className="grid gap-8 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Wrench className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Không tìm thấy dịch vụ
                </h3>
                <p className="text-gray-600">Vui lòng thử lại sau.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationCustom
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-50 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-50 animate-pulse"
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
      `}</style>
    </div>
  );
};

export default ServicesSection;
