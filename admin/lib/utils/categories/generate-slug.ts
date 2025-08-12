  export const generateSlug = (str: string): string =>
    str
      .toLowerCase()
      .replace(/đ/g, "d") // thay đ -> d
      .replace(/Đ/g, "d") // thay Đ -> d nếu có viết hoa
      .normalize("NFD") // tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "") // xoá dấu
      .replace(/[.]/g, " ") // chuyển dấu chấm thành khoảng trắng
      .replace(/[^a-z0-9\s-]/g, "") // xoá ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-") // khoảng trắng -> dấu -
      .replace(/-+/g, "-"); // gộp nhiều dấu - liên tiếp
  // Theo dõi thay đổi của name → cập nhật slug nếu là Product Form