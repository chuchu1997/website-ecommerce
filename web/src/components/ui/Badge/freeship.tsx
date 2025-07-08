import { Truck } from "lucide-react"
import { Badge } from "../badge"






export const BadgeFreeship = ()=>{
    return <Badge className = "bg-[#d2fafa] text-[#04c4c4] flex items-end gap-x-1">
        <Truck size = {20}/>
        <span className = "font-bold">Freeship</span>
    </Badge>
}