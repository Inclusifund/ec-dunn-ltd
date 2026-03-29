import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ec-dunn-ltd",
  assetPrefix: "/ec-dunn-ltd/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
