




export interface StoreInterface {
  id: number;
  name: string;
  description: string | null;
  userID: number;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo: string | null;
  favicon: string | null;
  seo: string | null;
  createdAt: string; // hoặc Date nếu bạn muốn dùng kiểu Date
  updatedAt: string; // hoặc Date
  socials: any[]; // Nếu biết rõ cấu trúc của `socials`, bạn nên định nghĩa rõ hơn thay vì dùng `any[]`
}