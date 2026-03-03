import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceTermsModal from '@/components/ServiceTermsModal';

import '@/styles/globals.css';

const locales = ['en', 'zh', 'zh-CN', 'ja', 'th'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Michi - Your Path to Japan\'s Best',
    description: 'Connect with verified Japanese proxy shoppers. Find authentic Japanese products.',
    keywords: 'proxy shopping, Japanese products, Japan, authentic',
    openGraph: {
      title: 'Michi - Japanese Proxy Shopping',
      description: 'Connect with Japan\'s best proxy shoppers.',
      type: 'website',
      url: `https://michi.com/${locale}`,
      siteName: 'Michi',
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL('https://michi.com'),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen bg-white">
          <ServiceTermsModal />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}