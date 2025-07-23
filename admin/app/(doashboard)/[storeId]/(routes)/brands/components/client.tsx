/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { BannerInterface } from "@/types/banner";
import BannerAPI from "@/app/api/banners/banner.api";
import { BrandInterface } from "@/types/brand";
import { CardCommon } from "@/components/common/CardCommon";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";
import toast from "react-hot-toast";
import BrandAPI from "@/app/api/brands/brands.api";

export const BrandClient = () => {
  const { storeId } = useParams();
  const [brands, setBrands] = useState<BrandInterface[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBrands, setTotalBrands] = useState(0);
  const router = useRouter();
  const showDialog = useAlertDialog();
  const fetchAllBrands = async () => {
    if (storeId && typeof storeId === "string") {
      let res = await BrandAPI.getBrandWithStoreID(Number(storeId));
      if (res.status === 200) {
        const { brands } = res.data as { brands: BrandInterface[] };
        setBrands(brands);
        setTotalBrands(brands.length);
      }
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between ">
        <Heading
          title={`Quản lý Thương hiệu & Đối tác   (${totalBrands || 0})`}
          description={"Hình ảnh trong Store -()- "}
        />
        <Button
          className="cursor-pointer"
          onClick={() => router.push(`/${storeId}/brands/new`)}>
          <Plus className="w-4 h-4"></Plus>
          Tạo mới
        </Button>
      </div>

      <Separator />
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <CardCommon
              key={brand.id}
              title={brand.name}
              id={brand.id}
              image={brand.imageUrl}
              description={brand.description ?? ""}
              variant={""}
              onDelete={(id) => {
                showDialog({
                  title: "Xóa sản phẩm?",
                  description:
                    "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
                  confirmText: "Xóa",
                  cancelText: "Hủy",
                  onConfirm: async () => {
                    // Gọi API xóa hoặc logic xử lý
                    const res = await BrandAPI.deleteBrand(id);
                    if (res.status === 200) {
                      toast.success("Đã xóa brand thành công ");
                      // await fetchAllBanners();
                      await fetchAllBrands();
                    }
                  },
                });
              }}
              onEdit={(id) => {
                router.push(`/${storeId}/brands/${id}`);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
