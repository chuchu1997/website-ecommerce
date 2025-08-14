import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  FolderTree, 
  Search, 
  Check, 
  ChevronDown, 
  Home,
  Folder,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryOption {
  id: string;
  name: string;
  depth: number;
  fullPath: string;
}

interface SearchableCategorySelectProps {
  form: any;
  categories: any[];
  editingCategoryId?: number;
  nameFormField?: string;
}

// Helper function to flatten category tree for search
const flattenCategories = (categories: any[], depth = 0, parentPath = ''): CategoryOption[] => {
  let flattened: CategoryOption[] = [];
  
  categories.forEach(category => {
    const currentPath = parentPath ? `${parentPath} > ${category.name}` : category.name;
    
    flattened.push({
      id: category.id.toString(),
      name: category.name,
      depth,
      fullPath: currentPath
    });
    
    if (category.children && category.children.length > 0) {
      flattened = flattened.concat(
        flattenCategories(category.children, depth + 1, currentPath)
      );
    }
  });
  
  return flattened;
};

const getDepthIcon = (depth: number) => {
  switch (depth) {
    case 0: return <Home className="w-3.5 h-3.5" />;
    case 1: return <Folder className="w-3.5 h-3.5" />;
    default: return <ChevronRight className="w-3.5 h-3.5" />;
  }
};

const getDepthColor = (depth: number) => {
  switch (depth) {
    case 0: return 'text-blue-600 bg-blue-50';
    case 1: return 'text-emerald-600 bg-emerald-50';
    case 2: return 'text-purple-600 bg-purple-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const SearchableCategorySelect: React.FC<SearchableCategorySelectProps> = ({
  form,
  categories,
  editingCategoryId = 0,
  nameFormField = 'parentId'
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Flatten categories for search
  const flatCategories = useMemo(() => {
    return flattenCategories(categories).filter(cat => 
      cat.id !== editingCategoryId.toString()
    );
  }, [categories, editingCategoryId]);
  
  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchValue.trim()) return flatCategories;
    
    const searchLower = searchValue.toLowerCase().trim();
    return flatCategories.filter(category =>
      category.name.toLowerCase().includes(searchLower) ||
      category.fullPath.toLowerCase().includes(searchLower)
    );
  }, [flatCategories, searchValue]);
  
  // Get selected category info
  const selectedCategory = useMemo(() => {
    const currentValue = form.watch(nameFormField);
    if (currentValue === 'isParent') {
      return { name: 'Danh mục gốc', isRoot: true };
    }
    const found = flatCategories.find(cat => cat.id === currentValue);
    return found ? { name: found.fullPath, isRoot: false } : null;
  }, [form.watch(nameFormField), flatCategories, nameFormField]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchValue('');
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        setSearchValue('');
        triggerRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open]);

  const handleSelect = (value: string, field: any) => {
    field.onChange(value);
    setOpen(false);
    setSearchValue('');
    triggerRef.current?.focus();
  };

  const toggleDropdown = () => {
    setOpen(!open);
    if (!open) {
      setSearchValue('');
    }
  };

  return (
    <div className="p-6">
      <FormField
        control={form.control}
        name={nameFormField}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-md">
                <FolderTree className="w-3.5 h-3.5 text-blue-600" />
              </div>
              Danh mục cha
            </FormLabel>
            
            <div className="relative">
              <FormControl>
                <Button
                  ref={triggerRef}
                  type="button"
                  variant="outline"
                  onClick={toggleDropdown}
                  className={cn(
                    "w-full h-11 justify-between font-normal",
                    "border-gray-200 hover:border-gray-300",
                    "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {selectedCategory ? (
                      <>
                        <div className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          selectedCategory.isRoot 
                            ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                            : "bg-gradient-to-br from-emerald-500 to-emerald-600"
                        )} />
                        <span className="truncate text-sm">
                          {selectedCategory.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Tìm kiếm và chọn danh mục cha...</span>
                      </>
                    )}
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-gray-400 transition-transform duration-200",
                    open && "rotate-180"
                  )} />
                </Button>
              </FormControl>
              
              {/* Custom Dropdown */}
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-[400px] overflow-hidden"
                  style={{
                    zIndex: 9999,
                  }}
                >
                  {/* Search Input */}
                  <div className="flex items-center border-b border-gray-200 px-3 py-2 bg-gray-50/50">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Tìm kiếm danh mục..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="flex-1 h-9 bg-transparent border-0 outline-0 text-sm placeholder:text-gray-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  
                  {/* Options List */}
                  <div className="max-h-[300px] overflow-y-auto p-1">
                    {/* Root option */}
                    <div
                      className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer rounded-lg mx-1 my-1 transition-colors"
                      onClick={() => handleSelect("isParent", field)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-1.5 bg-blue-50 rounded-md">
                          <Home className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-blue-700">Danh mục gốc</span>
                          <span className="text-xs text-gray-500">Tạo danh mục cấp cao nhất</span>
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 text-blue-600",
                          field.value === "isParent" ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                    
                    {/* Separator */}
                    {filteredCategories.length > 0 && (
                      <div className="border-t border-gray-100 mx-2 my-2" />
                    )}
                    
                    {/* Category options */}
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 my-1 transition-colors"
                        onClick={() => handleSelect(category.id, field)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={cn(
                            "p-1.5 rounded-md",
                            getDepthColor(category.depth)
                          )}>
                            {getDepthIcon(category.depth)}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium text-gray-900 truncate">
                              {category.name}
                            </span>
                            {category.fullPath !== category.name && (
                              <span className="text-xs text-gray-500 truncate">
                                {category.fullPath}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full font-medium",
                            category.depth === 0 && "bg-blue-100 text-blue-700",
                            category.depth === 1 && "bg-emerald-100 text-emerald-700",
                            category.depth >= 2 && "bg-purple-100 text-purple-700"
                          )}>
                            Cấp {category.depth + 1}
                          </span>
                          <Check
                            className={cn(
                              "h-4 w-4 text-green-600",
                              field.value === category.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    
                    {/* No results */}
                    {filteredCategories.length === 0 && searchValue && (
                      <div className="py-6 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-8 h-8 text-gray-300" />
                          <span>Không tìm thấy danh mục nào</span>
                          <span className="text-xs">Thử từ khóa khác</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* <FormDescription className="text-xs text-gray-500 leading-relaxed flex items-start gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>
                Tìm kiếm theo tên hoặc đường dẫn danh mục để chọn danh mục cha. 
                Chọn "Danh mục gốc" để tạo danh mục cấp cao nhất.
              </span>
            </FormDescription> */}
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};