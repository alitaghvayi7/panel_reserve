/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "parliament.elmond.ir",
      },
    ],
  },
};

module.exports = nextConfig;
