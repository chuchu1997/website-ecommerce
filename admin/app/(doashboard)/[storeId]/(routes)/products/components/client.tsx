/** @format */

"use client";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Package, TrendingUp, Eye, Filter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductInterface } from "@/types/product";
import ProductAPI from "@/app/api/products/products.api";
import { useEffect, useState } from "react";
import { CardCommon } from "@/components/common/CardCommon";
import toast from "react-hot-toast";
import PaginationCustom from "@/components/common/PaginationCustom";
import { useDebounce } from "@/hooks/useDebounce";

export const ProductClient = () => {
  const { storeId } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 200);

  const showDialog = useAlertDialog();

  const getListProductsRelateWithStoreID = async () => {
    setLoading(true);
    const limit = 8;
    if (storeId) {
      try {
        let response = await ProductAPI.getListProducts({
          currentPage: search !== "" ? 1 : currentPage,
          limit: limit,
          storeID: Number(storeId),
          name: search,
        });
        if (response.status === 200) {
          const { products, total } = response.data as {
            products: ProductInterface[];
            total: number;
          };

          if (products) {
            setProducts(products);
            setTotalProduct(total);
            const totalPagesCal = Math.ceil(total / limit);
            setTotalPages(totalPagesCal);
          }
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getListProductsRelateWithStoreID();
  }, [debouncedSearch, currentPage]);

  // Calculate stats for dashboard cards
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const featuredCount = products.filter(product => product.isFeatured).length;
  const lowStockCount = products.filter(product => product.stock < 10).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Quản lý sản phẩm</h1>
                <p className="text-slate-600 mt-1">Quản lý tất cả sản phẩm trong cửa hàng của bạn</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10 pr-4 py-2.5 w-full sm:w-80 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Create Button */}
              <Button
                onClick={() => router.push(`/${storeId}/products/new`)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2.5 rounded-lg font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Tạo sản phẩm mới
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-blue-900">{totalProduct}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium">Sản phẩm nổi bật</p>
                  <p className="text-2xl font-bold text-emerald-900">{featuredCount}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-600 text-sm font-medium">Sắp hết hàng</p>
                  <p className="text-2xl font-bold text-amber-900">{lowStockCount}</p>
                </div>
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Tổng giá trị</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND',
                      maximumFractionDigits: 0 
                    }).format(totalValue)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-slate-600">
                <Eye className="w-4 h-4 mr-1" />
                Hiển thị {products.length} trong tổng số {totalProduct} sản phẩm
              </div>
              {search && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Kết quả cho:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                    "{search}"
                  </span>
                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-slate-600 font-medium">Đang tải sản phẩm...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {search ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
              </h3>
              <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                {search 
                  ? `Không có sản phẩm nào khớp với từ khóa "${search}". Hãy thử tìm kiếm với từ khóa khác.`
                  : "Bắt đầu bằng cách tạo sản phẩm đầu tiên cho cửa hàng của bạn."
                }
              </p>
              {!search && (
                <Button
                  onClick={() => router.push(`/${storeId}/products/new`)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo sản phẩm đầu tiên
                </Button>
              )}
              {search && (
                <Button
                  variant="outline"
                  onClick={() => setSearch("")}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
                  <CardCommon
                    title={product.name}
                    id={product.id}
                    image={product.images[0]?.url}
                    description={product.shortDescription ?? ""}
                    variant=""
                    onDelete={(id) => {
                      showDialog({
                        title: "Xóa sản phẩm?",
                        description:
                          "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
                        confirmText: "Xóa",
                        cancelText: "Hủy",
                        onConfirm: async () => {
                          const res = await ProductAPI.removeProduct(id);
                          if (res.status === 200) {
                            toast.success("Đã xóa sản phẩm thành công");
                            await getListProductsRelateWithStoreID();
                          }
                        },
                      });
                    }}
                    onEdit={(id) => {
                      router.push(`/${storeId}/products/${product.slug}`);
                    }}
                  />
                  
                  {/* Product Info Overlay */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          {product.stock} có sẵn
                        </span>
                        {product.isFeatured && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                            Nổi bật
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-slate-700">
                        {new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND',
                          maximumFractionDigits: 0 
                        }).format(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-slate-600">
                  Hiển thị <span className="font-medium text-slate-900">{((currentPage - 1) * 8) + 1}</span> - 
                  <span className="font-medium text-slate-900"> {Math.min(currentPage * 8, totalProduct)}</span> trong tổng số 
                  <span className="font-medium text-slate-900"> {totalProduct}</span> sản phẩm
                </div>
                
                <PaginationCustom
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};