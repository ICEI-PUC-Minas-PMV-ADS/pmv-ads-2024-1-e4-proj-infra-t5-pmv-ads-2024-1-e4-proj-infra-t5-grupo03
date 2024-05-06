/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.rawg.io',
        port: '',
      },
    ],
  },
}

export default nextConfig
