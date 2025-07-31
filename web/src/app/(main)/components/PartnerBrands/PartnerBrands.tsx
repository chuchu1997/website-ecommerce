import { BrandAPI } from "@/api/brands/brands.api";
import { PartnerBrandsMotion } from "./PartnerBrandMotion";

import { Brand } from "@/types/brand";
import { BrandInterface } from "@/types/brands";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props  {
  industry:string;
}
export const PartnerBrands = async  ({industry}:Props) => {

  const res = await fetchSafe(()=>BrandAPI.getAllBrandsFromStore(),{
   data:{
     brands:[]
   }
  })

  const brands =res.data.brands

  return (
    <section className="">
      <div className="">
        <PartnerBrandsMotion brands={brands} industry = {industry} />
      </div>
    </section>
  );
};
