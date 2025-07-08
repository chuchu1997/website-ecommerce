/** @format */

"use client";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import TileComponent from "./TileComponent";

type Props = {
  id?: string;
};

const itemServices = [
  {
    num: "01",
    title: "tủ quần áo",
    description: "lorem ipsum dolor sit amet",
    image: "/images/mayhanhongkyPro/1.webp",
    href: "",
    idTarget: "mayhan_hongkypro",
  },
  {
    num: "02",
    title: "giường ngủ",
    description: "lorem ipsum dolor sit amet",
    image: "/images/quehankimtin/1.png",
    href: "",
    idTarget: "quehan_kimtin",
  },
  {
    num: "03",
    title: "tủ bếp",
    description: "lorem ipsum dolor sit amet",
    image: "/images/mayhanJasic/1.png",
    href: "",
    idTarget: "mayhan_jasic",
  },
  {
    num: "04",
    title: "combo phòng bếp",
    description: "lorem ipsum dolor sit amet",

    href: "",
    image: "/images/mayhanhongkyHK/1.png",
    idTarget: "mayhan_hongky",
  },
];

const Services = ({ id }: Props) => {
  return (
    <section className="flex flex-col gap-4" id={id}>
      <TileComponent title={"Sản phẩm chủ đạo "} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-accent">
        {itemServices.map((service) => (
          <div
            key={service.num}
            className="p-4 rounded-lg shadow-md hover:scale-105 transform duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <div className="title-service flex flex-col gap-4">
                <p className="text-2xl md:text-3xl lg:text-4xl italic font-semibold">
                  {service.num}
                </p>
                <p className="capitalize text-sm md:text-base lg:text-lg font-semibold italic text-accent/90">
                  {service.title}
                </p>
              </div>
              <div className="image-service">
                <Image
                  src={service.image}
                  alt={service.title}
                  height={70}
                  width={80}
                  priority
                />
              </div>
              <div className="action-service">
                <div
                  onClick={() => {
                    const targetElement = document.getElementById(
                      service.idTarget
                    );

                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="cursor-pointer bg-accent/20 w-[45px] h-[45px] rounded-full flex justify-center items-center hover:bg-accent transition-all duration-500 hover:-rotate-45">
                  <ArrowDownRight className="text-black" size={"20px"} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;
