// components/category/CategoryTree.tsx
import { CategoryWithChildren } from "@/types/categories";
import { CategoryTreeItem } from "./CategoryTreeItem";


interface CategoryTreeProps {
  categories: CategoryWithChildren[];
  expandedCategories: Set<number>;
  onToggleExpand: (id: number) => void;
  onEdit: (category: CategoryWithChildren) => void;
  onDelete: (id: number) => void;
  depth?: number;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  expandedCategories,
  onToggleExpand,
  onEdit,
  onDelete,
  depth = 0,
}) => {
  return (
    <div className={`${depth > 0 ? "ml-4 sm:ml-6" : ""} space-y-2`}>
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryTreeItem
            category={category}
            depth={depth}
            expanded={expandedCategories.has(category.id)}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {category.children && category.children?.length > 0 &&
            expandedCategories.has(category.id) && (
              <div className="mt-2 animate-in slide-in-from-top-2 duration-200">
                <CategoryTree
                  categories={category.children}
                  expandedCategories={expandedCategories}
                  onToggleExpand={onToggleExpand}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  depth={depth + 1}
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
