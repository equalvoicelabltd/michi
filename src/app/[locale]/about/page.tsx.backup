'use client';

/**
 * src/app/[locale]/about/page.tsx
 * Navbar & Footer are injected by src/app/[locale]/layout.tsx — do NOT add them here.
 */

import { useLocale } from 'next-intl';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const PHOTOS = [
  {
    src: '/about/office.jpg',
    alt: 'Global EZshop 辦公室 — Michi 創辦人工作空間',
    caption: '創辦人辦公室 · 香港',
    tag: '實體辦公室',
  },
  { src: '/about/wooden-goods.jpg', alt: '日本木製餐具代購',              caption: '日本木製選物',      tag: '親赴日本選貨' },
  { src: '/about/bao-bao.jpg',      alt: 'Issey Miyake Bao Bao bags',     caption: 'Bao Bao Issey Miyake', tag: '精品代購' },
  { src: '/about/miffy.jpg',        alt: 'Miffy 忍者限定款',              caption: '限定系列代購',      tag: '限定商品' },
  { src: '/about/kuromi.jpg',       alt: 'Kuromi × Dolly Mix 動漫限定',   caption: 'Sanrio 限定周邊',   tag: '動漫周邊' },
  { src: '/about/plushies.jpg',     alt: '京都限定玩偶',                  caption: '京都店限定玩偶',    tag: '地區限定' },
  { src: '/about/shipping-box.jpg', alt: '批發出貨箱',                    caption: '批發整箱出貨',      tag: '企業批發服務' },
];

const TIMELINE = [
  {
    year: '2011',
    title: 'Facebook 起步',
    desc: '以個人身份在 Facebook 開始日本代購，靠口碑建立第一批忠實客戶。',
    icon: '📱',
  },
  {
    year: '2012',
    title: '正式成立公司',
    desc: '成立 Global EZshop，由個人代購升級為正式公司，開始服務中小型零售商。',
    icon: '🏢',
  },
  {
    year: '2014',
    title: '開設實體辦公室',
    desc: '於香港租用辦公室及倉儲空間，提供批發整箱服務，每月處理大量訂單。',
    icon: '📦',
  },
  {
    year: '2018',
    title: '日本買手網絡',
    desc: '在東京、大阪、京都建立本地買手網絡，深入各大商場、限定活動直接入貨。',
    icon: '🗾',
  },
  {
    year: '2026',
    title: '創立 Michi',
    desc: '將多年代購資源開放予大眾，成立 Michi 平台，連接全球買家與日本在地買手。',
    icon: '道',
  },
];

