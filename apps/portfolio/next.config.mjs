/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hyunwoo/shared', '@hyunwoo/ui', '@hyunwoo/mdx'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.chahyunwoo.dev',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
