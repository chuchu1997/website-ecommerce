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
    <div className={`space-y-4 ${depth > 0 ? 'relative' : ''}`}>
      {/* Connection Lines for nested items */}
      {depth > 0 && (
        <div className="absolute left-6 top-0 bottom-4 w-px bg-gradient-to-b from-gray-300 to-transparent" />
      )}
      
      {categories.map((category, index) => {
        const isLast = index === categories.length - 1;
        
        return (
          <div key={category.id} className="relative">
            {/* Horizontal connection line for nested items */}
            {depth > 0 && (
              <>
                <div className="absolute left-6 top-6 w-6 h-px bg-gray-300" />
                {!isLast && (
                  <div className="absolute left-6 top-6 bottom-0 w-px bg-gray-300" />
                )}
              </>
            )}
            
            {/* Category Item with proper nesting margin */}
            <div className={`${depth > 0 ? 'ml-12' : ''} relative`}>
              <CategoryTreeItem
                category={category}
                depth={depth}
                expanded={expandedCategories.has(category.id)}
                onToggleExpand={onToggleExpand}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              
              {/* Nested Children */}
              {category.children && 
               category.children.length > 0 && 
               expandedCategories.has(category.id) && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-300 ease-out">
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
          </div>
        );
      })}
    </div>
  );
};