const STATS = [
  { n: '13+',    label: '年代購經驗' },
  { n: '5,000+', label: '服務過的客戶' },
  { n: '4',      label: '日本城市網絡' },
  { n: '100%',   label: '實體辦公室運營' },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl">×</button>
        </div>
      )}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white">
          <div className="max-w-7xl mx-auto px-8 py-20">
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/10">
              {STATS.map(({ n, label }) => (
                <div key={label} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-black text-white">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">About Michi</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                由代購人<br />
                <span className="text-[#C5A059]">建立的代購平台</span>
              </h1>
              <p className="text-[12px] text-white/50 max-w-xl leading-relaxed mt-6">
                Michi（道）由 Global EZshop 創辦人建立。我們自 2011 年開始深耕日本代購，
                積累了超過 13 年的實戰經驗。Michi 不是一個普通的平台——它是由一個真正走過代購每一步的人，
                為同樣熱愛日本的你，建立的一條路。
              </p>
            </div>
          </div>
        </section>

        {/* ══ FOUNDER STORY ═════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Founder's Story</p>
                <h2 className="text-4xl font-serif font-black text-[#1C1C1C] leading-tight">
                  親歷代購每一個<br />痛點與喜悅
                </h2>
              </div>

              <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
                <p>
                  2011 年，我在 Facebook 開設了 <span className="font-bold text-[#1C1C1C]">Global EZshop</span>，
                  當時只是憑着對日本的熱情，替朋友和網上陌生人代購。每次飛日本，
                  都要扛着大包小包，在各大商場和藥妝店穿梭選貨。
                </p>
                <p>
                  幾年後，業務慢慢擴大——我租下了<span className="font-bold text-[#1C1C1C]">香港實體辦公室和倉儲空間</span>，
                  開始為本地中小型零售商提供日本批發服務。從玩具、精品包包，到限定動漫周邊，
                  我們處理過數以千計的訂單。
                </p>
                <p>
                  在這過程中，我最清楚的一件事是：<span className="font-bold text-[#1C1C1C]">找到一個可靠的日本在地買手，有多困難。</span>
                  你需要有人真正在場、懂得語言、了解哪家店有什麼、何時排隊。這不是一個 App 能解決的，
                  需要的是一個真正的人。
                </p>
                <p>
                  所以我創立了 <span className="font-bold text-[#1C1C1C]">Michi（道）</span>。
                  不是要取代代購，而是要讓更多有才能的日本在地買手被找到——
                  成為你通往日本的那條路。
                </p>
              </div>

              {/* Founder signature block */}
              <div className="border-l-2 border-[#C5A059] pl-6 py-2 space-y-1">
                <p className="font-serif text-2xl italic text-[#1C1C1C]">Global EZshop 創辦人</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                  日本代購 · 2011 年至今
                </p>
              </div>
            </div>

            {/* Office photos */}
            <div className="space-y-4">
              <div
                className="relative overflow-hidden border border-stone-200 cursor-zoom-in group"
                onClick={() => setLightbox('/about/office.jpg')}
              >
                <img
                  src="/about/office.jpg"
                  alt="Global EZshop 辦公室"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/50 to-transparent" />
                <div className="absolute bottom-5 left-5 space-y-1">
                  <span className="bg-[#C5A059] text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-2 py-1">實體辦公室</span>
                  <p className="text-white text-sm font-black">Global EZshop 香港辦公室 · 倉儲空間</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['/about/shipping-box.jpg', '/about/wooden-goods.jpg'].map((src, i) => (
                  <div
                    key={src}
                    className="relative overflow-hidden border border-stone-200 cursor-zoom-in group"
                    onClick={() => setLightbox(src)}
                  >
                    <img src={src} alt="" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/20 transition-all" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white/90 text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5">
                        {i === 0 ? '批發出貨' : '日本現場選貨'}
                      </span>
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
              <h2 className="text-4xl font-serif font-black">13 年的代購之路</h2>
            </div>

            <div className="relative">
              <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start group">
                    {/* Year */}
                    <div className="flex-shrink-0 w-18 text-right hidden lg:block">
                      <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">{item.year}</span>
                    </div>

                    {/* Dot */}
                    <div className="flex-shrink-0 w-9 h-9 bg-[#1C1C1C] border border-white/20 flex items-center justify-center text-sm group-hover:border-[#C5A059] transition-colors hidden lg:flex">
                      {item.icon.length > 2 ? (
                        <span className="font-serif font-black text-[#C5A059] text-xs">{item.icon}</span>
                      ) : (
                        <span>{item.icon}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-10 ${i < TIMELINE.length - 1 ? 'border-b border-white/5' : ''} flex-grow`}>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest lg:hidden">{item.year}</span>
                        <h3 className="text-lg font-black text-white">{item.title}</h3>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed max-w-lg">{item.desc}</p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">真實採購紀錄</p>
            <h2 className="text-4xl font-serif font-black text-[#1C1C1C]">從日本帶回來的<br />每一件好物</h2>
            <p className="text-stone-500 text-sm max-w-xl">
              以下所有照片均由 Global EZshop 在日本現場採購時拍攝。從店鋪探貨到整箱批發出貨，每個環節都親力親為。
            </p>
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Office — big feature */}
            <div
              className="col-span-2 row-span-2 relative overflow-hidden border border-stone-200 cursor-zoom-in group"
              onClick={() => setLightbox('/about/office.jpg')}
            >
              <img
                src="/about/office.jpg"
                alt="辦公室"
                className="w-full h-full object-cover min-h-[280px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                <span className="bg-[#C5A059] text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-2 py-0.5">實體辦公室</span>
                <p className="text-white text-xs font-bold">Global EZshop · 香港</p>
              </div>
            </div>

            {/* Other photos */}
            {[
              { src: '/about/bao-bao.jpg',     label: 'Bao Bao 精品包' },
              { src: '/about/kuromi.jpg',       label: 'Kuromi 限定' },
              { src: '/about/miffy.jpg',        label: 'Miffy 忍者限定' },
              { src: '/about/plushies.jpg',     label: '京都店限定玩偶' },
              { src: '/about/wooden-goods.jpg', label: '木製選物' },
              { src: '/about/shipping-box.jpg', label: '批發出貨' },
            ].map(({ src, label }) => (
              <div
                key={src}
                className="relative overflow-hidden border border-stone-200 cursor-zoom-in group aspect-square"
                onClick={() => setLightbox(src)}
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/40 transition-all" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5">
                    {label}
                  </span>
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
                <h2 className="text-4xl font-serif font-black text-[#1C1C1C] leading-tight">
                  為什麼由代購人<br />來建立 Michi
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      n: '01',
                      title: '親身走過代購每一步',
                      desc: '從下單、排隊、打包到報關，每個環節我們都試過。Michi 的功能設計來自真實經驗，而非假設。',
                    },
                    {
                      n: '02',
                      title: '13 年積累的人脈網絡',
                      desc: '我們在日本各城市都有長期合作的在地買手。Michi 讓這個私人網絡向所有人開放。',
                    },
                    {
                      n: '03',
                      title: '平台不介入、不收費',
                      desc: 'Michi 是資訊索引平台。我們不參與任何交易，不向買家或買手抽佣。透明直接。',
                    },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-6">
                      <span className="text-[#C5A059] font-black text-xs tracking-[0.3em] flex-shrink-0 mt-0.5">{n}</span>
                      <div className="space-y-1">
                        <p className="font-black text-sm text-[#1C1C1C]">{title}</p>
                        <p className="text-[11px] text-stone-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side — quote block */}
              <div className="bg-[#1C1C1C] p-10 space-y-8">
                <div className="text-8xl text-white/5 font-serif leading-none select-none">道</div>
                <blockquote className="text-white text-xl font-serif italic leading-relaxed">
                  「在代購的世界裡，<br />我們是那道引導光線。」
                </blockquote>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">— Michi 核心理念</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════ */}
        <section className="bg-[#1A237E] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Start Now</p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                準備好了嗎？<br />找到你的日本買手
              </h2>
              <p className="text-white/50 text-sm max-w-md">
                瀏覽 Michi 買手名錄，找到專屬你需求的日本在地代購人，開始你的代購之旅。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href={`/${locale}/buyers`}
                className="border border-white text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1A237E] transition-all text-center"
              >
                找買手 →
              </a>
              <a
                href={`/${locale}/products`}
                className="border border-white/30 text-white/70 px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all text-center"
              >
                最新商品情報
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}