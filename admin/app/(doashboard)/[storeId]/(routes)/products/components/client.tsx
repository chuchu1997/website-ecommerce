/** @format */

"use client";
import { useAlertDialog } from "@/components/ui/alert-dialog/useAlertDialog";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
// import { columns } from "./column";
// import { DataTable } from "@/components/ui/data-table";
// import { ApiList } from "@/components/ui/api-list";
import { ProductInterface } from "@/types/product";
import ProductAPI from "@/app/api/products/products.api";
import { useEffect, useState } from "react";
import { CardCommon } from "@/components/common/CardCommon";
import toast from "react-hot-toast";
import PaginationCustom from "@/components/common/PaginationCustom";
import { useDebounce } from "@/hooks/useDebounce";

export const ProductClient = () => {
  const { storeId } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200); // chờ 500ms sau khi ngưng gõ

  const showDialog = useAlertDialog();

  const getListProductsRelateWithStoreID = async () => {
    const limit = 8;
    if (storeId) {
      let response = await ProductAPI.getListProducts({
        currentPage: search !== "" ? 1 : currentPage,
        limit: limit,
        storeID: Number(storeId),
        name: search,
      });
      if (response.status === 200) {
        const { products, total } = response.data as {
          products: ProductInterface[];
          total: number;
        };
        if (products) {
          setProducts(products);
          setTotalProduct(total);
          const totalPagesCal = Math.ceil(total / limit);
          setTotalPages(totalPagesCal);
        }
      }
    }
  };
  useEffect(() => {
    getListProductsRelateWithStoreID();
  }, [debouncedSearch, currentPage]);

  return (
    <>
      <div className="flex flex-col gap-y-2 md:flex-row items-center justify-between  overflow-hidden ">
        <Heading
          title={`Sản Phẩm (${totalProduct})`}
          description={"Tất cả Product trong Store  "}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 items-center">
          <Button
            className="cursor-pointer"
            onClick={() => router.push(`/${storeId}/products/new`)}>
            <Plus className="w-4 h-4 mr-2" />
            Tạo mới
          </Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <CardCommon
            key={product.id}
            title={product.name}
            id={product.id}
            image={product.images[0].url}
            description={product.shortDescription ?? ""}
            variant={""}
            onDelete={(id) => {
              showDialog({
                title: "Xóa sản phẩm?",
                description:
                  "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
                confirmText: "Xóa",
                cancelText: "Hủy",
                onConfirm: async () => {
                  const res = await ProductAPI.removeProduct(id);
                  if (res.status === 200) {
                    toast.success("Đã xóa sản phẩm thành công");
                    await getListProductsRelateWithStoreID();
                  }
                },
              });
            }}
            onEdit={(id) => {
              router.push(`/${storeId}/products/${product.slug}`);
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

      {/* <ApiList entityName="products" entityIdName="slug" /> */}
    </>
  );
};
