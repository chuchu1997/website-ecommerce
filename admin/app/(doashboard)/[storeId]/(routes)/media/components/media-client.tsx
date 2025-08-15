/** @format */

"use client";
import { ImageInterface, ImageMediaType } from "@/types/product";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import { Search, Filter, Grid3X3, List, Eye, Download } from "lucide-react";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";
import PaginationCustom from "@/components/common/PaginationCustom";

// Mock data for demo
const mockImageData: ImageInterface[] = [
  {
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    type: ImageMediaType.PRODUCT,
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    type: ImageMediaType.CATEGORY,
  },
  {
    url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300&h=300&fit=crop",
    type: ImageMediaType.BANNER,
  },
  {
    url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
    type: ImageMediaType.BRAND,
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
    type: ImageMediaType.NEWS,
  },
  {
    url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=300&fit=crop",
    type: ImageMediaType.SERVICE,
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop",
    type: ImageMediaType.PROJECT,
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    type: ImageMediaType.NONE,
  },
];

export const MediaClient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImageMedia, setTotalImageMedia] = useState(3);
  const [imageMedia, setImageMedia] = useState<ImageInterface[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<ImageMediaType | "ALL">("ALL");

  useEffect(() => {
    if (currentPage) {
      fetchImageMediaFromPage();
    }
  }, [currentPage]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const showDialog = useAlertDialog();

  const fetchImageMediaFromPage = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setImageMedia(mockImageData);
      setIsLoading(false);
    }, 500);
  };

  // ---- VI: Hiển thị tên loại bằng tiếng Việt
  const getTypeDisplayName = (type?: ImageMediaType) => {
    const typeMap: Record<ImageMediaType, string> = {
      [ImageMediaType.PRODUCT]: "Sản phẩm",
      [ImageMediaType.CATEGORYBANNER]: "Ảnh bìa danh mục",
      [ImageMediaType.CATEGORY]: "Danh mục",
      [ImageMediaType.BANNER]: "Ảnh bìa",
      [ImageMediaType.BRAND]: "Thương hiệu",
      [ImageMediaType.NEWS]: "Tin tức",
      [ImageMediaType.SERVICE]: "Dịch vụ",
      [ImageMediaType.PROJECT]: "Dự án",
      [ImageMediaType.NONE]: "Không xác định",
    };
    if (!type) return "Không xác định";
    return typeMap[type] || "Không xác định";
  };

  // ---- VI: Màu sắc tag theo loại
  const getTypeColor = (type?: ImageMediaType) => {
    const colors: Record<ImageMediaType, string> = {
      [ImageMediaType.PRODUCT]: "bg-blue-100 text-blue-800 border-blue-200",
      [ImageMediaType.CATEGORY]: "bg-green-100 text-green-800 border-green-200",
      [ImageMediaType.CATEGORYBANNER]:
        "bg-green-200 text-green-900 border-green-300",

      [ImageMediaType.BANNER]:
        "bg-purple-100 text-purple-800 border-purple-200",
      [ImageMediaType.BRAND]: "bg-orange-100 text-orange-800 border-orange-200",
      [ImageMediaType.NEWS]: "bg-red-100 text-red-800 border-red-200",
      [ImageMediaType.SERVICE]: "bg-cyan-100 text-cyan-800 border-cyan-200",
      [ImageMediaType.PROJECT]:
        "bg-indigo-100 text-indigo-800 border-indigo-200",
      [ImageMediaType.NONE]: "bg-gray-100 text-gray-600 border-gray-200",
    };
    return colors[type || ImageMediaType.NONE];
  };

  const filteredImages = imageMedia.filter((image) => {
    const matchesSearch =
      searchTerm === "" ||
      image.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "ALL" || image.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Xem ảnh (mở tab mới)
  const handleViewImage = (imageUrl: string) => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  // Tải ảnh (có fallback mở tab nếu CORS chặn)
  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const nameFromUrl = imageUrl.split("/").pop()?.split("?")[0] || "image";
      a.download = decodeURIComponent(nameFromUrl);
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Lỗi tải ảnh, mở ảnh trong tab mới:", error);
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thư viện ảnh
          </h1>
          <p className="text-gray-600">
            Quản lý và tổ chức tất cả hình ảnh của bạn
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm hình ảnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(e.target.value as ImageMediaType | "ALL")
                  }
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="ALL">Tất cả loại</option>
                  {Object.values(ImageMediaType).map((type) => (
                    <option key={type} value={type}>
                      {getTypeDisplayName(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Dạng lưới"
                  aria-label="Dạng lưới">
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Dạng danh sách"
                  aria-label="Dạng danh sách">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Images Grid/List */}
        {!loading && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden hover:-translate-y-0.5">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.url}
                        alt={`Ảnh ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Tag loại */}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                            image.type
                          )}`}>
                          {getTypeDisplayName(image.type)}
                        </span>
                      </div>

                      {/* Actions (không làm tối ảnh, dùng glass effect nhẹ) */}
                      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="pointer-events-auto flex gap-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md px-2 py-1">
                          <button
                            onClick={() => handleViewImage(image.url)}
                            className="p-2 rounded-full hover:bg-white transition-colors"
                            title="Xem ảnh"
                            aria-label="Xem ảnh">
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDownloadImage(image.url)}
                            className="p-2 rounded-full hover:bg-white transition-colors"
                            title="Tải xuống"
                            aria-label="Tải xuống">
                            <Download className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4 ring-1 ring-gray-200">
                      <img
                        src={image.url}
                        alt={`Ảnh ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
                            image.type
                          )}`}>
                          {getTypeDisplayName(image.type)}
                        </span>
                        <span className="text-sm text-gray-500 font-mono">
                          {image.url.split("/").pop()?.substring(0, 20)}...
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewImage(image.url)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Xem ảnh"
                        aria-label="Xem ảnh">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadImage(image.url)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Tải xuống"
                        aria-label="Tải xuống">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredImages.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy hình ảnh
                </h3>
                <p className="text-gray-500">
                  Hãy thử thay đổi từ khóa hoặc bộ lọc
                </p>
              </div>
            )}
          </>
        )}

        <Separator className="my-8" />

        <PaginationCustom
          totalPages={totalImageMedia}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
