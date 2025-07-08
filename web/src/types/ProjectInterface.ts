export interface Billboard { 
  id: string;
  label: string;
  imageUrl: string;
  linkHref?: string; // Link của billboard, có thể optional
}

// Interface cho Category
export interface Category {
  id: string;
  billboard: Billboard; // Mối quan hệ với Billboard
  name: string;
  slug: string;
  products: Product[]; // Mảng các sản phẩm thuộc Category
  subcategories: SubCategory[]; // Mảng các SubCategory thuộc Category
  services: Service[]; // Mảng các dịch vụ thuộc Category
}

// Interface cho ProductSize
export interface ProductSize {
  productId: string; // ID sản phẩm
  sizeId: string; // ID kích thước
  size: Size; // Thông tin kích thước
  stockQuantity: number; // Số lượng còn lại
  price: number; // Giá của sản phẩm theo kích thước
}

// Interface cho Size
export interface Size { 
  id: string;
  description: string; // Mô tả về kích thước
  name: string; // Tên kích thước (e.g., "S", "M", "L")
}

// Interface cho Service
export interface Service { 
  id: string;
  name: string;
  description: string; // Mô tả dịch vụ
  slug: string;
  images: Image[]; // Mảng các hình ảnh liên quan đến dịch vụ
  price: number; // Giá của dịch vụ
  category: Category; // Mối quan hệ với Category
  subcategory: SubCategory; // Mối quan hệ với SubCategory
}

// Interface cho SubCategory
export interface SubCategory {
  id: string;
  billboard: Billboard; // Mối quan hệ với Billboard
  name: string;
  slug: string;
  products: Product[]; // Mảng các sản phẩm thuộc SubCategory
  categoryId: string; // ID của Category cha
  services: Service[]; // Mảng các dịch vụ thuộc SubCategory
  parentCategorySlug: string; // Slug của Category cha
}

// Interface cho Image
export interface Image {
  id: string;
  url: string; // Đường dẫn ảnh
}

// Interface cho OrderItem
interface OrderItem { 
  productId: string; // ID sản phẩm trong đơn hàng
  quantity: number; // Số lượng sản phẩm
}

// Interface cho Product
export interface Product {
  id: string;
  name: string;
  price: number;
  images: Image[]; // Mảng các hình ảnh của sản phẩm
  description: string; // Mô tả sản phẩm
  category: Category; // Mối quan hệ với Category
  isFeatured: boolean; // Nếu sản phẩm là nổi bật
  shortDescription: string; // Mô tả ngắn
  slug: string; // Slug của sản phẩm
  sku: string; // Mã sản phẩm
  viewCount: number; // Số lượt xem
  ratingCount: number; // Số lượng đánh giá
  stockQuantity: number; // Số lượng còn lại
  productSizes: ProductSize[]; // Mảng các kích thước của sản phẩm
}

// Interface cho OrderType
export default interface OrderType { 
  id?: string;
  totalPrice: number; // Tổng giá trị đơn hàng
  username: string; // Tên người đặt hàng
  address: string; // Địa chỉ giao hàng
  note: string; // Ghi chú đơn hàng
  isPaid: boolean; // Trạng thái thanh toán (đã thanh toán hay chưa)
  phone: string; // Số điện thoại của khách hàng
  paymentMethod: string; // Phương thức thanh toán
  customerID: string; // ID khách hàng
  orderItems: OrderItem[]; // Mảng các sản phẩm trong đơn hàng
  orderStatus?: string; // Trạng thái đơn hàng (e.g., pending, confirmed)
  createAt?: string; // Thời gian tạo đơn hàng
}

export  interface News { 
   id?:string;
   title:string;
   slug:string;
   content:string;
   imageUrl:string;
   createdAt:string;
   updatedAt:string;


}
