/** @format */

"use client";

import dynamic from "next/dynamic";
import CircleLoading from "@/components/ui/circle-loading"; // sửa đường dẫn nếu cần
import { Image as ImageType } from "@/types/ProjectInterface";

const Gallery = dynamic(() => import("@/components/gallery"), {
  loading: () => <CircleLoading />,
  ssr: false,
});

interface GalleryClientWrapperProps {
  images: ImageType[];
}

const GalleryClientWrapper = ({ images }: GalleryClientWrapperProps) => {
  return <Gallery images={images} />;
};

export default GalleryClientWrapper;
