/** @format */

import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import {
  BadgePercent,
  Star,
  Info,
  Truck,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./productImageGallery";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductWidgets } from "@/components/ui/product/product";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { discountTypeEnum } from "@/types/promotion";
import { useRouter } from "next/navigation";
import { AddToCartButton } from "@/components/ui/Cart/addToCartButton";
import { UserCartAPI } from "@/api/cart/cart.api";
import { CartItemSSR } from "@/app/gio-hang/components/cart";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import ProductSuggess from "./productSuggest";
import { useCartContext } from "@/context/cart-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface propsProductMobile {
  product: ProductInterface;
}
export default function ProductMobile({ product }: propsProductMobile) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const { setCartQuantity, cartQuantity } = useCartContext();

  const promotion = product.promotionProducts[0];
  const discountPercentage = (() => {
    // Nếu có khuyến mãi
    if (promotion) {
      const basePrice = product.price;
      const promotionPrice =
        promotion.discountType === discountTypeEnum.PERCENT
          ? basePrice * (1 - promotion.discount / 100)
          : basePrice - promotion.discount;

      return Math.round(((basePrice - promotionPrice) / basePrice) * 100);
    }

    // Nếu không có khuyến mãi, nhưng có originalPrice > price
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }

    return 0;
  })();
  const showLineThroughPrice = promotion
    ? product.price
    : product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : null;
  const getDiscountedPrice = () => {
    const promotionProductFlashSale = product.promotionProducts[0];
    if (!promotionProductFlashSale) return product.price;

    if (promotionProductFlashSale.discountType === discountTypeEnum.PERCENT) {
      return product.price * (1 - promotionProductFlashSale.discount / 100);
    }

    return product.price - promotionProductFlashSale.discount;
  };

  const StickyBottomActions = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="flex gap-3">
        {/* Store Button */}

        {/* Chat Button */}
        {/* <button
          className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-12 border border-gray-300 rounded-lg"
          onClick={() => {
            cart.addItem(product, 1);
          }}>
          <div className="w-5 h-5 bg-gray-300 rounded mb-1"></div>
          <span className="text-xs text-gray-600">Thêm vào giỏ hàng</span>
        </button> */}
        <AddToCartButton product={product} quantity={1} />

        {/* Buy Now Button */}
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          onClick={async () => {
            const userID = cookies.userInfo.id;

            if (userID) {
              const res = await UserCartAPI.getAllCartItemsOfUser(userID);
              const currentItems = Array.isArray(res.data?.cart?.items)
                ? res.data.cart.items
                : [];

              // Tìm xem sản phẩm đã có trong giỏ chưa
              const existingIndex = currentItems.findIndex(
                (item: any) => item.product.id === product.id
              );

              let updatedItems: CartItemSSR[] = [];

              if (existingIndex !== -1) {
                // ✅ Nếu đã tồn tại, cập nhật quantity
                updatedItems = currentItems.map((item: any, index: number) =>
                  index === existingIndex
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        isSelect: true,
                      }
                    : {
                        ...item,
                        isSelect: false,
                      }
                );
              } else {
                // ✅ Nếu chưa có, thêm mới
                updatedItems = [
                  ...currentItems.map((item: any) => ({
                    ...item,
                    isSelect: false,
                  })),
                  {
                    isSelect: true,
                    product,
                    quantity: 1,
                  },
                ];
              }

              // Gửi dữ liệu lên server
              await UserCartAPI.updateCartItems(
                userID,
                res.data.cart.id,
                updatedItems
              );

              setCartQuantity(updatedItems.length);

              toast.success("Đã thêm sản phẩm vào giỏ hàng");
            }

            // cart.cleanSelectedItems();

            // cart.addItem(product, 1);
            router.push("/checkout");
          }}>
          Mua Ngay
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="mobile-product-version block md:hidden max-w-md mx-auto bg-white">
        <ProductImageGallery images={product.images} />
        {/* Product Info */}
        <div className="px-4 py-4 bg-white">
          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p className="text-2xl font-bold text-red-500 order-1">
                {FormatUtils.formatPriceVND(getDiscountedPrice())}
              </p>
              <BadgePercent size={18} className="text-red-500 order-3" />

              {showLineThroughPrice && (
                <p className="text-base font-medium text-gray-400 line-through order-2">
                  {FormatUtils.formatPriceVND(showLineThroughPrice)}
                </p>
              )}

              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <div className="bg-red-100 text-red-600 rounded-md px-2 py-1 text-xs font-semibold order-4">
                    -{discountPercentage}%
                  </div>
                )}
            </div>
          </div>

          {/* Product Title */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-2">
              <Badge className="border-none py-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white text-xs flex-shrink-0">
                HÀNG VIỆT
              </Badge>
              <h1 className="text-lg font-medium text-gray-800 leading-6 line-clamp-3">
                {product.name}
              </h1>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">
                {product.ratingCount}
              </span>
              <span className="text-blue-500">(100K)</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="text-gray-600 flex items-center gap-1">
              <span>Bán</span>
              <span className="text-gray-900 font-semibold">200K</span>
              <span>trực tuyến</span>
              <Info size={14} className="text-gray-400" />
            </div>
          </div>

          <Separator />

          {/* Shipping Info */}
          <div className="py-3">
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-ship text-ship px-2 py-1 rounded text-xs font-semibold">
                    Miễn phí vận chuyển
                  </span>
                  <span className="text-gray-800 font-medium">
                    Đảm bảo giao vào 14 tháng 6
                  </span>
                </div>
                <p className="flex items-center gap-2 text-gray-600">
                  <span>Nhận voucher ít nhất 15K đ nếu đơn giao trễ</span>
                  <Info size={14} className="text-gray-400" />
                </p>
                <p className="text-gray-600">
                  Phí vận chuyển:
                  <span className="line-through ml-1">69.000đ</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Policy */}
          <div className="flex items-center py-3 gap-3">
            <ShieldCheck size={20} className="text-gray-500 flex-shrink-0" />
            <p className="text-gray-800 text-sm font-medium">
              Thanh toán khi giao - Trả hàng miễn phí trong 15 ngày
            </p>
          </div>

          <Separator />

          {product.giftProducts && product.giftProducts.length > 0 && (
            <div className="my-[10px]">
              <h3 className="font-semibold text-green-700 mb-2 text-sm">
                🎁 Quà tặng kèm theo
              </h3>
              {product.giftProducts.map((giftContainer: any) => {
                const gift: ProductInterface = giftContainer.gift;
                return (
                  <div key={gift.id}>
                    <ProductWidgets.giftItem gift={gift} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Reviews Section */}
          <div className="py-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">
                Đánh giá của khách hàng ({product.fakeComments.length})
              </p>

              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span>Xem thêm</span>
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-gray-900">5</span>
                <span className="text-sm text-gray-400">/5</span>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-3 pt-2">
              {product.fakeComments.map((fakeComment) => (
                <div className="bg-gray-50 p-3 rounded-lg" key={fakeComment.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarImage src={fakeComment.avatarUrl} />
                      <AvatarFallback>
                        {fakeComment.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {fakeComment.authorName}
                    </span>
                    <div className="flex">
                      {Array.from({ length: fakeComment.ratingCount }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{fakeComment.content}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Product Description */}
          <div className="py-3">
            <h3 className="font-semibold text-sm mb-2">
              Giới thiệu về sản phẩm này
            </h3>
            <EditorClientWrapper jsonString={product.description} />
          </div>

          <Separator />

          {/* Suggested Products */}

          <ProductSuggess product={product} />
        </div>

        <StickyBottomActions />
      </div>
    </div>
  );
}
