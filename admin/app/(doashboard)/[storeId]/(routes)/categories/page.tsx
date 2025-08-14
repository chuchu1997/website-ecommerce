/** @format */

// categories-management.tsx
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Edit,
  Trash2,
  Plus,
  FolderTree,
  Eye,
  EyeOff,
  Save,
  Search,
  ImageIcon,
  TreePine,
  MessageSquare,
  Hash,
  Layers,
  FileText,
  Tag,
} from "lucide-react";

import CategoryAPI from "@/app/api/categories/categories.api";
import { useParams } from "next/navigation";
import {
  CategoryInterface,
  CategoryVariant,
  CreateCategoryInterface,
  UpdateCategoryInterface,
} from "@/types/categories";
import toast from "react-hot-toast";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import S3CloudAPI from "@/app/api/upload/s3-cloud";
import { InputSectionWithForm } from "@/components/ui/inputSectionWithForm";
import { ImageUploadSection } from "../products/[slug]/components/product-image-upload";
import { TextAreaSectionWithForm } from "@/components/ui/textAreaSectionWithForm";
import SEOForm from "@/components/seo/seo";
import {
  categoryFormSchema,
  CategoryFormValues,
} from "@/lib/validations/categories/category-form.schema";
import { generateSlug } from "@/lib/utils/categories/generate-slug";
import { CategoryVariantLabels } from "@/constants/categories/variants";
import { buildCategoryTree } from "@/lib/utils/categories/tree-builder";
import { CategorySelectOptions } from "./components/CategorySelectOption";
import { CategoryTree } from "./components/CategoryTree/CategoryTree";
import { SearchableCategorySelect } from "./components/CategorySearchable/CategorySearchable";

interface CategoryWithChildren extends CategoryInterface {
  children?: CategoryWithChildren[];
}

