/** @format */

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ImageLoader } from "../../image-loader";
import Menubar from "./Menubar";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { usePathname, useRouter } from "next/navigation";
import { RecursiveCategoryTree } from "./RecursiveCategoryTree";
import { useCartContext } from "@/context/cart-context";
import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import Image from "next/image";

// TypeScript interfaces

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price?: number;
}

// Mock data for demonstration with icons

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 999,
  },
  {
    id: "2",
    title: "Samsung Galaxy S24",
    description: "Premium Android smartphone",
    price: 899,
  },
  {
    id: "3",
    title: "MacBook Pro M3",
    description: "Professional laptop for creators",
    price: 1599,
  },
];

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductInterface[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const [hoveredParentCategory, setHoveredParentCategory] = useState<
    string | null
  >(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  const pathname = usePathname();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const router = useRouter();

  const { cartQuantity } = useCartContext();

  // Mock search API function
  const searchAPI = async (query: string): Promise<ProductInterface[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!query.trim()) return [];

    let res = await ProductAPI.getProductByName(query);

    return res.data.products;
  };

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      searchAPI(debouncedSearchQuery)
        .then((results) => {
          setSearchResults(results);
          setIsSearching(false);
        })
        .catch(() => {
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);
  // Focus search input when dialog opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryHover = (categoryId: string) => {
    // Clear any existing timeout
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveCategory(categoryId);
    // Set the first category as default hovered category
    if (categoryId === "products" && categories.length > 0) {
      setHoveredParentCategory(categories[0].id.toString());
    }
  };

  const handleCategoryLeave = () => {
    // Set a timeout to close the menu after a delay
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
      setHoveredParentCategory(null);
    }, 100);
  };

  const handleMenuEnter = () => {
    // Clear the timeout when entering the menu
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
  };

  const handleMenuLeave = () => {
    // Close the menu when leaving the menu area
    setActiveCategory(null);
    setHoveredParentCategory(null);
  };

  const handleParentCategoryHover = (categoryId: string) => {
    setHoveredParentCategory(categoryId);
  };

  const handleMobileCategoryToggle = (categoryId: string) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId
    );
  };

  const getActiveParentCategory = () => {
    return categories.find(
      (cat) => cat.id.toString() === hoveredParentCategory
    );
  };

  const fetchCategories = async () => {
    let res = await CategoryAPI.getAllCategoriesOfStore({
      justGetParent: true,
    });
    const cate = res.data.categories as CategoryInterface[];

    if (!cate || cate.length <= 0) return;

    if (cate) {
      const mainCate = cate[0];

      if (mainCate.slug !== "san-pham") return null;

      setCategories(mainCate.subCategories);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed left-0 right-0 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="md:hidden mr-2">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Menu">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  priority
                  alt="logo"
                  src="/logo.jpg"
                  width={55}
                  height={55}
                />
              </Link>
              {/* <div className="flex">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Logo
                </span>
              </div> */}
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Products with Mega Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => handleCategoryHover("products")}
                  onMouseLeave={handleCategoryLeave}>
                  <button className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200">
                    Danh mục
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {/* Two-Column Mega Menu */}
                  {activeCategory === "products" && (
                    <div
                      className="absolute left-0 top-full mt-0 w-[800px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex"
                      onMouseEnter={handleMenuEnter}
                      onMouseLeave={handleMenuLeave}>
                      {/* Left Column - Parent Categories */}
                      <div className="w-1/3 bg-gray-50 rounded-l-xl p-6 border-r border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                          Danh mục sản phẩm
                        </h3>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              onClick={() => {
                                router.push(`/danh-muc/${category.slug}`);
                              }}
                              onMouseEnter={() =>
                                handleParentCategoryHover(
                                  category.id.toString()
                                )
                              }
                              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                hoveredParentCategory === category.id.toString()
                                  ? "bg-blue-100 text-blue-700 shadow-sm"
                                  : "hover:bg-white hover:shadow-sm text-gray-700"
                              }`}>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {category.subCategories.length} items
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Child Categories */}
                      <div className="w-2/3 p-6">
                        {getActiveParentCategory() ? (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                              {getActiveParentCategory()?.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                              {getActiveParentCategory()?.subCategories.map(
                                (subcategory) => (
                                  <a
                                    key={subcategory.id}
                                    href={`/danh-muc/${subcategory.slug}`}
                                    className="group gap-x-2 flex items-start p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200">
                                    <ImageLoader
                                      className="rounded-md"
                                      src={subcategory.imageUrl}
                                      alt={subcategory.name}
                                      width={40}
                                      height={20}
                                    />

                                    <div className="flex-1">
                                      <h4 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                        {subcategory.name}
                                      </h4>
                                      {subcategory.description && (
                                        <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-200 leading-relaxed">
                                          {subcategory.description}
                                        </p>
                                      )}
                                    </div>
                                  </a>
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">
                              Hover over a category to see subcategories
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href="/gioi-thieu"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Giới thiệu
                </a>
                <a
                  href="/lien-he"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Liên hệ
                </a>
                <a
                  href="/tin-tuc"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Tin tức
                </a>
              </div>
            </div>
            <button
              onClick={handleSearchOpen}
              className="sm:hidden border border-gray-300 flex-1 mx-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Search">
              <div className="flex items-center gap-x-2">
                <Search className="h-5 w-5" />
                <span className="text-sm line-clamp-1">Tìm kiêm sản phẩm</span>
              </div>
            </button>
            {/* <button
              onClick={handleSearchOpen}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Search">
              <Search className="h-5 w-5" />
            </button> */}
            {/* Right Side - Cart & Search */}
            <div className="flex ml-auto items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={handleSearchOpen}
                className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Search">
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => {
                  router.push("/gio-hang");
                }}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              </button>
            </div>
          </div>
          <div className="sm:hidden">
            <Menubar />
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-3 max-h-[70vh] overflow-y-auto">
                {/* Products with Collapsible Categories */}
                <div className="space-y-2">
                  <RecursiveCategoryTree categories={categories} />
                </div>

                {/* About Link */}
                <a
                  href="/gioi-thieu"
                  className="flex items-center px-4 py-3 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                  Giới thiệu
                </a>

                {/* Contact Link */}
                <a
                  href="/lien-he"
                  className="flex items-center px-4 py-3 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                  Liên hệ
                </a>
                <a
                  href="/tin-tuc"
                  className="flex items-center px-4 py-3 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                  Tin tức
                </a>

                {/* Mobile Menu Footer */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-500">Need help?</span>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Support Center
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Dialog/Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex   justify-center p-4">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleSearchClose}></div>

          {/* Modal panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Tìm kiếm{" "}
                </h3>
              </div>
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={"Tìm kiếm ..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto ">
              {isSearching && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
                  <p className="text-gray-500">Đang tìm kiếm ...</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {searchResults.length} sản phẩm
                    {searchResults.length !== 1 ? "s" : ""} tìm thấy
                  </p>
                  {searchResults.map((result) => (
                    <Link
                      href={`/san-pham/${result.slug}`}
                      key={result.id}
                      className="group p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex gap-x-2 items-center">
                            <ImageLoader
                              height={60}
                              width={60}
                              src={result.images[0].url}
                              alt={result.name}
                              className="rounded-lg object-contain"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                {result.name}
                              </h4>
                              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                                {result.shortDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                        {result.price && (
                          <div className="ml-4 flex-shrink-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
                              {FormatUtils.formatPriceVND(result.price)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">
                    Không tìm thấy sản phẩm
                  </p>
                  <p className="text-gray-500 text-center">
                    Không tìm thấy được sản phẩm nào với từ khóa bạn cần tìm "
                    <span className="font-medium"> {searchQuery}</span>"
                  </p>
                </div>
              )}

              {!searchQuery && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">
                    Bắt đầu tìm kiếm
                  </p>
                  <p className="text-gray-500 text-center">
                    Nhập từ khóa về sản phẩm
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
