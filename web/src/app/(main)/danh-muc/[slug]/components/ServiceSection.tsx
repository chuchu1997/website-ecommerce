

"use client"
import { useEffect, useState } from "react";
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  features: string[];
}
 const ServicesSection = () => {

     const mockServices: Service[] = [
    {
      id: "service-1",
      title: "Phát triển website doanh nghiệp",
      description: "Thiết kế và phát triển website chuyên nghiệp cho doanh nghiệp với công nghệ hiện đại",
      price: 15000000,
      duration: "4-6 tuần",
      imageUrl: "/images/services/web-development.jpg",
      features: ["Thiết kế responsive", "SEO tối ưu", "Bảo mật cao", "Hỗ trợ 24/7"]
    },
    {
      id: "service-2",
      title: "Tư vấn chuyển đổi số",
      description: "Hỗ trợ doanh nghiệp chuyển đổi số toàn diện với giải pháp công nghệ phù hợp",
      price: 25000000,
      duration: "8-12 tuần",
      imageUrl: "/images/services/digital-transformation.jpg",
      features: ["Phân tích hiện trạng", "Lập kế hoạch", "Triển khai", "Đào tạo nhân viên"]
    },
    {
      id: "service-3",
      title: "Quản lý hệ thống IT",
      description: "Dịch vụ quản lý và vận hành hệ thống công nghệ thông tin cho doanh nghiệp",
      price: 8000000,
      duration: "Theo tháng",
      imageUrl: "/images/services/it-management.jpg",
      features: ["Giám sát 24/7", "Bảo trì định kỳ", "Backup dữ liệu", "Hỗ trợ kỹ thuật"]
    }
  ];
    const [services, setServices] = useState(mockServices);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    //   fetchServiceCategories(1, 6).then(data => {
    //     setServices(data.items);
    //     setLoading(false);
    //   });
    }, []);

    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Dịch vụ chuyên nghiệp</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Giải pháp công nghệ toàn diện cho doanh nghiệp hiện đại
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {service.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Thời gian: {service.duration}
                    </div>
                    <div className="mt-3">
                      <h4 className="font-semibold text-gray-900 mb-2">Tính năng nổi bật:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors group-hover:shadow-lg">
                    Liên hệ tư vấn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  export default ServicesSection;
  