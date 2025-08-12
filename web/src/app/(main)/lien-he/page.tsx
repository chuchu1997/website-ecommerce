/** @format */
"use client";

import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  MapPin,
  Clock,
  Home,
  Palette,
  Award,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { ContactAPI } from "@/api/contacts/contacts.api";
import { getCachedStoreInfo } from "@/app/layout";
import { StoreInterface } from "@/types/store";
import { StoreAPI } from "@/api/stores/store.api";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(8, "Số điện thoại quá ngắn")
    .max(15, "Số điện thoại quá dài"),
  subject: z.string().min(2, "Vui lòng nhập tiêu đề"),
  message: z.string().min(10, "Nội dung quá ngắn"),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [storeInfo, setStoreInfo] = useState<StoreInterface>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Replace with your actual reCAPTCHA site key
  const RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Test key for development

  useEffect(() => {
    fetchStoreInfo();
  }, []);
  const fetchStoreInfo = async () => {
    const storeInfoRes = await StoreAPI.getStoreInfo();
    if (storeInfoRes) {
      setStoreInfo(storeInfoRes.data.store);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Check if captcha is completed (for visible captcha)
      if (!captchaToken) {
        toast.error("Vui lòng xác minh reCAPTCHA");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let res = await ContactAPI.sendContact({
        name: data.name,
        email: data.email,
        content: data.message,
        subject: data.subject,
        phone: data.phone,
      });
      console.log("RES", res);
      setIsSubmitted(true);
      toast.success("Gửi liên hệ thành công!");
      reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error("Lỗi hệ thống, vui lòng thử lại");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8"
        style={{ background: "var(--gradient-secondary)" }}>
        <div className="max-w-md w-full">
          <div
            className="rounded-3xl p-8 sm:p-10 text-center transform hover:scale-105 transition-all duration-500"
            style={{
              backgroundColor: "var(--color-bg)",
              boxShadow: "var(--shadow-hover)",
              border: "1px solid var(--color-border-light)",
            }}>
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-6 animate-bounce"
              style={{ backgroundColor: "var(--color-accent-green-light)" }}>
              <CheckCircle
                className="h-10 w-10"
                style={{ color: "var(--color-accent-green)" }}
              />
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}>
              Cảm ơn bạn!
            </h3>
            <p
              className="text-base sm:text-lg mb-8 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}>
              Chúng tôi đã nhận được yêu cầu tư vấn thiết kế của bạn. Đội ngũ
              chuyên gia sẽ liên hệ trong vòng 24 giờ.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center px-8 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
              style={{
                backgroundImage: "var(--gradient-primary)",
                color: "var(--color-text-white)",
                boxShadow: "var(--shadow-default)",
              }}>
              <Home className="w-5 h-5 mr-2" />
              Tư vấn dự án khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--gradient-secondary)" }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div
          className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: "var(--color-accent-green)",
            animationDelay: "1s",
          }}
        />

        {/* Geometric patterns for interior design feel */}
        <div
          className="absolute top-1/4 left-1/4 w-1 h-20 sm:h-32 lg:h-40 transform rotate-45 opacity-10"
          style={{ backgroundColor: "var(--color-text-primary)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-1 h-16 sm:h-24 lg:h-32 transform -rotate-45 opacity-10"
          style={{ backgroundColor: "var(--color-text-primary)" }}
        />
      </div>

      <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div
                className="p-3 sm:p-4 rounded-2xl"
                style={{
                  backgroundColor: "var(--color-primary)",
                  boxShadow: "var(--shadow-default)",
                }}>
                <Palette
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  style={{ color: "var(--color-text-white)" }}
                />
              </div>
              <div
                className="p-3 sm:p-4 rounded-2xl"
                style={{
                  backgroundColor: "var(--color-accent-green)",
                  boxShadow: "var(--shadow-default)",
                }}>
                <Home
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  style={{ color: "var(--color-text-white)" }}
                />
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--color-text-primary)" }}>
              Bắt đầu hành trình
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--gradient-primary)" }}>
                thiết kế ước mơ
              </span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
              style={{ color: "var(--color-text-secondary)" }}>
              Chia sẻ với chúng tôi về không gian lý tưởng của bạn. Đội ngũ kiến
              trúc sư và thiết kế nội thất chuyên nghiệp sẽ biến ý tưởng thành
              hiện thực.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Contact Card */}
              <div
                className="rounded-3xl p-6 sm:p-8 backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6"
                  style={{ color: "var(--color-text-primary)" }}>
                  Liên hệ trực tiếp
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group cursor-pointer hover:scale-105 transition-transform">
                    <div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-primary-light)" }}>
                      <Mail
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--color-text-primary)" }}>
                        Email tư vấn
                      </h3>
                      <p
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-secondary)" }}>
                        {storeInfo?.email ?? "design@interior.com"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer hover:scale-105 transition-transform">
                    <div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-accent-green-light)",
                      }}>
                      <Phone
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: "var(--color-accent-green)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--color-text-primary)" }}>
                        Hotline 24/7
                      </h3>
                      <p
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-secondary)" }}>
                        {storeInfo?.phone ?? ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer hover:scale-105 transition-transform">
                    <div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-accent-red-light)",
                      }}>
                      <MapPin
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: "var(--color-accent-red)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--color-text-primary)" }}>
                        Showroom & Studio
                      </h3>
                      <p
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-secondary)" }}>
                        {storeInfo?.address ?? ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer hover:scale-105 transition-transform">
                    <div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-bg-accent)" }}>
                      <Clock
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: "var(--color-text-secondary)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--color-text-primary)" }}>
                        Giờ làm việc
                      </h3>
                      <p
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-secondary)" }}>
                        T2-CN: 8:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Awards/Trust Indicators */}
              <div
                className="rounded-3xl p-6 sm:p-8 text-center"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-primary-light)" }}>
                  <Award
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h3
                  className="font-bold text-lg sm:text-xl mb-2"
                  style={{ color: "var(--color-text-primary)" }}>
                  15+ năm kinh nghiệm
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "var(--color-text-secondary)" }}>
                  Hơn 1000+ dự án thành công
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div
                className="rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--color-bg)",
                  boxShadow: "var(--shadow-default)",
                  border: "1px solid var(--color-border-light)",
                }}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-3"
                        style={{ color: "var(--color-text-primary)" }}>
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User
                            className="h-5 w-5"
                            style={{ color: "var(--color-text-muted)" }}
                          />
                        </div>
                        <input
                          {...register("name")}
                          type="text"
                          id="name"
                          className="block w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                          placeholder="Nhập họ và tên của bạn"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                            border: "2px solid var(--color-border)",
                            color: "var(--color-text-primary)",
                          }}
                        />
                      </div>
                      {errors.name && (
                        <p
                          className="text-sm mt-2 flex items-center"
                          style={{ color: "var(--color-accent-red)" }}>
                          <span
                            className="w-1 h-1 rounded-full mr-2"
                            style={{
                              backgroundColor: "var(--color-accent-red)",
                            }}></span>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-3"
                        style={{ color: "var(--color-text-primary)" }}>
                        Email *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail
                            className="h-5 w-5"
                            style={{ color: "var(--color-text-muted)" }}
                          />
                        </div>
                        <input
                          {...register("email")}
                          type="email"
                          id="email"
                          className="block w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                          placeholder="your@email.com"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                            border: "2px solid var(--color-border)",
                            color: "var(--color-text-primary)",
                          }}
                        />
                      </div>
                      {errors.email && (
                        <p
                          className="text-sm mt-2 flex items-center"
                          style={{ color: "var(--color-accent-red)" }}>
                          <span
                            className="w-1 h-1 rounded-full mr-2"
                            style={{
                              backgroundColor: "var(--color-accent-red)",
                            }}></span>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold mb-3"
                        style={{ color: "var(--color-text-primary)" }}>
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone
                            className="h-5 w-5"
                            style={{ color: "var(--color-text-muted)" }}
                          />
                        </div>
                        <input
                          {...register("phone")}
                          type="text"
                          id="phone"
                          className="block w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                          placeholder="0123 456 789"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                            border: "2px solid var(--color-border)",
                            color: "var(--color-text-primary)",
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p
                          className="text-sm mt-2 flex items-center"
                          style={{ color: "var(--color-accent-red)" }}>
                          <span
                            className="w-1 h-1 rounded-full mr-2"
                            style={{
                              backgroundColor: "var(--color-accent-red)",
                            }}></span>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold mb-3"
                        style={{ color: "var(--color-text-primary)" }}>
                        Loại dự án *
                      </label>
                      <select
                        {...register("subject")}
                        id="subject"
                        className="block w-full px-4 py-4 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                        style={{
                          backgroundColor: "var(--color-bg-secondary)",
                          border: "2px solid var(--color-border)",
                          color: "var(--color-text-primary)",
                        }}>
                        <option value="">Chọn loại dự án</option>
                        <option value="Thiết kế căn hộ">Thiết kế căn hộ</option>
                        <option value="Thiết kế nhà phố">
                          Thiết kế nhà phố
                        </option>
                        <option value="Thiết kế biệt thự">
                          Thiết kế biệt thự
                        </option>
                        <option value="Thiết kế văn phòng">
                          Thiết kế văn phòng
                        </option>
                        <option value="Thiết kế showroom">
                          Thiết kế showroom
                        </option>
                        <option value="Tư vấn khác">Tư vấn khác</option>
                      </select>
                      {errors.subject && (
                        <p
                          className="text-sm mt-2 flex items-center"
                          style={{ color: "var(--color-accent-red)" }}>
                          <span
                            className="w-1 h-1 rounded-full mr-2"
                            style={{
                              backgroundColor: "var(--color-accent-red)",
                            }}></span>
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold mb-3"
                      style={{ color: "var(--color-text-primary)" }}>
                      Mô tả chi tiết dự án *
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare
                          className="h-5 w-5"
                          style={{ color: "var(--color-text-muted)" }}
                        />
                      </div>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={6}
                        className="block w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 resize-none focus:ring-4 focus:ring-opacity-20 text-sm sm:text-base"
                        placeholder="Mô tả về không gian, phong cách yêu thích, ngân sách dự kiến và những yêu cầu đặc biệt..."
                        style={{
                          backgroundColor: "var(--color-bg-secondary)",
                          border: "2px solid var(--color-border)",
                          color: "var(--color-text-primary)",
                        }}
                      />
                    </div>
                    {errors.message && (
                      <p
                        className="text-sm mt-2 flex items-center"
                        style={{ color: "var(--color-accent-red)" }}>
                        <span
                          className="w-1 h-1 rounded-full mr-2"
                          style={{
                            backgroundColor: "var(--color-accent-red)",
                          }}></span>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  <div className="flex justify-center py-4">
                    <div className="transform scale-90 sm:scale-100">
                      <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                        onExpired={handleCaptchaExpired}
                        ref={recaptchaRef}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !captchaToken}
                      className="w-full flex items-center justify-center px-8 py-5 text-base font-bold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        backgroundImage: "var(--gradient-primary)",
                        color: "var(--color-text-white)",
                        boxShadow: "var(--shadow-default)",
                      }}>
                      {isSubmitting ? (
                        <>
                          <div
                            className="animate-spin rounded-full h-6 w-6 border-b-2 mr-3"
                            style={{
                              borderColor: "var(--color-text-white)",
                            }}></div>
                          Đang gửi yêu cầu...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Gửi yêu cầu tư vấn miễn phí
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
