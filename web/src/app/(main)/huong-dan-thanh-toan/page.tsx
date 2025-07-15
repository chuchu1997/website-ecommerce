import React from 'react';
import { CreditCard, Smartphone, MapPin, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function PaymentGuide() {
  const paymentMethods = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Thanh toán online",
      description: "Visa, MasterCard, JCB, ATM nội địa",
      benefits: ["Thanh toán nhanh chóng", "Bảo mật tuyệt đối", "Giảm giá 2% cho đơn hàng trên 500k"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Ví điện tử",
      description: "MoMo, ZaloPay, ViettelPay, VNPay",
      benefits: ["Thanh toán tiện lợi", "Tích lũy điểm thưởng", "Nhiều ưu đãi hấp dẫn"]
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      title: "Thanh toán khi nhận hàng",
      description: "Trả tiền mặt khi nhận hàng (COD)",
      benefits: ["Kiểm tra hàng trước khi trả tiền", "Phù hợp mọi đối tượng", "Không phí giao dịch"]
    }
  ];

  const securityFeatures = [
    "Mã hóa SSL 256-bit",
    "Xác thực 3D Secure",
    "Không lưu trữ thông tin thẻ",
    "Kiểm tra gian lận tự động"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Hướng Dẫn Thanh Toán</h1>
          <p className="mt-2 text-gray-600">Các phương thức thanh toán an toàn và tiện lợi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {paymentMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{method.title}</h3>
              <p className="text-gray-600 text-center mb-4">{method.description}</p>
              <ul className="space-y-2">
                {method.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Steps */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình Thanh Toán</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Chọn phương thức thanh toán</h3>
                <p className="text-gray-600">Tại trang thanh toán, chọn phương thức thanh toán phù hợp với bạn</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Nhập thông tin thanh toán</h3>
                <p className="text-gray-600">Điền đầy đủ thông tin thẻ hoặc tài khoản ví điện tử</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Xác nhận thanh toán</h3>
                <p className="text-gray-600">Xem lại thông tin đơn hàng và xác nhận thanh toán</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Hoàn tất đơn hàng</h3>
                <p className="text-gray-600">Nhận thông báo xác nhận và mã đơn hàng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Bảo Mật Thanh Toán</h2>
          </div>
          <p className="mb-6">Chúng tôi cam kết bảo vệ thông tin thanh toán của bạn với các tính năng bảo mật hàng đầu:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lưu Ý Quan Trọng</h3>
              <ul className="space-y-1 text-yellow-700">
                <li>• Kiểm tra kỹ thông tin đơn hàng trước khi thanh toán</li>
                <li>• Không chia sẻ thông tin thẻ với bất kỳ ai</li>
                <li>• Đảm bảo kết nối internet ổn định khi thanh toán</li>
                <li>• Liên hệ hotline 0973 926 139 nếu gặp sự cố</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}