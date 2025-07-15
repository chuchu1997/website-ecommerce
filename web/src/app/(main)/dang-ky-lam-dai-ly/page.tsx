"use client";
import React, { useState } from 'react';
import { Users, TrendingUp, Gift, Star, Phone, Mail, MapPin, Building, CheckCircle } from 'lucide-react';

export default function AgentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    experience: '',
    capital: '',
    message: ''
  });

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Hoa hồng hấp dẫn",
      description: "Hoa hồng từ 15-25% trên mỗi đơn hàng thành công"
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-600" />,
      title: "Ưu đãi độc quyền",
      description: "Giá sỉ đặc biệt, quà tặng và khuyến mãi riêng"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Hỗ trợ marketing",
      description: "Tài liệu quảng cáo, banner, poster miễn phí"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Đào tạo chuyên nghiệp",
      description: "Khóa học bán hàng và kiến thức sản phẩm"
    }
  ];

  const requirements = [
    "Có kinh nghiệm bán hàng hoặc kinh doanh",
    "Có địa điểm kinh doanh ổn định",
    "Vốn đầu tư tối thiểu 50 triệu VNĐ",
    "Cam kết doanh số tối thiểu 100 triệu/tháng",
    "Tuân thủ chính sách giá bán của công ty"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Đăng Ký Làm Đại Lý</h1>
          <p className="mt-2 text-gray-600">Gia nhập mạng lưới đại lý và phát triển cùng chúng tôi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Lợi Ích Khi Trở Thành Đại Lý</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng Ký Ngay</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại hình kinh doanh
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn loại hình</option>
                      <option value="retail">Bán lẻ</option>
                      <option value="wholesale">Bán sỉ</option>
                      <option value="online">Bán online</option>
                      <option value="showroom">Showroom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ kinh doanh *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kinh nghiệm (năm)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vốn đầu tư (VNĐ)
                    </label>
                    <select
                      name="capital"
                      value={formData.capital}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn mức vốn</option>
                      <option value="50-100">50-100 triệu</option>
                      <option value="100-200">100-200 triệu</option>
                      <option value="200-500">200-500 triệu</option>
                      <option value="500+">Trên 500 triệu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thông tin thêm
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Chia sẻ thêm về kế hoạch kinh doanh của bạn..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Gửi Đăng Ký
                </button>
              </div>
            </div>
          </div>

          {/* Requirements & Contact */}
          <div className="space-y-6">
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Yêu Cầu Đại Lý</h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Liên Hệ Tư Vấn</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-semibold">Hotline</p>
                    <p>0973 926 139</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>dailly@company.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-semibold">Văn phòng</p>
                    <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}