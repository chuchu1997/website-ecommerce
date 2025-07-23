/** @format */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronsUpDown, Tag } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
<<<<<<< HEAD
=======
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
>>>>>>> master

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
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xoá dấu
      .replace(/[^a-z0-9\s-]/g, "") // xoá ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-"); // khoảng trắng -> -

  // Theo dõi thay đổi của name → cập nhật slug nếu là Product Form
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
<<<<<<< HEAD
=======

>>>>>>> master
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Tag className="w-5 h-5 text-green-600" />
          </div>
          Thông tin cơ bản
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm *</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  {...field}
                  placeholder="Nhập tên sản phẩm"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả ngắn *</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  {...field}
                  placeholder="Nhập mô tả ngắn "
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isProductForm && (
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug *</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="san-pham-moi"
                    pattern="\S*"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription>
                  URL thân thiện (không dấu, không khoảng trắng)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU *</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  {...field}
                  placeholder="SP-001"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormDescription>Mã sản phẩm duy nhất</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá cũ </FormLabel>
              <FormControl>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" ₫"
                  allowNegative={false}
                  placeholder="299.000 ₫"
                  disabled={loading}
                  customInput={Input}
                  className="focus:ring-2 focus:ring-blue-500"
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue); // Lưu số thật, không phải chuỗi
                  }}
                />
              </FormControl>
              <FormDescription>Giá bán cơ bản (VNĐ)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá cơ bản *</FormLabel>
              <FormControl>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" ₫"
                  allowNegative={false}
                  placeholder="299.000 ₫"
                  disabled={loading}
                  customInput={Input}
                  className="focus:ring-2 focus:ring-blue-500"
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue); // Lưu số thật, không phải chuỗi
                  }}
                />
              </FormControl>
              <FormDescription>Giá bán cơ bản (VNĐ)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng tồn kho</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  {...field}
                  placeholder="100"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục *</FormLabel>
<<<<<<< HEAD
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
=======
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={loading}
                      className="flex items-center w-[180px] justify-between  focus:ring-2 focus:ring-blue-500">
                      <span className="truncate">
                        {field.value
                          ? categories.find(
                              (category) =>
                                category.id.toString() === field.value
                            )?.name
                          : "Chọn danh mục"}
                      </span>

                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Tìm kiếm danh mục..." />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty>Không tìm thấy danh mục nào.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              field.onChange(category.id.toString());
                            }}>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === category.id.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
>>>>>>> master
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
