import Image from "next/image";
import Link from "next/link";

const PreviewArtileComponent = () => {
  const articlePreview = {
    imageUrl: "/images/honda/1.png",
    name: "Sample Phone",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quisquam nesciunt sed cum, vitae aliquid possimus a placeat tempore quia assumenda repellat minus? Assumenda nam sit perspiciatis iusto est at."
  };


  return (
    <Link target="_blank" href="" className="w-full flex-shrink-0 cursor-pointer">
      <div className="border rounded-lg p-3 md:p-4 h-full">
        <div className="relative h-40 md:h-44 lg:h-48 mb-3 md:mb-4">
          <Image
            src={articlePreview.imageUrl}
            alt={articlePreview.name}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2 text-center">
            {articlePreview.name}
          </h3>
          <div className="text-xs md:text-sm text-gray-500 text-center line-clamp-2">

            {articlePreview.description}
          </div>
       
        </div>
      </div>
    </Link>
  );
};

export default PreviewArtileComponent;

