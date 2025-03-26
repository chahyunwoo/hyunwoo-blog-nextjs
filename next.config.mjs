/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  reactStrictMode: false,
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
};

export default nextConfig;
