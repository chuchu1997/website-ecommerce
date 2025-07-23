/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  CheckCircle,
  Edit3,
  Filter,
  Package,
  Plus,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { useEffect, useMemo, useState } from "react";
import { OrderAPI } from "@/app/api/orders/orders.api";
import { OrderInterface, OrderStatus } from "@/types/order";
import { FormatUtils } from "@/utils/format";
import toast from "react-hot-toast";
import { discountTypeEnum } from "@/types/promotions";

export const OrderClient = () => {
  const { storeId } = useParams();
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [editingOrder, setEditingOrder] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>(
    OrderStatus.ORDERED
  );
  const [editTrackingCode, setEditTrackingCode] = useState<string>("");

  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | "all">(
    "all"
  );

  const [confirmDeleteItem, setConfirmDeleteItem] = useState<{
    orderId: number;
  } | null>(null);

  const router = useRouter();

  const statusConfig = {
    ORDERED: {
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      label: "Đã đặt hàng",
    },
    ON_SHIP: {
      icon: Truck,
      color: "text-orange-600",
      bg: "bg-orange-50",
      label: "Đang giao hàng ",
    },
    COMPLETED: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      label: "Đã giao thành công ",
    },
    CANCELED: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      label: "Đã hủy",
    },
  };

  const fetchOrders = async () => {
    let res = await OrderAPI.getAllOrders({
      limit: Number.MAX_SAFE_INTEGER,
      currentPage: 1,
    });

    if (res.status === 200) {
      setTotalOrders(res.data.total);
      setOrders(res.data.orders);
    }
  };
  const handleDeleteItem = async () => {
    if (!confirmDeleteItem) return;
    setConfirmDeleteItem(null);

    const { orderId } = confirmDeleteItem;
    await OrderAPI.deleteOrder(orderId);
    toast.success("Đã xóa thành công !!");

    window.location.reload();

    // const { orderId, itemId } = confirmDeleteItem;

    // await OrderAPI.removeItemFromOrder(orderId, itemId); // <-- Bạn cần tạo API này

    // setOrders((prev) =>
    //   prev.map((order) =>
    //     order.id === orderId
    //       ? {
    //           ...order,
    //           items: order.items.filter((item) => item.id !== itemId),
    //         }
    //       : order
    //   )
    // );

    // setConfirmDeleteItem(null);
  };
  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditTrackingCode("");
  };

  const filteredOrders = useMemo(() => {
    if (selectedFilter === "all") return orders;
    return orders.filter((order) => order.status === selectedFilter);
  }, [orders, selectedFilter]);

  const handleEditOrder = async (
    orderId: number,
    currentStatus: OrderStatus
  ) => {
    const order = orders.find((o) => o.id === orderId);
    setEditingOrder(orderId);
    setEditStatus(currentStatus);
    setEditTrackingCode(order?.trackingCode ?? "");
  };

  const handleSaveEdit = async (orderId: number) => {
    await OrderAPI.onUpdateOrder(orderId, {
      status: editStatus,
      trackingCode: editTrackingCode || undefined,
      updateAt: new Date(),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: editStatus,
              trackingCode: editTrackingCode || undefined,
              updateAt: new Date(),
            }
          : order
      )
    );
    setEditingOrder(null);
    setEditTrackingCode("");
  };

  const getStatusCounts = () => {
    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<OrderStatus, number>);

    return {
      all: orders.length,
      ...counts,
    };
  };
  const statusCounts = getStatusCounts();

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
            Quản lý đơn đặt hàng
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Quản lý và kiểm tra tất cả các đơn đặt hàng
          </p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2  md:flex flex-wrap  gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}>
              <Filter size={16} />
              Tất cả ({statusCounts.all || 0})
            </button>

            {Object.entries(statusConfig).map(([status, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedFilter(status as OrderStatus)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedFilter === status
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}>
                  <Icon size={16} />
                  {config.label} ({statusCounts[status as OrderStatus] || 0})
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                No orders match the selected filter.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status];
              const StatusIcon = statusInfo.icon;
              const isEditing = editingOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => {
                          setConfirmDeleteItem({
                            orderId: order.id,
                          });
                        }}
                        className=" hover:text-red-700 p-1 absolute top-2 right-6 bg-red-500 text-white rounded-2xl"
                        title="Xoá sản phẩm">
                        <X size={14} />
                      </button>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusInfo.bg}`}>
                        <StatusIcon size={14} className={statusInfo.color} />
                        <span
                          className={`text-sm font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => handleEditOrder(order.id, order.status)}
                        className="p-2 mt-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit order status">
                        <Edit3 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Khách hàng
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium text-gray-900">
                          {order.user.name}
                        </p>
                        <p>Địa chỉ: {order.user.address}</p>
                        <p>Số điện thoại: {order.user.phone}</p>
                        <p className="font-medium text-gray-900">
                          Note: {order.note}
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Thông tin đặt hàng
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Sản phẩm : {order.items.length}</p>
                        <p className="font-semibold text-lg text-gray-900">
                          Tổng: {FormatUtils.formatPriceVND(order.total)}
                        </p>
                        <p>
                          Đã tạo :{" "}
                          {FormatUtils.formatDate(order.createdAt ?? "")}
                        </p>
                        {order.updateAt && (
                          <p>
                            Cập nhật :{" "}
                            {FormatUtils.formatDate(order.updateAt ?? "")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Management */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Trạng thái
                      </h4>
                      {isEditing ? (
                        <div className="space-y-3">
                          <select
                            value={editStatus}
                            onChange={(e) =>
                              setEditStatus(e.target.value as OrderStatus)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {Object.entries(statusConfig).map(
                              ([status, config]) => (
                                <option key={status} value={status}>
                                  {config.label}
                                </option>
                              )
                            )}
                          </select>
                          <input
                            placeholder="Nhập mã vận đơn (tuỳ chọn)"
                            value={editTrackingCode}
                            onChange={(e) =>
                              setEditTrackingCode(e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(order.id)}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                              <Check size={16} />
                              Lưu thay đổi
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                              <X size={16} />
                              Hủy thay đổi
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div
                            className={`px-3 py-2 rounded-lg ${statusInfo.bg} flex items-center gap-2`}>
                            <StatusIcon
                              size={16}
                              className={statusInfo.color}
                            />
                            <span className={`font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          {order.trackingCode && (
                            <div className="text-sm text-gray-600">
                              Mã vận đơn:{" "}
                              <span className="font-medium">
                                {order.trackingCode}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Sản phẩm</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => {
                        const {
                          product,
                          giftItems,
                          promotionName,
                          discountType,
                          discountValue,
                          unitPrice,
                        } = item;
                        console.log("GIFT ITEMS", giftItems);

                        const getDiscountText = () => {
                          if (!discountValue || discountValue === 0)
                            return null;

                          return discountType === discountTypeEnum.PERCENT
                            ? `Giảm ${Math.round(
                                (discountValue / unitPrice) * 100
                              )}%`
                            : `Giảm ${FormatUtils.formatPriceVND(
                                discountValue
                              )}₫`;
                        };

                        return (
                          <div
                            key={item.id}
                            className="border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-1">
                            {/* Tên sản phẩm chính */}
                            <div className="flex justify-between text-sm text-gray-900 font-medium">
                              <span>
                                {product.name} × {item.quantity}
                              </span>
                            </div>

                            {/* Khuyến mãi */}
                            {promotionName && (
                              <div className="text-xs text-green-600">
                                🎁 Khuyến mãi: <strong>{promotionName}</strong>
                                {getDiscountText() && ` - ${getDiscountText()}`}
                              </div>
                            )}

                            {/* Quà tặng kèm */}
                            {giftItems && giftItems.length > 0 && (
                              <div className="text-xs text-blue-600 mt-2">
                                🎁 Quà tặng:
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                  {giftItems.map((gift: any, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2">
                                      <img
                                        src={gift.giftImage}
                                        alt={gift.giftName}
                                        className="w-8 h-8 object-cover rounded border"
                                      />
                                      <span>
                                        {gift.giftName} ×{" "}
                                        {gift.giftQuantity || 1}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {confirmDeleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Xác nhận đơn hàng này ?
            </h2>
            <p className="text-gray-700 mb-6">
              Bạn có chắc chắn muốn xoá đơn hàng không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Xác nhận
              </button>
              <button
                onClick={() => setConfirmDeleteItem(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
