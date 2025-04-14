/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.aceternity.com"], // Add the hostname here
  },
  // Port is configured in server.js and package.json
};

export default nextConfig;
