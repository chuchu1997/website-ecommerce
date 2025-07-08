/** @format */

import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white">
      <div className=" text-gray-800 container mx-auto">
        {/* Header section */}
        <div className=" py-16 px-6 md:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bạn cần tư vấn mua nhạc cụ, đặt hàng, hoặc có bất kỳ thắc mắc nào?
            Hãy liên hệ với Guitar Sài Thành – chúng tôi luôn sẵn sàng hỗ trợ
            bạn!
          </p>
        </div>

        {/* Contact content */}
        <section className="py-12 px-6 md:px-16 grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Gửi tin nhắn</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Họ và tên</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="email@domain.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Nội dung</label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Bạn cần hỗ trợ về..."></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition">
                Gửi liên hệ
              </button>
            </form>
          </div>

          {/* Store contact info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-2">Thông tin cửa hàng</h2>
            <p className="text-gray-600">
              <strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Quận 5, TP.HCM
            </p>
            <p className="text-gray-600">
              <strong>Hotline:</strong> 0909 123 456
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> support@guitarsaithanh.vn
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Bản đồ Guitar Sài Thành"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456!2d106.123456!3d10.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f123456789!2sGuitar%20S%C3%A0i%20Th%C3%A0nh!5e0!3m2!1sen!2s!4v123456789"
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
