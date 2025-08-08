/** @format */
"use client";
import { CategoryAPI } from "@/api/categories/category.api";
import { ScrollToLoadProductsWithCategory } from "@/components/scrollToLoad/scrollToLoadProductWithCategoryComponent";
import { ProductWidgets } from "@/components/ui/product/product";
import { ProductCard } from "@/components/ui/product/product-card";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { useEffect, useState } from "react";

interface Props {
  product: ProductInterface;
}

const ProductSuggess = (props: Props) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const { product } = props;

  useEffect(() => {
    if (product) {
      fetchProductSuggesst();
    }
  }, [product]);
  const fetchProductSuggesst = async () => {
    let res = await CategoryAPI.getCategoryWithSlug(
      product.category?.slug ?? "",
      1,
      8
    );
    const filtered = res.data.products.filter(
      (item: ProductInterface) => item.name !== product.name
    );

    setProducts(filtered);
  };

  return (
    <div>
      <div className="mb-6 px-2 sm:px-6 lg:px-0 my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Có thể bạn sẽ thích
            </h2>
          </div>
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"></path>
              </svg>
              <span>Curated for you</span>
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Các sản phẩm có danh mục liên quan tới sản phẩm bạn đang xem
        </p>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 space-y-2">
        {products.map((product, index) => {
          // Get the first promotion if available
          const promotion =
            product.promotionProducts && product.promotionProducts.length > 0
              ? product.promotionProducts[0].promotion
              : undefined;

          return (
            <div key={product.id || index}>
              <ProductCard
                product={product}
                promotion={promotion}
                isSingleColumn={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSuggess;
