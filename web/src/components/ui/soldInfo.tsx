import React from "react";
import { Info } from "lucide-react"; // đảm bảo bạn đã cài lucide-react

interface SoldInfoProps {
  sold: number;
}

const SoldInfo: React.FC<SoldInfoProps> = ({ sold }) => {
  const formatSoldNumber = (value: number) => {
    if (value >= 10000) {
      return (value / 1000).toFixed(0) + "K";
    }
    return value.toString();
  };

  return (
    <div className="text-gray-600 flex items-center gap-1 text-sm sm:text-base mt-1">
      <span>Bán</span>
      <span className="text-gray-900 font-semibold">{formatSoldNumber(sold)}</span>
      <span>trực tuyến</span>
      <Info size={14} className="text-gray-400" />
    </div>
  );
};

export default SoldInfo;
