import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
  },
};

export default nextConfig;
