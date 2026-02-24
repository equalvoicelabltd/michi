/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  // ============================================
  // Image Optimization
  // ============================================
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'michi-jp.vercel.app',
    ],
  },

  // ============================================
  // Compiler Options
  // ============================================
  swcMinify: true,
  reactStrictMode: true,

  // ============================================
  // Security and Performance
  // ============================================
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // ============================================
  // Redirects
  // ============================================
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },

  // ============================================
  // Headers (Security)
  // ============================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);