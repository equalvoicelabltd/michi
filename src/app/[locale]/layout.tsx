'use client';

import './globals.css';
import { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <head>
        <title>JP Daigou - 日本代購平台</title>
        <meta name="description" content="尋找可信任的日本代購買手，最新日本商品情報" />
      </head>
      <body className="bg-white text-gray-900">
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
