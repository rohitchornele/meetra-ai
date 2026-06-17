import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "rephrase-tiling-veal.ngrok-free.dev",
  ],
};

export default nextConfig;
