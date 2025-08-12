// components/category/CategoryTreeItem.tsx
import { Button } from "@/components/ui/button";
import { CategoryVariantLabels } from "@/constants/categories/variants";
import { CategoryWithChildren } from "@/types/categories";
import { Eye, EyeOff, Edit, Trash2 } from "lucide-react";


interface CategoryTreeItemProps {
  category: CategoryWithChildren;
  depth: number;
  expanded: boolean;
  onToggleExpand: (id: number) => void;
  onEdit: (category: CategoryWithChildren) => void;
  onDelete: (id: number) => void;
}

export const CategoryTreeItem: React.FC<CategoryTreeItemProps> = ({
  category,
  depth,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            {/* Left section */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      depth === 0
                        ? "bg-blue-500"
                        : depth === 1
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  ></div>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    {depth === 0 ? "Danh mục chính" : `Cấp ${depth + 1}`}
                  </span>
                </div>
                {category.children && category.children?.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleExpand(category.id)}
                    className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                  >
                    {expanded ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                {category.name}
              </h3>

              {/* Info */}
              <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                <div className="flex flex-wrap gap-1">
                  <span className="font-medium">Mô tả:</span>
                  <span className="break-words">{category.description}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="font-medium">Slug:</span>
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                    {category.slug}
                  </code>
                </div>
                {category.variant &&
                  CategoryVariantLabels[category.variant] && (
                    <div className="flex flex-wrap gap-1">
                      <span className="font-medium">Biến thể:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {CategoryVariantLabels[category.variant]}
                      </span>
                    </div>
                  )}
                {category.imageUrl && (
                  <details className="cursor-pointer">
                    <summary className="text-blue-600 hover:text-blue-800 underline font-medium">
                      Xem hình ảnh
                    </summary>
                    <div className="mt-2 p-2 bg-gray-50 rounded border-l-4 border-blue-400">
                      <p className="text-xs break-all">{category.imageUrl}</p>
                    </div>
                  </details>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:flex-col sm:w-auto w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(category)}
                className="flex-1 sm:flex-none hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="text-xs sm:text-sm">Sửa</span>
              </Button>
              <Button
                variant="outline"
                disabled={category.children &&category.children?.length > 0}
                size="sm"
                onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
                    onDelete(category.id);
                  }
                }}
                className="flex-1 sm:flex-none hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="text-xs sm:text-sm">Xóa</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
