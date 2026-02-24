'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const tMarquee = useTranslations('home.marquee');
  const locale = useLocale();

  return (
    <section className="relative bg-michi-washi pt-24 pb-48 overflow-hidden">
      {/* 背景裝飾大字 (道) */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-[25rem] md:text-[40rem] font-serif text-michi-ink opacity-[0.03] pointer-events-none select-none leading-none">
        道
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-michi-vermilion">
                {t('tagline')}
              </span>
              <div className="h-[1px] w-24 bg-stone-300"></div>
            </div>
            <div className="space-y-0">
              <h1 className="text-7xl md:text-[9rem] font-serif font-black text-michi-ink leading-none tracking-tighter">
                {t('title')}
              </h1>
              <h2 className="text-7xl md:text-[10rem] italic text-michi-gold leading-[0.8] mt-[-5px] font-playfair">
                {t('subtitle')}
              </h2>
            </div>
          </div>

          <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            {t('description')}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6">
            <Link href={`/${locale}/buyers`} className="bg-michi-ink text-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-michi-vermilion transition-all shadow-xl">
              {t('cta_primary')}
            </Link>
            <Link href={`/${locale}/products`} className="border border-michi-ink text-michi-ink px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-michi-ink hover:text-white transition-all">
              {t('cta_secondary')}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col items-end">
          <div style={{ writingMode: 'vertical-rl' }} className="text-[10px] font-black text-stone-300 uppercase tracking-[0.6em] h-64 border-r border-stone-200 pr-4">
            Authenticity • Verified • Direct • Michi JP
          </div>
        </div>
      </div>

      {/* 動態黃色跑馬燈 */}
      <div className="bg-[#FFD700] py-5 border-y-2 border-black/10 overflow-hidden shadow-lg z-20 absolute bottom-12 left-[-5%] w-[110%] rotate-[-1.5deg] origin-center">
        <div className="flex whitespace-nowrap animate-marquee text-black font-black text-[11px] tracking-[0.4em] uppercase">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="mx-8">{tMarquee('text')}</span>
          ))}
        </div>
      </div>
    </section>
  );
}