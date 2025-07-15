import React from 'react';
import { Globe, Phone, MapPin, Users, Clock, Star, ShoppingBag } from 'lucide-react';

export default function PurchasingMethods() {
  const methods = [
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: "Mua hàng online",
      description: "Đặt hàng trực tuyến qua website 24/7",
      features: [
        "Mua hàng mọi lúc mọi nơi",
        "Thanh toán đa dạng",
        "Theo dõi đơn hàng realtime",
        "Ưu đãi độc quyền online"
      ],
      color: "blue"
    },
    {
      icon: <Phone className="w-12 h-12 text-green-600" />,
      title: "Đặt hàng qua điện thoại",
      description: "Gọi hotline để được tư vấn và đặt hàng",
      features: [
        "Tư vấn trực tiếp từ chuyên gia",
        "Hỗ trợ 24/7",
        "Đặt hàng nhanh chóng",
        "Giải đáp mọi thắc mắc"
      ],
      color: "green"
    },
    {
      icon: <MapPin className="w-12 h-12 text-purple-600" />,
      title: "Mua hàng tại cửa hàng",
      description: "Trải nghiệm sản phẩm trực tiếp tại showroom",
      features: [
        "Xem và thử sản phẩm thực tế",
        "Tư vấn face-to-face",
        "Nhận hàng ngay lập tức",
        "Dịch vụ sau bán hàng tốt nhất"
      ],
      color: "purple"
    },
    {
      icon: <Users className="w-12 h-12 text-orange-600" />,
      title: "Mua hàng số lượng lớn",
      description: "Đặt hàng với số lượng lớn cho doanh nghiệp",
      features: [
        "Giá ưu đãi theo số lượng",
        "Hỗ trợ báo giá nhanh",
        "Thời gian giao hàng linh hoạt",
        "Hỗ trợ xuất hóa đơn VAT"
      ],
      color: "orange"
    }
  ];

  const contactInfo = [
    {
      type: "Mua hàng",
      phone: "0973 926 139",
      time: "8:00 - 22:00 hằng ngày"
    },
    {
      type: "Sửa chữa",
      phone: "0869 757 585",
      time: "8:00 - 22:00 hằng ngày"
    },
    {
      type: "Bảo hành",
      phone: "0973 976 139",
      time: "8:00 - 22:00 hằng ngày"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Các Hình Thức Mua Hàng</h1>
          <p className="mt-2 text-gray-600">Lựa chọn phương thức mua hàng phù hợp với bạn</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Purchase Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {methods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {method.icon}
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {method.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Step by Step Guide */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình Mua Hàng Chi Tiết</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chọn Sản Phẩm</h3>
              <p className="text-gray-600">Tìm hiểu và lựa chọn sản phẩm phù hợp với nhu cầu</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Liên Hệ & Tư Vấn</h3>
              <p className="text-gray-600">Nhận tư vấn từ chuyên gia về sản phẩm</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Đặt Hàng & Nhận Hàng</h3>
              <p className="text-gray-600">Hoàn tất đơn hàng và nhận sản phẩm</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Lợi Ích Khi Mua Hàng Tại Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center  border border-white p-4 rounded-xl">
              <div className="w-12 h-12  bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Chất Lượng Đảm Bảo</h3>
              <p className="text-sm opacity-90">Sản phẩm chính hãng 100%</p>
            </div>
            <div className="text-center border border-white p-4 rounded-xl">
              <div className="w-12 h-12  bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Giao Hàng Nhanh</h3>
              <p className="text-sm opacity-90">Giao hàng trong 24h</p>
            </div>
            <div className="text-center  border border-white p-4 rounded-xl">
              <div className="w-12 h-12 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-sm opacity-90">Tư vấn mọi lúc mọi nơi</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{contact.type}</h3>
                <p className="text-lg font-bold text-blue-600">{contact.phone}</p>
                <p className="text-sm text-gray-600">{contact.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}