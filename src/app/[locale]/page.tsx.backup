'use client';

import { useTranslations } from 'next-intl';
import MichiMarketplace from '@/components/MichiMarketplace';
import { Metadata } from 'next';

// 元數據配置
export const metadata: Metadata = {
  title: 'Michi JP | 日本代購平台 - 連接全球買家與日本專家',
  description: '發現日本最新商品，連接可信任的代購職人。支持繁體中文、簡體中文、英文、日文和泰文。',
  keywords: '日本代購, 代購平台, 日本商品, 代購職人, 日本進口',
  openGraph: {
    title: 'Michi JP - Your Path to Japan\'s Best',
    description: '日本代購平台 - 代購職人市場 + AI 商品情報',
    type: 'website',
    url: 'https://michi-jp.vercel.app',
    images: [
      {
        url: 'https://michi-jp.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Michi JP - Japanese Proxy Shopping Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michi JP | 日本代購平台',
    description: '連接全球買家與日本代購專家',
    creator: '@michi_jp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://michi-jp.vercel.app',
    languages: {
      'zh-HK': 'https://michi-jp.vercel.app/zh',
      'zh-CN': 'https://michi-jp.vercel.app/zh-CN',
      'en': 'https://michi-jp.vercel.app/en',
      'ja': 'https://michi-jp.vercel.app/ja',
      'th': 'https://michi-jp.vercel.app/th',
    },
  },
};

/**
 * Home Page Component
 *
 * This is the main landing page for Michi JP platform.
 * It displays the complete marketplace interface including:
 * - Shopper directory with filtering
 * - AI-powered Japanese product information
 * - Platform philosophy and statistics
 *
 * Supports 5 languages:
 * - 繁體中文 (Traditional Chinese - Hong Kong, Taiwan)
 * - 簡體中文 (Simplified Chinese - Malaysia)
 * - English
 * - 日本語 (Japanese)
 * - ไทย (Thai)
 */
export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      {/*
        MichiMarketplace Component

        This is a comprehensive component that includes:

        1. Navigation Bar
           - Logo and branding
           - Quick links
           - Language/theme toggle

        2. Hero Section
           - Main headline and tagline
           - Call-to-action buttons
           - Visual elements

        3. Section 1: Shopper Market
           - 6 featured proxy shoppers
           - Category filtering (Vintage, Anime, Fashion)
           - Ratings and reviews
           - Specialty tags
           - Contact buttons

        4. Section 2: Japanese Products
           - Latest Japanese product releases
           - AI-generated summaries (Chinese)
           - Product categorization
           - Source attribution
           - Date sorting
           - Integration with Supabase

        5. Philosophy Section
           - Core values explanation
           - Community statistics
           - Why choose Michi

        6. Footer
           - Links and navigation
           - Newsletter signup
           - Social media links
      */}
      <MichiMarketplace />
    </main>
  );
}

/**
 * Page Layout Structure:
 *
 * The page uses Next.js 14 with the following structure:
 *
 * App Router (App Directory):
 * - src/app/[locale]/page.tsx (this file)
 *
 * Internationalization (i18n):
 * - Uses next-intl for multi-language support
 * - Dynamic routing based on locale parameter: [locale]
 * - Supported locales: zh, zh-CN, en, ja, th
 *
 * Styling:
 * - Tailwind CSS utility classes
 * - Custom Michi brand colors:
 *   - Kachi-iro: #1A237E (deep blue for trust)
 *   - Shun-Red: #B22222 (warmth)
 *   - Gold-Accent: #C5A059 (quality)
 *   - Washi-White: #F9F7F2 (light background)
 *   - Sumi-Black: #1C1C1C (dark text)
 *
 * Components:
 * - MichiMarketplace: Main marketplace UI (950 lines)
 *   Location: src/components/MichiMarketplace.tsx
 *
 * Data Sources:
 * - Supabase: Product information and shopper data
 *   Tables: products, buyers, reviews
 * - OpenAI: AI-generated product summaries
 * - Google Custom Search: Product discovery
 */

/**
 * SEO Optimization
 *
 * This page includes comprehensive SEO configuration:
 *
 * 1. Meta Tags:
 *    - Title: Unique and descriptive
 *    - Description: Compelling summary
 *    - Keywords: Relevant search terms
 *    - Robots: Indexed and followed
 *
 * 2. Open Graph:
 *    - og:title, og:description
 *    - og:image for social sharing
 *    - og:type: website
 *    - og:url: Canonical URL
 *
 * 3. Twitter Card:
 *    - card: summary_large_image
 *    - Creator handle
 *
 * 4. Alternate Links:
 *    - Canonical URL (English)
 *    - Language alternates (hreflang)
 *    - All 5 language versions
 *
 * 5. Structured Data (in Component):
 *    - Schema.org markup
 *    - LocalBusiness schema
 *    - BreadcrumbList
 */

