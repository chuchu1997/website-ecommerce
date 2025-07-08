"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
interface SkeletonImageProps {
  imageSrc: string;
  imageLabel:string;

  priority?:boolean;
  sizes?:string;
  className?:string;



}
export default function SkeletonImage({ imageSrc,imageLabel,priority,sizes,className }:SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
  
  },[loaded])
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md bg-gray-200">
     {/* Fancy shimmer skeleton */}
     {!loaded && (
         <Skeleton className="absolute inset-0 z-10 animate-pulse">
         <div className="h-full w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
       </Skeleton>
 
      )}

  
    <Image
      src={imageSrc}
      alt={imageLabel}
      priority={priority ?? false}
      fill
      sizes={sizes ?? "100vw"}
      className={cn('object-cover',className)}
      onLoad={() => setLoaded(true)}
    />
  </div>
  );
}