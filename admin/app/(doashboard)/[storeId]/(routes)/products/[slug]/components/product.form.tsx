/** @format */

"use client";
import { Form } from "@/components/ui/form";
import {
  ImageInterface,
  ImageMediaType,
  ProductColorInterface,
  ProductInterface,
  ProductSizeInterface,
} from "@/types/product";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ImageUploadSection } from "./product-image-upload";
import { BasicInfoSection } from "./product-basic-info";
import toast from "react-hot-toast";
import CategoryAPI from "@/app/api/categories/categories.api";
import { redirect, useParams } from "next/navigation";
import { CategoryInterface } from "@/types/categories";
import router from "next/router";
import { DescriptionSection } from "./product-description";
import { VariantSelector } from "./product-variant-selector";
import { Palette, Ruler } from "lucide-react";
import { SettingsSection } from "./product-setting";
import { Button } from "@/components/ui/button";
import ProductAPI from "@/app/api/products/products.api";
import S3CloudAPI from "@/app/api/upload/s3-cloud";
import { GiftProductSelector } from "./product-gifts";
import { useRouter } from "next/navigation"; // ✅ cho App Router
import { seoSchemaZod } from "@/schemas/seoSchema";
import SEOForm from "@/components/seo/seo";

export const giftSchema = z.object({
  id: z.number(),
  slug: z.string().optional(),
});

export type GiftProduct = z.infer<typeof giftSchema>;

