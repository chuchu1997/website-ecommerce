// components/category/CategoryTreeItem.tsx
import { Button } from "@/components/ui/button";
import { CategoryVariantLabels } from "@/constants/categories/variants";
import { CategoryWithChildren } from "@/types/categories";
import { 
  ChevronRight, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  Hash,
  FileText,
  Tag
} from "lucide-react";

interface CategoryTreeItemProps {
  category: CategoryWithChildren;
  depth: number;
  expanded: boolean;
  onToggleExpand: (id: number) => void;
  onEdit: (category: CategoryWithChildren) => void;
  onDelete: (id: number) => void;
}

const getDepthStyles = (depth: number) => {
  switch (depth) {
    case 0:
      return {
        color: "border-l-blue-500 bg-blue-50/30",
        dot: "bg-blue-500",
        badge: "bg-blue-100 text-blue-700"
      };
    case 1:
      return {
        color: "border-l-emerald-500 bg-emerald-50/30",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700"
      };
    case 2:
      return {
        color: "border-l-purple-500 bg-purple-50/30",
        dot: "bg-purple-500",
        badge: "bg-purple-100 text-purple-700"
      };
    default:
      return {
        color: "border-l-gray-500 bg-gray-50/30",
        dot: "bg-gray-500",
        badge: "bg-gray-100 text-gray-700"
      };
  }
};

export const CategoryTreeItem: React.FC<CategoryTreeItemProps> = ({
  category,
  depth,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  const styles = getDepthStyles(depth);
  const hasChildren = category.children && category.children.length > 0;
  const canDelete = !hasChildren;

  return (
    <div className="group relative">
      <div className={`
        relative bg-white border border-gray-200 rounded-xl shadow-sm 
        hover:shadow-lg hover:border-gray-300 transition-all duration-300 
        overflow-hidden ${styles.color} border-l-4
      `}>
        
        {/* Main Content */}
        <div className="p-5">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Expand/Collapse Button */}
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleExpand(category.id)}
                  className="p-1.5 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  )}
                </Button>
              )}
              
              {/* Category Level Indicator */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                <span className={`
                  text-xs font-medium px-2.5 py-1 rounded-full ${styles.badge}
                `}>
                  {depth === 0 ? "Chính" : `Cấp ${depth + 1}`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!canDelete}
                onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
                    onDelete(category.id);
                  }
                }}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">
            {category.name}
          </h3>

          {/* Category Details Grid */}
          <div className="grid gap-3">
            {/* Description */}
            {category.description && (
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700">Mô tả</span>
                  <p className="text-sm text-gray-600 mt-1 break-words leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            )}

            {/* Slug */}
            <div className="flex items-center gap-3">
              <Hash className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-700">Slug</span>
                <code className="block text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md mt-1 font-mono break-all">
                  {category.slug}
                </code>
              </div>
            </div>

            {/* Variant */}
            {category.variant && CategoryVariantLabels[category.variant] && (
              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700">Biến thể</span>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {CategoryVariantLabels[category.variant]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Image URL */}
            {category.imageUrl && (
              <div className="flex items-start gap-3">
                <ImageIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700">Hình ảnh</span>
                  <details className="mt-1 group/details">
                    <summary className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline decoration-dotted underline-offset-2">
                      Xem URL hình ảnh
                    </summary>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                      <p className="text-xs text-gray-600 break-all font-mono leading-relaxed">
                        {category.imageUrl}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>

          {/* Children Count Indicator */}
          {hasChildren && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">
                {category.children && category.children.length} danh mục con
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};