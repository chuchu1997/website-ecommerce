import { Truck } from "lucide-react"

export const FreeshipBadVer2 = ()=>{
    return   <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-center w-4 h-4 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors duration-200">
        <Truck className="w-2.5 h-2.5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200" />
      </div>
      <span className="text-xs font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors duration-200 tracking-wide">
        Free Shipping
      </span>
    </div>
}