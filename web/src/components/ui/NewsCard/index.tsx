import { NewsInterface } from "@/types/news";
import { FormatUtils } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageLoader } from "../image-loader";

export const NewsCard: React.FC<{ news: NewsInterface }> = ({ news }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-48">
        <ImageLoader 
          src={news.imageUrl ??""} 
          alt={news.title} 
          fill
          className="w-full h-48 object-cover"
        />
        {/* <div className="absolute top-4 left-4">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            "CATEGORY"
          </span>
        </div> */}
           {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      </div>

      
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{FormatUtils.formatDate(news.createdAt)}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h3>
        <p className="text-gray-600 mb-4">{news.shortDescription}</p>

        <Link prefetch={true} href = {`/tin-tuc/${news.slug}`} aria-label={news.title}  className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center">
          Xem bài viết 
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
