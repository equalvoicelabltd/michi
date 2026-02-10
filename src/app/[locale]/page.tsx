'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import BuyersSection from '@/components/sections/BuyersSection';
import ProductsSection from '@/components/sections/ProductsSection';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Buyers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('buyers.title')}</h2>
            <p className="text-xl text-gray-600">{t('buyers.description')}</p>
          </div>
          <BuyersSection />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('products.title')}</h2>
            <p className="text-xl text-gray-600">{t('products.subtitle')}</p>
          </div>
          <ProductsSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('nav.becomeBuyer')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of trusted buyers from Japan
          </p>
          <Link href="/buyer-signup" className="btn-secondary px-8 py-3 text-lg">
            {t('nav.becomeBuyer')}
          </Link>
        </div>
      </section>
    </>
  );
}
