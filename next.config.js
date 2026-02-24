import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Create Next Intl Plugin
 * This configures the next-intl plugin for internationalization
 */
const withNextIntl = createNextIntlPlugin(
  // Path to i18n configuration file
  './src/i18n.ts'
);

/**
 * Next.js Configuration
 *
 * Documentation: https://nextjs.org/docs/app/api-reference/next-config-js
 */
const nextConfig: NextConfig = {
  // ============================================
  // Internationalization (i18n)
  // ============================================

  /**
   * i18n Configuration
   * Handled by withNextIntl wrapper
   */

  // ============================================
  // Image Optimization
  // ============================================

  images: {
    /**
     * Allowed image domains for optimization
     * Add any external image sources here
     */
    domains: [
      'localhost',
      '127.0.0.1',
      'michi-jp.vercel.app',
      'res.cloudinary.com', // Optional: for CDN image hosting
      'images.unsplash.com', // Optional: for testing with unsplash
      'lh3.googleusercontent.com', // For Google images
    ],

    /**
     * Image sizes for responsive optimization
     * Defines viewport widths that Next.js should generate images for
     */
    sizes: [
      {
        breakpoint: 640,
        sizes: '100vw',
      },
      {
        breakpoint: 768,
        sizes: '(max-width: 640px) 100vw, 50vw',
      },
      {
        breakpoint: 1024,
        sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 33vw',
      },
      {
        breakpoint: 1280,
        sizes: '(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw',
      },
    ],

    /**
     * Device pixel ratios to optimize for
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    /**
     * Image format support
     * WebP is preferred for better compression
     */
    formats: ['image/avif', 'image/webp'],
  },

  // ============================================
  // Performance
  // ============================================

  /**
   * Minify output in production
   */
  swcMinify: true,

  /**
   * Enable React Strict Mode for development
   * Helps identify potential issues
   */
  reactStrictMode: true,

  // ============================================
  // Bundling
  // ============================================

  /**
   * Optimize package imports
   * Reduces bundle size by tree-shaking unused exports
   */
  optimizePackageImports: [
    '@mui/material',
    '@mui/icons-material',
    'lucide-react',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
  ],

  // ============================================
  // Experimental Features
  // ============================================

  experimental: {
    /**
     * Partial Pre-rendering (PPR)
     * Allows rendering static and dynamic content on same page
     */
    ppr: 'incremental',

    /**
     * Instrumentation hooks for monitoring
     */
    instrumentationHook: false,

    /**
     * Optimized Font Fallbacks
     */
    optimizeFonts: true,
  },

  // ============================================
  // Compiler Options
  // ============================================

  /**
   * Remove console.log in production
   * Keep for debugging during development
   */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? {
          exclude: ['error', 'warn'],
        }
      : false,

    /**
     * Remove React imports if JSX syntax is used
     */
    reactRemoveProperties: false,
  },

  // ============================================
  // Redirects
  // ============================================

  /**
   * Automatic redirects
   * Users accessing root '/' are redirected to their language
   */
  async redirects() {
    return [
      /**
       * Redirect root to default language
       */
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },

      /**
       * Old site redirects (if migrating from old platform)
       * Example: JP Daigou → Michi
       */
      {
        source: '/jp-daigou/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
    ];
  },

  // ============================================
  // Rewrites
  // ============================================

  /**
   * URL rewrites (URL doesn't change, but content does)
   */
  async rewrites() {
    return {
      beforeFiles: [
        /**
         * API rewrites for cleaner URLs
         */
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    };
  },

  // ============================================
  // Headers
  // ============================================

  /**
   * Custom HTTP headers for security and caching
   */
  async headers() {
    return [
      /**
       * Security headers
       */
      {
        source: '/:path*',
        headers: [
          /**
           * Content Security Policy
           * Prevent XSS attacks
           */
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              img-src 'self' data: https:;
              font-src 'self' fonts.gstatic.com;
              connect-src 'self' *.supabase.co *.openai.com *.googleapis.com;
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' '),
          },

          /**
           * Prevent clickjacking
           */
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          /**
           * Prevent MIME type sniffing
           */
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          /**
           * Enable XSS protection
           */
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },

          /**
           * Referrer Policy
           */
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          /**
           * Permissions Policy (formerly Feature Policy)
           */
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },

          /**
           * Cache headers for static assets
           */
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      /**
       * Cache control for different file types
       */
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },

      /**
       * CORS headers for API requests
       */
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  // ============================================
  // Environment Variables
  // ============================================

  /**
   * Variables to expose to the browser (must have NEXT_PUBLIC_ prefix)
   */
  env: {
    // This is handled automatically by Next.js
    // Just ensure .env.local has NEXT_PUBLIC_ prefixed variables
  },

  // ============================================
  // Development Settings
  // ============================================

  /**
   * Error handling
   */
  onError: (err: any) => {
    console.error('Next.js Error:', err);
  },

  /**
   * Performance monitoring
   */
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller builds

  // ============================================
  // TypeScript
  // ============================================

  typescript: {
    /**
     * Fail build on TypeScript errors
     */
    tsconfigPath: './tsconfig.json',
  },

  // ============================================
  // ESLint
  // ============================================

  eslint: {
    /**
     * Run ESLint during build
     */
    dirs: ['src', 'pages', 'components', 'lib', 'utils'],
  },

  // ============================================
  // Build Settings
  // ============================================

  /**
   * Output directory
   */
  distDir: '.next',

  /**
   * Generate build ID for cache busting
   */
  generateBuildId: async () => {
    return new Date().toISOString().split('T')[0];
  },

  // ============================================
  // Logging
  // ============================================

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ============================================
  // Compression
  // ============================================

  compress: true,

  // ============================================
  // PoweredBy Header
  // ============================================

  /**
   * Remove X-Powered-By header
   * (already removed by default in Next.js 13+)
   */
  poweredByHeader: false,

  // ============================================
  // Production Source Maps
  // ============================================

  /**
   * Don't generate source maps in production
   * Reduces bundle size
   */
  productionBrowserSourceMaps: false,

  // ============================================
  // Webpack Configuration (if needed)
  // ============================================

  webpack: (config, { isServer }) => {
    /**
     * Custom webpack configuration
     * Add any webpack plugins or rules here if needed
     */

    return config;
  },
};

/**
 * Export configuration wrapped with next-intl plugin
 */
export default withNextIntl(nextConfig);

/**
 * Documentation and References:
 *
 * Next.js Configuration:
 * https://nextjs.org/docs/app/api-reference/next-config-js
 *
 * Image Optimization:
 * https://nextjs.org/docs/app/api-reference/components/image
 *
 * Internationalization (next-intl):
 * https://next-intl-docs.vercel.app/
 *
 * Security Headers:
 * https://securityheaders.com/
 *
 * CSP (Content Security Policy):
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */