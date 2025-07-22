import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MYAFIM_API_URL: process.env.MYAFIM_API_URL
  },
};

export default nextConfig;
