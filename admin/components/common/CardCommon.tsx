import { Edit, Trash2, Copy, MoreVertical, Eye } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CardItem {
  id: number;
  image: string;
  title: string;
  description: string;
  variant: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CardCommon = (props: CardItem) => {
  const { onDelete, onEdit, ...data } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyImageLink = () => {
    if (data.image) {
      navigator.clipboard.writeText(data.image);
      toast.success("Đã sao chép link hình ảnh");
    }
  };

  const getVariantStyle = (variant: string) => {
    const styles = {
      "flash-sale": {
        bg: "bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500",
        shadow: "shadow-purple-500/25"
      },
      Electronics: {
        bg: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400",
        shadow: "shadow-blue-500/25"
      },
      "Sports & Lifestyle": {
        bg: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
        shadow: "shadow-orange-500/25"
      },
      "Luxury Automotive": {
        bg: "bg-gradient-to-br from-slate-700 via-gray-800 to-black",
        shadow: "shadow-slate-700/25"
      },
      "Food & Beverage": {
        bg: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500",
        shadow: "shadow-emerald-500/25"
      },
      Sportswear: {
        bg: "bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-500",
        shadow: "shadow-indigo-500/25"
      },
      Promotional: {
        bg: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500",
        shadow: "shadow-amber-500/25"
      },
      "Product Launch": {
        bg: "bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500",
        shadow: "shadow-rose-500/25"
      },
      "Flash Sale": {
        bg: "bg-gradient-to-br from-red-600 via-pink-600 to-purple-500",
        shadow: "shadow-red-500/25"
      },
      Seasonal: {
        bg: "bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500",
        shadow: "shadow-teal-500/25"
      },
      Technology: {
        bg: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600",
        shadow: "shadow-blue-600/25"
      },
      Apparel: {
        bg: "bg-gradient-to-br from-pink-500 via-rose-500 to-violet-500",
        shadow: "shadow-pink-500/25"
      },
      Lifestyle: {
        bg: "bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500",
        shadow: "shadow-green-500/25"
      },
      Recreation: {
        bg: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500",
        shadow: "shadow-orange-500/25"
      },
      Smartphone: {
        bg: "bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-900",
        shadow: "shadow-slate-800/25"
      },
      Laptop: {
        bg: "bg-gradient-to-br from-gray-700 via-slate-700 to-zinc-800",
        shadow: "shadow-gray-700/25"
      },
      Footwear: {
        bg: "bg-gradient-to-br from-red-600 via-orange-500 to-amber-500",
        shadow: "shadow-red-600/25"
      },
      Accessories: {
        bg: "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500",
        shadow: "shadow-cyan-500/25"
      },
      Audio: {
        bg: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600",
        shadow: "shadow-violet-600/25"
      },
      Wearable: {
        bg: "bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-500",
        shadow: "shadow-teal-600/25"
      },
    };
    return (
      styles[variant as keyof typeof styles] || {
        bg: "bg-gradient-to-br from-gray-600 via-slate-600 to-zinc-700",
        shadow: "shadow-gray-600/25"
      }
    );
  };

  const variantStyle = getVariantStyle(data.variant);

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-gray-200 backdrop-blur-sm">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {data.image !== "" ? (
          <div className="relative">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Image Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : (
          <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-gray-400 text-center">
              <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}

        {/* Enhanced Action Menu */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2.5 bg-white/90 backdrop-blur-md text-gray-700 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 py-2 z-10 animate-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => {
                    onEdit(data.id);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <Edit className="w-4 h-4 mr-3" />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    handleCopyImageLink();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200">
                  <Copy className="w-4 h-4 mr-3" />
                  Sao chép link
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={() => {
                    onDelete(data.id);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <Trash2 className="w-4 h-4 mr-3" />
                  Xóa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Variant Badge */}
        {/* <div className="absolute bottom-4 left-4">
          <div className={`${variantStyle.bg} ${variantStyle.shadow} px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20`}>
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              {data.variant}
            </span>
          </div>
        </div> */}
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6 relative">
        {/* Decorative Element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {data.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
            {data.description}
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-300 transition-all duration-500 rounded-full"></div>
      </div>

      {/* Click Outside Handler */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};