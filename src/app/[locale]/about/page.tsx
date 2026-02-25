'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─────────────────────────────────────────────────────────────
// Real photos from Global EZshop / founder's history
// Place all 7 images in /public/about/ folder:
//   office.jpg          → 20200410_183618__2_.jpg   (辦公室)
//   wooden-goods.jpg    → IMG-20200916-WA0043.jpg    (木製餐具)
//   bao-bao.jpg         → 24518.jpeg                 (Bao Bao bags)
//   kuromi.jpg          → 24600.jpeg                 (Kuromi)
//   miffy.jpg           → IMG_0509.jpg               (Miffy 忍者)
//   plushies.jpg        → IMG_0567.jpg               (茶 plushies)
//   shipping-box.jpg    → IMG-20201028-WA0012.jpg    (出貨箱)
// ─────────────────────────────────────────────────────────────
const PHOTOS = [
  {
    src: '/about/office.jpg',
    alt: 'Global EZshop 辦公室 — Michi 創辦人工作空間',
    caption: '創辦人辦公室 · 香港',
    tag: '實體辦公室',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: '/about/wooden-goods.jpg',
    alt: '日本木製餐具代購',
    caption: '日本木製選物',
    tag: '親赴日本選貨',
    span: '',
  },
  {
    src: '/about/bao-bao.jpg',
    alt: 'Issey Miyake Bao Bao bags',
    caption: 'Bao Bao Issey Miyake',
    tag: '精品代購',
    span: '',
  },
  {
    src: '/about/miffy.jpg',
    alt: 'Miffy 忍者限定款',
    caption: '限定系列代購',
    tag: '限定商品',
    span: '',
  },
  {
    src: '/about/kuromi.jpg',
    alt: 'Kuromi × Dolly Mix 動漫限定',
    caption: 'Sanrio 限定周邊',
    tag: '動漫周邊',
    span: '',
  },
  {
    src: '/about/plushies.jpg',
    alt: '京都限定玩偶',
    caption: '京都店限定玩偶',
    tag: '地區限定',
    span: '',
  },
  {
    src: '/about/shipping-box.jpg',
    alt: '批發出貨箱',
    caption: '批發整箱出貨',
    tag: '企業批發服務',
    span: '',
  },
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
  { n: '13+', label: '年代購經驗' },
  { n: '5,000+', label: '服務過的客戶' },
  { n: '4', label: '日本城市網絡' },
  { n: '100%', label: '實體辦公室運營' },
];

