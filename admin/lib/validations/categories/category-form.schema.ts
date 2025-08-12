import { z } from "zod";
import { CategoryVariant } from "@/types/categories";

// SEO validation schema
const seoSchemaZod = z.object({
  title: z.string().optional(),
  description: z.string().optional(), 
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  canonicalUrl: z.string().optional(),
  altText: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

// Main category form validation schema
export const categoryFormSchema = z.object({
  name: z.string().min(3, "Vui lòng nhập tên của danh mục"),
  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang",
    })
    .transform((val) =>
      val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    ),
  imageUrl: z
    .object({
      url: z.string().min(1, "Vui lòng chọn ảnh."),
      file: z.instanceof(File).optional(),
    })
    .refine((val) => !!val.url, {
      message: "Vui lòng chọn ảnh.",
    }),
  position: z.coerce.number().optional(),
  parentId: z.string().optional(),
  variant: z.nativeEnum(CategoryVariant).optional(),
  description: z.string().min(3, "Vui lòng nhập mô tả của danh mục"),
  seo: seoSchemaZod.optional(),
});

// Extract the TypeScript type from the schema
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
