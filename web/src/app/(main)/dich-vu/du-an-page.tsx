/** @format */
"use client";
import { NewsAPI } from "@/api/news/news.api";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { NewsInterface } from "@/types/news";
import { ProjectInterface } from "@/types/project";
import { FormatUtils } from "@/utils/format";

import React, { useEffect, useState } from "react";

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProjects = async () => {
    let res = await ProjectAPI.getProjects({ currentPage, limit: 9999 });
    if (res.status === 200) {
      setTotal(res.data.total);
      setProjects(res.data.projects);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  return (
    <div className="">
      <div className="text-gray-800 container mx-auto">
        {/* Header */}
        <div className="py-16 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dự Án Nội Thất
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các dự án thiết kế và thi công nội thất thực tế từ cửa hàng
            chúng tôi. Cập nhật những xu hướng và giải pháp tối ưu không gian
            sống.
          </p>
        </div>

        {/* Project List */}
        <section className="py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <ProjectCard project={item} key={item.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
