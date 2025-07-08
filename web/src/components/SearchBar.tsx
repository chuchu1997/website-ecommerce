/** @format */

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Camera, SearchIcon } from "lucide-react";

interface SearchProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}
const SearchBarComponent = ({ className, value, onChange }: SearchProps) => {
  return (
    <div className={cn("relative flex text-black items-center", className)}>
      <SearchIcon
        className="absolute left-3 text-gray-500"
        size={18}
        color="black"
      />

      <Input
        autoFocus={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-none pl-10 bg-[#ffffff]"
        placeholder="Tìm kiếm về guitar "></Input>
      <div className="absolute right-23">
        <Camera className="text-gray-500" size={20} />
      </div>
      <div className="absolute right-3">
        <div className="font-semibold text-black">Tìm kiếm </div>
      </div>
    </div>
  );
};

export default SearchBarComponent;
