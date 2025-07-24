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
import { cn } from "@/lib/utils";

// TypeScript interfaces
interface SearchResult {
  id: string;
  title: string;
  description: string;
  price?: number;
}

// Mock data for demonstration
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
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search API function
  const searchAPI = async (query: string): Promise<ProductInterface[]> => {
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

  // Close mobile menu on route change
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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      let res = await CategoryAPI.getAllCategoriesOfStore({
        justGetParent: true,
      });
      const cate = res.data.categories as CategoryInterface[];
      setCategories(cate || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handler functions
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

  const handleMegaMenuHover = (categoryId: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveMegaMenu(categoryId);
    // Set the first subcategory as default hovered category
    const category = categories.find((cat) => cat.id.toString() === categoryId);
    if (category && category.subCategories.length > 0) {
      setHoveredParentCategory(category.subCategories[0].id.toString());
    }
  };

  const handleMegaMenuLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredParentCategory(null);
    }, 100);
  };

  const handleMenuEnter = () => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
  };

  const handleMenuLeave = () => {
    setActiveMegaMenu(null);
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

  // Get category that should show megamenu
  const getActiveMegaMenuCategory = () => {
    return categories.find((cat) => cat.id.toString() === activeMegaMenu);
  };

  // Get the currently hovered parent category for megamenu
  const getActiveParentCategory = () => {
    const megaMenuCategory = getActiveMegaMenuCategory();
    if (!megaMenuCategory) return null;

    return megaMenuCategory.subCategories.find(
      (cat) => cat.id.toString() === hoveredParentCategory
    );
  };

  // Check if category has subcategories (should show megamenu)
  const hasMegaMenu = (category: CategoryInterface) => {
    return category.subCategories && category.subCategories.length > 0;
  };

  // Get category display name based on variant
  const getCategoryDisplayName = (category: CategoryInterface) => {
    switch (category.variant) {
      case "SERVICES":
        return "Dịch vụ";
      case "PROJECTS":
        return "Dự án";
      default:
        return category.name;
    }
  };

  // Dynamic text color based on scroll state
  const getTextColor = () => {
    //  return pathname === "/" && !isScrolled
    //   ? "text-white hover:text-blue-200"
    //   : "text-gray-900 hover:text-blue-600";
    return "text-gray-900 hover:text-blue-600";
  };

  return (
    <>
      <header
        // className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        //   isScrolled || pathname !== "/"
        //     ? "bg-white/95 backdrop-blur-md shadow-lg"
        //     : "bg-transparent"
        // }`
        // }
        className={`fixed w-full top-0 z-50 transition-all duration-300 
            bg-white/95 backdrop-blur-md shadow-lg
           `}>
        <div className="container mx-auto px-2 sm:px-4 py-4 ">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="lg:hidden mr-2">
              <button
                onClick={handleMobileMenuToggle}
                className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                aria-label="Menu">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" prefetch={true}>
              <Image
                priority
                alt="logo"
                src="/logo.png"
                width={60}
                height={60}
                className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Dynamic Categories with Megamenus */}
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() =>
                      hasMegaMenu(category) &&
                      handleMegaMenuHover(category.id.toString())
                    }
                    onMouseLeave={handleMegaMenuLeave}>
                    {hasMegaMenu(category) ? (
                      // Categories with megamenu
                      <button
                        className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-100 flex items-center`}>
                        {getCategoryDisplayName(category)}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    ) : (
                      // Categories without megamenu (direct links)
                      <Link
                        prefetch={true}
                        href={`/danh-muc/${category.slug}`}
                        className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                        {getCategoryDisplayName(category)}
                      </Link>
                    )}

                    {/* Megamenu */}
                    {hasMegaMenu(category) &&
                      activeMegaMenu === category.id.toString() && (
                        <div
                          className="absolute left-0 top-full mt-0 w-[800px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex"
                          onMouseEnter={handleMenuEnter}
                          onMouseLeave={handleMenuLeave}>
                          {/* Left Column - Parent Categories */}
                          <div className="w-1/3 bg-gray-50 rounded-l-xl p-6 border-r border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                              {getCategoryDisplayName(category)}
                            </h3>
                            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                              {category.subCategories.map((subcategory) => (
                                <div
                                  key={subcategory.id}
                                  onClick={() => {
                                    router.push(
                                      `/danh-muc/${subcategory.slug}`
                                    );
                                  }}
                                  onMouseEnter={() =>
                                    handleParentCategoryHover(
                                      subcategory.id.toString()
                                    )
                                  }
                                  className={`p-3 rounded-lg cursor-pointer transition-all duration-100 ${
                                    hoveredParentCategory ===
                                    subcategory.id.toString()
                                      ? "bg-blue-100 text-blue-700 shadow-sm"
                                      : "hover:bg-white hover:shadow-sm text-gray-700"
                                  }`}>
                                  <div className="font-medium">
                                    {subcategory.name}
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
                                  {getActiveParentCategory()?.subCategories?.map(
                                    (childCategory) => (
                                      <Link
                                        prefetch={true}
                                        key={childCategory.id}
                                        href={`/danh-muc/${childCategory.slug}`}
                                        className="group p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200">
                                        <div className="flex items-start space-x-3">
                                          {/* <ImageLoader
                                            className="rounded-lg flex-shrink-0 "
                                            src={childCategory.imageUrl}
                                            alt={childCategory.name}
                                            width={200}
                                            height={48}
                                          /> */}
                                          <Image
                                            className="rounded-lg flex-shrink-0 "
                                            src={childCategory.imageUrl}
                                            alt={childCategory.name}
                                            width={48}
                                            height={48}></Image>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                              {childCategory.name}
                                            </h4>
                                            {childCategory.description && (
                                              <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
                                                {childCategory.description}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  ) || (
                                    // If no child categories, show the parent category info
                                    <div className="col-span-2 text-center py-8">
                                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Image
                                          className="rounded-lg flex-shrink-0 "
                                          src={
                                            getActiveParentCategory()
                                              ?.imageUrl ?? ""
                                          }
                                          alt={
                                            getActiveParentCategory()?.name ??
                                            ""
                                          }
                                          width={32}
                                          height={32}></Image>
                                      </div>
                                      <h4 className="font-medium text-gray-900 mb-2">
                                        {getActiveParentCategory()?.name}
                                      </h4>
                                      <p className="text-sm text-gray-500">
                                        {getActiveParentCategory()?.description}
                                      </p>
                                      <Link
                                        href={`/danh-muc/${
                                          getActiveParentCategory()?.slug
                                        }`}
                                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-100">
                                        Xem tất cả
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">
                                  Hover over a category to see details
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}

                {/* Static Navigation Links */}
                <Link
                  prefetch={true}
                  href="/gioi-thieu"
                  className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                  Giới thiệu
                </Link>
                <Link
                  prefetch={true}
                  href="/lien-he"
                  className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                  Liên hệ
                </Link>
                {/* <Link
                  href="/tin-tuc"
                  className={`${getTextColor()} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                  Tin tức
                </Link> */}
              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={handleSearchOpen}
              className="sm:hidden border border-gray-300 bg-white flex-1 mx-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Search">
              <div className="flex items-center gap-x-2">
                <Search className="h-5 w-5" />
                <span className="text-sm line-clamp-1">Tìm kiếm sản phẩm</span>
              </div>
            </button>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSearchOpen}
                className={`${getTextColor()} hidden sm:block px-3 py-2 text-sm font-medium transition-colors duration-200`}
                aria-label="Search">
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/gio-hang"
                passHref
                prefetch={true}
                className={cn(
                  getTextColor(),
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200 inline-flex items-center"
                )}>
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="mt-4 shadow-md rounded-lg md:hidden ring-1 ring-gray-200 bg-white
">
              <div className="px-3 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
                {/* Dynamic Categories for Mobile */}
                {categories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    {hasMegaMenu(category) ? (
                      // Categories with subcategories - expandable
                      <div className="space-y-1">
                        <button
                          onClick={() =>
                            handleMobileCategoryToggle(category.id.toString())
                          }
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                          <span className="truncate pr-2">
                            {getCategoryDisplayName(category)}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transform transition-transform duration-200 flex-shrink-0 ${
                              expandedMobileCategory === category.id.toString()
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {/* Two-column layout for subcategories */}
                        {expandedMobileCategory === category.id.toString() && (
                          <div className="bg-gray-50 rounded-xl p-2 mt-2">
                            <div className="flex gap-1 h-72">
                              {/* Left Column - Parent Categories */}
                              <div className="w-2/5 bg-white rounded-lg p-2 border-r border-gray-200 overflow-y-auto">
                                <h4 className="text-xs font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2 truncate">
                                  {getCategoryDisplayName(category)}
                                </h4>
                                <div className="space-y-1">
                                  {category.subCategories.map((subcategory) => (
                                    <div
                                      key={subcategory.id}
                                      onClick={() => {
                                        if (
                                          subcategory.subCategories &&
                                          subcategory.subCategories.length > 0
                                        ) {
                                          setHoveredParentCategory(
                                            subcategory.id.toString()
                                          );
                                        } else {
                                          router.push(
                                            `/danh-muc/${subcategory.slug}`
                                          );
                                        }
                                      }}
                                      className={`p-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                        hoveredParentCategory ===
                                        subcategory.id.toString()
                                          ? "bg-blue-100 text-blue-700"
                                          : "hover:bg-gray-100 text-gray-700"
                                      }`}>
                                      <div className="text-xs font-medium truncate">
                                        {subcategory.name}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Child Categories */}
                              <div className="w-3/5 bg-white rounded-lg p-2 overflow-y-auto">
                                {hoveredParentCategory &&
                                category.subCategories.find(
                                  (cat) =>
                                    cat.id.toString() === hoveredParentCategory
                                ) ? (
                                  <>
                                    <h4 className="text-xs font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2 truncate">
                                      {
                                        category.subCategories.find(
                                          (cat) =>
                                            cat.id.toString() ===
                                            hoveredParentCategory
                                        )?.name
                                      }
                                    </h4>
                                    <div className="space-y-1.5">
                                      {category.subCategories
                                        .find(
                                          (cat) =>
                                            cat.id.toString() ===
                                            hoveredParentCategory
                                        )
                                        ?.subCategories?.map(
                                          (childCategory) => (
                                            <Link
                                              key={childCategory.id}
                                              href={`/danh-muc/${childCategory.slug}`}
                                              className="group flex items-start gap-2 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-200">
                                              <Image
                                                className="rounded-md flex-shrink-0"
                                                src={childCategory.imageUrl}
                                                alt={childCategory.name}
                                                width={24}
                                                height={24}
                                              />
                                              <div className="flex-1 min-w-0">
                                                <h5 className="text-xs font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                                  {childCategory.name}
                                                </h5>
                                                {childCategory.description && (
                                                  <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2 leading-tight">
                                                    {childCategory.description}
                                                  </p>
                                                )}
                                              </div>
                                            </Link>
                                          )
                                        ) || (
                                        // If no child categories, show the parent category info
                                        <div className="text-center py-3">
                                          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <ImageLoader
                                              className="rounded-md"
                                              src={
                                                category.subCategories.find(
                                                  (cat) =>
                                                    cat.id.toString() ===
                                                    hoveredParentCategory
                                                )?.imageUrl ?? ""
                                              }
                                              alt={
                                                category.subCategories.find(
                                                  (cat) =>
                                                    cat.id.toString() ===
                                                    hoveredParentCategory
                                                )?.name ?? ""
                                              }
                                              width={20}
                                              height={20}
                                            />
                                          </div>
                                          <h5 className="text-xs font-medium text-gray-900 mb-2 truncate">
                                            {
                                              category.subCategories.find(
                                                (cat) =>
                                                  cat.id.toString() ===
                                                  hoveredParentCategory
                                              )?.name
                                            }
                                          </h5>
                                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                            {
                                              category.subCategories.find(
                                                (cat) =>
                                                  cat.id.toString() ===
                                                  hoveredParentCategory
                                              )?.description
                                            }
                                          </p>
                                          <Link
                                            href={`/danh-muc/${
                                              category.subCategories.find(
                                                (cat) =>
                                                  cat.id.toString() ===
                                                  hoveredParentCategory
                                              )?.slug
                                            }`}
                                            className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                            Xem tất cả
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <ChevronDown className="h-4 w-4 text-gray-400 rotate-90" />
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        Chọn danh mục để xem chi tiết
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Categories without subcategories - direct link
                      <Link
                        href={`/danh-muc/${category.slug}`}
                        className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                        <span className="truncate">
                          {getCategoryDisplayName(category)}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Static Navigation Links */}
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                  <Link
                    href="/gioi-thieu"
                    className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                    Giới thiệu
                  </Link>

                  <Link
                    href="/lien-he"
                    className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                    Liên hệ
                  </Link>

                  {/* <Link
          href="/tin-tuc"
          className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
          Tin tức
        </Link> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <Menubar />
      </header>

      {/* Search Dialog/Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex justify-center p-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleSearchClose}></div>

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Tìm kiếm
                </h3>
              </div>
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                />
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isSearching && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
                  <p className="text-gray-500">Đang tìm kiếm ...</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {searchResults.length} sản phẩm tìm thấy
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
                    Không tìm thấy được sản phẩm nào với từ khóa "
                    <span className="font-medium">{searchQuery}</span>"
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
