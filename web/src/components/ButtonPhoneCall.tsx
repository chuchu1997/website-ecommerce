'use client';
import { PHONE_NUMBER } from "@/constants/phone";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";



export const ButtonPhoneCall = ()=>{
    return  <Button
    
    
    className = "bg-[#333333]  text-accent"  onClick={()=>{
        window.location.href = `tel:${PHONE_NUMBER}`;
  }}>
    <div className = "flex flex-row gap-2 items-center justify-center">
    <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
    <span>0973 926 139</span>
    </div>
  </Button>
}