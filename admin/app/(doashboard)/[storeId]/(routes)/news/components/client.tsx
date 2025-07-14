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
import { ArticleInterface } from "@/types/news";
import ArticleAPI from "@/app/api/articles/article.api";
import { CardCommon } from "@/components/common/CardCommon";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";
import toast from "react-hot-toast";
import PaginationCustom from "@/components/common/PaginationCustom";

export const NewsClient = () => {
  const { storeId } = useParams();
  const [news, setNews] = useState<ArticleInterface[]>([]);
  const [totalNews, setTotalNews] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const showDialog = useAlertDialog();

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);
  const fetchArticles = async () => {
    const limit = 8;

    if (storeId) {
      let response = await ArticleAPI.getArticlesWithStoreID({
        storeId: Number(storeId.toString()),
        currentPage: 1,
        limit,
      });
      if (response.status === 200) {
        const { articles, total } = response.data as {
          articles: ArticleInterface[];
          total: number;
        };
        if (articles) {
          setNews(articles);
          setTotalNews(total);
          const totalPagesCal = Math.ceil(total / limit);
          setTotalPages(totalPagesCal);
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Tin tức  (${totalNews})`}
          description={"Tất cả Tin tức trong Store  "}
        />
        <Button
          className="cursor-pointer"
          onClick={() => router.push(`/${storeId}/news/new`)}>
          <Plus className="w-4 h-4"></Plus>
          Tạo mới
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((newItem) => (
          <CardCommon
            key={newItem.id}
            title={newItem.title}
            id={newItem.id}
            image={newItem.imageUrl ?? ""}
            description={newItem.shortDescription ?? ""}
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

                  const res = await ArticleAPI.deleteArticle(id);
                  if (res.status === 200) {
                    toast.success("Đã xóa tin tức thành công ");
                    await fetchArticles();
                  }
                },
              });
            }}
            onEdit={(id) => {
              router.push(`/${storeId}/news/${newItem.slug}`);
            }}
          />
        ))}
      </div>
      <Separator />

      <PaginationCustom
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </>
  );
};
