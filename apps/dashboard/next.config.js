/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@convoza/ui', '@convoza/shared-types', '@convoza/configuration', '@convoza/validation'],
};

module.exports = nextConfig;
