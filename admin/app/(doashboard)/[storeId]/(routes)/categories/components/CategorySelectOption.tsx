// components/category/CategorySelectOptions.tsx
import { SelectItem } from "@/components/ui/select";
import { CategoryWithChildren } from "@/types/categories";
import React from "react";

interface CategorySelectOptionsProps {
  categories: CategoryWithChildren[];
  editingCategoryId?: number | string;
  depth?: number;
}

export const CategorySelectOptions: React.FC<CategorySelectOptionsProps> = ({
  categories,
  editingCategoryId,
  depth = 0,
}) => {
  const getDepthIndicator = (level: number) => {
    if (level === 0) return { color: "bg-blue-500", label: "Gốc" };
    if (level === 1) return { color: "bg-green-500", label: "Cấp 1" };
    if (level === 2) return { color: "bg-orange-500", label: "Cấp 2" };
    return { color: "bg-purple-500", label: `Cấp ${level}` };
  };

  return (
    <>
      {categories.map((category) => {
        const isDisabled = editingCategoryId === category.id;
        const indent = depth * 16;
        const indicator = getDepthIndicator(depth);

        return (
          <React.Fragment key={category.id}>
            <SelectItem
              value={category.id.toString()}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-50"
              } ${depth > 0 ? "border-l-2 border-gray-200" : ""}`}
              style={{ paddingLeft: `${12 + indent}px` }}
            >
              <div className="flex items-center gap-2 w-full">
                {depth > 0 && (
                  <div className="flex items-center">
                    {Array.from({ length: depth }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-px ${
                          i === depth - 1 ? "bg-gray-300" : "bg-transparent"
                        }`}
                      />
                    ))}
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                  </div>
                )}

                <div
                  className={`w-2 h-2 ${indicator.color} rounded-full flex-shrink-0`}
                ></div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        depth === 0 ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </span>
                    {depth > 0 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {indicator.label}
                      </span>
                    )}
                  </div>
                  {category.description && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {category.description}
                    </p>
                  )}
                </div>

                {category.children && category.children?.length > 0 && (
                  <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {category.children.length} con
                  </div>
                )}
              </div>
            </SelectItem>

            {category.children && category.children?.length > 0 && (
              <>
                <div className="my-1 mx-2">
                  <div className="border-t border-gray-100"></div>
                </div>
                <CategorySelectOptions
                  categories={category.children}
                  editingCategoryId={editingCategoryId}
                  depth={depth + 1}
                />
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
