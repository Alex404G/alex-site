import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → apex en 308 : une seule origine canonique dès le jour 1.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.alexandregil.com" }],
        destination: "https://alexandregil.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
