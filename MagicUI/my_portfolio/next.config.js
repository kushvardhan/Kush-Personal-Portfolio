/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  // Ensure images from external domains can be optimized
  images: {
    domains: ["vercel.com"],
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Explicitly set the target
  experimental: {
    appDir: true,
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
