/** @format */

"use client";

import { Image as ImageType } from "@/types/ProjectInterface";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";
import SkeletonImage from "../skeleton/custom-skeleton";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-4">
         
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>

      <TabPanels className="w-full">
  {images.map((image) => (
    <TabPanel key={image.id}>
      <div className="relative w-full sm:rounded-lg overflow-hidden" style={{ aspectRatio: "1 / 1" }}> {/* Đảm bảo aspect vuông */}
        <SkeletonImage
          imageSrc={image.url}
          imageLabel=""
          className="object-cover object-center"
        />
      </div>
    </TabPanel>
  ))}
</TabPanels>
    </TabGroup>
  );
};

export default Gallery;
