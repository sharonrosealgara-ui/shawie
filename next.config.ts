import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully client-side app (localStorage stores) — static export lets it host anywhere
  output: "export",
};

export default nextConfig;
