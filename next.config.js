const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh',
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);