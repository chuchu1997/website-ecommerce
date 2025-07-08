'use client';
import { useEffect, useState } from "react";
import { AlignLeft, AlignRight } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER } from "@/constants/phone";

const items = [
  // },
  { title: "Chat Zalo", icon: "/images/socials/zalo.png", href: `http://zalo.me/${PHONE_NUMBER}` },
  { title: "Gọi điện", icon: "/images/socials/phone.png", href: `tel:${PHONE_NUMBER}` },
  // { title: "Messager", icon: "/messager.jpg" },
];
const BlockSidebar = () => {
  const [sort, setSort] = useState(true);
  const [isMounted,setIsMounted] = useState(false);
  useEffect(()=>{
    
    setIsMounted(true);
    
  },[])
  if (!isMounted) return null;

  return (
    <div
      className={`sort-dock bg-red fixed right-0 top-40 ${
        sort ? "w-[60px]" : "w-[120px]"
      } px-2 pt-10 pb-4 z-50 bg-accent rounded-md hidden md:flex flex-col gap-4 text-black transition-width duration-500 overflow-hidden`}
    >
      <div
        className="absolute top-2 left-2 text-white cursor-pointer "
        onClick={() => {
          setSort(!sort);
        }}
      >
        {sort ? <AlignRight /> : <AlignLeft />}
      </div>
      {items.map((item, index) => {
        return (
          <Link
            href={item.href}
            key={index}
            className="bg-white p-2 flex flex-col justify-center items-center gap-4 rounded-md cursor-pointer group transition-all duration-400"
          >
            <img
              src={item.icon}
              alt="icon"
              width={35}
              height={35}
              className="group-hover:scale-125 scale-100 transition-all duration-400"
            ></img>
            <p
              className={`${
                sort
                  ? "hidden"
                  : "text-black/80 text-center text-sm group-hover:text-accent "
              }`}
            >
              {item.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BlockSidebar;
