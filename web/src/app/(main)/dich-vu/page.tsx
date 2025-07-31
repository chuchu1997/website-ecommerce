/** @format */

import { ServiceAPI } from "@/api/services/services.api";
import { ServiceInterface } from "@/types/service";
import { fetchSafe } from "@/utils/fetchSafe";
import ServiceClient from "./dich-vu-client";

const ServiceSSR = async () => {
  let services: ServiceInterface[] = [];

  const res = await fetchSafe(
    () =>
      ServiceAPI.getServices({
        currentPage: 1,
        limit: 999,
      }),
    {
      data: {
        services: [],
      },
    }
  );

  services = res.data.services;
  return <ServiceClient servicesProps={services} />;
};
export default ServiceSSR;
