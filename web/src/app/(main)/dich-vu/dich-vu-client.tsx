/** @format */
"use client";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceInterface } from "@/types/service";

import React, { useEffect, useState } from "react";

interface Props {
  servicesProps: ServiceInterface[];
}

const ServiceClient: React.FC<Props> = ({ servicesProps }) => {
  const [services, setServices] = useState<ServiceInterface[]>(servicesProps);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchServices = async () => {
    let res = await ProjectAPI.getProjects({ currentPage, limit: 9999 });
    if (res.status === 200) {
      setTotal(res.data.total);
      setServices(res.data.projects);
    }
  };
  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  return (
    <div className="">
      <div className="text-gray-800 container mx-auto">
        {/* Header */}
        <div className="py-16 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch vụ ở máy xây dựng mới
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các dự án thiết kế và thi công trong ngành xây dựng
          </p>
        </div>

        {/* Project List */}
        <section className="py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <ServiceCard service={item} key={item.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ServiceClient;
