/** @format */

import { ProjectInterface, ProjectType } from "@/types/project";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
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
    <article
      className="
      group relative
      bg-[var(--color-bg)] 
      border border-[var(--color-border)]
      rounded-2xl 
      overflow-hidden
      shadow-[var(--shadow-default)] 
      hover:shadow-[var(--shadow-hover)]
      transition-all duration-500 ease-out
      hover:-translate-y-3
      hover:border-[var(--color-primary)]/40
    ">
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden">
        <ImageLoader
          src={project.imageUrl}
          alt={project.title}
          fill
          className="
            w-full h-full object-cover 
            group-hover:scale-110 
            transition-transform duration-700 ease-out
          "
        />

        {/* Sophisticated Overlay */}
        <div
          className="
          absolute inset-0 
          bg-gradient-to-t from-[var(--color-text-primary)]/80 via-[var(--color-text-primary)]/20 to-transparent
          group-hover:from-[var(--color-text-primary)]/60 group-hover:via-[var(--color-text-primary)]/10
          transition-all duration-500 ease-out
        "
        />

        {/* Premium Shimmer Effect */}
        <div
          className="
          absolute inset-0 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-400 ease-out
        ">
          <div
            className="
            absolute inset-0 
            bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent 
            transform -skew-x-12 
            translate-x-[-120%] 
            group-hover:translate-x-[120%] 
            transition-transform duration-1200 ease-out
          "
          />
        </div>

        {/* Project Type Badge */}
        <div
          className="
          absolute top-4 left-4 z-20
          transform translate-y-2 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 ease-out delay-100
        ">
          <div
            className="
            flex items-center gap-2
            bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)]
            text-[var(--color-text-white)]
            px-4 py-2 
            rounded-full
            shadow-lg
            backdrop-blur-sm
            border border-[var(--color-primary-light)]/30
          ">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-semibold tracking-wide">
              {ProjectTypeLabel[project.type]}
            </span>
          </div>
        </div>

        {/* View Project Overlay Button */}
        <div
          className="
          absolute inset-0 
          flex items-center justify-center
          opacity-0 
          group-hover:opacity-100
          transition-all duration-300 ease-out delay-200
          z-10
        ">
          <div
            className="
            flex items-center gap-3
            bg-[var(--color-bg)]/95 
            backdrop-blur-md
            border border-[var(--color-border)]
            px-6 py-3 
            rounded-full
            shadow-xl
            transform scale-90 
            group-hover:scale-100
            transition-transform duration-300 ease-out
          ">
            <Eye className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              Xem chi tiết
            </span>
          </div>
        </div>

        {/* Bottom Title Overlay */}
        <div
          className="
          absolute bottom-0 left-0 right-0 
          bg-gradient-to-t from-[var(--color-text-primary)]/90 to-transparent
          p-6 pb-4
          transform translate-y-2
          group-hover:translate-y-0
          transition-transform duration-300 ease-out
        ">
          <h3
            className="
            text-xl font-bold 
            text-[var(--color-text-white)] 
            leading-tight
            mb-2
          ">
            {project.title}
          </h3>
          <p
            className="
            text-[var(--color-text-white)]/80 
            text-sm 
            leading-relaxed
            line-clamp-2
          ">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Mobile Title (Hidden on hover, shown on mobile) */}
        <div
          className="
          lg:group-hover:opacity-0 lg:group-hover:-translate-y-2
          transition-all duration-300 ease-out
          lg:absolute lg:pointer-events-none
        ">
          <h3
            className="
            text-xl font-bold 
            text-[var(--color-text-primary)] 
            leading-tight mb-2
            lg:hidden
          ">
            {project.title}
          </h3>
          <p
            className="
            text-[var(--color-text-secondary)] 
            leading-relaxed mb-4
            text-sm
            line-clamp-2
            lg:hidden
          ">
            {project.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div
          className="
          transform translate-y-2 opacity-80
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 ease-out delay-100
        ">
          <Link
            prefetch={true}
            href={`/du-an/${project.slug}`}
            aria-label={`Xem dự án ${project.title}`}
            className="
              group/link
              inline-flex items-center gap-4
              w-full
              text-[var(--color-primary)] 
              hover:text-[var(--color-primary-hover)]
              font-semibold text-sm
              p-4
              bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-accent)]
              hover:from-[var(--color-primary-light)]/30 hover:to-[var(--color-accent-green-light)]/50
              border border-[var(--color-border)]
              hover:border-[var(--color-primary)]/40
              rounded-xl
              shadow-sm hover:shadow-md
              transition-all duration-300 ease-out
            ">
            <div className="flex-1 flex items-center gap-3">
              <span className="relative">
                Khám phá dự án
                <div
                  className="
                  absolute -bottom-0.5 left-0 right-0 h-0.5 
                  bg-[var(--color-primary)] 
                  transform origin-left scale-x-0
                  group-hover/link:scale-x-100
                  transition-transform duration-300 ease-out
                "
                />
              </span>
            </div>

            <div
              className="
              flex items-center justify-center
              w-9 h-9
              bg-[var(--color-primary-light)]/40
              group-hover/link:bg-[var(--color-primary)]
              border border-[var(--color-primary)]/30
              group-hover/link:border-[var(--color-primary)]
              rounded-full
              transition-all duration-300 ease-out
              group-hover/link:shadow-lg
            ">
              <ArrowRight
                className="
                w-4 h-4 
                text-[var(--color-primary)]
                group-hover/link:text-[var(--color-text-white)]
                transform group-hover/link:translate-x-0.5
                transition-all duration-300 ease-out
              "
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Elegant Bottom Accent */}
      <div
        className="
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent-green)] to-[var(--color-primary)]
        transform scale-x-0 origin-center
        group-hover:scale-x-100
        transition-transform duration-600 ease-out delay-300
      "
      />

      {/* Corner Decoration */}
      <div
        className="
        absolute top-0 right-0
        w-16 h-16
        bg-gradient-to-bl from-[var(--color-primary-light)]/20 to-transparent
        transform translate-x-8 -translate-y-8 rotate-45
        group-hover:translate-x-6 group-hover:-translate-y-6
        transition-transform duration-500 ease-out
      "
      />
    </article>
  );
};
