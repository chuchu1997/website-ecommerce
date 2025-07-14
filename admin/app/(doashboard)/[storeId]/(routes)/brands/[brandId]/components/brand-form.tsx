/** @format */

"use client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ArrowUpAZ, Captions, Link, MousePointer, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

import { ImageUploadSection } from "../../../products/[slug]/components/product-image-upload";
import { InputSectionWithForm } from "@/components/ui/inputSectionWithForm";

import S3CloudAPI from "@/app/api/upload/s3-cloud";
import BannerAPI from "@/app/api/banners/banner.api";
import { BrandBase, BrandInterface } from "@/types/brand";
import BrandAPI from "@/app/api/brands/brands.api";

interface BrandProps {
  initialData: BrandInterface | null;
}

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  images: z.object({
    url: z.string().min(1, "Vui lòng chọn ảnh."),
    file: z.instanceof(File).optional(), // <- optional ở đây
  }),
  linkHref: z.string().optional(),
  position: z.coerce.number().optional(), // Hợp lệ với cả "2" và 2
});

type BrandFormValues = z.infer<typeof formSchema>;

export const BrandForm: React.FC<BrandProps> = ({ initialData }) => {
  const router = useRouter();
  const { storeId } = useParams();

  const [isReady, setIsReady] = useState(false);

  const title = initialData
    ? "Chỉnh sửa (Đối tác, Thương hiệu)"
    : "Tạo (Đối tác, Thương hiệu)  ";
  const description = initialData
    ? "Chỉnh sửa (Đối tác, Thương hiệu) "
    : "Tạo (Đối tác, Thương hiệu) mới ";
  const action = initialData
    ? "Lưu Thay Đổi "
    : "Tạo mới (Đối tác, Thương hiệu)";

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      linkHref: "",
      position: 1,
    },
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      const { name, description, position, linkHref } = data;

      setLoading(true);
      let finalImage = data.images;

      if (data.images.file) {
        const formData = new FormData();
        formData.append("files", data.images.file);
        const uploadRes = await S3CloudAPI.uploadImageToS3(formData);
        if (uploadRes.status !== 200) throw new Error("Upload thất bại");
        const { imageUrls } = uploadRes.data as { imageUrls: string[] };
        if (imageUrls.length > 0) {
          finalImage.file = undefined;
          finalImage.url = imageUrls[0];
        }
      }

      const payload: BrandBase = {
        name: name ?? "",
        description: description ?? "",
        imageUrl: finalImage.url,
        position: position ?? 1,

        ...(linkHref && {
          linkHref: linkHref, // chỉ thêm field position nếu là category cha
        }),
        // linkHref: linkHref ?? undefined,
        storeId: Number(storeId),
      };
      const res = initialData
        ? await BrandAPI.updateBrand(initialData.id, {
            ...payload,
            updatedAt: new Date(),
          })
        : await BrandAPI.createBrand(payload);

      if (res.status === 200) {
        const { message } = res.data as { message: string };
        toast.success(message);
      }
    } catch (_err) {
      toast.error("Something when wrong !!");
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        router.push(`/${storeId}/brands`);
      }
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData?.id) {
        let response = await BannerAPI.deleteBanner(initialData.id);
        if (response.status === 200) {
          const { message } = response.data as { message: string };
          toast.success(message);
          router.push(`/${storeId}/brands/`);
        }
      }
    } catch (err) {
      toast.error("Có lỗi gì đó xảy ra !! ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      setIsReady(true);
    }
  }, [storeId]);

  useEffect(() => {
    if (initialData) {
      const formData: BrandFormValues = {
        ...initialData,
        name: initialData.name ?? "",
        linkHref: initialData.linkHref ?? "",
        position: initialData.position ?? 1,
        images: {
          file: undefined,
          url: initialData.imageUrl ?? "",
        },
      };

      setTimeout(() => {
        form.reset(formData);
      });
    }
  }, [initialData, form]);
  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={async () => {
          await onDelete();
          setOpen(false);
        }}
      />
      <div className="flex items-center justify-between my-4">
        <Heading title={title} description={description} />
        {/* BUTTON DELETE JUST WORKING ON EDIT MODE  */}
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={async () => {
              setOpen(true);
            }}>
            <Trash className="w-4 h-4 "></Trash>
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 auto-rows-max">
            <div className="h-fit">
              <ImageUploadSection
                form={form}
                loading={loading}
                note="Kích thước nên là 200x200"
                title="Hình ảnh Đối tác (Thương hiệu )"
              />
            </div>

            <div className="h-fit">
              <InputSectionWithForm
                form={form}
                nameFormField="name"
                placeholder="Nhập tên đối tác , thương hiệu"
                title="Nhập vào đối tác hoặc thương hiệu "
                icon={Captions}
                loading={loading}
              />
            </div>

            <div className="h-fit">
              <InputSectionWithForm
                form={form}
                nameFormField="description"
                placeholder="Nhập Mô tả của Thương hiệu"
                title="Nhập mô tả"
                icon={Captions}
                loading={loading}
              />
            </div>

            <div className="h-fit">
              <InputSectionWithForm
                form={form}
                icon={Link}
                nameFormField="linkHref"
                placeholder="Nhập đường link  (Nếu có)"
                title="Nhập đường link"
                loading={loading}
              />
            </div>

            <div className="h-fit">
              <InputSectionWithForm
                form={form}
                icon={ArrowUpAZ}
                type="number"
                nameFormField={"position"}
                placeholder="Nhập vị trí (1,2,3...)"
                title="Nhập vị trí "
                loading={loading}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-6 px-2">
            <Button
              disabled={loading}
              className="w-full h-[45px] md:h-[60px] md:w-[600px] text-sm md:text-base"
              type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
    </div>
  );
};
