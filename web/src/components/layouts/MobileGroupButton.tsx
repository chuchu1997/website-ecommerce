import { PhoneCall } from "lucide-react"
import { Button } from "../ui/button"
import { PHONE_NUMBER } from "@/constants/phone"


export const MobileGroupButton = ()=>{
    return <div className="fixed bottom-0 left-0 right-0 flex md:hidden justify-center gap-4 z-50 ">
    <Button asChild className="flex-1 flex items-center gap-2 bg-accent">
    <a href={`tel:${PHONE_NUMBER}`}>
      <PhoneCall size={18} />
      <span>0973.926.139</span>
    </a>
  </Button>
    <Button
    asChild
      className="flex-1 flex items-center bg-accent"
      
    >
        <a href = {`https://zalo.me/${PHONE_NUMBER}`}>
        <img
        src="/images/socials/zalo.png"
        alt="zalo icon"
        className="h-8 w-8 object-cover"
      ></img>
      <span>Zalo</span></a>
     
    </Button>
    </div>
}