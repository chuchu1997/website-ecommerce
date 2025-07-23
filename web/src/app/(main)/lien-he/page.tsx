
"use client"
import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Star, Heart } from 'lucide-react';
import { StoreInterface } from '@/types/store';
import { StoreAPI } from '@/api/stores/store.api';
import { FormatUtils } from '@/utils/format';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [storeInfo,setStoreInfo] = useState<StoreInterface>();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  useEffect(()=>{
    fetchStoreInfo();

  },[])
  const fetchStoreInfo = async ()=>{
    let res = await StoreAPI.getStoreInfo();
    if(res.status === 200){
      setStoreInfo(res.data.store)
    }

  }
  return (
    <div className="overflow-x-hidden *:min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Liên Hệ Với 
              <span className="text-yellow-300"> {storeInfo?.name}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tạo nên ngôi nhà hạnh phúc với những món nội thất đẹp nhất
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 backdrop-blur-sm">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">Tư vấn miễn phí</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm font-medium">Phản hồi trong 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Phone className="w-8 h-8 mr-3 text-orange-600" />
                Thông Tin Liên Hệ
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start group hover:bg-orange-50 rounded-lg p-4 transition-colors duration-200">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 group-hover:bg-orange-200 transition-colors duration-200">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Điện thoại</h3>
                    <p className="text-gray-600">{FormatUtils.formatPhoneNumber(storeInfo?.phone ??"")}</p>
                    <p className="text-sm text-orange-600 mt-1">Hotline 24/7</p>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-orange-50 rounded-lg p-4 transition-colors duration-200">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 group-hover:bg-orange-200 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">{storeInfo?.email}</p>
             
                    <p className="text-sm text-orange-600 mt-1">Phản hồi trong 2 giờ</p>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-orange-50 rounded-lg p-4 transition-colors duration-200">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 group-hover:bg-orange-200 transition-colors duration-200">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">{storeInfo?.address}</p>
          
                    <p className="text-sm text-orange-600 mt-1">Showroom chính</p>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-orange-50 rounded-lg p-4 transition-colors duration-200">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 group-hover:bg-orange-200 transition-colors duration-200">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Giờ làm việc</h3>
                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                    <p className="text-gray-600">Thứ 7 - Chủ nhật: 9:00 - 17:00</p>
                    <p className="text-sm text-orange-600 mt-1">Nghỉ lễ Tết</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Tại Sao Chọn {storeInfo?.name}?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                  <span className="text-sm">Chất lượng cao cấp</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                  <span className="text-sm">Giá cả hợp lý</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                  <span className="text-sm">Bảo hành 5 năm</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                  <span className="text-sm">Giao hàng miễn phí</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Send className="w-8 h-8 mr-3 text-orange-600" />
              Gửi Tin Nhắn
            </h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800">Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-300"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-300"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-300"
                  placeholder="Nhập địa chỉ email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-300"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="consultation">Tư vấn sản phẩm</option>
                  <option value="quote">Báo giá</option>
                  <option value="warranty">Bảo hành</option>
                  <option value="complaint">Khiếu nại</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung tin nhắn *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-300 resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Gửi Tin Nhắn
              </button>
            </div>
          </div>
        </div>
      </div>
            
      {/* Map Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Vị Trí Showroom</h2>
            <p className="text-lg text-gray-600">Hãy đến thăm showroom của chúng tôi để trải nghiệm trực tiếp các sản phẩm</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{storeInfo?.name} Showroom</h3>
                <p className="text-gray-600">{storeInfo?.address}</p>
                <Link className="text-sm text-orange-600 mt-2" target='_blank' href  ={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeInfo?.address || '')}`}>Click để xem bản đồ chi tiết</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;