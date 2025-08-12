import { NewsInterface } from "@/types/news";
import { FormatUtils } from "@/utils/format";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { ImageLoader } from "../image-loader";

export const NewsCard: React.FC<{ news: NewsInterface }> = ({ news }) => {
  return (
    <article className="
      group relative
      bg-[var(--color-bg)] 
      border border-[var(--color-border)]
      rounded-2xl 
      overflow-hidden
      shadow-[var(--shadow-default)] 
      hover:shadow-[var(--shadow-hover)]
      transition-all duration-500 ease-out
      hover:-translate-y-2
      hover:border-[var(--color-primary)]/30
    ">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/10 via-transparent to-transparent z-10" />
        
        <ImageLoader 
          src={news.imageUrl ?? ""} 
          alt={news.title} 
          fill
          className="
            w-full h-full object-cover 
            group-hover:scale-105 
            transition-transform duration-700 ease-out
          "
        />

        {/* Elegant Overlay Animation */}
        <div className="
          absolute inset-0 
          bg-gradient-to-br from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-primary)]/10
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-500 ease-out
        " />

        {/* Subtle Shimmer Effect */}
        <div className="
          absolute inset-0 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-300 ease-out
        ">
          <div className="
            absolute inset-0 
            bg-gradient-to-r from-transparent via-[var(--color-bg)]/20 to-transparent 
            transform -skew-x-12 
            translate-x-[-120%] 
            group-hover:translate-x-[120%] 
            transition-transform duration-1000 ease-out
          " />
        </div>

        {/* Date Badge */}
        <div className="
          absolute top-4 right-4 z-20
          bg-[var(--color-bg)]/90 
          backdrop-blur-sm
          border border-[var(--color-border)]
          rounded-xl 
          px-3 py-2
          shadow-md
          transform translate-y-2 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 ease-out delay-100
        ">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-[var(--color-primary)]" />
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">
              {FormatUtils.formatDate(news.createdAt)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="
          text-xl font-bold 
          text-[var(--color-text-primary)] 
          leading-tight
          group-hover:text-[var(--color-primary)]
          transition-colors duration-300 ease-out
          line-clamp-2
        ">
          {news.title}
        </h3>

        {/* Description */}
        <p className="
          text-[var(--color-text-secondary)] 
          leading-relaxed
          line-clamp-3
          text-sm
        ">
          {news.shortDescription}
        </p>

        {/* Read More Link */}
        <div className="pt-2">
          <Link 
            prefetch={true} 
            href={`/tin-tuc/${news.slug}`} 
            aria-label={news.title}  
            className="
              group/link
              inline-flex items-center gap-3
              text-[var(--color-primary)] 
              hover:text-[var(--color-primary-hover)]
              font-semibold text-sm
              transition-all duration-300 ease-out
            "
          >
            <span className="relative">
              Đọc bài viết
              <div className="
                absolute -bottom-0.5 left-0 right-0 h-0.5 
                bg-[var(--color-primary)] 
                transform origin-left scale-x-0
                group-hover/link:scale-x-100
                transition-transform duration-300 ease-out
              " />
            </span>
            
            <div className="
              flex items-center justify-center
              w-8 h-8
              bg-[var(--color-primary-light)]/30
              group-hover/link:bg-[var(--color-primary)]
              border border-[var(--color-primary)]/20
              group-hover/link:border-[var(--color-primary)]
              rounded-full
              transition-all duration-300 ease-out
              group-hover/link:shadow-md
            ">
              <ArrowRight className="
                w-4 h-4 
                text-[var(--color-primary)]
                group-hover/link:text-[var(--color-text-white)]
                transform group-hover/link:translate-x-0.5
                transition-all duration-300 ease-out
              " />
            </div>
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-green)]
        transform scale-x-0 origin-center
        group-hover:scale-x-100
        transition-transform duration-500 ease-out delay-200
      " />
    </article>
  );
};