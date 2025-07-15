import React from 'react';
import { ShoppingCart, CreditCard, Truck, CheckCircle, Phone, Clock } from 'lucide-react';

export default function ShoppingGuide() {
  const steps = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      title: "Chọn sản phẩm",
      description: "Duyệt qua danh mục sản phẩm và chọn những sản phẩm bạn muốn mua. Thêm vào giỏ hàng."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Xem lại giỏ hàng",
      description: "Kiểm tra lại các sản phẩm đã chọn, số lượng và tổng tiền trước khi thanh toán."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      title: "Thanh toán",
      description: "Chọn phương thức thanh toán phù hợp và hoàn tất đơn hàng của bạn."
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Giao hàng",
      description: "Chúng tôi sẽ giao hàng đến địa chỉ bạn đã cung cấp trong thời gian sớm nhất."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Hướng Dẫn Mua Hàng</h1>
          <p className="mt-2 text-gray-600">Hướng dẫn chi tiết cách mua hàng tại cửa hàng</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Guide */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hướng Dẫn Chi Tiết</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Tìm kiếm sản phẩm</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Sử dụng thanh tìm kiếm để tìm sản phẩm theo tên hoặc mã sản phẩm</li>
                  <li>• Duyệt qua các danh mục sản phẩm</li>
                  <li>• Sử dụng bộ lọc để tìm sản phẩm phù hợp với nhu cầu</li>
                  <li>• Xem thông tin chi tiết, hình ảnh và đánh giá sản phẩm</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Thêm vào giỏ hàng</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Chọn số lượng sản phẩm muốn mua</li>
                  <li>• Chọn màu sắc, kích thước (nếu có)</li>
                  <li>• Nhấn nút "Thêm vào giỏ hàng"</li>
                  <li>• Có thể tiếp tục mua sắm hoặc xem giỏ hàng</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Thanh toán đơn hàng</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Kiểm tra lại thông tin sản phẩm trong giỏ hàng</li>
                  <li>• Nhập thông tin giao hàng (họ tên, địa chỉ, số điện thoại)</li>
                  <li>• Chọn phương thức thanh toán</li>
                  <li>• Xác nhận đơn hàng và hoàn tất thanh toán</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Cần Hỗ Trợ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <div>
                <p className="font-semibold">Hotline Mua Hàng</p>
                <p>0325 805 893</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <div>
                <p className="font-semibold">Thời Gian Hỗ Trợ</p>
                <p>8:00 - 22:00 hằng ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}