/** @format */

"use client";

import Header from "@/components/common/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { commentFormSchema, CommentFormSchema } from "@/schemas/commentSchema";
import { FakeComment } from "@/types/fake-comments";
import { ProductInterface } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Combobox } from "@/components/ui/combobox";

interface CommentFormProps {
  mode: "create" | "edit";
  products: ProductInterface[];
  initialData?: FakeComment;
  onSubmit: (data: Omit<FakeComment, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  mode,
  products,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const form = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      productId: initialData?.productId || 1,
      content: initialData?.content || "",
      ratingCount: initialData?.ratingCount || 5,
      authorName: initialData?.authorName || "",
      avatarUrl: initialData?.avatarUrl || "",
    },
  });

  const action = mode === "create" ? "Tạo comment mới " : "Chỉnh sửa comment";

  return (
    <div className="space-y-6">
      <Header
        title={mode === "create" ? "Tạo mới comment" : "Chỉnh sửa comment"}
        subtitle={
          mode === "create"
            ? "Tạo comment mới cho sản phẩm"
            : "Chỉnh sửa comment cho sản phẩm"
        }
        showBackButton
        onBack={onCancel}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Selection */}
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sản phẩm *</FormLabel>
                    <Combobox
                      value={field.value?.toString() || ""}
                      onChange={(val) => field.onChange(Number(val))}
                      options={products.map((p) => ({
                        label: p.name,
                        value: p.id.toString(),
                      }))}
                      placeholder="Chọn sản phẩm..."
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="ratingCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sao của sản phẩm *</FormLabel>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => field.onChange(i + 1)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <Star
                            className={`w-8 h-8 transition-colors duration-200 ${
                              i < field.value
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung comment *</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={false}
                        {...field}
                        placeholder="Nhập nội dung comment"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người comment *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={false}
                        {...field}
                        placeholder="Tên người comment"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đường dẫn hình ảnh người comment *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={false}
                        {...field}
                        placeholder="Nhập đường dẫn hình ảnh"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                <Button
                  type="submit"
                  className="min-w-[150px] bg-gradient-to-r from-blue-600 to-purple-600 
                    hover:from-blue-700 hover:to-purple-700 text-white font-medium
                    shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg">
                  {action}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  size="lg"
                  className="min-w-[100px] border-gray-300 hover:bg-gray-50">
                  Hủy bỏ
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
