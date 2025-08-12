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

import { Edit, Trash2, Plus, FolderTree, Eye, EyeOff } from "lucide-react";

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
                    className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="text-sm sm:text-base">Thêm mới</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full max-w-2xl">
                  <DialogHeader className="flex-shrink-0 pb-4 border-b">
                    <DialogTitle className="text-center text-lg sm:text-xl font-bold text-gray-800">
                      {editingCategoryId
                        ? "Chỉnh sửa danh mục"
                        : "Tạo mới danh mục"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto px-1 py-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 sm:space-y-6">
                        <InputSectionWithForm
                          form={form}
                          nameFormField="name"
                          loading={false}
                          title="Tên danh mục"
                          placeholder="Vui lòng nhập tên danh mục"
                        />

                        <ImageUploadSection
                          form={form}
                          loading={false}
                          nameFormField="imageUrl"
                        />

                        <FormField
                          control={form.control}
                          name="variant"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base font-medium">
                                Biến thể
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-10 sm:h-11">
                                    <SelectValue placeholder="Chọn biến thể nếu có" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(CategoryVariant).map(
                                    (variant) => (
                                      <SelectItem key={variant} value={variant}>
                                        {CategoryVariantLabels[variant]}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="parentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base font-medium">
                                Danh mục cha
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-10 sm:h-11">
                                    <SelectValue placeholder="Chọn danh mục cha" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[300px] overflow-y-auto">
                                  <SelectItem
                                    value="isParent"
                                    className="font-semibold text-blue-600">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                      Không (Là Danh mục Cha)
                                    </div>
                                  </SelectItem>
                                  <div className="my-1 border-t border-gray-200"></div>

                                  <CategorySelectOptions
                                    categories={categoryTree}
                                    editingCategoryId={editingCategoryId ?? 0}
                                    depth={0}
                                  />
                                  {/* {renderHierarchicalOptions(categoryTree, 0)} */}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                              <FormDescription className="text-xs text-gray-500 mt-1">
                                Chọn danh mục cha để tạo cấu trúc phân cấp, hoặc
                                để trống để tạo danh mục gốc
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <InputSectionWithForm
                          form={form}
                          nameFormField="position"
                          // disabled={form.watch("parentId") !== "isParent"}

                          loading={false}
                          title="Vị trí hiển thị"
                          placeholder="Nhập vị trí hiển thị (tùy chọn )"
                        />

                        <TextAreaSectionWithForm
                          form={form}
                          loading={false}
                          nameFormField="description"
                          title="Mô tả"
                          placeholder="Vui lòng nhập mô tả danh mục"
                        />

                        <SEOForm form={form} loading={false} />

                        <DialogFooter className="flex-shrink-0 pt-6 mt-6 border-t flex-col sm:flex-row gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              resetForm();
                              setIsDialogOpen(false);
                            }}
                            className="w-full sm:w-auto order-2 sm:order-1">
                            Hủy
                          </Button>
                          <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            {form.formState.isSubmitting
                              ? "Đang xử lý..."
                              : editingCategoryId
                              ? "Lưu thay đổi"
                              : "Tạo mới"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </div>
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
