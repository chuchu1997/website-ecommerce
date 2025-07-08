/** @format */

import { Service } from "@/types/ProjectInterface";
import ServiceCard from "./service-card";

interface ProductListProps {
  title: string;
  services: Service[];
}

const ServiceList: React.FC<ProductListProps> = ({ title, services }) => {
  return (
    <div className="wrapper-product-list space-y-2">
      <div className="flex items-center relative">
        <div className="bg-orange-500 w-2 h-full absolute"></div>
        <div className="bg-gray-100 px-4 py-2 text-black font-bold text-sm italic capitalize">
          {title}
        </div>
      </div>
      {/* <h3 className="font-bold text-3xl">{title}</h3> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