export default function AboutPage() {
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl">×</button>
        </div>
      )}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* TOP BAR */}
        <div className="bg-[#1C1C1C] text-[#F9F7F2]/50 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
          MICHI • 由 Global EZshop 創辦人創立 • 2011 年至今
        </div>

        {/* NAV */}
        <nav className="sticky top-0 z-40 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <a href={`/${locale}`} className="flex items-center space-x-4 group">
              <div className="w-9 h-9 bg-[#B22222] flex items-center justify-center text-white font-serif text-xl font-black transition-transform group-hover:rotate-6">道</div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black tracking-tighter text-[#1C1C1C]">みち</span>
                <span className="text-[7px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
              </div>
            </a>
            <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}/buyers`} className="hover:text-[#1A237E] transition-colors">找買手</a>
              <a href={'/products'} className="hover:text-[#1A237E] transition-colors">最新商品</a>
              <span className="text-[#1A237E] border-b border-[#1A237E]">關於我們</span>
            </div>
            <a href={`/${locale}/products`} className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-[#1C1C1C] pb-0.5 hover:text-stone-400 transition-colors">
              ← 返回首頁
            </a>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section className="bg-[#1A237E] text-white py-24 px-8 relative overflow-hidden">
          <div className="absolute right-[-2rem] top-0 bottom-0 flex items-center pointer-events-none select-none">
            <span className="text-[22rem] font-serif text-white/5 leading-none">道</span>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Our Story</p>
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.05]">
                從 Facebook<br />
                到 <span className="text-[#C5A059] italic font-serif font-normal">Michi</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl">
                2011 年，創辦人以一個 Facebook 專頁起步，親身赴日採購，一件一件幫客人代購。
                13 年後，這份初心成就了 Michi——一個讓更多人找到可信任日本買手的平台。
              </p>
              {/* Stats row */}
              <div className="flex flex-wrap gap-10 pt-4 border-t border-white/10 mt-8">
                {STATS.map(({ n, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-serif italic text-[#C5A059] font-black">{n}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOUNDER STORY ══ */}
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

            {/* Office photo — hero credibility shot */}
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
                  <div key={i}
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

        {/* ══ TIMELINE ══ */}
        <section className="bg-[#1C1C1C] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Our Journey</p>
              <h2 className="text-4xl font-serif font-black">13 年的代購之路</h2>
            </div>

            <div className="relative">
              {/* Line */}
              <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start group">
                    {/* Year marker */}
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

        {/* ══ PHOTO GALLERY ══ */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="space-y-8 mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">真實採購紀錄</p>
            <h2 className="text-4xl font-serif font-black text-[#1C1C1C]">從日本帶回來的<br />每一件好物</h2>
            <p className="text-stone-500 text-sm max-w-xl">
              以下所有照片均由 Global EZshop 在日本現場採購時拍攝。從店鋪探貨到整箱批發出貨，每個環節都親力親為。
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Office — big feature */}
            <div
              className="col-span-2 row-span-2 relative overflow-hidden border border-stone-200 cursor-zoom-in group"
              onClick={() => setLightbox('/about/office.jpg')}
            >
              <img src="/about/office.jpg" alt="辦公室" className="w-full h-full object-cover min-h-[280px] group-hover:scale-105 transition-transform duration-500" />
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
              <div key={src}
                className="relative overflow-hidden border border-stone-200 cursor-zoom-in group aspect-square"
                onClick={() => setLightbox(src)}
              >
                <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/40 transition-all" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-[#1C1C1C] text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY MICHI ══ */}
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
                      desc: '從下單、排隊、打包到報關，每個環節都試過、都煩惱過。Michi 的設計是由真實經驗出發，而不是想像。',
                    },
                    {
                      n: '02',
                      title: '知道找買手有多難',
                      desc: '信任是代購最難建立的東西。Michi 不擔保、不介入，但我們讓買手展示真實的服務資訊，由你自己判斷。',
                    },
                    {
                      n: '03',
                      title: '連結真實的人',
                      desc: '科技無法取代在場的人。Michi 要做的，是讓那些真正在日本的人，被需要他們的買家找到。',
                    },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-5 items-start">
                      <div className="text-[10px] font-black text-[#B22222] border border-[#B22222] px-2.5 py-1.5 flex-shrink-0 mt-0.5">{n}</div>
                      <div>
                        <p className="font-black text-[#1C1C1C] mb-1">{title}</p>
                        <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote block */}
              <div className="bg-[#1A237E] text-white p-10 space-y-6">
                <div className="text-5xl font-serif text-[#C5A059] leading-none">"</div>
                <p className="text-xl font-serif italic leading-relaxed">
                  代購這條路，最難的從來不是找到商品，
                  而是找到一個你可以信任、真正在當地的人。
                  Michi 就是為了這個而生。
                </p>
                <div className="border-t border-white/20 pt-4 space-y-1">
                  <p className="font-black text-white">Global EZshop 創辦人</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">2011 年起深耕日本代購</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="bg-[#1C1C1C] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-black">
                開始你的 Michi 之旅<br />
                <span className="text-[#C5A059] italic font-serif font-normal">Find Your Path to Japan</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md">瀏覽在日本各城市的買手，找到最適合你代購需求的人。</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`/${locale}/buyers`}
                className="bg-[#C5A059] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all text-center">
                瀏覽買手名錄 →
              </a>
              <a href={`/${locale}/products`}
                className="border border-white/20 text-white/70 px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all text-center">
                探索日本最新商品
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111] text-white py-14 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-lg font-black">道</div>
              <div>
                <p className="font-black tracking-tighter">みち</p>
                <p className="text-[8px] text-stone-500 uppercase tracking-[0.4em]">by Global EZshop · Since 2011</p>
              </div>
            </div>
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}/buyers`}  className="hover:text-white transition-colors">找買手</a>
              <a href={`/${locale}/products`} className="hover:text-white transition-colors">商品</a>
              <a href="mailto:hello@michi.jp" className="hover:text-white transition-colors">聯絡</a>
            </div>
            <p className="text-[9px] text-stone-600 uppercase tracking-widest">© {new Date().getFullYear()} Michi.</p>
          </div>
        </footer>
      </main>
    </>
  );
}  