import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elearningnew.cybersoft.edu.vn",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.freelogovectors.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