const formSchema = z.object({
  id: z.number().optional(), //
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  originalPrice: z.coerce.number().optional(),
  price: z.coerce.number(),
  images: z
    .array(
      z.object({
        url: z.string(),
        file: z.instanceof(File).optional(), // <- optional ở đây
      })
    )
    .min(1, "Bạn phải chọn ít nhất 1 ảnh"),
  isFeatured: z.boolean().default(false).optional(),
  description: z.string().min(1, "Mô tả sản phẩm là bắt buộc"),
  shortDescription: z.string().min(1, "Mô tả ngắn là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  sku: z.string().min(1, "SKU là bắt buộc"),
  stock: z.coerce.number().min(0, "Số lượng không được âm"),
  saleCount: z.coerce.number().optional(),
  // Required colors selection
  viewCount: z.coerce.number().default(0).optional(),
  ratingCount: z.coerce.number().default(5).optional(),
  giftProducts: z.array(giftSchema).optional(),
  seo: seoSchemaZod.optional(),
});

interface ProductProps {
  initialData: (ProductInterface & {}) | null;
}

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm: React.FC<ProductProps> = ({ initialData }) => {
  const { storeId } = useParams();
  const [mounted, setIsMounted] = useState(false);
  const router = useRouter();

  const action = initialData ? "Cập nhật sản phẩm" : "Tạo sản phẩm";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      saleCount: 0,
      originalPrice: 0,
      price: 0,
      images: [],
      isFeatured: false,
      description: "",
      slug: "",
      sku: "",
      stock: 0,
      viewCount: 0,
      ratingCount: 5,
      giftProducts: [],
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

  const [selectedColors, setSelectedColors] = useState<ProductColorInterface[]>(
    []
  );
  const [selectedSizes, setSelectedSizes] = useState<ProductSizeInterface[]>(
    []
  );
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState(false);

  type TempProductVariantColor = Omit<ProductColorInterface, "id"> & {
    id?: number;
    _temp?: boolean;
  };

  type TempProductVariantSize = Omit<ProductSizeInterface, "id"> & {
    id?: number;
    _temp?: boolean;
  };

  const handleAddColor = useCallback((newVariant: TempProductVariantColor) => {
    const variant: ProductColorInterface = {
      ...(newVariant as ProductColorInterface),
      id: newVariant.id ?? Number(Date.now()),
    };

    setSelectedColors((prev) => [...prev, variant]);
  }, []);

  const handleAddSize = useCallback((newVariant: TempProductVariantSize) => {
    const variant: ProductSizeInterface = {
      ...(newVariant as ProductSizeInterface),
      id: newVariant.id ?? Number(Date.now()),
    };
    setSelectedSizes((prev) => [...prev, variant]);
  }, []);

  const handleUpdateColor = useCallback(
    (id: number, updates: Partial<ProductColorInterface>) => {
      setSelectedColors((prev) =>
        prev.map((variant) =>
          variant.id === id ? { ...variant, ...updates } : variant
        )
      );
    },
    []
  );

  const handleUpdateSize = useCallback(
    (id: number, updates: Partial<ProductSizeInterface>) => {
      setSelectedSizes((prev) =>
        prev.map((variant) =>
          variant.id === id ? { ...variant, ...updates } : variant
        )
      );
    },
    []
  );

  const handleRemoveColor = useCallback((id: number) => {
    setSelectedColors((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleRemoveSize = useCallback((id: number) => {
    setSelectedSizes((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      // Upload ảnh lên S3
      const oldImages = data.images.filter((img) => !img.file);
      const newImages = data.images.filter((img) => img.file);
      // Ensure all images have the required 'type' property
      let finalImageUrls: ImageInterface[] = [
        ...oldImages.map((img) => ({
          ...img,
        })),
      ];

      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((img) => {
          if (img.file) {
            formData.append("files", img.file);
          }
        });

        const uploadRes = await S3CloudAPI.uploadImageToS3(formData);
        if (uploadRes.status !== 200) throw new Error("Upload thất bại");

        const { imageUrls } = uploadRes.data as { imageUrls: string[] };
        const uploadedImageUrls: ImageInterface[] = imageUrls.map((img) => ({
          url: img,
          file: undefined,
          type: ImageMediaType.PRODUCT, // Set the required type property
        }));

        finalImageUrls = [...finalImageUrls, ...uploadedImageUrls];
      }

      const {
        giftProducts,
        name,
        description,
        price,
        originalPrice,
        isFeatured = false,
        slug,
        stock,
        sku,
        categoryId,
        shortDescription,
        seo,
        saleCount,
      } = data;

      const cleanedColors = selectedColors.map((color) => {
        const tempColor = color as ProductColorInterface & { _temp?: boolean };
        if (tempColor._temp) {
          const { id, _temp, ...rest } = tempColor;
          return { ...rest };
        }
        return { ...color };
      });

      const cleanedSizes = selectedSizes.map((size) => {
        const tempSize = size as ProductSizeInterface & { _temp?: boolean };
        if (tempSize._temp) {
          const { id, _temp, ...rest } = tempSize;
          return { ...rest };
        }
        return { ...size };
      });

      const payload = {
        name,
        shortDescription,
        description,
        price,
        isFeatured,
        originalPrice,
        giftProducts,
        slug,
        stock,
        sku,
        saleCount,
        seo: seo
          ? {
              ...seo,
              keywords: seo.keywords ?? [],
            }
          : undefined,
        categoryId: Number(categoryId),
        storeId: Number(storeId),
        images: finalImageUrls,
        colors: cleanedColors,
        sizes: cleanedSizes,
      };

      const res = initialData
        ? await ProductAPI.updateProduct(initialData.id, {
            ...payload,
            updatedAt: new Date(),
          })
        : await ProductAPI.createProduct(payload);

      if (res.status === 200) {
        const { message } = res.data as { message: string };
        toast.success(message);
      }
    } catch (err) {
      toast.error(`Có lỗi xảy ra, vui lòng thử lại! ${err}`);
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        router.push(`/${storeId}/products`);
      }
    }
  };

  useEffect(() => {
    console.log("FORM ERROR", form.formState.errors);
  }, [form.formState.errors]);

  useEffect(() => {
    setIsMounted(true);
    fetchCategoriesAndResetForm();
  }, [initialData]);

  const fetchCategoriesAndResetForm = async () => {
    setLoading(true);
    try {
      const response = await CategoryAPI.getCategoriesRelateWithStoreID({
        justGetParent: false,
        storeID: Number(storeId),
      });

      if (response.status !== 200) {
        throw new Error("Lấy danh mục thất bại");
      }

      const { categories } = response.data as {
        categories: CategoryInterface[];
      };
      setCategories(categories);

      if (categories.length <= 0) {
        const toastId = toast.error("Chưa có danh mục để tạo sản phẩm");

        setTimeout(() => {
          toast.dismiss(toastId);
          window.location.href = `/${storeId}/categories`;
        }, 1500);
        return;
      }

      if (initialData) {
        const formattedData: ProductFormValues = {
          ...initialData,
          seo: initialData.seo ?? {
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
          saleCount: initialData.saleCount ?? 0,
          categoryId: initialData.categoryId.toString(),
          originalPrice: initialData.originalPrice ?? 0,
        };

        if (initialData.colors?.length > 0) {
          setSelectedColors(initialData.colors);
        }

        if (initialData.sizes?.length > 0) {
          setSelectedSizes(initialData.sizes);
        }

        form.reset(formattedData);
        if (initialData.colors.length > 0) {
          setSelectedColors(initialData.colors);
        }
        if (initialData.sizes.length > 0) {
          setSelectedSizes(initialData.sizes);
        }
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh mục, vui lòng thử lại.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full mx-auto">
          {/* Breadcrumb */}
          <div className="px-6 py-4 border-b border-slate-100">
            <nav className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Sản phẩm</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-slate-900 font-medium">{action}</span>
            </nav>
          </div>

          {/* Header Content */}
          <div className="px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {action}
                  </h1>
                  <p className="text-slate-600 mt-2 max-w-2xl">
                    {initialData
                      ? "Cập nhật thông tin sản phẩm với các trường dữ liệu chi tiết"
                      : "Tạo sản phẩm mới với thông tin đầy đủ và chính xác"}
                  </p>

                  {initialData && (
                    <div className="mt-4 inline-flex items-center px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-slate-700">
                        <span className="font-medium">Đang chỉnh sửa:</span>
                        <span className="ml-1 font-semibold text-blue-700">
                          {initialData.name}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Quay lại</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8">
            {/* Form Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image Upload Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Hình ảnh sản phẩm
                    </h3>
                  </div>
                  <ImageUploadSection
                    form={form}
                    loading={loading}
                    isMultiple
                    note="Kích thước khuyến nghị: 1000x1000px"
                  />
                </div>

                {/* Basic Info Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <BasicInfoSection
                    isProductForm={true}
                    form={form}
                    loading={loading}
                    categories={categories}
                  />
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <DescriptionSection form={form} loading={loading} />
                </div>

                {/* Variants Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Color Variants */}
                  <div className="bg-white rounded-2xl shadow-lg  p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <VariantSelector
                      loading={loading}
                      type="color"
                      title="Màu sắc"
                      icon={<Palette className="w-4 h-4" />}
                      selectedVariants={selectedColors}
                      onRemoveVariant={handleRemoveColor}
                      onAddVariant={(newColorObject) => {
                        let newColorInstance =
                          newColorObject as ProductColorInterface;
                        handleAddColor({
                          hex: newColorInstance.hex,
                          name: newColorInstance.name,
                          stock: newColorInstance.stock,
                          price: newColorInstance.price,
                          _temp: true,
                        });
                      }}
                      onUpdateVariant={handleUpdateColor}
                    />
                  </div>

                  {/* Size Variants */}
                  <div className="bg-white rounded-2xl shadow-lg  p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <VariantSelector
                      loading={loading}
                      type="size"
                      title="Kích thước"
                      icon={<Ruler className="w-4 h-4" />}
                      selectedVariants={selectedSizes}
                      onRemoveVariant={handleRemoveSize}
                      onAddVariant={(newSizeObject) => {
                        let newSizeInstance =
                          newSizeObject as ProductSizeInterface;
                        handleAddSize({
                          name: newSizeInstance.name,
                          stock: newSizeInstance.stock,
                          price: newSizeInstance.price,
                          _temp: true,
                        });
                      }}
                      onUpdateVariant={handleUpdateSize}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Settings */}
              <div className="lg:col-span-1 space-y-6 ">
                {/* Gift Products */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Quà tặng
                    </h3>
                  </div>

                  <div className="min-h-[400px] overflow-hidden">
                    <GiftProductSelector
                      form={form}
                      loading={loading}
                      initValue={initialData?.giftProducts ?? []}
                    />
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cài đặt
                    </h3>
                  </div>
                  <SettingsSection form={form} loading={loading} />
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">SEO</h3>
                  </div>
                  <SEOForm form={form} loading={loading} />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mt-8">
              <div className="flex flex-row items-center justify-center gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full text-sm sm:w-auto min-w-[180px] h-12 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    hover:from-blue-700 hover:to-purple-700 
                    text-white font-semibold sm:text-lg
                    rounded-xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform 
                    hover:scale-105 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    disabled:transform-none disabled:hover:scale-100
                    focus:ring-4 focus:ring-blue-300
                  `}>
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{action}</span>
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                  className={`
                    w-full  text-sm sm:w-auto min-w-[120px] h-12 
                    border-2 border-gray-300 hover:border-gray-400
                    bg-white hover:bg-gray-50 
                    text-gray-700 font-semibold sm:text-lg
                    rounded-xl shadow-md hover:shadow-lg
                    transition-all duration-300 transform 
                    hover:scale-105 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none disabled:hover:scale-100
                    focus:ring-4 focus:ring-gray-300
                  `}>
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Hủy bỏ</span>
                  </div>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
