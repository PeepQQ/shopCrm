import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const apiUrl = process.env.API_URL?.replace(/\/$/, "");
    console.log("API_URL for rewrites:", apiUrl);
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
