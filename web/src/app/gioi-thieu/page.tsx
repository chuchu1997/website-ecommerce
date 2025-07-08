/** @format */

import React from "react";

const GioithieuPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white">
      <div className="container mx-auto text-gray-800">
        {/* Hero section */}
        <div className=" py-16 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Guitar Sài Thành
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Nơi hội tụ đam mê âm nhạc – Chuyên cung cấp các loại nhạc cụ chất
            lượng, đặc biệt là Guitar Acoustic, Classic, Electric & Phụ kiện.
          </p>
        </div>

        {/* Content section */}
        <section className="py-12 px-6 md:px-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Về chúng tôi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Guitar Sài Thành được thành lập với sứ mệnh mang đến cho cộng đồng
              yêu âm nhạc tại Việt Nam những sản phẩm chất lượng, giá cả hợp lý
              và dịch vụ tận tâm.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi không chỉ là nơi bán nhạc cụ, mà còn là nơi kết nối,
              chia sẻ và lan tỏa đam mê âm nhạc thông qua các buổi workshop, lớp
              học guitar và cộng đồng người chơi nhạc.
            </p>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/logo.jpg"
              alt="Guitar Sài Thành"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </section>

        {/* Core values or highlights */}
        <section className="bg-gray-50 py-12 px-6 md:px-16 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Chúng tôi cam kết
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">Sản phẩm chính hãng</h3>
              <p className="text-sm">
                Đảm bảo 100% hàng chính hãng từ các thương hiệu uy tín như
                Yamaha, Fender, Cordoba,...
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">Bảo hành uy tín</h3>
              <p className="text-sm">
                Hỗ trợ kỹ thuật, sửa chữa, đổi trả nhanh chóng và minh bạch.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">Tư vấn tận tâm</h3>
              <p className="text-sm">
                Đội ngũ tư vấn viên hiểu nhạc cụ, sẵn sàng đồng hành cùng bạn
                trong hành trình âm nhạc.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-12 px-6 md:px-16 text-center bg-yellow-100 mt-12 rounded-t-3xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ghé thăm Guitar Sài Thành ngay hôm nay!
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Hãy đến trải nghiệm trực tiếp các sản phẩm, cảm nhận âm thanh và gặp
            gỡ cộng đồng yêu âm nhạc.
          </p>
          <a
            href="/lien-he"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full transition">
            Liên hệ với chúng tôi
          </a>
        </section>
      </div>
    </div>
  );
};

export default GioithieuPage;
