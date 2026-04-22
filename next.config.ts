import { networkInterfaces, type NetworkInterfaceInfo } from "node:os";
import type { NextConfig } from "next";

const localIpv4Hosts = Object.values(networkInterfaces())
  .flatMap((entries) => entries ?? [])
  .filter((address): address is NetworkInterfaceInfo => Boolean(address) && !address.internal)
  .filter((address) => address.family === "IPv4")
  .map((address) => address.address);

const allowedDevOrigins = Array.from(
  new Set([
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    ...localIpv4Hosts,
    "*.trycloudflare.com",
  ]),
);

const nextConfig: NextConfig = {
  allowedDevOrigins,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Placeholder for images without src
    unoptimized: false,
  },

  // Trailing slashes for SEO
  trailingSlash: true,

  // Experimental features
  experimental: {
    // Enable if needed for large datasets
    // dynamicIO: true,
  },

  // Redirects
  async redirects() {
    return [
      // Redirect old URLs if migrating from existing site
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
