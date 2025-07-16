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
      label: "Khách hàng hài lòng",
      value: "50K+",
      icon: <Heart className="w-6 h-6" />,
      description: "Khách hàng trên toàn quốc"
    },
    {
      label: "Showroom",
      value: "120+",
      icon: <Building className="w-6 h-6" />,
      description: "Phủ sóng toàn quốc"
    },
    {
      label: "Năm kinh nghiệm",
      value: "25+",
      icon: <Award className="w-6 h-6" />,
      description: "Trong lĩnh vực nội thất & thiết kế"
    },
    {
      label: "Dự án đã hoàn thành",
      value: "15K+",
      icon: <Home className="w-6 h-6" />,
      description: "Thiết kế và thi công nội thất"
    }
  ];

const services = [
  {
    title: "Thiết Bị Công Trình",
    description: "Cung cấp máy móc và thiết bị thi công chất lượng cao, phù hợp với mọi loại công trình.",
    icon: "🏗️",
    features: [
      "Máy trộn bê tông, máy đầm, máy cắt sắt",
      "Thiết bị cơ giới hạng nặng và dân dụng",
      "Chính sách bảo hành rõ ràng",
    ],
  },
  {
    title: "Tư Vấn Kỹ Thuật",
    description: "Đội ngũ kỹ sư hỗ trợ lựa chọn và sử dụng thiết bị phù hợp cho công trình của bạn.",
    icon: "📊",
    features: [
      "Tư vấn miễn phí",
      "Giải pháp tối ưu chi phí",
      "Hỗ trợ kỹ thuật trực tiếp",
    ],
  },
  {
    title: "Vật Tư Cơ Giới",
    description: "Cung cấp đầy đủ phụ kiện, vật tư và linh kiện thay thế cho thiết bị thi công.",
    icon: "🔧",
    features: [
      "Phụ tùng máy đầm, máy trộn, máy cắt",
      "Nguồn hàng luôn sẵn kho",
      "Giao hàng nhanh toàn quốc",
    ],
  },
  {
    title: "Bảo Trì & Sửa Chữa",
    description: "Dịch vụ bảo trì định kỳ và sửa chữa máy móc chuyên nghiệp, nhanh chóng.",
    icon: "🛠️",
    features: [
      "Đội ngũ kỹ thuật viên kinh nghiệm",
      "Phụ tùng thay thế chính hãng",
      "Bảo hành sau sửa chữa",
    ],
  },
];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      position: "Người sáng lập & Giám đốc điều hành",
      image: "https://images.unsplash.com/photo-1494790108755-2616b60c1b7e?w=300&h=300&fit=crop&crop=face",
      bio: "Hơn 25 năm kinh nghiệm trong ngành nội thất, đam mê kiến tạo không gian sống đẹp.",
      expertise: ["Chiến lược kinh doanh", "Thiết kế nội thất", "Chăm sóc khách hàng"]
    },
    {
      id: 2,
      name: "Trần Minh Quân",
      position: "Trưởng bộ phận thiết kế",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Nhà thiết kế từng đoạt giải với phong cách hiện đại và tối giản.",
      expertise: ["Thiết kế nội thất", "Bố cục không gian", "Phối màu"]
    },
    {
      id: 3,
      name: "Lê Thùy Linh",
      position: "Giám đốc vận hành",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Đảm bảo vận hành trơn tru các showroom và dự án thi công.",
      expertise: ["Quản lý vận hành", "Quản lý dự án", "Kiểm soát chất lượng"]
    }
  ];


  const milestones = [
    { year: "1999", title: "Thành lập", description: "Khởi đầu là một cửa hàng nội thất nhỏ" },
    { year: "2005", title: "Showroom đầu tiên", description: "Khai trương showroom chủ lực" },
    { year: "2010", title: "Mở rộng dịch vụ", description: "Ra mắt dịch vụ thiết kế nội thất" },
    { year: "2015", title: "Phát triển toàn quốc", description: "Đạt mốc 50 showroom trên toàn quốc" },
    { year: "2020", title: "Chuyển đổi số", description: "Triển khai tư vấn thiết kế trực tuyến" },
    { year: "2024", title: "Dẫn đầu ngành", description: "120+ showroom, 50K+ khách hàng hài lòng" }
  ];

  useEffect(() => {


    fetchStoreInfo();

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStoreInfo = async ()=>{
    let res = await StoreAPI.getStoreInfo();
    if(res.status === 200){
      setStoreInfo(res.data.store)
    }

  }


  const storeName = storeInfo?.name || "Happy Furniture";
const [firstWord, ...restWords] = storeName.split(" ");
const restOfName = restWords.join(" ");
 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
 <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-10" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
          {firstWord}
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            {restOfName}
          </span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto">
          {storeInfo?.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-600">
          {storeInfo?.tags.map((tag,index)=>(
                    <span key={index} className="flex items-center"><Tag className="w-5 h-5 mr-2" />{tag}</span>

          ))}
          {/* <span className="flex items-center"><Sofa className="w-5 h-5 mr-2" />Nội thất cao cấp</span>
          <span className="flex items-center"><Palette className="w-5 h-5 mr-2" />Thiết kế nội thất</span>
          <span className="flex items-center"><Home className="w-5 h-5 mr-2" />Thi công dự án</span>
          <span className="flex items-center"><MapPin className="w-5 h-5 mr-2" />120+ Showroom toàn quốc</span> */}
        </div>
      </div>

      {/* Video Section */}
      <div className="relative max-w-4xl mx-auto ">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          {!isVideoPlaying ? (
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group bg-white/90 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Play className="w-12 h-12 text-amber-600 ml-1 group-hover:text-orange-600 transition-colors" />
              </button>
            </div>
          ) : (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white text-xl">Video giới thiệu về chúng tôi</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute top-20 left-20 animate-float">
      <div className="w-20 h-20 bg-amber-200 rounded-full opacity-20" />
    </div>
    <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '2s' }}>
      <div className="w-16 h-16 bg-orange-200 rounded-full opacity-20" />
    </div>
  </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-800 mb-1">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
<section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Từ một cửa hàng nhỏ trở thành đơn vị cung cấp thiết bị xây dựng uy tín toàn quốc
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="prose prose-lg">
          <p className="text-gray-700 leading-relaxed">
            Được thành lập từ năm 1999 với sứ mệnh mang đến giải pháp máy móc xây dựng chất lượng, 
            giá hợp lý cho mọi công trình. Chúng tôi bắt đầu từ một cửa hàng nhỏ, và đến nay đã phát triển 
            thành hệ thống phân phối thiết bị phủ rộng toàn quốc, phục vụ hàng chục nghìn khách hàng.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi tin rằng, thiết bị xây dựng không chỉ là công cụ thi công, mà còn là yếu tố quan trọng 
            góp phần đảm bảo chất lượng, tiến độ và sự an toàn cho công trình. Đội ngũ kỹ thuật và tư vấn viên 
            của chúng tôi luôn sẵn sàng đồng hành cùng bạn trong mọi dự án.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">25+ năm kinh nghiệm</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Thiết bị chính hãng, bảo hành rõ ràng</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1602303866589-cf1db709f0d8?w=600&h=400&fit=crop"
            alt="Hình ảnh kho máy móc"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Floating Card */}
        <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Heart className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">50.000+</div>
              <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones that shaped our company</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-400 rounded-full" />
            
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow duration-300">
                    <div className="text-3xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                    <div className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-4 border-white shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
<section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Chúng Tôi Cung Cấp</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Giải pháp thiết bị và máy móc xây dựng toàn diện cho mọi công trình
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 ml-4">{service.title}</h3>
          </div>

          <p className="text-gray-600 mb-6">{service.description}</p>

          <div className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Team Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Đội Ngũ Của Chúng Tôi</h2>
      <p className="text-xl text-gray-600">Những chuyên gia tận tâm trong ngành máy móc & xây dựng</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <div
          key={member.id}
          className="text-center group cursor-pointer"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="relative mb-6">
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
          <p className="text-lg text-yellow-600 font-semibold mb-4">{member.position}</p>
          <p className="text-gray-600 mb-4">{member.bio}</p>

          <div className="flex flex-wrap justify-center gap-2">
            {member.expertise.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}

    </div>
  );
};

export default AboutUsPage;