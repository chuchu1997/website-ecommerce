/** @format */

"use client";

import { ProductInterface } from "@/types/product";
import ProductImageGallery from "./productImageGallery";
import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Phone,
  MessageCircle,
  Check,
  Gift,
  Award,
  Clock,
} from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductWidgets } from "@/components/ui/product/product";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { discountTypeEnum } from "@/types/promotion";
import ProductSuggess from "./productSuggest";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { UserCartAPI } from "@/api/cart/cart.api";
import { CartItemSSR } from "@/app/(main)/gio-hang/components/cart";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/cart-context";
import { useAddToCart } from "@/hooks/use-addToCart";

interface propsProductClientPC {
  product: ProductInterface;
}

export const ProductClientPC = ({ product }: propsProductClientPC) => {
  const tabs = [
    { key: "description", label: "Mô tả sản phẩm", icon: "📝" },
    { key: "reviews", label: "Đánh giá", icon: "⭐" },
    { key: "shipping", label: "Vận chuyển", icon: "🚚" },
  ];

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null
  );
  const [isMount, setIsMount] = useState(false);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const cart = useAddToCart();

  const promotion = product.promotionProducts[0];
  useEffect(() => {
    setIsMount(true);
  }, []);
  const discountPercentage = (() => {
    if (promotion) {
      const basePrice = product.price;
      const promotionPrice =
        promotion.discountType === discountTypeEnum.PERCENT
          ? basePrice * (1 - promotion.discount / 100)
          : basePrice - promotion.discount;
      return Math.round(((basePrice - promotionPrice) / basePrice) * 100);
    }
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

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = async (e: React.MouseEvent, isCheckout: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    await cart.addToCart({
      product,
      isCheckout,
    });
  };
  const getDiscountedPrice = () => {
    const promotionProductFlashSale = product.promotionProducts[0];
    if (!promotionProductFlashSale) return product.price;
    if (promotionProductFlashSale.discountType === discountTypeEnum.PERCENT) {
      return product.price * (1 - promotionProductFlashSale.discount / 100);
    }
    return product.price - promotionProductFlashSale.discount;
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
        }`}
      />
    ));
  };
  if (!isMount) return null;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className=" px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm mt-[5px] md:mt-[20px]">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Trang chủ
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Sản phẩm
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square responsive bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ImageLoader
                src={product.images[0].url ?? ""}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="responsive flex-shrink-0 w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <ImageLoader
                    src={image.url}
                    fill
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Image Actions */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>{product.viewCount.toLocaleString()} lượt xem</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-lg transition-colors ${
                    isWishlisted
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}>
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight pr-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 text-xs bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-gray-900">
                    {product.sku}
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderRatingStars(Math.floor(product.ratingCount))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.ratingCount} ({product.reviews} đánh giá)
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>

                {product.stock <= 0 ? (
                  <span className="text-sm text-red-600 font-medium flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Hết hàng
                  </span>
                ) : (
                  <span className="text-sm text-emerald-600 font-medium flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Còn hàng
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {FormatUtils.formatPriceVND(getDiscountedPrice())}
                </span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">
                      {FormatUtils.formatPriceVND(showLineThroughPrice ?? 0)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-md">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  🔥 Flash Sale
                </span>
                <span className="text-sm text-gray-600">
                  Ưu đãi có thời hạn
                </span>
              </div>

              {product.stock < 10 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-800 font-medium text-sm flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Chỉ còn {product.stock} sản phẩm - Đặt hàng ngay!
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Product Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                    <span>Màu sắc</span>
                  </h3>
                  <div className="flex items-center flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-gray-900 ring-2 ring-gray-200"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600">
                      Đã chọn:{" "}
                      <span className="font-medium">{selectedColor.name}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Kích thước</span>
                  </h3>
                  <div className="flex items-center flex-wrap gap-3">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}>
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1 || product.stock <= 0}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        quantity >= product.stock || product.stock <= 0
                      }>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Còn lại:{" "}
                    <span className="font-medium text-emerald-600">
                      {product.stock}
                    </span>
                  </span>
                </div>

                {/* Mobile-optimized buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={(e: any) => handleAddToCart(e, false)}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-white border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e, true)}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Gift Products */}
            {product.giftProducts && product.giftProducts.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Gift className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-800">
                    Quà tặng miễn phí kèm theo
                  </h3>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.giftProducts.map((giftContainer, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 text-sm text-gray-700 border border-emerald-200">
                      {giftContainer.gift.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Truck className="w-5 h-5 text-blue-600" />,
                  title: "Miễn phí vận chuyển",
                  desc: "Đơn hàng trên 500.000đ",
                },
                {
                  icon: <Shield className="w-5 h-5 text-emerald-600" />,
                  title: "Thanh toán bảo mật",
                  desc: "100% được bảo vệ",
                },
                {
                  icon: <RotateCcw className="w-5 h-5 text-purple-600" />,
                  title: "Đổi trả dễ dàng",
                  desc: "15 ngày đổi trả",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {feature.title}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cần hỗ trợ?</p>
                    <p className="text-sm text-gray-600">
                      Liên hệ với chúng tôi
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Gọi ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-4 px-3 sm:px-6 font-medium text-xs sm:text-sm transition-colors ${
                    activeTab === key
                      ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <span>{icon}</span>
                    <span className="text-center">{label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mô tả chi tiết sản phẩm
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <EditorClientWrapper jsonString={product.description} />
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Đánh giá từ khách hàng
                </h3>
                <div className="space-y-4">
                  {product.fakeComments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-semibold">
                            {comment.authorName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {comment.authorName}
                            </h4>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <div className="flex items-center space-x-1">
                                {renderRatingStars(comment.ratingCount)}
                              </div>
                              <span className="text-sm text-gray-600">
                                {comment.ratingCount}.0
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Thông tin vận chuyển & chính sách
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Các phương thức giao hàng
                    </h4>
                    {[
                      {
                        icon: <Truck className="w-5 h-5 text-blue-600" />,
                        title: "Giao hàng tiêu chuẩn",
                        desc: "3-5 ngày làm việc",
                        price: "Miễn phí (đơn > 500k)",
                      },
                      {
                        icon: <Truck className="w-5 h-5 text-emerald-600" />,
                        title: "Giao hàng nhanh",
                        desc: "1-2 ngày làm việc",
                        price: "200.000đ",
                      },
                      {
                        icon: <Truck className="w-5 h-5 text-purple-600" />,
                        title: "Giao hàng trong ngày",
                        desc: "Đặt trước 3h chiều",
                        price: "400.000đ",
                      },
                    ].map((shipping, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-white flex-shrink-0">
                            {shipping.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900">
                              {shipping.title}
                            </h5>
                            <p className="text-sm text-gray-600 mb-1">
                              {shipping.desc}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {shipping.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Chính sách hỗ trợ
                    </h4>
                    {[
                      {
                        icon: <RotateCcw className="w-5 h-5 text-orange-600" />,
                        title: "Đổi trả miễn phí",
                        desc: "30 ngày đổi trả không điều kiện",
                      },
                      {
                        icon: <Shield className="w-5 h-5 text-red-600" />,
                        title: "Bảo hành chính hãng",
                        desc: "Bảo hành 12-36 tháng",
                      },
                      {
                        icon: <Award className="w-5 h-5 text-indigo-600" />,
                        title: "Cam kết chất lượng",
                        desc: "100% hàng chính hãng",
                      },
                    ].map((policy, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-white flex-shrink-0">
                            {policy.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900">
                              {policy.title}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {policy.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
