import { Truck } from "lucide-react"

export const FreeshipBadVer2 = () => {
  return (
    <div className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-emerald-50 border border-emerald-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-center w-4 h-4 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors duration-200">
        <Truck className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200" />
      </div>
      <span className="text-[10px] md:text-xs text-emerald-700 group-hover:text-emerald-800 transition-colors duration-200 tracking-wide">
        <span className="hidden sm:inline">Free Ship</span>
        <span className="sm:hidden">Free</span>
      </span>
    </div>
  );
};