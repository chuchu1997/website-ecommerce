import { HighlightedProjectsMotion } from "./HighlightProjectMotion";

import { Project, ProjectType } from "@/types/project";

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Cải Tạo Văn Phòng Hiện Đại",
    description: "Biến đổi hoàn toàn không gian làm việc bằng vật liệu gỗ bền vững",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    type:ProjectType.COMMERCIAL,
    slug:"33",
  },
  {
    id: 2,
    title: "Nội Thất Nhà Ở Sang Trọng",
    description: "Thiết kế nội thất đặt riêng cho không gian sống đương đại",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    type:ProjectType.HOME,
    slug:"22"
  },
  {
    id: 3,
    title: "Thiết Kế Nhà Hàng",
    description: "Không gian ấm cúng và mời gọi với các chi tiết gỗ thủ công",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    slug:"11",
     type:ProjectType.RESTAURANT
  }
];
export const HighlightedProjects = () => {
  return (
    <section id="projects" className="">
      <div className="">
        <HighlightedProjectsMotion projects={mockProjects} />
      </div>
    </section>
  );
};