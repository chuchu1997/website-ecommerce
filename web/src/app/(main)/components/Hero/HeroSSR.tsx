/** @format */
import { BannerAPI } from "@/api/banner/banner.api";
import { BannerInterface } from "@/types/banner";
import { HeroClient } from "./Hero";
import { fetchSafe } from "@/utils/fetchSafe";

const getCachedBanners = async (): Promise<BannerInterface[]> => {
  const res = await fetchSafe(() => BannerAPI.getAllBannerFromStore(), {
    banners: [],
  });

  const banners = res.banners ?? [];
  return banners;
};
export const HeroSSR = async () => {
  // Gọi API từ server
  const banners = await getCachedBanners();

  return <HeroClient bannersProps={banners} />;
};
