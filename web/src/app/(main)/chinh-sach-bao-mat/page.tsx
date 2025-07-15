"use client";

import React from "react";
import {
  Lock,
  EyeOff,
  CheckCircle,
  Shield,
  AlertTriangle,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const commitments = [
    "Cam kết bảo mật tuyệt đối thông tin cá nhân khách hàng.",
    "Không chia sẻ, bán hoặc trao đổi thông tin khách hàng cho bên thứ ba.",
    "Chỉ sử dụng thông tin để xử lý đơn hàng và chăm sóc khách hàng.",
    "Dữ liệu được lưu trữ và bảo vệ trên hệ thống bảo mật nhiều lớp.",
    "Áp dụng mã hóa SSL trong toàn bộ quá trình truyền tải dữ liệu."
  ];

  const customerRights = [
    "Khách hàng có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.",
    "Có thể yêu cầu dừng nhận thông báo tiếp thị bất kỳ lúc nào.",
    "Thông tin chỉ được sử dụng theo phạm vi khách hàng cho phép.",
    "Chúng tôi sẽ thông báo nếu có thay đổi trong chính sách bảo mật.",
    "Quyền lợi được đảm bảo theo quy định của pháp luật Việt Nam."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Chính Sách Bảo Mật Thông Tin</h1>
          <p className="mt-2 text-gray-600">Tôn trọng và bảo vệ quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Commitments */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-2 text-blue-600" />
            Cam Kết Bảo Mật
          </h2>
          <ul className="space-y-4">
            {commitments.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <Shield className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Rights */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <EyeOff className="w-6 h-6 mr-2 text-purple-600" />
            Quyền Lợi Của Khách Hàng
          </h2>
          <ul className="space-y-4">
            {customerRights.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <p className="text-sm text-yellow-700 mb-1">
                Trong trường hợp nghi ngờ bị rò rỉ thông tin, khách hàng nên liên hệ với chúng tôi ngay lập tức.
              </p>
              <p className="text-sm text-yellow-700">
                Chúng tôi sẽ có trách nhiệm kiểm tra và xử lý theo đúng quy trình.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
