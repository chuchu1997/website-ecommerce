import { NewsInterface } from "@/types/news";

import { ProjectInterface } from "@/types/project";
import { NewsMotion } from "./NewsMotion";
import { NewsAPI } from "@/api/news/news.api";



// const mockNews: NewsInterface[] = [
//   {
//     id: 1,
//     title: "Xu Hướng Nội Thất 2025: Gỗ Tự Nhiên Lên Ngôi",
//     slug: "2025-xu-huong-go-tu-nhien",
//     description:
//       "Khám phá cách gỗ tự nhiên đang chiếm lĩnh xu hướng thiết kế năm 2025 nhờ vẻ đẹp vượt thời gian và tính bền vững.",
//     shortDescription:
//       "Gỗ tự nhiên trở lại mạnh mẽ trong thiết kế nội thất hiện đại.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//     createdAt: new Date("2025-07-01T09:00:00Z"),
//     updatedAt: new Date("2025-07-01T09:00:00Z"),
//   },
//   {
//     id: 2,
//     title: "Tối Ưu Không Gian Nhỏ Với Nội Thất Thông Minh",
//     slug: "toi-uu-khong-gian-nho-noi-that-thong-minh",
//     description:
//       "Khám phá các thiết kế nội thất thông minh giúp tiết kiệm không gian mà vẫn đảm bảo tiện nghi và thẩm mỹ.",
//     shortDescription:
//       "Nội thất thông minh giúp biến hóa nhà nhỏ thành không gian sống tiện nghi.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
//     createdAt: new Date("2025-06-25T14:30:00Z"),
//     updatedAt: new Date("2025-06-25T14:30:00Z"),
//   },
//   {
//     id: 3,
//     title: "Sống Xanh Bắt Đầu Từ Không Gian Nội Thất",
//     slug: "song-xanh-tu-noi-that",
//     description:
//       "Tìm hiểu cách lựa chọn vật liệu và thiết kế thân thiện với môi trường giúp hướng đến lối sống bền vững.",
//     shortDescription:
//       "Khởi đầu sống xanh từ những lựa chọn nội thất ý nghĩa.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1582284544641-820f0c57fa3a?auto=format&fit=crop&w=800&q=80", // hình mới
//     createdAt: new Date("2025-06-20T08:15:00Z"),
//     updatedAt: new Date("2025-06-20T08:15:00Z"),
//   },
// ];

export const NewsMasterPage = async () => {
  let news:NewsInterface[] = [];

  const res = await NewsAPI.getNews({
    currentPage:1,
    limit:3
  })
  news = res.data.articles;

  return (
    <section id="projects">
      <div >
        <NewsMotion news={news} />
      </div>
    </section>
  );
};