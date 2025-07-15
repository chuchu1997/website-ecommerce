import React from 'react';
import { ShoppingCart, DollarSign, Clock, Shield, AlertCircle, CheckCircle, Gift, Truck } from 'lucide-react';

export default function SalesPolicy() {
  const policies = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Chính sách giá",
      content: [
        "Giá sản phẩm được niêm yết công khai trên website",
        "Giá đã bao gồm VAT, không bao gồm phí giao hàng",
        "Giá có thể thay đổi tùy theo chương trình khuyến mãi",
        "Giá sỉ áp dụng cho đơn hàng từ 50 sản phẩm trở lên"
      ]
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      title: "Đặt hàng",
      content: [
        "Đặt hàng online 24/7 qua website hoặc hotline",
        "Xác nhận đơn hàng trong vòng 2 giờ",
        "Đơn hàng tối thiểu 200.000 VNĐ",
        "Khách hàng có thể hủy đơn trước khi xử lý"
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Thời gian xử lý",
      content: [
        "Đơn hàng trong kho: 1-2 ngày làm việc",
        "Đơn hàng đặt trước: 3-5 ngày làm việc",
        "Đơn hàng số lượng lớn: 5-7 ngày làm việc",
        "Thời gian có thể thay đổi trong mùa cao điểm"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Bảo hành",
      content: [
        "Sản phẩm được bảo hành chính hãng",
        "Thời gian bảo hành từ 12-24 tháng",
        "Hỗ trợ sửa chữa miễn phí trong thời gian bảo hành",
        "Đổi sản phẩm mới nếu lỗi do nhà sản xuất"
      ]
    }
  ];

  const paymentTerms = [
    "Thanh toán khi nhận hàng (COD)",
    "Thanh toán online qua thẻ tín dụng/ghi nợ",
    "Chuyển khoản ngân hàng",
    "Ví điện tử (MoMo, ZaloPay, ViettelPay)",
    "Trả góp 0% lãi suất cho đơn hàng trên 5 triệu"
  ];

  const promotionRules = [
    "Khuyến mãi không áp dụng đồng thời với các chương trình khác",
    "Số lượng sản phẩm khuyến mãi có hạn, áp dụng theo thứ tự đặt hàng",
    "Khuyến mãi chỉ áp dụng cho khách hàng mua hàng lần đầu",
    "Quà tặng không có giá trị quy đổi thành tiền mặt",
    "Công ty có quyền thay đổi chính sách khuyến mãi"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Chính Sách Bán Hàng</h1>
          <p className="mt-2 text-gray-600">Quy định và điều khoản bán hàng của chúng tôi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                {policy.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{policy.title}</h3>
              </div>
              <ul className="space-y-3">
                {policy.content.map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Terms */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Điều Khoản Thanh Toán
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
              <ul className="space-y-2">
                {paymentTerms.map((term, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lưu ý quan trọng</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-700">
                    <p className="mb-2">• Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</p>
                    <p className="mb-2">• Hóa đơn VAT sẽ được xuất theo yêu cầu</p>
                    <p>• Liên hệ hotline nếu có vấn đề với thanh toán</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Rules */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gift className="w-6 h-6 mr-2 text-purple-600" />
            Quy Định Khuyến Mãi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Điều kiện áp dụng</h3>
              <ul className="space-y-2">
                {promotionRules.map((rule, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loại khuyến mãi</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="font-medium text-blue-900">Giảm giá theo % hoặc số tiền</p>
                  <p className="text-sm text-blue-700">Áp dụng trực tiếp vào đơn hàng</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="font-medium text-green-900">Quà tặng kèm</p>
                  <p className="text-sm text-green-700">Sản phẩm hoặc voucher miễn phí</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="font-medium text-purple-900">Miễn phí giao hàng</p>
                  <p className="text-sm text-purple-700">Cho đơn hàng từ 500.000 VNĐ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Policy */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Truck className="w-6 h-6 mr-2" />
            Chính Sách Giao Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Khu vực giao hàng</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Toàn quốc</li>
                <li>• Ưu tiên nội thành các thành phố lớn</li>
                <li>• Giao hàng tận nơi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Thời gian giao hàng</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Nội thành: 1-2 ngày</li>
                <li>• Ngoại thành: 2-3 ngày</li>
                <li>• Tỉnh thành khác: 3-5 ngày</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Phí giao hàng</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Miễn phí từ 500.000 VNĐ</li>
                <li>• Nội thành: 30.000 VNĐ</li>
                <li>• Ngoại thành: 50.000 VNĐ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}