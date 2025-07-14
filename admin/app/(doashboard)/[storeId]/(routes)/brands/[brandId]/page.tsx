/** @format */

"use client";

import { useEffect, useState } from "react";
import { BrandForm } from "./components/brand-form";
import { useParams } from "next/navigation";
import BannerAPI from "@/app/api/banners/banner.api";
import { BrandInterface } from "@/types/brand";
import BrandAPI from "@/app/api/brands/brands.api";

const BrandPage = () => {
  const { brandId } = useParams();
  const [initialData, setInitialData] = useState<BrandInterface | null>(null);
  useEffect(() => {
    fetchBrandById();
  }, []);
  const fetchBrandById = async () => {
    if (brandId !== "new") {
      let response = await BrandAPI.getBrandById(Number(brandId));
      if (response.status === 200) {
        const { brand } = response.data as { brand: BrandInterface };

        setInitialData(brand);
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandForm initialData={initialData}></BrandForm>
      </div>
    </div>
  );
};

export default BrandPage;
