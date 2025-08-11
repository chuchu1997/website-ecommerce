/** @format */

import React from "react";
import {
  ChevronDown,
  Phone,
  Home,
  Palette,
  Sofa,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLoader } from "../../../image-loader";
import { CategoryInterface } from "@/types/category";
import { StoreInterface } from "@/types/store";

interface MobileMenuProps {
  categories: CategoryInterface[];
  storeInfo: StoreInterface;
  isOpen: boolean;
  expandedMobileCategory: number | null;
  hoveredParentCategory: number | null;
  onCategoryToggle: (categoryId: number) => void;
  onParentCategoryHover: (categoryId: number) => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const megaMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  categories,
  storeInfo,
  isOpen,
  expandedMobileCategory,
  hoveredParentCategory,
  onCategoryToggle,
  onParentCategoryHover,
}) => {
  const router = useRouter();

  const getCategoryDisplayName = (category: CategoryInterface) => category.name;
  const hasMegaMenu = (category: CategoryInterface) =>
    category.subCategories && category.subCategories.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lg:hidden bg-[var(--color-bg)] shadow-[var(--shadow-default)] border-t border-[var(--color-border-light)] backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
        <div className="px-6 py-6 space-y-6 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-accent)] scrollbar-track-[var(--color-bg-secondary)]">
          {/* Hero Quick Actions */}

          {/* Categories Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                Danh Mục Sản Phẩm
              </h3>
            </div>

            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border-light)] shadow-sm overflow-hidden">
                {hasMegaMenu(category) ? (
                  <div className="space-y-0">
                    <button
                      onClick={() => onCategoryToggle(category.id)}
                      className="w-full flex items-center justify-between p-5 text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--gradient-accent)] flex items-center justify-center">
                          <Sofa className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-base block">
                            {getCategoryDisplayName(category)}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {category.subCategories?.length || 0} danh mục con
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-all duration-300 text-[var(--color-primary)] ${
                          expandedMobileCategory === category.id
                            ? "rotate-180"
                            : ""
                        } group-hover:scale-110`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedMobileCategory === category.id && (
                        <motion.div
                          variants={megaMenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Parent Categories */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 pb-2 border-b border-[var(--color-border)]">
                                Danh Mục Chính
                              </h4>
                              {category.subCategories?.map((subcategory) => (
                                <div
                                  key={subcategory.id}
                                  onClick={() => {
                                    if (subcategory.subCategories?.length > 0) {
                                      onParentCategoryHover(subcategory.id);
                                    } else {
                                      router.push(
                                        `/danh-muc/${subcategory.slug}`
                                      );
                                    }
                                  }}
                                  className={`group p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                                    hoveredParentCategory === subcategory.id
                                      ? "bg-[var(--color-bg)] border-[var(--color-primary)] shadow-md"
                                      : "hover:bg-[var(--color-bg)] border-transparent hover:border-[var(--color-border)]"
                                  }`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg overflow-hidden">
                                        <ImageLoader
                                          fill
                                          src={subcategory.imageUrl}
                                          alt={subcategory.name}
                                          className="object-cover rounded-lg"
                                        />
                                      </div>
                                      <span className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                                        {subcategory.name}
                                      </span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Child Categories */}
                            <div className="space-y-2">
                              {hoveredParentCategory &&
                              category.subCategories?.find(
                                (cat) => cat.id === hoveredParentCategory
                              ) ? (
                                <>
                                  <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 pb-2 border-b border-[var(--color-border)]">
                                    {
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id === hoveredParentCategory
                                      )?.name
                                    }
                                  </h4>
                                  <div className="grid grid-cols-1 gap-3">
                                    {category.subCategories
                                      .find(
                                        (cat) =>
                                          cat.id === hoveredParentCategory
                                      )
                                      ?.subCategories?.map((childCategory) => (
                                        <Link
                                          key={childCategory.id}
                                          href={`/danh-muc/${childCategory.slug}`}
                                          className="group flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg)] transition-all duration-300 border border-transparent hover:border-[var(--color-border)] hover:shadow-sm">
                                          <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <ImageLoader
                                              fill
                                              className="object-cover rounded-lg"
                                              src={childCategory.imageUrl}
                                              alt={childCategory.name}
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <h5 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                                              {childCategory.name}
                                            </h5>
                                            <span className="text-xs text-[var(--color-text-muted)]">
                                              Xem chi tiết →
                                            </span>
                                          </div>
                                        </Link>
                                      )) || (
                                      <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-[var(--gradient-accent)] rounded-full mx-auto mb-4 flex items-center justify-center">
                                          <ImageLoader
                                            fill
                                            className="rounded-lg"
                                            src={
                                              category.subCategories?.find(
                                                (cat) =>
                                                  cat.id ===
                                                  hoveredParentCategory
                                              )?.imageUrl ?? ""
                                            }
                                            alt={
                                              category.subCategories?.find(
                                                (cat) =>
                                                  cat.id ===
                                                  hoveredParentCategory
                                              )?.name ?? ""
                                            }
                                          />
                                        </div>
                                        <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                          {
                                            category.subCategories?.find(
                                              (cat) =>
                                                cat.id === hoveredParentCategory
                                            )?.name
                                          }
                                        </h5>
                                        <p className="text-xs text-[var(--color-text-muted)] mb-4 line-clamp-2">
                                          {
                                            category.subCategories?.find(
                                              (cat) =>
                                                cat.id === hoveredParentCategory
                                            )?.description
                                          }
                                        </p>
                                        <Link
                                          href={`/danh-muc/${
                                            category.subCategories?.find(
                                              (cat) =>
                                                cat.id === hoveredParentCategory
                                            )?.slug
                                          }`}
                                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gradient-primary)] text-[var(--color-text-white)] text-sm rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 font-semibold">
                                          Xem Tất Cả
                                          <ArrowRight className="w-4 h-4" />
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center justify-center h-32">
                                  <div className="text-center">
                                    <div className="w-12 h-12 bg-[var(--gradient-accent)] rounded-full mx-auto mb-3 flex items-center justify-center">
                                      <Sofa className="h-6 w-6 text-[var(--color-primary)]" />
                                    </div>
                                    <p className="text-xs text-[var(--color-text-muted)] font-medium">
                                      Chọn danh mục để xem chi tiết
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={`/danh-muc/${category.slug}`}
                    className="flex items-center gap-4 p-5 hover:bg-[var(--color-bg-secondary)] transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[var(--gradient-accent)] rounded-lg flex items-center justify-center">
                      <Sofa className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                        {getCategoryDisplayName(category)}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Footer */}
          <motion.div
            variants={itemVariants}
            className="border-t border-[var(--color-border-light)] pt-6">
            <div className="relative overflow-hidden rounded-xl bg-[var(--gradient-primary)] p-5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative">
                <h4 className="text-lg font-bold text-[var(--color-text-white)] mb-4">
                  Liên Hệ Ngay
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[var(--color-text-white)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text-white)]">
                        {storeInfo?.phone}
                      </div>
                      <div className="text-xs text-white/80">Hotline 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-[var(--color-text-white)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text-white)]">
                        8:00 - 22:00
                      </div>
                      <div className="text-xs text-white/80">
                        Mở cửa hàng ngày
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
