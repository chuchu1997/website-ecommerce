"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { NewsAPI } from "@/api/news/news.api";
import PaginationCustom from "@/common/PaginationCustom";
import { NewsCard } from "@/components/ui/NewsCard";
import { NewsInterface } from "@/types/news";
import { 
  Newspaper, 
  Megaphone, 
  Globe, 
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  Filter,
  Search,
  Clock,
  Tag,
  Eye,
  Lightbulb,
  Palette
} from "lucide-react";
import Link from "next/link";

const NewsSection = () => {
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const isMountedRef = useRef(false);

  const newsCategories = [
    { id: "all", label: "Tất cả tin tức", icon: Globe },
    { id: "trends", label: "Xu hướng thiết kế", icon: TrendingUp },
    { id: "projects", label: "Dự án mới", icon: Lightbulb },
    { id: "tips", label: "Mẹo trang trí", icon: Palette },
    { id: "events", label: "Sự kiện", icon: Calendar },
    { id: "company", label: "Tin công ty", icon: Users }
  ];

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const limit = 12;

      const res = await NewsAPI.getNews({ currentPage, limit });

      if (res.status === 200) {
        const { articles, total } = res.data as {
          articles: NewsInterface[];
          total: number;
        };
        setNews(articles);
        setTotalPages(Math.ceil(total / limit));
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isMountedRef.current) {
      fetchNews();
    } else {
      isMountedRef.current = true;
      fetchNews();
    }
  }, [fetchNews]);

  const NewsSkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div 
            className="h-48 sm:h-56 lg:h-64 rounded-2xl bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
            style={{ 
              background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
              backgroundSize: '200% 100%'
            }}
          />
          <div className="space-y-3">
            <div 
              className="h-4 rounded-lg bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{ 
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: '200% 100%'
              }}
            />
            <div 
              className="h-4 w-3/4 rounded-lg bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{ 
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: '200% 100%'
              }}
            />
            <div 
              className="h-3 w-1/2 rounded-lg bg-gradient-to-r bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
              style={{ 
                background: `linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-accent) 50%, var(--color-bg-secondary) 75%)`,
                backgroundSize: '200% 100%'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const FeaturedNewsCard = ({ article }: { article: NewsInterface }) => (
    <Link 
    prefetch
    href = {`/tin-tuc/${article.slug}`}
      className="col-span-full lg:col-span-2 rounded-3xl p-6 sm:p-8 group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'var(--shadow-default)',
        border: '1px solid var(--color-border-light)'
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6 h-full">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="w-full h-48 sm:h-64 lg:h-full rounded-2xl"
            style={{ 
              backgroundColor: 'var(--color-bg-accent)',
              backgroundImage: `url(${article.imageUrl || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-white)'
              }}
            >
              Nổi bật
            </span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.createdAt || '').toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>12.000 lượt xem</span>
            </div>
          </div>
          
          <h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight group-hover:text-opacity-80 transition-all duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {article.title}
          </h2>
          
        
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)'
                }}
              >
              A
              </div>
           
            </div>
            
            <button 
              className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-white)'
              }}
            >
              <span>Đọc thêm</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--gradient-secondary)' }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <div 
          className="absolute top-20 right-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--color-accent-red)' }}
        />
        <div 
          className="absolute bottom-32 left-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full blur-3xl animate-pulse"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            animationDelay: '1.5s'
          }}
        />
        
        {/* Magazine/newspaper pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16 h-full w-full gap-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={`${i % 3 === 0 ? 'h-full' : i % 2 === 0 ? 'h-3/4' : 'h-1/2'}`} style={{ backgroundColor: 'var(--color-text-primary)' }} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div 
            className="inline-flex items-center justify-center space-x-3 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--color-accent-red-light)',
              color: 'var(--color-accent-red)',
              border: '1px solid var(--color-border-light)'
            }}
          >
            <Megaphone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Tin tức & Cảm hứng thiết kế</span>
          </div>

          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Khám phá
            <br className="sm:hidden" />
            <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'var(--gradient-primary)' }}
            >
              {" "}thế giới nội thất
            </span>
          </h1>

          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Cập nhật xu hướng thiết kế mới nhất, mẹo trang trí thông minh và 
            những câu chuyện truyền cảm hứng từ thế giới kiến trúc nội thất.
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="group">
              <div 
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-bg)',
                  boxShadow: 'var(--shadow-default)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: 'var(--color-accent-red-light)' }}
                >
                  <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-accent-red)' }} />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  200+
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Bài viết
                </div>
              </div>
            </div>

            <div className="group">
              <div 
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-bg)',
                  boxShadow: 'var(--shadow-default)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  15+
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Chuyên mục
                </div>
              </div>
            </div>

            <div className="group">
              <div 
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-bg)',
                  boxShadow: 'var(--shadow-default)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: 'var(--color-accent-green-light)' }}
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-accent-green)' }} />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  50K+
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Độc giả
                </div>
              </div>
            </div>

            <div className="group">
              <div 
                className="p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-bg)',
                  boxShadow: 'var(--shadow-default)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: 'var(--color-bg-accent)' }}
                >
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-text-secondary)' }} />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  24/7
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Cập nhật
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Section */}
        <div 
          className="rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12"
          style={{ 
            backgroundColor: 'var(--color-bg)',
            boxShadow: 'var(--shadow-default)',
            border: '1px solid var(--color-border-light)'
          }}
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto sm:max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, xu hướng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '2px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
               
                }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Chuyên mục
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Chọn</span>
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {newsCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category.id 
                          ? 'shadow-md' 
                          : 'hover:shadow-sm'
                      }`}
                      style={{ 
                        backgroundColor: selectedCategory === category.id 
                          ? 'var(--color-primary)' 
                          : 'var(--color-bg-secondary)',
                        color: selectedCategory === category.id 
                          ? 'var(--color-text-white)' 
                          : 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
            <div className="text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
              Hiển thị{" "}
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {news.length}
              </span>{" "}
              bài viết
              {searchQuery && (
                <span>
                  {" "}cho từ khóa "
                  <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                    "{searchQuery}"
                  </span>
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Trang {currentPage} / {totalPages}
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <NewsSkeletonLoader />
        ) : (
          <>
            {/* Featured Article + Regular Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
              {news.length > 0 && <FeaturedNewsCard article={news[0]} />}
              
              {news.slice(1).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>

            {/* Enhanced Empty State */}
            {news.length === 0 && !loading && (
              <div 
                className="text-center py-12 sm:py-16 lg:py-20 rounded-3xl"
                style={{ 
                  backgroundColor: 'var(--color-bg)',
                  boxShadow: 'var(--shadow-default)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-bg-accent)' }}
                >
                  <Newspaper className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Chưa có bài viết nào
                </h3>
                <p className="text-sm sm:text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn chuyên mục khác để khám phá nội dung thú vị
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="inline-flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundImage: 'var(--gradient-primary)',
                    color: 'var(--color-text-white)',
                    boxShadow: 'var(--shadow-default)'
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Xem tất cả bài viết
                </button>
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

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Enhanced hover effects */
        .group:hover {
          transform: translateY(-2px);
        }
        
        /* Smooth transitions */
        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NewsSection;