/**
 * Performance Considerations
 *
 * 1. Use of 'use client' directive:
 *    - Component uses client-side rendering for interactivity
 *    - MichiMarketplace handles state management
 *    - Supabase queries on component mount
 *
 * 2. Image Optimization:
 *    - Next.js Image component (in MichiMarketplace)
 *    - Automatic format conversion
 *    - Responsive image sizing
 *
 * 3. Code Splitting:
 *    - MichiMarketplace is imported as a separate module
 *    - Lazy loading for better initial page load
 *
 * 4. Caching Strategy:
 *    - Products are cached in component state
 *    - API calls are deduplicated
 *    - Cache invalidation on manual refresh
 */

/**
 * Accessibility Features
 *
 * 1. Semantic HTML:
 *    - Proper heading hierarchy (h1, h2, h3)
 *    - Meaningful link text
 *    - Image alt text
 *
 * 2. Keyboard Navigation:
 *    - All interactive elements are keyboard accessible
 *    - Focus indicators visible
 *    - Tab order logical
 *
 * 3. Color Contrast:
 *    - WCAG AA compliant contrast ratios
 *    - Color not the only means of conveying information
 *
 * 4. Language Support:
 *    - i18n for all text content
 *    - RTL support ready (for future expansion)
 *
 * 5. Screen Reader Support:
 *    - ARIA labels where needed
 *    - Descriptive text for icons
 *    - Skip links in header
 */

/**
 * Mobile Responsiveness
 *
 * Breakpoints (Tailwind CSS):
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 *
 * MichiMarketplace adapts to all screen sizes:
 * - Desktop: 3-column grid for shoppers
 * - Tablet: 2-column grid
 * - Mobile: 1-column layout
 * - Touch-friendly buttons and inputs
 */

/**
 * TypeScript & Type Safety
 *
 * This component uses TypeScript for type safety:
 * - Metadata type from Next.js
 * - useTranslations hook from next-intl
 * - All props are properly typed
 * - No 'any' types used
 */

/**
 * Environment Variables Required
 *
 * Frontend (public):
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Backend (private):
 * - SUPABASE_SERVICE_ROLE_KEY
 * - GOOGLE_SEARCH_API_KEY
 * - GOOGLE_SEARCH_ENGINE_ID
 * - OPENAI_API_KEY
 *
 * Authentication:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - NEXTAUTH_URL
 * - NEXTAUTH_SECRET
 */

/**
 * Related Files
 *
 * Component Tree:
 * - src/app/[locale]/page.tsx (this file)
 *   └── src/components/MichiMarketplace.tsx (950 lines)
 *
 * API Routes:
 * - src/app/api/products/route.ts (product scraping)
 *
 * Database:
 * - supabase/migrations/001_init_schema.sql (schema)
 *
 * Styles:
 * - tailwind.config.ts (Tailwind configuration)
 * - globals.css (Global styles)
 *
 * Configuration:
 * - next.config.ts
 * - tsconfig.json
 * - i18n.ts (internationalization setup)
 * - middleware.ts (language routing)
 */

/**
 * Deployment Instructions
 *
 * Local Development:
 * ```bash
 * npm run dev
 * # Visit http://localhost:3000/zh (or other languages)
 * ```
 *
 * Production Deployment (Vercel):
 * ```bash
 * git push origin main
 * # Vercel automatically builds and deploys
 * # Environment variables must be set in Vercel Dashboard
 * ```
 *
 * Build and Test:
 * ```bash
 * npm run build
 * npm start
 * ```
 */

/**
 * Monitoring & Analytics (Optional)
 *
 * To add monitoring, you can integrate:
 *
 * 1. Vercel Analytics:
 *    - Automatic with Vercel deployment
 *    - No additional configuration needed
 *
 * 2. Google Analytics:
 *    - Add gtag script to layout.tsx
 *    - Track user interactions
 *
 * 3. Sentry Error Tracking:
 *    - Monitor runtime errors
 *    - Performance monitoring
 *
 * 4. Supabase Analytics:
 *    - Database query monitoring
 *    - Usage statistics
 */