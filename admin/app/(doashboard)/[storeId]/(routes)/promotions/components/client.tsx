/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { useEffect, useState } from "react";

import { PromotionAPI } from "@/app/api/promotions/promotion.api";
import { PromotionType } from "@/types/promotions";
import PaginationCustom from "@/components/common/PaginationCustom";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";
import { CardCommon } from "@/components/common/CardCommon";
import toast from "react-hot-toast";

export const PromotionClient = () => {
  const { storeId } = useParams();
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const [totalPromotions, setTotalPromotions] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const showDialog = useAlertDialog();

  useEffect(() => {
    fetchPromotions();
  }, []);
  const fetchPromotions = async () => {
    if (storeId) {
      let response = await PromotionAPI.getAllPromotionsFromStore({
        storeID: Number(storeId),
        currentPage: currentPage,
      });
      if (response.status === 200) {
        setPromotions(response.data);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between ">
        <Heading
          title={`Các chương trình khuyến mãi   (${totalPromotions})`}
          description={"Tất cả chương trình khuyến mãi trong STORE  "}
        />
        <Button
          className="cursor-pointer"
          onClick={() => router.push(`/${storeId}/promotions/new`)}>
          <Plus className="w-4 h-4"></Plus>
          Tạo mới
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promotions.map((promotion) => (
          <CardCommon
            key={promotion.id}
            title={promotion.name ?? ""}
            id={promotion.id}
            image={"/flash-sale.png"}
            description={""}
            variant={"flash-sale"}
            onDelete={(id) => {
              showDialog({
                title: "Xóa sản phẩm?",
                description:
                  "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
                confirmText: "Xóa",
                cancelText: "Hủy",
                onConfirm: async () => {
                  const res = await PromotionAPI.deletePromotion(id);
                  if (res.status === 200) {
                    toast.success(
                      "Đã xóa chương trình khuyến mãi thành công !!"
                    );
                    await fetchPromotions();
                  }
                },
              });
            }}
            onEdit={(id) => {
              router.push(`/${storeId}/promotions/${id}`);
            }}
          />
        ))}
      </div>
      <Separator />

      {/* <PaginationCustom
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      /> */}
    </>
  );
};
