/** @format */

import { ProjectInterface, ProjectType } from "@/types/project";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageLoader } from "../image-loader";

export const ProjectTypeLabel: Record<ProjectType, string> = {
  [ProjectType.HOME]: "Nhà ở",
  [ProjectType.APARTMENT]: "Chung cư",
  [ProjectType.HOTEL]: "Khách sạn",
  [ProjectType.INTERIOR]: "Nội thất",
  [ProjectType.COMMERCIAL]: "Thương mại",
  [ProjectType.RESTAURANT]: "Nhà hàng",
};
export const ProjectCard: React.FC<{ project: ProjectInterface }> = ({
  project,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-64">
        <ImageLoader
          src={project.imageUrl}
          alt={project.title}
          fill
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-sm bg-amber-600 px-2 py-1 rounded-full">
            {ProjectTypeLabel[project.type]}
          </span>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">{project.shortDescription}</p>
        <Link
          prefetch={true}
          href={`/du-an/${project.slug}`}
          className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center">
          Xem dự án
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
