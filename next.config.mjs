/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
  output: 'standalone',
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.node'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  },
}

export default nextConfig
