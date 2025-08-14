/** @format */

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronsUpDown, Info, Package2, SaladIcon } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { InputSectionWithForm } from "@/components/ui/inputSectionWithForm";

interface BasicInfoSectionProps {
  form: any;
  loading: boolean;
  categories: Array<{ id: number; name: string }>;
  isProductForm?: boolean;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form,
  loading,
  categories,
  isProductForm = false,
}) => {
  const generateSlug = (str: string): string =>
    str
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.]/g, " ")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    if (!isProductForm) return;

    const subscription = form.watch((values: any, { name }: any) => {
      if (name === "name") {
        const nameValue = values.name || "";
        const slug = generateSlug(nameValue);
        form.setValue("slug", slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isProductForm]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Thông tin cơ bản
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Các thông tin cần thiết về sản phẩm
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name - Full Width */}
        <div className="lg:col-span-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                  Tên sản phẩm
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Nhập tên sản phẩm của bạn"
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300"
                  />
                </FormControl>
                <FormMessage className="text-sm mt-2" />
              </FormItem>
            )}
          />
        </div>

        {/* Short Description - Full Width */}
        <div className="lg:col-span-2">
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                  Mô tả ngắn
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    {...field}
                    placeholder="Nhập mô tả ngắn về sản phẩm"
                    className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-sm mt-2" />
              </FormItem>
            )}
          />
        </div>

        {/* SKU */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                SKU
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  {...field}
                  placeholder="SP-001"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-2">
                Mã sản phẩm duy nhất để quản lý
              </FormDescription>
              <FormMessage className="text-sm mt-2" />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                Danh mục
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={loading}
                      className="w-full h-12 justify-between text-base border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 bg-white hover:bg-gray-50">
                      <span className="truncate text-left font-normal">
                        {field.value
                          ? categories.find(
                              (category) =>
                                category.id.toString() === field.value
                            )?.name
                          : "Chọn danh mục sản phẩm"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 border-0 shadow-2xl rounded-2xl">
                  <Command className="rounded-2xl border border-gray-200">
                    <CommandInput
                      placeholder="Tìm kiếm danh mục..."
                      className="h-12 text-base border-0 focus:ring-0"
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-6 text-center text-gray-500">
                        Không tìm thấy danh mục nào.
                      </CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              field.onChange(category.id.toString());
                            }}
                            className="py-3 px-4 cursor-pointer hover:bg-blue-50 transition-colors duration-150 text-base">
                            <Check
                              className={cn(
                                "mr-3 h-5 w-5 text-blue-600",
                                field.value === category.id.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="font-medium">{category.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-sm mt-2" />
            </FormItem>
          )}
        />

        {/* Original Price */}
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-800">
                Giá cũ
              </FormLabel>
              <FormControl>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" ₫"
                  allowNegative={false}
                  placeholder="299.000 ₫"
                  disabled={loading}
                  customInput={Input}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300"
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-2">
                Giá bán trước khi giảm giá (VNĐ)
              </FormDescription>
              <FormMessage className="text-sm mt-2" />
            </FormItem>
          )}
        />

        {/* Current Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                Giá bán
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" ₫"
                  allowNegative={false}
                  placeholder="199.000 ₫"
                  disabled={loading}
                  customInput={Input}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300"
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 mt-2">
                Giá bán hiện tại (VNĐ)
              </FormDescription>
              <FormMessage className="text-sm mt-2" />
            </FormItem>
          )}
        />
        {/* Sale Count - Only for Product Form */}
        {isProductForm && (
          <InputSectionWithForm
            form={form}
            nameFormField="saleCount"
            loading={false}
            title=" Số lượt sản phẩm đã bán"
            placeholder="Nhập Số lượt sản phẩm đã bán (VD: 1000, 2, 3...)"
            type="number"
            showCard={false}
            icon={SaladIcon}
            description=" Số lượt sản phẩm đã bán"
          />
        )}

        {/* Stock */}

        <InputSectionWithForm
          form={form}
          nameFormField="stock"
          loading={false}
          title="Số lượng tồn kho"
          placeholder="Nhập số lượng tồn kho (VD: 1, 2, 3...)"
          type="number"
          showCard={false}
          icon={Package2}
          description="Số lượng sản phẩm còn lại trong kho"
        />

        {/* Slug - Only for non-Product Form */}
        {!isProductForm && (
          <div className="lg:col-span-2">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800 flex items-center">
                    Slug
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="san-pham-moi"
                      pattern="\S*"
                      className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all duration-200 hover:border-gray-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 mt-2">
                    URL thân thiện (không dấu, không khoảng trắng)
                  </FormDescription>
                  <FormMessage className="text-sm mt-2" />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
