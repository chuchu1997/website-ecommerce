


"use-client";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  completedAt: string;
  imageUrl: string;
  clientName: string;
}


 const ProjectsSection = () => {
    const mockProjects: Project[] = [
    {
      id: "project-1",
      title: "Hệ thống E-commerce cho ABC Corp",
      description: "Phát triển nền tảng thương mại điện tử toàn diện với tính năng thanh toán và quản lý đơn hàng",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      completedAt: "2024-12-15",
      imageUrl: "/images/projects/ecommerce-platform.jpg",
      clientName: "ABC Corporation"
    },
    {
      id: "project-2",
      title: "Ứng dụng mobile quản lý tài chính",
      description: "Ứng dụng di động giúp người dùng quản lý tài chính cá nhân với AI phân tích chi tiêu",
      technologies: ["React Native", "Python", "TensorFlow", "Firebase"],
      completedAt: "2024-11-20",
      imageUrl: "/images/projects/finance-app.jpg",
      clientName: "FinTech Startup"
    },
    {
      id: "project-3",
      title: "Hệ thống CRM cho doanh nghiệp",
      description: "Hệ thống quản lý quan hệ khách hàng tích hợp với các công cụ marketing tự động",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
      completedAt: "2024-10-30",
      imageUrl: "/images/projects/crm-system.jpg",
      clientName: "Marketing Solutions Ltd"
    }
  ];
 
    const [projects, setProjects] = useState(mockProjects);
    const [loading, setLoading] = useState(false);

    //  useEffect(() => {
    //   fetchProjectCategories(1, 6).then(data => {
    //     setProjects(data.items);
    //     setLoading(false);
    //   });
    // }, []);


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
          <h2 className="text-4xl font-bold text-gray-900">Dự án tiêu biểu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Khám phá những dự án thành công mà chúng tôi đã thực hiện
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Đã hoàn thành
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Khách hàng: {project.clientName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Hoàn thành: {new Date(project.completedAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors group-hover:shadow-lg">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  export default ProjectsSection;
  

