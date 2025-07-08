/** @format */

"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  User,
  Phone,
  Home,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(6, "Họ và tên không được để trống, hoặc dưới 6 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().min(10, "Số điện thoại không được để trống"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    address: z.string().min(6, "Địa chỉ không được để trống hoặc địa chỉ sai"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    acceptTerms: z.boolean().refine((val) => val, {
      message: "Bạn phải đồng ý với điều khoản dịch vụ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"], // chỉ định lỗi sẽ hiển thị ở confirmPassword
  });
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // <- BỔ SUNG DÒNG NÀY
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "4s" }}></div>
        </div>
      </div>

      {/* Register container */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-sm bg-white/90 border border-yellow-100 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-3 shadow-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Image
                    className="rounded-full"
                    src="/images/logo.jpg"
                    width={40}
                    height={40}
                    alt="logo"
                  />{" "}
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1 italic">
              Guitar Sài Thành
            </h1>
            <p className="text-sm text-gray-600">(Đăng Ký Tài Khoản)</p>
          </div>

          {/* Divider */}

          {/* Register form */}
          <div className="space-y-4">
            {/* Full Name */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700 block mb-1">
                        Họ và tên
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập họ và tên của bạn"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700 block mb-1">
                        Email
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập email của bạn "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700 block mb-1">
                        Địa chỉ
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập địa chỉ của bạn "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700 block mb-1">
                        Số điện thoại
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="text"
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập số điện thoại của bạn  "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700">
                        Mật khẩu
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập mật khẩu của bạn"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium text-gray-700">
                        Xác nhận mật khẩu
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="w-full pl-10 pr-4 py-6 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                            placeholder="Nhập mật khẩu của bạn"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormControl>
                        <div className="flex items-start gap-x-2">
                          <Input
                            checked={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            type="checkbox"
                            id="acceptTerms"
                            className="w-4 h-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-400 focus:ring-offset-0 mt-0.5"
                          />
                          <div className="flex items-center gap-2">
                            <Label
                              htmlFor="acceptTerms"
                              className="text-sm text-gray-600 leading-5">
                              Tôi đồng ý với{" "}
                              <a
                                href="#"
                                className="text-yellow-600 hover:text-yellow-700 underline">
                                Điều khoản dịch vụ
                              </a>{" "}
                              và{" "}
                              <a
                                href="#"
                                className="text-yellow-600 hover:text-yellow-700 underline">
                                Chính sách bảo mật
                              </a>
                            </Label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Đăng ký tài khoản
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Bottom decorations */}
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-xl"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
