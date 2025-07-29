/** @format */
"use client";

import { useRef, useState } from "react";
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
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { ContactAPI } from "@/api/contacts/contacts.api";

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
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Replace with your actual reCAPTCHA site key
  const RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Test key for development

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gửi thành công!
              </h3>
              <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm
                nhất.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                Gửi tin nhắn khác
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông
            tin và chúng tôi sẽ liên hệ lại sớm nhất có thể.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 overflow-hidden">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-fit">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@company.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Điện thoại</h4>
                    <p className="text-gray-600">+84 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Thời gian hỗ trợ
                    </h4>
                    <p className="text-gray-600">T2 - T6: 8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-2 flex items-center">
                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-2 flex items-center">
                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("phone")}
                      type="text"
                      id="phone"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                      placeholder="+84 123 456 789"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-2 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    id="subject"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Chủ đề tin nhắn"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-2 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={5}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none bg-gray-50 focus:bg-white"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-2 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* CAPTCHA Section - Now visible */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                    onExpired={handleCaptchaExpired}
                    ref={recaptchaRef}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !captchaToken}
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Gửi tin nhắn
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
  );
};

export default ContactPage;
