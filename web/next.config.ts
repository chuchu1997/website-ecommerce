/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // output: "standalone",

  // experimental:{
  //   serverActions:true
  // },

  // compress: true,
  // compiler: {
  //   reactRemoveProperties: process.env.NODE_ENV === "production",
  // },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mekship-develop.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],

    formats: ["image/avif", "image/webp"],
    // Optimize more aggressively in production
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  /* config options here */
};

export default nextConfig;
