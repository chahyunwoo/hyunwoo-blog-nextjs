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
  reactCompiler: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
        },
      ],
    },
  ],
}

export default nextConfig
