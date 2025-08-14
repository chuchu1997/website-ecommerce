import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Edit3, Eye, X, FileText, Sparkles } from "lucide-react";
import EditorComponent from "@/components/editor";

interface DescriptionSectionProps {
  form: any;
  loading: boolean;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ 
  form, 
  loading 
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const EmptyState = () => (
    <div 
      className="group relative border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
      onClick={() => setIsEditorOpen(true)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-blue-400 rounded-full"></div>
        <div className="absolute top-8 right-8 w-4 h-4 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-6 h-6 border-2 border-indigo-400 rounded"></div>
        <div className="absolute bottom-4 right-12 w-5 h-5 bg-blue-400 rounded-full"></div>
      </div>

      <div className="relative space-y-6">
        {/* Icon with Animation */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Edit3 className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce">
            <Sparkles className="w-3 h-3 text-yellow-800" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-purple-600 transition-all duration-300">
            Tạo mô tả sản phẩm
          </h3>
          <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            Viết mô tả chi tiết và hấp dẫn để thu hút khách hàng. 
            Sử dụng trình soạn thảo với đầy đủ tính năng định dạng.
          </p>
        </div>

        {/* Call to Action */}
        <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-purple-600 transition-colors duration-300">
          <span>Bắt đầu viết ngay</span>
          <Edit3 className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );

  const EditorView = ({ field }: any) => (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-t-2xl">
        <div className="flex items-center space-x-4">
          {/* Browser Dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
          </div>
          
          {/* Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800">
                Trình soạn thảo mô tả
              </span>
              <p className="text-xs text-gray-500">Công cụ tạo nội dung chuyên nghiệp</p>
            </div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">Tự động lưu</span>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className=" hover:border-blue-300 transition-all duration-200">
        <div className="">
          <FormControl>
            <EditorComponent
              value={field.value}
              onChange={field.onChange}
              className="h-full focus:outline-none prose prose-lg max-w-none"
              placeholder="✨ Bắt đầu viết mô tả sản phẩm chi tiết của bạn...

💡 Một vài gợi ý:
• Mô tả đặc điểm nổi bật của sản phẩm
• Lợi ích mà khách hàng sẽ nhận được
• Thông tin kỹ thuật chi tiết
• Hướng dẫn sử dụng và bảo quản"
            />
          </FormControl>
        </div>

        {/* Editor Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">
                  <span className="font-semibold text-blue-600">{field.value?.length || 0}</span> ký tự
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">
                  Cập nhật: {new Date().toLocaleTimeString("vi-VN")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditorOpen(false)}
                className="text-sm px-4 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Đóng</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="text-sm px-4 py-2 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Xem trước</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Mô tả sản phẩm</h3>
            <p className="text-sm text-gray-500 mt-1">
              Viết mô tả chi tiết để thu hút khách hàng
            </p>
          </div>
        </div>
        
        {/* Editor Status Badge */}
        {isEditorOpen && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">Đang chỉnh sửa</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            {!isEditorOpen ? <EmptyState /> : <EditorView field={field} />}
            <FormMessage className="text-sm mt-3 p-3 bg-red-50 border border-red-200 rounded-lg" />
          </FormItem>
        )}
      />
      
      {/* Helper Text */}
      {!isEditorOpen && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Mẹo viết mô tả hiệu quả
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tập trung vào lợi ích khách hàng nhận được</li>
                <li>• Sử dụng từ ngữ dễ hiểu, tránh thuật ngữ phức tạp</li>
                <li>• Bao gồm thông tin kỹ thuật quan trọng</li>
                <li>• Thêm hướng dẫn sử dụng và bảo quản</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};