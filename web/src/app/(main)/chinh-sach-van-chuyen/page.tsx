"use client";

import React from "react";
import { Truck, Clock, MapPin, Wallet, Info } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Chính Sách Vận Chuyển</h1>
          <p className="text-gray-600 text-lg">
            Giao hàng nhanh chóng, an toàn đến mọi miền tổ quốc
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Khu vực giao hàng */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-2 rounded-full">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                Khu vực giao hàng
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Giao hàng toàn quốc</li>
              <li>Ưu tiên nội thành TP.HCM, Hà Nội, Đà Nẵng</li>
              <li>Hỗ trợ giao đến tận cửa nhà</li>
            </ul>
          </div>

          {/* Thời gian giao hàng */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                Thời gian giao hàng
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Nội thành: 1–2 ngày</li>
              <li>Ngoại thành: 2–4 ngày</li>
              <li>Liên tỉnh: 3–7 ngày tùy khu vực</li>
              <li>Ngày lễ có thể chậm hơn</li>
            </ul>
          </div>

          {/* Phí vận chuyển */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                Phí vận chuyển
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Miễn phí với đơn hàng từ 500.000 VNĐ</li>
              <li>Nội thành: từ 30.000 – 50.000 VNĐ</li>
              <li>Ngoại thành, liên tỉnh: theo bảng giá đối tác vận chuyển</li>
            </ul>
          </div>

          {/* Hình thức giao hàng */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                Hình thức giao hàng
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Giao hàng tiêu chuẩn qua đối tác (GHN, GHTK...)</li>
              <li>Giao hàng nhanh theo yêu cầu</li>
              <li>Nhân viên giao trực tiếp tại nội thành</li>
            </ul>
          </div>
        </div>

        {/* Lưu ý */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 border-l-4 border-orange-400">
          <Info className="w-6 h-6 text-orange-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lưu ý quan trọng</h3>
            <p className="text-gray-700 text-sm">
              Quý khách vui lòng kiểm tra kỹ hàng hóa trước khi ký nhận. Trong trường hợp có vấn đề về giao hàng (trễ, hư hỏng, thiếu hàng...), vui lòng liên hệ ngay hotline CSKH để được hỗ trợ kịp thời.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
