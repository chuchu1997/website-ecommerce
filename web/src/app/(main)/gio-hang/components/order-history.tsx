/** @format */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  Calendar,
  MapPin,
  CreditCard,
  Star,
  X,
  AlertTriangle,
  LucideIcon,
  Gift,
  Tag,
  Percent,
} from "lucide-react";
import { OrderAPI } from "@/api/orders/order.api";
import { useCookies } from "react-cookie";
import {
  OrderInterface,
  OrderItem,
  OrderItemDetail,
  OrderStatus,
} from "@/types/order";
import { FormatUtils } from "@/utils/format";
import { discountTypeEnum } from "@/types/promotion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

type FilterType = "all" | keyof typeof OrderStatus;

interface StatusInfo {
  label: string;
  color: string;
  icon: LucideIcon;
  progress: number;
}

interface FilterTab {
  key: FilterType;
  label: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [cookies] = useCookies(["userInfo"]);
  const router = useRouter();

  // Mock data - replace with your actual API call
  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const user = cookies.userInfo;
      if (!user || !user.id) return;
      setLoading(true);
      let res = await OrderAPI.getOrdersWithUserID(Number(user.id));

      const orders: OrderInterface[] = res.data.orders;
      // Simulate API call

      setOrders(orders);
      //   setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusInfo = (status: OrderStatus): StatusInfo => {
    const statusMap: Record<OrderStatus, StatusInfo> = {
      ORDERED: {
        label: "Đang xử lý",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
        progress: 25,
      },

      ON_SHIP: {
        label: "Đang giao hàng",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Truck,
        progress: 75,
      },
      COMPLETED: {
        label: "Đã giao hàng thành công",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: Package,
        progress: 100,
      },
      CANCELED: {
        label: "Đã hủy",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Clock,
        progress: 0,
      },
    };
    return statusMap[status];
  };

  const formatPrice = (price: number): string => {
    return FormatUtils.formatPriceVND(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const toggleOrderExpansion = (orderId: string): void => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handleFilterChange = (newFilter: FilterType): void => {
    setFilter(newFilter);
  };

  const filteredOrders = orders.filter((order: OrderInterface) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const filterTabs: FilterTab[] = [
    { key: "all", label: "Tất cả" },
    { key: "ORDERED", label: "Đang xử lý" },
    { key: "ON_SHIP", label: "Đang giao hàng" },
    { key: "COMPLETED", label: "Đã giao hàng thành công" },
    { key: "CANCELED", label: "Đã hủy" },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleFilterChange(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === tab.key
                ? "bg-accent/10 text-accent border border-accent/20"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có đơn hàng nào
              </h3>
              <p className="text-gray-500">
                Các đơn hàng của bạn sẽ hiển thị ở đây
              </p>
            </motion.div>
          ) : (
            filteredOrders.map((order: OrderInterface, index: number) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const isExpanded = expandedOrders.has(order.id.toString());

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900">
                          Đơn hàng #{order.id}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-1">
                          {formatPrice(order.total)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Tiến độ đơn hàng</span>
                        <span>{statusInfo.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${statusInfo.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {order.items.length} sản phẩm
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        {order.payment?.method ?? "COD"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        {"Giao Hàng Nhanh"}
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleOrderExpansion(order.id.toString())}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm text-accent hover:text-accent/80 transition-colors">
                      <Eye className="w-4 h-4" />
                      {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden">
                        <div className="p-6 space-y-6">
                          {/* Order Items */}
                          <div className="max-w-4xl mx-auto p-6 bg-white">
                            <h4 className="font-semibold text-xl text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                              Sản phẩm đã đặt
                            </h4>

                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                                  {/* Main product info */}
                                  <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                      <img
                                        src={item.product.images[0].url}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                      />
                                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                                        {item.quantity}
                                      </div>
                                    </div>

                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-900 text-lg mb-1">
                                        {item.product.name}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        Số lượng:{" "}
                                        <span className="font-medium">
                                          {item.quantity}
                                        </span>
                                      </p>
                                    </div>

                                    <div className="text-right">
                                      <div className="font-bold text-lg text-gray-900">
                                        {formatPrice(item.unitPrice)}
                                      </div>
                                      {typeof item.discountValue === "number" &&
                                        item.discountValue > 0 && (
                                          <div className="text-sm text-gray-500 line-through">
                                            {formatPrice(
                                              item.unitPrice +
                                                item.discountValue
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </div>

                                  {/* Promotion info */}
                                  {item.promotionName &&
                                    typeof item.discountValue === "number" &&
                                    item.discountValue > 0 && (
                                      <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Tag className="w-4 h-4 text-orange-600" />
                                          <span className="font-medium text-orange-800">
                                            Chương trình khuyến mãi
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm text-orange-700">
                                            {item.promotionName}
                                          </span>
                                          <div className="flex items-center gap-1">
                                            <span className="font-semibold text-green-700">
                                              -{formatPrice(item.discountValue)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  {/* Gift items */}
                                  {item.giftItems &&
                                    item.giftItems.length > 0 && (
                                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2 mb-3">
                                          <Gift className="w-5 h-5 text-green-600" />
                                          <span className="font-semibold text-green-800">
                                            Quà tặng kèm theo
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {item.giftItems.map((gift, idx) => (
                                            <div
                                              key={idx}
                                              className="flex items-center gap-3 p-2 bg-white bg-opacity-70 rounded-lg border border-green-100">
                                              <img
                                                src={gift.giftImage}
                                                alt={gift.giftName}
                                                className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                                              />
                                              <div className="flex-1">
                                                <span className="text-sm font-medium text-gray-800">
                                                  {gift.giftName}
                                                </span>
                                                <div className="text-xs text-gray-600 mt-1">
                                                  Số lượng:{" "}
                                                  <span className="font-medium">
                                                    {gift.giftQuantity}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Thông tin giao hàng
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                  <span className="text-gray-600">
                                    {order.address}
                                    {/* {order.shipping.address} */}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Truck className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    Giao hàng nhanh - {formatPrice(0)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Package className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    Mã vận đơn: {order.trackingCode}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Chi tiết đơn hàng
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Tạm tính:
                                  </span>
                                  <span>{formatPrice(order.total)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Phí vận chuyển:
                                  </span>
                                  <span>{formatPrice(0)}</span>
                                </div>
                                <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                                  <span>Tổng cộng:</span>
                                  <span>{formatPrice(order.total)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4 border-t">
                            <Button variant={"secondary"} className="flex-1">
                              Liên hệ hỗ trợ
                            </Button>

                            <Button
                              disabled={
                                order.status === OrderStatus.CANCELED ||
                                order.status === OrderStatus.COMPLETED
                              }
                              className="flex-1"
                              variant={"destructive"}
                              onClick={async () => {
                                await OrderAPI.onCancelOrder(order.id);
                                toast.success("Đã hủy đơn hàng ");
                                router.push("/");
                              }}>
                              Hủy đơn hàng
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderHistory;
