import { CategoryInterface, CategoryWithChildren } from "@/types/categories";

/**
 * Builds a hierarchical tree structure from flat category array
 * @param items - Array of flat category objects
 * @param parentId - ID of parent category (null for root level)
 * @returns Hierarchical tree structure
 */
export const buildCategoryTree = (
  items: CategoryInterface[],
  parentId: number | null = null
): CategoryWithChildren[] => {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: buildCategoryTree(items, item.id),
    }));
};

/**
 * Gets visual indicator configuration for category depth levels
 * @param level - Depth level (0 = root, 1 = first child, etc.)
 * @returns Object with color class and label
 */
export const getDepthIndicator = (level: number) => {
  if (level === 0) return { color: "bg-blue-500", label: "Gốc" };
  if (level === 1) return { color: "bg-green-500", label: "Cấp 1" };
  if (level === 2) return { color: "bg-orange-500", label: "Cấp 2" };
  return { color: "bg-purple-500", label: `Cấp ${level}` };
};

/**
 * Generates URL-friendly slug from Vietnamese text
 * @param str - Input string to convert
 * @returns URL-friendly slug
 */
