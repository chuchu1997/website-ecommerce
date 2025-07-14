import { BrandAPI } from "@/api/brands/brands.api";
import { PartnerBrandsMotion } from "./PartnerBrandMotion";

import { Brand } from "@/types/brand";
import { BrandInterface } from "@/types/brands";


export const PartnerBrands = async  () => {


  const res = await BrandAPI.getAllBrandsFromStore();

  const brands = res.data.brands as BrandInterface[]

  return (
    <section className="">
      <div className="">
        <PartnerBrandsMotion brands={brands} />
      </div>
    </section>
  );
};
