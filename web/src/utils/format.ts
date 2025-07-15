/** @format */

export class FormatUtils {
  /**
   * Format ngày theo định dạng dd/MM/yyyy
   * @param date - Date object hoặc ISO string
   * @param locale - Mặc định là 'vi-VN'
   * @returns chuỗi ngày đã format, ví dụ: "05/06/2025"
   */
  static formatDate(date: Date | string, locale: string = "vi-VN"): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  static formatPriceVND(value: number): string {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  }

  static formatPhoneNumber(phone: string): string {
    // Xoá các ký tự không phải số
    const cleaned = phone.replace(/\D/g, "");

    // Nếu đủ 10 số, format theo kiểu 4-3-3
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
        7
      )}`;
    }

    // Nếu là số tổng đài hoặc số lẻ khác, trả về nguyên gốc
    return phone;
  }
}
