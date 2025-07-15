"use client";

import React from "react";
import { ShieldCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function WarrantyPolicyPage() {
  const warrantyTerms = [
    "Bảo hành chính hãng từ 12 đến 24 tháng tùy sản phẩm.",
    "Áp dụng cho lỗi kỹ thuật từ phía nhà sản xuất.",
    "Không áp dụng với các trường hợp hao mòn tự nhiên, tai nạn hoặc sử dụng sai hướng dẫn.",
    "Thời gian xử lý bảo hành từ 3–7 ngày làm việc.",
    "Sản phẩm sẽ được đổi mới nếu không thể sửa chữa trong thời gian bảo hành."
  ];

  const nonWarrantyCases = [
    "Sản phẩm bị rơi vỡ, cháy nổ, vào nước do lỗi người dùng.",
    "Tem bảo hành bị rách, mờ hoặc có dấu hiệu chỉnh sửa.",
    "Sản phẩm đã bị can thiệp sửa chữa bên ngoài không do chúng tôi thực hiện.",
    "Không có hóa đơn mua hàng hoặc phiếu bảo hành kèm theo.",
    "Hết thời gian bảo hành quy định."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Chính Sách Bảo Hành Sản Phẩm</h1>
          <p className="mt-2 text-gray-600">Thông tin chi tiết về quyền lợi và điều kiện bảo hành</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Warranty Terms */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-green-600" />
            Điều Kiện Bảo Hành
          </h2>
          <ul className="space-y-4">
            {warrantyTerms.map((term, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                {term}
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Warranty Cases */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
            Trường Hợp Không Được Bảo Hành
          </h2>
          <ul className="space-y-4">
            {nonWarrantyCases.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <Clock className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <p className="text-sm text-yellow-700 mb-1">
                Vui lòng giữ lại hóa đơn mua hàng và phiếu bảo hành để được hỗ trợ tốt nhất.
              </p>
              <p className="text-sm text-yellow-700">
                Mọi yêu cầu bảo hành vui lòng liên hệ trung tâm CSKH hoặc hotline hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
