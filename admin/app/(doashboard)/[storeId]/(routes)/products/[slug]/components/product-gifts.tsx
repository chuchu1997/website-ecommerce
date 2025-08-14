import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, X, Gift, Search, Plus, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductAPI from "@/app/api/products/products.api";
import { useParams } from "next/navigation";
import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import debounce from "lodash.debounce";
import { GiftProduct } from "./product.form";

interface GiftProductSelectorProps {
  form: any;
  loading: boolean;
  initValue?: any[];
}

export const GiftProductSelector: React.FC<GiftProductSelectorProps> = ({
  form,
  loading,
  initValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [gifts, setGifts] = useState<ProductInterface[]>([]);
  const [selectGifts, setSelectGifts] = useState<ProductInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { storeId, slug } = useParams();
  const [currentSlugs, setCurrentSlugs] = useState<string[]>(
    slug ? [slug.toString()] : []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((name: string) => {
      if (name.length > 3) {
        fetchListProductGift(name);
      } else {
        fetchListProductGift("");
      }
    }, 300),
    [currentSlugs, searchTerm]
  );

  const fetchListProductGift = async (name: string) => {
    const response = await ProductAPI.getListProducts({
      storeID: Number(storeId),
      name: name,
    });

    if (response.status === 200) {
      let data = response.data.products.filter(
        (product: ProductInterface) => !currentSlugs.includes(product.slug)
      );
      setGifts(data);
    }
  };

  // Initialize with existing gift products
  useEffect(() => {
    if (initValue) {
      let gifts: ProductInterface[] = initValue.map((value) => ({
        ...value.gift,
        id: value.id,
      })) as ProductInterface[];

      setCurrentSlugs((prev) => [
        ...prev,
        ...gifts.map((value) => value.slug ?? ""),
      ]);
      setSelectGifts(gifts);
    }
  }, [initValue]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Watch searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleProductSelect = (product: ProductInterface): void => {
    const currentSelection: GiftProduct[] = form.getValues("giftProducts") || [];
    const newSelection: GiftProduct[] = [
      ...currentSelection,
      { id: product.id, slug: product.slug },
    ];

    form.setValue("giftProducts", newSelection);
    setSelectGifts((prev) => [...prev, product]);
    setCurrentSlugs((prev) => [...prev, product.slug]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleProductRemove = (productId: number): void => {
    const currentSelection: GiftProduct[] = form.getValues("giftProducts") || [];
    const newSelection: GiftProduct[] = currentSelection.filter(
      (gift) => gift.id !== productId
    );
    const newSelectWithRemove: ProductInterface[] = selectGifts.filter(
      (item) => item.id !== productId
    );

    setSelectGifts(newSelectWithRemove);
    setCurrentSlugs((prev) =>
      prev.filter(
        (s) => s === slug || newSelectWithRemove.some((gift) => gift.slug === s)
      )
    );
    form.setValue("giftProducts", newSelection);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Sản phẩm quà tặng</h3>
            <p className="text-sm text-gray-500 mt-1">
              Chọn sản phẩm kèm theo (Tùy chọn)
            </p>
          </div>
        </div>
        
        {/* Selected Count Badge */}
        {selectGifts.length > 0 && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full">
            <Package className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-800">
              {selectGifts.length} sản phẩm
            </span>
          </div>
        )}
      </div>

      {/* Selected Products Display */}
      {selectGifts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-semibold text-gray-800">
              Sản phẩm quà tặng đã chọn
            </h4>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {selectGifts.map((product: ProductInterface) => (
              <div
                key={product.id}
                className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl hover:shadow-md hover:border-amber-300 transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-200 shadow-sm"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Gift className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-gray-900 truncate mb-1">
                    {product.name}
                  </h5>
                  <p className="text-sm font-bold text-amber-700">
                    {FormatUtils.formatPriceVND(product.price)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Sẵn có</span>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleProductRemove(product.id)}
                  disabled={loading}
                  className="p-2 rounded-xl hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Gift Product Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="w-full h-14 justify-between text-base border-2 border-dashed border-amber-300 hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 rounded-2xl transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 bg-white"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">
              {selectGifts.length > 0
                ? "Thêm sản phẩm quà tặng khác"
                : "Chọn sản phẩm quà tặng"}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-3 bg-white border-0 rounded-2xl shadow-2xl max-h-80 overflow-hidden">
            {/* Search Header */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm quà tặng..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 text-base transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* Product List */}
            <div className="max-h-60 overflow-y-auto">
              {gifts.length > 0 ? (
                <div className="py-2">
                  {gifts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleProductSelect(product)}
                      className="w-full flex items-center space-x-4 px-4 py-4 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-150 text-left border-b border-gray-50 last:border-b-0 group"
                    >
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover border-2 border-gray-200 group-hover:border-amber-300 transition-colors duration-200"
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base font-semibold text-gray-900 truncate mb-1 group-hover:text-amber-900 transition-colors duration-200">
                          {product.name}
                        </h5>
                        <p className="text-base font-bold text-amber-700 group-hover:text-amber-800">
                          {FormatUtils.formatPriceVND(product.price)}
                        </p>
                      </div>

                      {/* Select Indicator */}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-amber-300 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all duration-200">
                        <Plus className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-base font-semibold text-gray-600 mb-2">
                    {searchTerm ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm"}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchTerm
                      ? "Thử tìm kiếm với từ khóa khác"
                      : "Không có sản phẩm nào khả dụng"}
                  </p>
                  {searchTerm && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSearchTerm("")}
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
                    >
                      Xóa tìm kiếm
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper Information */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Gift className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Về sản phẩm quà tặng
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 leading-relaxed">
              <li>• Sản phẩm quà tặng sẽ được gửi kèm khi khách hàng đặt mua</li>
              <li>• Không thể chọn chính sản phẩm hiện tại làm quà tặng</li>
              <li>• Có thể chọn nhiều sản phẩm quà tặng cho một đơn hàng</li>
              <li>• Chức năng này hoàn toàn tùy chọn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Error Display */}
      {form.formState.errors?.giftProducts && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-sm text-red-700 font-medium">
              {form.formState.errors.giftProducts.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};