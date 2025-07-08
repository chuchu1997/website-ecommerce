import { SubCategory } from "@/types/ProjectInterface";
import Link from "next/link";
import Image from "next/image";
import SkeletonImage from "@/components/skeleton/custom-skeleton";


export type SubType = {
  subcategory: SubCategory | undefined;
  alt: string;
  href: string;
};

interface RenderSubProps {
  subcategories: SubType[];
}

const RenderSubCateForRoot = (props: RenderSubProps) => {
  const { subcategories } = props;

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 my-4">
          {subcategories.map(
            ({ subcategory, alt, href }, index) =>
              subcategory && (
                <div key={index} className="relative w-full">
                  <Link
                    href={href}
                    className="relative block h-[400px] md:h-[580px] w-full overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-101 hover:shadow-lg hover:shadow-gray-600/40">
                 
                    <SkeletonImage imageSrc={subcategory?.billboard?.imageUrl ?? ""} imageLabel={alt} priority  />



                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
                      <h2 className="text-white text-2xl md:text-4xl font-bold italic leading-snug tracking-wide drop-shadow-md">
                        {subcategory?.billboard?.label || "Nội dung quảng cáo"}
                      </h2>

                      <div className="mt-4 px-6 py-2 rounded-full bg-white/90 text-black text-sm md:text-base font-medium transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105">
                        Xem thêm
                      </div>
                    </div>
                  </Link>
                </div>
              )
          )}
        </div> 
  );
};

export default RenderSubCateForRoot;
