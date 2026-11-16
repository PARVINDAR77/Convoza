/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@convoza/ui', '@convoza/shared-types', '@convoza/configuration'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

