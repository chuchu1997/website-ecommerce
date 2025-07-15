"use client";

import React from "react";
import { RotateCw, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function ReturnPolicyPage() {
  const returnConditions = [
    "Sản phẩm còn nguyên tem, bao bì, chưa qua sử dụng.",
    "Có hóa đơn mua hàng hoặc mã đơn hàng hợp lệ.",
    "Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.",
    "Không áp dụng với sản phẩm khuyến mãi, giảm giá sâu.",
    "Sản phẩm bị lỗi kỹ thuật hoặc giao nhầm sẽ được đổi mới miễn phí."
  ];

  const returnProcess = [
    "Liên hệ CSKH qua hotline hoặc fanpage để yêu cầu đổi trả.",
    "Gửi lại sản phẩm về kho của chúng tôi theo hướng dẫn.",
    "Bộ phận kỹ thuật kiểm tra sản phẩm trong 1–2 ngày làm việc.",
    "Hoàn tất quy trình đổi hoặc hoàn tiền trong 3–5 ngày."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Chính Sách Đổi Trả Hàng</h1>
          <p className="text-gray-600 text-lg">
            Hướng dẫn điều kiện và quy trình đổi trả sản phẩm
          </p>
        </div>

        {/* Conditions */}
        <div className="bg-white shadow-md border-l-4 border-rose-400 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RotateCw className="w-6 h-6 text-rose-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Điều Kiện Đổi Trả</h2>
          </div>
          <ul className="space-y-3 text-gray-700 pl-1">
            {returnConditions.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div className="bg-white shadow-md border-l-4 border-yellow-400 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Thời Gian & Quy Trình</h2>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-1">
            {returnProcess.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Notes */}
        <div className="bg-white shadow-md border-l-4 border-orange-500 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Lưu Ý Quan Trọng</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Chúng tôi khuyến khích quý khách kiểm tra kỹ sản phẩm ngay khi nhận hàng.
            Trong trường hợp cần đổi trả, vui lòng giữ sản phẩm trong tình trạng ban đầu.
            Một số mặt hàng đặc thù (đồ điện tử, nội thất thiết kế riêng...) có thể không áp dụng đổi trả – xin vui lòng hỏi kỹ trước khi mua.
          </p>
        </div>
      </div>
    </div>
  );
}
