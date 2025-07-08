import { PartnerBrandsMotion } from "./PartnerBrandMotion";

import { Brand } from "@/types/brand";

const mockBrands: Brand[] = [
  {
    id: 1,
    name: "IKEA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Ikea_logo.svg",
  },
  {
    id: 2,
    name: "Ashley Furniture",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ashley_Furniture_logo.svg",
  },
  {
    id: 3,
    name: "Wayfair",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Wayfair_logo.svg",
  },
  {
    id: 4,
    name: "La-Z-Boy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/La-Z-Boy_Logo.svg",
  },
];
export const PartnerBrands = () => {
  return (
    <section className="">
      <div className="">
        <PartnerBrandsMotion brands={mockBrands} />
      </div>
    </section>
  );
};
