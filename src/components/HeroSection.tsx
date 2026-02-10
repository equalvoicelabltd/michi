'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          JP Daigou
        </h1>
        <p className="text-xl md:text-2xl mb-4">
          {t('buyers.title')}
        </p>
        <p className="text-lg md:text-xl mb-12 opacity-90">
          {t('buyers.description')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={`/${locale}/buyers`}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            {t('nav.buyers')}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
          >
            {t('nav.products')}
          </Link>
        </div>
      </div>
    </section>
  );
}
