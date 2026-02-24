'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';

export default function HeroSection() {
  const t = useTranslations('HomePage'); // 請確保 messages/zh.json 有對應 key

  return (
    <section className="relative bg-michi-washi pt-24 pb-48 overflow-hidden">
      {/* 浮水印 */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-[30rem] md:text-[45rem] font-serif text-michi-ink opacity-[0.03] pointer-events-none select-none">
        道
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-4xl space-y-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-michi-vermilion">The Japanese Way</span>
              <div className="h-[1px] w-24 bg-stone-300"></div>
            </div>
            <h1 className="text-7xl md:text-[9rem] font-serif font-black text-michi-ink leading-none tracking-tighter">
              尋覓日本
              <span className="block text-6xl md:text-[8rem] italic text-michi-gold font-playfair mt-4">Authenticity</span>
            </h1>
          </div>

          <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            Michi JP 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人。
          </p>

          <div className="flex flex-wrap gap-6 pt-6">
            <button className="btn-michi-primary">瀏覽專家名錄</button>
            <button className="btn-michi-outline">探索最新商品</button>
          </div>
        </div>
      </div>

      {/* 修正後的跑馬燈 */}
      <div className="bg-[#FFD700] py-4 border-y border-black/5 overflow-hidden z-20 absolute bottom-12 left-[-5%] w-[110%] rotate-[-1.5deg]">
        <div className="flex whitespace-nowrap animate-marquee text-black font-black text-[10px] tracking-[0.4em] uppercase">
          <span className="mx-8">Michi JP: Connecting Personal Buyers to Professional Shoppers • </span>
          <span className="mx-8">Michi JP: Connecting Personal Buyers to Professional Shoppers • </span>
          <span className="mx-8">Michi JP: Connecting Personal Buyers to Professional Shoppers • </span>
        </div>
      </div>
    </section>
  );
}