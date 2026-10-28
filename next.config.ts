import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from your LAN IP (e.g. on your phone) without HMR being blocked.
  allowedDevOrigins: ["192.168.63.1"],
};

export default nextConfig;
