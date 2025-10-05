import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Bỏ qua lỗi ESLint khi build production
  },
};

export default nextConfig;
