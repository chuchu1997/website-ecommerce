import { BrandAPI } from "@/api/brands/brands.api";
import { PartnerBrandsMotion } from "./PartnerBrandMotion";

import { Brand } from "@/types/brand";
import { BrandInterface } from "@/types/brands";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props  {
  industry:string;
}

const getCachedPartnerBrands = async (): Promise<BrandInterface[]> => {
  const res = await fetchSafe(
    () =>
      BrandAPI.getAllBrandsFromStore(),
    {
     brands: [],
    }
  );
  const brands  = res?.brands ?? [];
  return brands;
};
export const PartnerBrands = async  ({industry}:Props) => {

 const brands = await getCachedPartnerBrands();
 

  return (
    <section className="">
      <div className="">
        <PartnerBrandsMotion brands={brands} industry = {industry} />
      </div>
    </section>
  );
};
