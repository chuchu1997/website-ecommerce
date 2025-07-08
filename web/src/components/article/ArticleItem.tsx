/** @format */

import { News } from "@/types/ProjectInterface";
import Link from "next/link";
import Image from "next/image";
import SkeletonImage from "../skeleton/custom-skeleton";
interface ArticleListProps {
  articles: News[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="wrapper-product-list space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link
            href={`/blog/${article.slug}`}
            key={article.id}
            className="group space-y-2 block">
            <div className="aspect-video relative overflow-hidden rounded-md">
           
            <SkeletonImage imageSrc={article.imageUrl} imageLabel={article.title} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"/>

            </div>

            <div className="space-y-1">
              <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white leading-snug tracking-tight line-clamp-2">
                {article.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