export default function CategoriesManagement() {
  const { storeId } = useParams();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
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
    },
  });

  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const subscription = form.watch((values: any, { name }: any) => {
      if (name === "name") {
        const nameValue = values.name || "";
        const slug = generateSlug(nameValue);
        form.setValue("slug", slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchCategoriesFromAPI();
    }
  }, [isMounted]);

  if (!isMounted) return null;

  const fetchCategoriesFromAPI = async () => {
    let response = await CategoryAPI.getCategoriesRelateWithStoreID({
      justGetParent: false,
      storeID: Number(storeId),
    });
    if (response.status === 200) {
      const { categories } = response.data as {
        categories: CategoryInterface[];
      };

      setCategories(categories);
    }
  };

  const onCreateCategory = async (category: CreateCategoryInterface) => {
    let response = await CategoryAPI.createCategory(category);
    if (response.status === 200) {
      const { category, message } = response.data as {
        message: string;
        category: CategoryInterface;
      };
      toast.success(message);
      await fetchCategoriesFromAPI(); // Refresh the list
    }
  };

  const onUpdateCategory = async (
    id: number,
    category: UpdateCategoryInterface
  ) => {
    const response = await CategoryAPI.updateCategory(id, category);
    console.log("UPDATE", category);
    if (response.status === 200) {
      const { message } = response.data as { message: string };
      toast.success(message);
      await fetchCategoriesFromAPI(); // Refresh the list
    }
  };

  const onDeleteCategory = async (categoryId: number) => {
    try {
      const response = await CategoryAPI.deleteCategoryFromID(
        categoryId,
        Number(storeId)
      );
      if (response.status === 200) {
        const { message } = response.data as {
          message: string;
          category: CategoryInterface;
        };
        toast.success(message);

        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
      }
    } catch (err) {
      toast.error(
        "Phải xóa các sản phẩm liên kết với danh mục này trước khi xóa "
      );
    }
  };

  // Build category tree

  const categoryTree = buildCategoryTree(categories);

  // Handle form submission
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      let finalImage = data.imageUrl;
      if (data.imageUrl.file) {
        const formData = new FormData();
        formData.append("files", data.imageUrl.file);
        const uploadRes = await S3CloudAPI.uploadImageToS3(formData);
        if (uploadRes.status !== 200) throw new Error("Upload thất bại");
        const { imageUrls } = uploadRes.data as { imageUrls: string[] };
        if (imageUrls.length > 0) {
          finalImage.file = undefined;
          finalImage.url = imageUrls[0];
        }
      }

      const isParentCategory = data.parentId === "isParent";

      if (editingCategoryId) {
        // Update existing category
        const updateData: UpdateCategoryInterface = {
          name: data.name,
          slug: data.slug,
          description: data.description,
          imageUrl: finalImage.url,
          parentId: isParentCategory ? null : Number(data.parentId),
          position: data.position,
          // ...(isParentCategory && {
          //   position: data.position, // chỉ thêm field position nếu là category cha
          // }),
          updatedAt: new Date(),
          storeId: Number(storeId),
          variant: data.variant ?? undefined,
          seo: data.seo
            ? {
                ...data.seo,
                title: data.seo.title ?? "",
                description: data.seo.description ?? "",
                slug: data.seo.slug ?? "",
                canonicalUrl: data.seo.canonicalUrl ?? "",
                altText: data.seo.altText ?? "",
                ogTitle: data.seo.ogTitle ?? "",
                ogDescription: data.seo.ogDescription ?? "",
                ogImage: data.seo.ogImage ?? "",
                keywords: data.seo.keywords ?? [],
              }
            : undefined,
        };

        await onUpdateCategory(editingCategoryId, updateData);
      } else {
        // Create new category
        const newCategory: CreateCategoryInterface = {
          name: data.name,
          slug: data.slug,
          storeId: Number(storeId),
          imageUrl: finalImage.url,
          description: data.description,
          parentId: isParentCategory ? null : Number(data.parentId),

          position: data.position,
          variant: data.variant ?? undefined,
          seo: data.seo
            ? {
                ...data.seo,
                title: data.seo.title ?? "",
                description: data.seo.description ?? "",
                slug: data.seo.slug ?? "",
                canonicalUrl: data.seo.canonicalUrl ?? "",
                altText: data.seo.altText ?? "",
                ogTitle: data.seo.ogTitle ?? "",
                ogDescription: data.seo.ogDescription ?? "",
                ogImage: data.seo.ogImage ?? "",
                keywords: data.seo.keywords ?? [],
              }
            : undefined,
        };
        await onCreateCategory(newCategory);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi xử lý form");
    }
  };

  // Edit a category
  const handleEditCategory = (category: CategoryInterface) => {
    setEditingCategoryId(category.id);

    form.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
      imageUrl: {
        file: undefined,
        url: category.imageUrl,
      },
      position: category.position ?? 1,
      parentId: category.parentId ? String(category.parentId) : "isParent",
      variant: category.variant ?? undefined,
      seo: category.seo ?? {
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
    });
    setIsDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    form.reset({
      name: "",
      slug: "",
      description: "",
      imageUrl: undefined,
      parentId: "",
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
    });
    setEditingCategoryId(null);
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Render category tree with improved mobile design

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-3 sm:p-4 lg:p-6">
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm m-0 p-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg py-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FolderTree className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    Quản lý danh mục
                  </CardTitle>
                  <p className="text-sm text-white/80 mt-1">
                    Tổng: {categories.length} danh mục
                  </p>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-300" />
                    <span className="text-sm sm:text-base font-medium">
                      Thêm mới danh mục
                    </span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="overflow-y-auto py-10 max-h-[95vh] w-full bg-white border-0 shadow-2xl rounded-3xl">
                  {/* Enhanced Header */}
                  <DialogHeader className="relative overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-80" />
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse" />

                    {/* Floating shapes for visual interest */}
                    <div className="absolute top-4 right-8 w-16 h-16 bg-blue-100/40 rounded-full blur-sm" />
                    <div className="absolute top-8 right-16 w-8 h-8 bg-indigo-100/60 rounded-full blur-sm" />

                    <div className="relative px-8 py-8 border-b border-gray-100/50">
                      <DialogTitle className="text-3xl font-bold text-gray-800 flex items-center gap-4">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                          <div className="relative p-3 bg-white rounded-xl shadow-lg border border-gray-100">
                            {editingCategoryId ? (
                              <Edit className="w-7 h-7 text-blue-600" />
                            ) : (
                              <Plus className="w-7 h-7 text-blue-600" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {editingCategoryId
                              ? "Chỉnh sửa danh mục"
                              : "Tạo mới danh mục"}
                          </span>
                          <p className="text-base font-normal text-gray-600 mt-2">
                            {editingCategoryId
                              ? "Cập nhật thông tin danh mục của bạn với giao diện hiện đại"
                              : "Tạo danh mục mới với đầy đủ thông tin và tối ưu SEO"}
                          </p>
                        </div>
                      </DialogTitle>
                    </div>
                  </DialogHeader>

                  {/* Scrollable Form Content */}
                  <div className="flex-1 overflow-y-auto">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-8">
                        {/* Enhanced Grid Layout */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          {/* Left Column - Basic Information */}
                          <div className="space-y-8">
                            {/* Basic Info Card */}
                            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                              <div className="relative bg-gradient-to-r from-gray-50 to-blue-50/30 px-6 py-5 border-b border-gray-100">
                                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="relative text-xl font-bold text-gray-800 flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                  </div>
                                  Thông tin cơ bản
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Thông tin chính của danh mục
                                </p>
                              </div>

                              <div className="p-8 space-y-8">
                                <InputSectionWithForm
                                  form={form}
                                  nameFormField="name"
                                  loading={false}
                                  title="Tên danh mục"
                                  placeholder="Nhập tên danh mục..."
                                  showCard={false}
                                  icon={Tag}
                                  description="Tên hiển thị chính của danh mục"
                                />

                                <FormField
                                  control={form.control}
                                  name="variant"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <div className="p-1.5 bg-purple-50 rounded-md">
                                          <Layers className="w-3.5 h-3.5 text-purple-600" />
                                        </div>
                                        Biến thể danh mục
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-lg">
                                            <SelectValue placeholder="Chọn loại biến thể..." />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="border-0 shadow-xl rounded-xl">
                                          {Object.values(CategoryVariant).map(
                                            (variant) => (
                                              <SelectItem
                                                key={variant}
                                                value={variant}
                                                className="hover:bg-purple-50 focus:bg-purple-50 rounded-lg m-1">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                                  {
                                                    CategoryVariantLabels[
                                                      variant
                                                    ]
                                                  }
                                                </div>
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectContent>
                                      </Select>
                                   
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <InputSectionWithForm
                                  form={form}
                                  nameFormField="position"
                                  loading={false}
                                  title="Vị trí hiển thị"
                                  placeholder="Nhập số thứ tự (VD: 1, 2, 3...)"
                                  type="number"
                                  showCard={false}
                                  icon={Hash}
                                  description="Thứ tự sắp xếp danh mục trong danh sách"
                                />
                              </div>
                            </div>

                            {/* Description Card */}
                            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                              <div className="relative bg-gradient-to-r from-gray-50 to-emerald-50/30 px-6 py-5 border-b border-gray-100">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="relative text-xl font-bold text-gray-800 flex items-center gap-3">
                                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  Mô tả chi tiết
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Thông tin mô tả về danh mục
                                </p>
                              </div>

                              <div className="p-8">
                                <TextAreaSectionWithForm
                                  form={form}
                                  loading={false}
                                  nameFormField="description"
                                  title=""
                                  placeholder="Nhập mô tả chi tiết, đặc điểm và mục đích sử dụng của danh mục..."
                                  icon={MessageSquare}
                                  showCard={false}
                                  maxLength={500}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Hierarchy, Media & SEO */}
                          <div className="space-y-8 ">
                            {/* Hierarchy Card with Searchable Select */}
                            <div className=" group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ">
                              <div className="relative bg-gradient-to-r from-gray-50 to-indigo-50/30 px-6 py-5 border-b border-gray-100">
                                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="relative text-xl font-bold text-gray-800 flex items-center gap-3">
                                  <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                    <TreePine className="w-5 h-5 text-indigo-600" />
                                  </div>
                                  Cấu trúc phân cấp
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Tìm kiếm và chọn danh mục cha
                                </p>
                              </div>

                              <SearchableCategorySelect
                                form={form}
                                categories={categoryTree}
                                editingCategoryId={editingCategoryId ?? 0}
                                nameFormField="parentId"
                              />
                            </div>

                            {/* Image Upload Card */}
                            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                              <div className="relative bg-gradient-to-r from-gray-50 to-pink-50/30 px-6 py-5 border-b border-gray-100">
                                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="relative text-xl font-bold text-gray-800 flex items-center gap-3">
                                  <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                                    <ImageIcon className="w-5 h-5 text-pink-600" />
                                  </div>
                                  Hình ảnh đại diện
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Upload ảnh cho danh mục
                                </p>
                              </div>

                              <div className="p-6">
                                <ImageUploadSection
                                  form={form}
                                  loading={false}
                                  nameFormField="imageUrl"
                                />
                              </div>
                            </div>

                            {/* SEO Card */}
                            <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                              <div className="relative bg-gradient-to-r from-gray-50 to-yellow-50/30 px-6 py-5 border-b border-gray-100">
                                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="relative text-xl font-bold text-gray-800 flex items-center gap-3">
                                  <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                    <Search className="w-5 h-5 text-yellow-600" />
                                  </div>
                                  Tối ưu SEO
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Cài đặt SEO cho danh mục
                                </p>
                              </div>

                              <div className="p-6">
                                <SEOForm form={form} loading={false} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>

                  {/* Enhanced Footer */}
                  <DialogFooter className="relative bg-gradient-to-r from-gray-50 to-blue-50/30 px-8 py-6 border-t border-gray-200/50">
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/80" />
                    <div className="relative flex items-center justify-end gap-4 w-full">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetForm();
                          setIsDialogOpen(false);
                        }}
                        className="group px-6 py-3 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 rounded-xl">
                        <span className="text-gray-700 group-hover:text-gray-800 font-medium">
                          Hủy bỏ
                        </span>
                      </Button>

                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="group relative overflow-hidden px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border-0"
                        onClick={form.handleSubmit(onSubmit)}>
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <div className="relative flex items-center gap-2">
                          {form.formState.isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span className="font-medium">Đang xử lý...</span>
                            </>
                          ) : (
                            <>
                              {editingCategoryId ? (
                                <>
                                  <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
                                  <span className="font-medium">
                                    Lưu thay đổi
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                                  <span className="font-medium">
                                    Tạo danh mục
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FolderTree className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    Danh sách danh mục
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quản lý tất cả danh mục của cửa hàng
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {categoryTree.length > 0 ? (
                  <div className="p-4">
                    <CategoryTree
                      categories={categoryTree}
                      expandedCategories={expandedCategories}
                      onToggleExpand={(id) => {
                        toggleCategoryExpansion(id);
                      }}
                      onDelete={(id: number) => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa danh mục này ?"
                          )
                        ) {
                          onDeleteCategory(id);
                        }
                      }}
                      onEdit={(categoryEdit) =>
                        handleEditCategory(categoryEdit)
                      }
                      depth={0}
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FolderTree className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Chưa có danh mục nào
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      Hãy thêm danh mục đầu tiên của bạn
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
