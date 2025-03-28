/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  reactStrictMode: false,
  experimental: {
    esmExternals: true,
    optimizeFonts: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
