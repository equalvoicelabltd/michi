'use client';

/**
 * src/app/[locale]/about/page.tsx
 * Navbar & Footer injected by layout.tsx — do NOT add them here.
 */

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// PHOTOS (src paths are language-agnostic)
// ─────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: '/about/office.jpg',       tagKey: 'ap.tag_office' },
  { src: '/about/wooden-goods.jpg', tagKey: 'ap.tag_goods' },
  { src: '/about/bao-bao.jpg',      tagKey: 'ap.tag_luxury' },
  { src: '/about/miffy.jpg',        tagKey: 'ap.tag_limited' },
  { src: '/about/kuromi.jpg',       tagKey: 'ap.tag_anime' },
  { src: '/about/plushies.jpg',     tagKey: 'ap.tag_regional' },
  { src: '/about/shipping-box.jpg', tagKey: 'ap.tag_wholesale' },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const TIMELINE = [
    { year: '2011', titleKey: 'ap.tl1_title', descKey: 'ap.tl1_desc', icon: '📱' },
    { year: '2012', titleKey: 'ap.tl2_title', descKey: 'ap.tl2_desc', icon: '🏢' },
    { year: '2014', titleKey: 'ap.tl3_title', descKey: 'ap.tl3_desc', icon: '📦' },
    { year: '2018', titleKey: 'ap.tl4_title', descKey: 'ap.tl4_desc', icon: '🗾' },
    { year: '2026', titleKey: 'ap.tl5_title', descKey: 'ap.tl5_desc', icon: '道' },
  ];

  const STATS = [
    { n: '13+',    labelKey: 'ap.stat_years' },
    { n: '5,000+', labelKey: 'ap.stat_clients' },
    { n: '4',      labelKey: 'ap.stat_cities' },
    { n: '100%',   labelKey: 'ap.stat_office' },
  ];

  const WHY_ITEMS = [
    { n: '01', titleKey: 'ap.why1_title', descKey: 'ap.why1_desc' },
    { n: '02', titleKey: 'ap.why2_title', descKey: 'ap.why2_desc' },
    { n: '03', titleKey: 'ap.why3_title', descKey: 'ap.why3_desc' },
  ];

  return (
    <>
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl">×</button>
        </div>
      )}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/10">
              {STATS.map(({ n, labelKey }) => (
                <div key={labelKey} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-black text-white">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{t(labelKey)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">About Michi</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                {t('ap.heroTitle1')}<br /><span className="text-[#C5A059]">{t('ap.heroTitle2')}</span>
              </h1>
              <p className="text-[12px] text-white/50 max-w-xl leading-relaxed mt-6">{t('ap.heroDesc')}</p>
            </div>
          </div>
        </section>

        {/* ══ FOUNDER STORY ═════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Founder&apos;s Story</p>
                <h2 className="text-4xl font-serif font-black text-[#1C1C1C] leading-tight">{t('ap.founderTitle')}</h2>
              </div>
              <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
                <p>{t('ap.founder_p1')}</p>
                <p>{t('ap.founder_p2')}</p>
                <p>{t('ap.founder_p3')}</p>
                <p>{t('ap.founder_p4')}</p>
              </div>
              <div className="border-l-2 border-[#C5A059] pl-6 py-2 space-y-1">
                <p className="font-serif text-2xl italic text-[#1C1C1C]">{t('ap.founderSign')}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">{t('ap.founderRole')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden border border-stone-200 cursor-zoom-in group" onClick={() => setLightbox('/about/office.jpg')}>
                <img src="/about/office.jpg" alt="Global EZshop" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/50 to-transparent" />
                <div className="absolute bottom-5 left-5 space-y-1">
                  <span className="bg-[#C5A059] text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-2 py-1">{t('ap.tag_office')}</span>
                  <p className="text-white text-sm font-black">{t('ap.officeCaption')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ src: '/about/shipping-box.jpg', tagKey: 'ap.tag_wholesale' }, { src: '/about/wooden-goods.jpg', tagKey: 'ap.tag_goods' }].map(({ src, tagKey }) => (
                  <div key={src} className="relative overflow-hidden border border-stone-200 cursor-zoom-in group" onClick={() => setLightbox(src)}>
                    <img src={src} alt="" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/20 transition-all" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white/90 text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5">{t(tagKey)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Our Journey</p>
              <h2 className="text-4xl font-serif font-black">{t('ap.timelineTitle')}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start group">
                    <div className="flex-shrink-0 w-18 text-right hidden lg:block">
                      <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">{item.year}</span>
                    </div>
                    <div className="flex-shrink-0 w-9 h-9 bg-[#1C1C1C] border border-white/20 flex items-center justify-center text-sm group-hover:border-[#C5A059] transition-colors hidden lg:flex">
                      {item.icon.length > 2 ? <span className="font-serif font-black text-[#C5A059] text-xs">{item.icon}</span> : <span>{item.icon}</span>}
                    </div>
                    <div className={`pb-10 ${i < TIMELINE.length - 1 ? 'border-b border-white/5' : ''} flex-grow`}>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest lg:hidden">{item.year}</span>
                        <h3 className="text-lg font-black text-white">{t(item.titleKey)}</h3>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed max-w-lg">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PHOTO GALLERY ═════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="space-y-8 mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">{t('ap.galleryLabel')}</p>
            <h2 className="text-4xl font-serif font-black text-[#1C1C1C]">{t('ap.galleryTitle')}</h2>
            <p className="text-stone-500 text-sm max-w-xl">{t('ap.galleryDesc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative overflow-hidden border border-stone-200 cursor-zoom-in group" onClick={() => setLightbox('/about/office.jpg')}>
              <img src="/about/office.jpg" alt="" className="w-full h-full object-cover min-h-[280px] group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                <span className="bg-[#C5A059] text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-2 py-0.5">{t('ap.tag_office')}</span>
                <p className="text-white text-xs font-bold">Global EZshop</p>
              </div>
            </div>
            {PHOTOS.slice(1).map(({ src, tagKey }) => (
              <div key={src} className="relative overflow-hidden border border-stone-200 cursor-zoom-in group aspect-square" onClick={() => setLightbox(src)}>
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/40 transition-all" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5">{t(tagKey)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY MICHI ═════════════════════════════════════ */}
        <section className="bg-stone-50 border-t border-stone-200 py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Why Michi</p>
                <h2 className="text-4xl font-serif font-black text-[#1C1C1C] leading-tight">{t('ap.whyTitle')}</h2>
                <div className="space-y-5">
                  {WHY_ITEMS.map(({ n, titleKey, descKey }) => (
                    <div key={n} className="flex gap-5">
                      <span className="text-3xl font-serif italic text-[#C5A059]/30 font-black">{n}</span>
                      <div>
                        <h3 className="font-black text-sm text-[#1C1C1C] mb-1">{t(titleKey)}</h3>
                        <p className="text-stone-500 text-sm leading-relaxed">{t(descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1C1C1C] p-10 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">{t('ap.platformNote')}</p>
                <p className="text-white/50 text-sm leading-relaxed">{t('ap.platformNoteDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-white leading-tight">
                {t('ap.ctaTitle')}<br /><span className="text-[#C5A059] italic font-serif font-normal">Find Your Path to Japan</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md">{t('ap.ctaDesc')}</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`/${locale}/buyers`} className="bg-[#C5A059] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all text-center">
                {t('ap.ctaBuyers')} →
              </a>
              <a href={`/${locale}/products`} className="border border-white/20 text-white/70 px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all text-center">
                {t('ap.ctaProducts')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}