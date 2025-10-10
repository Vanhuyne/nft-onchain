import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Bỏ qua lỗi ESLint khi build production
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        path: false,
        crypto: false,
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        os: require.resolve("os-browserify/browser"),
      };
    }
    return config;
  },
};

export default nextConfig;
