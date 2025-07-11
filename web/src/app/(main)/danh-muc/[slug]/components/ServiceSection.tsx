/** @format */

"use client";
import { ServiceAPI } from "@/api/services/services.api";
import PaginationCustom from "@/common/PaginationCustom";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceInterface } from "@/types/service";
import { useEffect, useState } from "react";

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    fetchServices();
  }, []);
  const fetchServices = async () => {
    try {
      const limit = 8;

      setLoading(true);
      let res = await ServiceAPI.getServices({
        currentPage: currentPage,
        limit: limit,
      });
      // setServices(res.data.services);
      if (res.status === 200) {
        const { services, total } = res.data as {
          services: ServiceInterface[];
          total: number;
        };
        // const totalPagesCal = Math.ceil(total / limit);
        setTotalPages(Math.ceil(total / limit));
        setServices(services);
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Dịch vụ </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Giải pháp công nghệ toàn diện cho doanh nghiệp hiện đại
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
      <PaginationCustom
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default ServicesSection;
