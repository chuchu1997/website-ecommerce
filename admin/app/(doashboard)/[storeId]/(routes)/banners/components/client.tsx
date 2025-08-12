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
import { CardCommon } from "@/components/common/CardCommon";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";
import toast from "react-hot-toast";

export const BannerClient = () => {
  const { storeId } = useParams();
  const [banners, setBanners] = useState<BannerInterface[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBanner, setTotalBanner] = useState(1);
  const showDialog = useAlertDialog();

  const router = useRouter();

  const fetchAllBanners = async () => {
    if (storeId && typeof storeId === "string") {
      let response = await BannerAPI.getBannerWithStoreID(Number(storeId));
      if (response.status === 200) {
        const { banners } = response.data as { banners: BannerInterface[] };
        setBanners(banners);
      }
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between ">
        <Heading
          title={`Quản lý Banner  (${banners?.length || 0})`}
          description={"Hình ảnh trong Store -()- "}
        />
        <Button
          className="cursor-pointer"
          onClick={() => router.push(`/${storeId}/banners/new`)}>
          <Plus className="w-4 h-4"></Plus>
          Tạo mới
        </Button>
      </div>
      <Separator />

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <CardCommon
              key={banner.id}
              title={"Banner"}
              id={banner.id}
              image={banner.imageUrl}
              description={banner.description ?? ""}
              variant={"Electronics"}
              onDelete={(id) => {
                showDialog({
                  title: "Xóa sản phẩm?",
                  description:
                    "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
                  confirmText: "Xóa",
                  cancelText: "Hủy",
                  onConfirm: async () => {
                    // Gọi API xóa hoặc logic xử lý

                    const res = await BannerAPI.deleteBanner(id);
                    if (res.status === 200) {
                      toast.success("Đã xóa banner thành công ");
                      await fetchAllBanners();
                    }
                  },
                });
              }}
              onEdit={(id) => {
                router.push(`/${storeId}/banners/${id}`);
              }}
            />
          ))}
        </div>
      </div>
      {/* <DataTable
        currentPage={currentPage}
        onPageChange={async (page: number) => {
          setCurrentPage(page);
        }}
        totalItems={4}
        searchKey="label"
        columns={columns}
        data={banners}></DataTable> */}
    </>
  );
};
