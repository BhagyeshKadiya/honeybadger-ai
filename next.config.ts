import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.honeybadgerai.in' }],
        destination: 'https://honeybadgerai.in/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
