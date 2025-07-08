import { cn } from "@/lib/utils";
import { ArrowDownWideNarrow } from "lucide-react";





interface propsInterface  { 
    className?:string;
    discount:number

}

export const DiscountComponent = ({className,discount}:propsInterface)=>{
    return <div className ={cn("bg-[#fb2150] text-white px-2 flex gap-x-1 items-center",className)}>

        <ArrowDownWideNarrow size = {14}/>
        <span className = "text-sm font-semibold">{discount}%</span>
    </div>
}