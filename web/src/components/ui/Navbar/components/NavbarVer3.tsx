/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { CategoryInterface } from "@/types/category";
import { StoreInterface } from "@/types/store";
import { useCartContext } from "@/context/cart-context";

import { ProductAPI } from "@/api/products/product.api";
import { useDebounce } from "@/hooks/use-debounce";
import { NavbarHeader } from "./NavbarElements/NavbarHeader";
import { NavbarNavigation } from "./NavbarElements/NavbarNavigation";
import { MobileMenu } from "./NavbarElements/MobileMenu";
import { SearchModal } from "./NavbarElements/SearchModal";

// Import sub-components

interface NavbarProps {
  categoriesProps: CategoryInterface[];
  storeInfoProps: StoreInterface;
}

const InteriorDesignNavbar: React.FC<NavbarProps> = ({
  categoriesProps,
  storeInfoProps,
}) => {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation state
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [hoveredParentCategory, setHoveredParentCategory] = useState<
    number | null
  >(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    number | null
  >(null);

  const pathname = usePathname();
  const { cartQuantity } = useCartContext();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Derived data
  const categories = categoriesProps.filter((item) => item.parentId === null);
  const subCategories = categoriesProps.filter(
    (item) => item.parentId !== null
  );

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      ProductAPI.getProductByName(debouncedSearchQuery)
        .then((res) => {
          setSearchResults(res.data.products);
          setIsSearching(false);
        })
        .catch(() => setIsSearching(false));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Handlers
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleMobileMenuToggle = () => {
    if (!isMobileMenuOpen) {
      // Auto-expand first category when opening mobile menu
      const defaultCategory = categories.find(
        (item) => item.slug === "danh-muc-san-pham"
      );
      const defaultSubCategory = subCategories.find(
        (item) =>
          item.slug === "noi-that-phong-khach" || item.slug === "sofa-ghe"
      );

      if (defaultCategory) setExpandedMobileCategory(defaultCategory.id);
      if (defaultSubCategory) setHoveredParentCategory(defaultSubCategory.id);
    } else {
      setExpandedMobileCategory(null);
      setHoveredParentCategory(null);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Early return if no data
  if (!categoriesProps?.length || !storeInfoProps) return null;

  const sharedProps = {
    categories,
    subCategories,
    storeInfo: storeInfoProps,
    cartQuantity,
    activeMegaMenu,
    setActiveMegaMenu,
    hoveredParentCategory,
    setHoveredParentCategory,
    expandedMobileCategory,
    setExpandedMobileCategory,
  };

  return (
    <>
      <header
        className={`bg-white fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl shadow-2xl border-b border-[#d6c8b4]/50"
            : "shadow-md"
        }`}>
        <NavbarHeader
          {...sharedProps}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
          onSearchOpen={handleSearchToggle}
        />

        <NavbarNavigation {...sharedProps} />

        <MobileMenu
          {...sharedProps}
          isOpen={isMobileMenuOpen}
          onCategoryToggle={(categoryId: number) =>
            setExpandedMobileCategory(
              expandedMobileCategory === categoryId ? null : categoryId
            )
          }
          onParentCategoryHover={setHoveredParentCategory}
        />
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleSearchToggle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
      />
    </>
  );
};

export default InteriorDesignNavbar;
