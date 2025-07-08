/** @format */
"use client";
import { Service } from "@/types/ProjectInterface";
import Image from "next/image";
import IconButton from "../ui/icon-button";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const router = useRouter();
  const moveDetailsProduct = () => {
    router.push(`/dich-vu/thong-tin/${service.slug}`);
  };
  return (
    <div
      className="bg-white group cursor-pointer rounded-xl  p-3 space-y-4 relative"
      onClick={() => {
        moveDetailsProduct();
      }}>
      <div className="border rounded-lg p-3 md:p-4 h-full">
        <div className="aspect-square rounded-xl bg-gray-100 relative ">
          <Image
            src={service.images[0].url}
            alt={service.name}
            fill
            className="aspect-square object-cover rounded-md"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition absolute top-1/2 left-1/2 transform -translate-x-1/2  w-full  px-6 bottom-5 z-50">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={() => {}}
              icon={<ShoppingCartIcon size={20}></ShoppingCartIcon>}
              className="text-gray-600"
            />
          </div>
        </div>

        {/* <div className=" ">
          <IconButton
            onClick={() => {}}
            icon={<ShoppingCartIcon size={20}></ShoppingCartIcon>}
            className="text-gray-600"
          />
        </div> */}

        <div className="space-y-1 md:space-y-2">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
            {service.name}
          </h3>
          <div className="text-base md:text-lg lg:text-xl font-bold text-red-500">
            {service.price || "Liên hệ"}
          </div>

          {/* <div className="text-xs md:text-sm text-gray-500 line-through">
            GIA CU
          </div>

          <div className="text-xs md:text-sm text-green-500">GIA MOI</div>

          <div className="text-xs md:text-sm text-gray-500">
            Member giảm thêm
          </div> */}

          {/* <div className="flex text-sm md:text-base">
            {Array.from({ length: service.ratingCount ?? 5 }).map((_, i) => (
              <span key={i} className="text-yellow-500">
                ★
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
