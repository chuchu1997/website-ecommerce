import { CategoryVariant } from "@/types/categories";

// Vietnamese labels for category variants
export const CategoryVariantLabels: Record<CategoryVariant, string> = {
  [CategoryVariant.NEWS]: "Tin tức",
  [CategoryVariant.COURSES]: "Khóa học", 
  [CategoryVariant.SERVICES]: "Dịch vụ",
  [CategoryVariant.PROMOTION]: "Khuyến mãi",
  [CategoryVariant.CONTACT]: "Liên hệ",
  [CategoryVariant.PROJECTS]: "Dự án",
};

// Default form values for new categories
export const DEFAULT_CATEGORY_FORM_VALUES = {
  name: "",
  slug: "",
  description: "",
  parentId: "isParent",
  position: 1,
  seo: {
    title: "",
    description: "",
    keywords: [],
    slug: "",
    canonicalUrl: "",
    altText: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  },
};