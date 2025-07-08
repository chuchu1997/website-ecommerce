/** @format */
"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Image from "next/image";
import Link from "next/link";

interface AlertSearchProps {
  slug: string;
  shortDescription: string;
  name: string;
  imageUrl: string;
  onViewProduct: () => void;
}

const AlertSearch: React.FC<AlertSearchProps> = ({
  slug,
  shortDescription,
  name,
  imageUrl,
  onViewProduct,
}) => {
  return (
    <Link
      href={`/san-pham/thong-tin/${slug}`}
      onClick={() => {
        onViewProduct();
      }}>
      <Alert className="flex items-center space-x-4">
        <div className="w-[60px] h-[60px] relative ">
          <Image
            src={imageUrl}
            alt={name}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <AlertTitle>{name}</AlertTitle>
          <AlertDescription>{shortDescription}</AlertDescription>
        </div>
      </Alert>
    </Link>
  );
};
export default AlertSearch;
