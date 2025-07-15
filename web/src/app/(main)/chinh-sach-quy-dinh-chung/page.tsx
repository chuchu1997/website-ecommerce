"use client";

import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Shield,
  Info,
} from "lucide-react";

export default function GeneralPolicyPage() {
  const generalRules = [
    "Khách hàng cần cung cấp đầy đủ và chính xác thông tin khi đặt hàng.",
    "Không sử dụng website cho các mục đích gian lận hoặc trái pháp luật.",
    "Tất cả sản phẩm đều tuân thủ quy định bảo vệ người tiêu dùng.",
    "Công ty có quyền từ chối phục vụ nếu phát hiện hành vi vi phạm.",
    "Chính sách có thể thay đổi mà không cần báo trước, vui lòng kiểm tra thường xuyên."
  ];

  const privacyNotes = [
    "Thông tin khách hàng được bảo mật tuyệt đối.",
    "Không chia sẻ thông tin cá nhân nếu không có sự đồng ý.",
    "Cam kết sử dụng thông tin đúng mục đích giao dịch.",
    "Hệ thống bảo mật nhiều lớp, mã hóa SSL.",
    "Khách hàng có thể yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Chính Sách Quy Định Chung</h1>
          <p className="mt-2 text-gray-600">Những quy định và nguyên tắc áp dụng khi sử dụng dịch vụ của chúng tôi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* General Rules */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-red-600" />
            Quy Định Chung
          </h2>
          <ul className="space-y-3">
            {generalRules.map((rule, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy Notes */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-600" />
            Chính Sách Bảo Mật Thông Tin
          </h2>
          <ul className="space-y-3">
            {privacyNotes.map((note, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
