import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * Supported locales for Michi JP
 */
const locales = ['zh', 'zh-CN', 'en', 'ja', 'th'];

/**
 * Locale metadata configuration
 */
const localeMetadata: Record<string, { name: string; region: string; currency: string }> = {
  'zh': { name: 'Traditional Chinese', region: 'Hong Kong / Taiwan', currency: 'HKD / TWD' },
  'zh-CN': { name: 'Simplified Chinese', region: 'Malaysia', currency: 'MYR' },
  'en': { name: 'English', region: 'Global', currency: 'USD' },
  'ja': { name: '日本語', region: 'Japan', currency: 'JPY' },
  'th': { name: 'ไทย', region: 'Thailand', currency: 'THB' },
};

/**
 * Generate static locale parameters for static generation
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for each locale
 */
export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const metadata = localeMetadata[locale as keyof typeof localeMetadata];

  return {
    title: {
      default: 'Michi JP | 日本代購平台',
      template: '%s | Michi JP',
    },
    description: 'Michi JP - 連接全球買家與日本代購專家',
    generator: 'Next.js 14',
    applicationName: 'Michi JP',
    referrer: 'origin-when-cross-origin',
    authors: [
      {
        name: 'Michi Project',
        url: 'https://michi-jp.vercel.app',
      },
    ],
    creator: 'Michi Team',
    metadataBase: new URL('https://michi-jp.vercel.app'),
    openGraph: {
      title: 'Michi JP - Your Path to Japan\'s Best',
      description: `${metadata?.name || 'Japanese Proxy Shopping Platform'} - 代購職人市場 + AI 商品情報`,
      url: `https://michi-jp.vercel.app/${locale}`,
      siteName: 'Michi JP',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Michi JP',
      description: 'Japanese Proxy Shopping Platform',
      creator: '@michi_jp',
      images: ['/og-image.png'],
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: true,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

/**
 * RootLayout Component
 *
 * This is the root layout for all locale pages.
 *
 * Structure:
 * - [locale]/page.tsx (dynamic routes)
 *   - /zh/page.tsx (Traditional Chinese)
 *   - /zh-CN/page.tsx (Simplified Chinese)
 *   - /en/page.tsx (English)
 *   - /ja/page.tsx (Japanese)
 *   - /th/page.tsx (Thai)
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  /**
   * Validate locale parameter
   * If locale is not supported, return 404
   */
  if (!locales.includes(locale as string)) {
    notFound();
  }

  /**
   * Get translated messages for the locale
   * next-intl handles message loading automatically
   */
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      {/* Head section */}
      <head>
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/noto-sans-jp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/noto-serif-jp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Google Fonts - Playfair Display for serif headlines */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics (optional) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Canonical tag for SEO */}
        <link rel="canonical" href={`https://michi-jp.vercel.app/${locale}`} />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1A237E" />

        {/* Mobile app configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Michi JP" />

        {/* Format detection */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="email=no" />
      </head>

      {/* Body section */}
      <body className="bg-[#F9F7F2] text-[#1C1C1C] font-sans">
        {/* NextIntl Provider - provides translation context */}
        <NextIntlClientProvider locale={locale} messages={messages as any}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="absolute top-0 left-0 -translate-y-12 focus:translate-y-0 bg-[#1A237E] text-white px-4 py-2 text-sm font-bold rounded-b-md transition-transform"
          >
            Skip to main content
          </a>

          {/* Main content */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          {/* Optional: Global scripts or modals */}
          {/* Example: Toast notifications provider, Modal provider, etc. */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * CSS Global Styles
 *
 * Add the following to src/app/globals.css:
 *
 * @tailwind base;
 * @tailwind components;
 * @tailwind utilities;
 *
 * @font-face {
 *   font-family: 'Noto Sans JP';
 *   src: url('/fonts/noto-sans-jp.woff2') format('woff2');
 *   font-weight: 400;
 *   font-style: normal;
 *   font-display: swap;
 * }
 *
 * @font-face {
 *   font-family: 'Noto Serif JP';
 *   src: url('/fonts/noto-serif-jp.woff2') format('woff2');
 *   font-weight: 400;
 *   font-style: normal;
 *   font-display: swap;
 * }
 *
 * html {
 *   scroll-behavior: smooth;
 * }
 *
 * body {
 *   -webkit-font-smoothing: antialiased;
 *   -moz-osx-font-smoothing: grayscale;
 * }
 */

/**
 * Tailwind Configuration
 *
 * The tailwind.config.ts should include:
 *
 * export default {
 *   content: [
 *     './src/pages/**\/*.{js,ts,jsx,tsx,mdx}',
 *     './src/components/**\/*.{js,ts,jsx,tsx,mdx}',
 *     './src/app/**\/*.{js,ts,jsx,tsx,mdx}',
 *   ],
 *   theme: {
 *     extend: {
 *       colors: {
 *         'kachi-iro': '#1A237E',
 *         'shun-red': '#B22222',
 *         'gold-accent': '#C5A059',
 *         'washi-white': '#F9F7F2',
 *         'sumi-black': '#1C1C1C',
 *       },
 *       fontFamily: {
 *         sans: ['Noto Sans JP', 'sans-serif'],
 *         serif: ['Noto Serif JP', 'serif'],
 *         playfair: ['Playfair Display', 'serif'],
 *       },
 *     },
 *   },
 *   plugins: [],
 * }
 */

/**
 * i18n Configuration
 *
 * The i18n.ts file should handle locale detection:
 *
 * import { getRequestConfig } from 'next-intl/server';
 *
 * export default getRequestConfig(async ({ locale }) => ({
 *   messages: (await import(`@/messages/${locale}.json`)).default
 * }));
 */

/**
 * Middleware Configuration
 *
 * The middleware.ts should handle locale routing:
 *
 * import createMiddleware from 'next-intl/middleware';
 *
 * export default createMiddleware({
 *   locales: ['zh', 'zh-CN', 'en', 'ja', 'th'],
 *   defaultLocale: 'en',
 *   localePrefix: 'always',
 * });
 *
 * export const config = {
 *   matcher: ['/((?!_next|.*\\\\..*).*)']
 * };
 */

/**
 * Environment Variables
 *
 * Required in .env.local for this layout to work:
 *
 * NEXT_PUBLIC_GA_ID=G_XXXXXX (optional, for Google Analytics)
 */

/**
 * Performance Tips
 *
 * 1. Font Loading:
 *    - Using preload for font files
 *    - font-display: swap for better performance
 *
 * 2. Image Optimization:
 *    - Use Next.js Image component (in child components)
 *    - Automatic format conversion
 *
 * 3. Code Splitting:
 *    - Each locale has its own route segment
 *    - Messages are lazy-loaded per locale
 *
 * 4. Caching:
 *    - Static pages are cached by Vercel
 *    - ISR for dynamic content
 */

/**
 * SEO Optimization
 *
 * 1. Canonical URLs:
 *    - Each locale has its own canonical tag
 *
 * 2. hreflang Tags:
 *    - Configured in next.config.ts
 *
 * 3. Sitemap:
 *    - Generated automatically from routes
 *
 * 4. robots.txt:
 *    - Allow search engines to index
 */

/**
 * Accessibility Features
 *
 * 1. Skip Link:
 *    - Jump to main content
 *
 * 2. Language Support:
 *    - HTML lang attribute set correctly
 *    - RTL support ready (for future expansion)
 *
 * 3. Font Smoothing:
 *    - Antialiasing for better text rendering
 */

/**
 * Security Features
 *
 * 1. Content Security Policy:
 *    - Can be added via headers in next.config.js
 *
 * 2. CORS Configuration:
 *    - Properly configured for API calls
 *
 * 3. Environment Variables:
 *    - All sensitive keys are kept secret
 */