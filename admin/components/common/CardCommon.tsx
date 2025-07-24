import { Edit, Trash2, Copy } from "lucide-react";
import React from "react";
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

  const handleCopyImageLink = () => {
    if (data.image) {
      navigator.clipboard.writeText(data.image);
      // Optional: thông báo khi copy xong
      
      toast.success("Đã sao chép link hình ảnh ")
    }
  };

  const getVariantColor = (variant: string) => {
    const colors = {
      "flash-sale": "bg-gradient-to-r from-purple-500 to-pink-500",
      Electronics: "bg-gradient-to-r from-blue-500 to-cyan-500",
      "Sports & Lifestyle": "bg-gradient-to-r from-orange-500 to-red-500",
      "Luxury Automotive": "bg-gradient-to-r from-gray-700 to-gray-900",
      "Food & Beverage": "bg-gradient-to-r from-green-500 to-teal-500",
      Sportswear: "bg-gradient-to-r from-indigo-500 to-purple-500",
      Promotional: "bg-gradient-to-r from-yellow-500 to-orange-500",
      "Product Launch": "bg-gradient-to-r from-pink-500 to-rose-500",
      "Flash Sale": "bg-gradient-to-r from-red-500 to-pink-500",
      Seasonal: "bg-gradient-to-r from-emerald-500 to-teal-500",
      Technology: "bg-gradient-to-r from-blue-600 to-purple-600",
      Apparel: "bg-gradient-to-r from-pink-500 to-violet-500",
      Lifestyle: "bg-gradient-to-r from-green-500 to-emerald-500",
      Recreation: "bg-gradient-to-r from-orange-500 to-amber-500",
      Smartphone: "bg-gradient-to-r from-slate-700 to-slate-900",
      Laptop: "bg-gradient-to-r from-gray-600 to-gray-800",
      Footwear: "bg-gradient-to-r from-red-500 to-orange-500",
      Accessories: "bg-gradient-to-r from-cyan-500 to-blue-500",
      Audio: "bg-gradient-to-r from-violet-500 to-purple-500",
      Wearable: "bg-gradient-to-r from-teal-500 to-cyan-500",
    };
    return (
      colors[variant as keyof typeof colors] ||
      "bg-gradient-to-r from-gray-500 to-gray-700"
    );
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        {data.image !== "" && (
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
          <button
            onClick={() => onEdit(data.id)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(data.id)}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg">
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopyImageLink}
            className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-lg">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Variant Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getVariantColor(
              data.variant
            )}`}>
            {data.variant}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {data.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
};
