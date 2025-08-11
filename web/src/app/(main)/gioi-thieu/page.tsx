"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Award, 
  MapPin, 
  Palette, 
  Home, 
  Sofa, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Play,
  Building,
  Lightbulb,
  Target,
  Globe,
  Briefcase,
  Compass,
  Tag
} from 'lucide-react';
import { StoreAPI } from '@/api/stores/store.api';
import { StoreInterface } from '@/types/store';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  expertise: string[];
}

interface Statistic {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const AboutUsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [storeInfo,setStoreInfo] = useState<StoreInterface>();

  const statistics: Statistic[] = [
    {
      label: "Khách hàng tin tưởng",
      value: "50K+",
      icon: <Heart className="w-6 h-6" style={{ color: "var(--color-primary)" }} />,
      description: "Trên toàn quốc và khu vực Đông Nam Á"
    },
    {
      label: "Đại lý & đối tác",
      value: "300+",
      icon: <Building className="w-6 h-6" style={{ color: "var(--color-accent-green)" }} />,
      description: "Hệ thống phân phối phủ rộng"
    },
    {
      label: "Kinh nghiệm thị trường",
      value: "10+",
      icon: <Award className="w-6 h-6" style={{ color: "var(--color-primary)" }} />,
      description: "Trong lĩnh vực nội thất cao cấp"
    },
    {
      label: "Dự án hoàn thành",
      value: "20K+",
      icon: <Home className="w-6 h-6" style={{ color: "var(--color-accent-green)" }} />,
      description: "Công trình dân dụng, văn phòng, biệt thự, căn hộ"
    }
  ];

  const services: Service[] = [
    {
      title: "Thiết Kế Nội Thất Sang Trọng",
      description: "Đội ngũ thiết kế sáng tạo mang đến không gian hài hòa, thẩm mỹ và tiện dụng.",
      icon: <Palette className="w-7 h-7" style={{ color: "var(--color-primary)" }} />,
      features: [
        "Thiết kế tùy chỉnh theo phong cách khách hàng",
        "Sử dụng vật liệu cao cấp, bền đẹp",
        "Tối ưu công năng và ánh sáng"
      ],
    },
    {
      title: "Sản Phẩm Nội Thất Đa Dạng",
      description: "Cung cấp các dòng sản phẩm bàn ghế, tủ kệ, giường ngủ với chất lượng vượt trội.",
      icon: <Sofa className="w-7 h-7" style={{ color: "var(--color-accent-green)" }} />,
      features: [
        "Chất liệu gỗ tự nhiên, bền bỉ",
        "Thiết kế hiện đại, cổ điển đa dạng",
        "Đảm bảo an toàn và thân thiện môi trường"
      ],
    },
    {
      title: "Thi Công & Lắp Đặt Chuyên Nghiệp",
      description: "Đội ngũ thi công giàu kinh nghiệm, đảm bảo tiến độ và chất lượng hoàn thiện.",
      icon: <Building className="w-7 h-7" style={{ color: "var(--color-primary)" }} />,
      features: [
        "Lắp đặt tận nơi, đúng kỹ thuật",
        "Kiểm tra và nghiệm thu nghiêm ngặt",
        "Hỗ trợ bảo trì sau thi công"
      ],
    },
    {
      title: "Tư Vấn & Hậu Mãi Tận Tâm",
      description: "Luôn đồng hành cùng khách hàng với dịch vụ tư vấn và bảo hành chuyên nghiệp.",
      icon: <Lightbulb className="w-7 h-7" style={{ color: "var(--color-accent-green)" }} />,
      features: [
        "Tư vấn thiết kế và vật liệu miễn phí",
        "Bảo hành chính hãng, linh kiện thay thế sẵn có",
        "Hỗ trợ khách hàng 24/7"
      ],
    }
  ];
  
  useEffect(() => {
    fetchStoreInfo();
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStoreInfo = async () => {
    let res = await StoreAPI.getStoreInfo();
    if(res.status === 200){
      setStoreInfo(res.data.store)
    }
  }

  const storeName = storeInfo?.name || "HappyFurniture";
  const [firstWord, ...restWords] = storeName.split(" ");
  const restOfName = restWords.join(" ");

  return (
    <div className="min-h-screen bg-var(--color-bg) overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          background: 'var(--color-bg-secondary)'
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop')" }}
        />

        <div className="relative z-10 mx-auto px-6 text-center max-w-4xl">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {firstWord}
              <span 
                className="ml-2"
                style={{ 
                  background: "var(--gradient-primary)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent" 
                }}
              >
                {restOfName}
              </span>
            </h1>
            <p
              className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {storeInfo?.description || "Mang đến giải pháp nội thất hoàn hảo cho không gian sống và làm việc của bạn."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg" style={{ color: "var(--color-text-muted)" }}>
              {storeInfo?.tags && storeInfo.tags.length > 0 && storeInfo.tags.map((tag, index) => (
                <span key={index} className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" style={{ color: "var(--color-primary)" }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: "var(--color-border)" }}>
            {!isVideoPlaying ? (
              <div className="aspect-video flex items-center justify-center" style={{ background: "var(--color-bg-accent)" }}>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group bg-var(--color-bg) rounded-full p-6 hover:scale-110 transition transform shadow-md"
                  style={{ boxShadow: "var(--shadow-default)" }}
                >
                  <Play className="w-12 h-12" style={{ color: "var(--color-primary)" }} />
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-var(--color-bg-secondary) flex items-center justify-center">
                <p style={{ color: "var(--color-text-primary)", fontSize: "1.25rem" }}>Video giới thiệu về chúng tôi</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: "var(--color-primary-light)" }} />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: "var(--color-accent-green-light)" }} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  // style={{ 
                  //   background: "var(--gradient-primary)", 
                  //   color: "var(--color-text-white)" 
                  // }}
                >
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>{stat.value}</div>
                <div className="text-xl font-semibold mb-1" style={{ color: "var(--color-text-secondary)" }}>{stat.label}</div>
                <p className="text-base" style={{ color: "var(--color-text-muted)" }}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>Chúng Tôi Cung Cấp</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Các sản phẩm và dịch vụ nội thất cao cấp, đa dạng phong cách và tiện nghi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl bg-var(--color-bg)"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110" 
                    // style={{ background: "var(--gradient-primary)", color: "var(--color-text-white)" }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold ml-4" style={{ color: "var(--color-text-primary)" }}>{service.title}</h3>
                </div>

                <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>{service.description}</p>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center" style={{ color: "var(--color-text-primary)" }}>
                      <CheckCircle className="w-5 h-5 text-var(--color-accent-green) mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
