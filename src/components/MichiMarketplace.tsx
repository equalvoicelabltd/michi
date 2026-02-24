'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  source: string | null;
  ai_summary: string | null;
  published_at: string;
  image_url?: string | null;
  source_url?: string | null;
}

// ─────────────────────────────────────────────────────────────
// SHOPPER DATA
// ─────────────────────────────────────────────────────────────
const SHOPPERS = [
  {
    id: 1, name: 'Saito Kaito', icon: '👔', location: '東京', experience: '8年',
    specialty: 'FASHION', score: '4.9', reviews: 312,
    tags: ['Harajuku', 'Vintage', 'Streetwear'], filter: 'fashion',
    description: '原宿時尚達人，專注裏原宿 vintage 及限定聯名系列。',
  },
  {
    id: 2, name: 'Asuka Yuki', icon: '🎨', location: '大阪', experience: '5年',
    specialty: 'ANIME', score: '4.8', reviews: 198,
    tags: ['Gundam', 'Figure', 'Goods'], filter: 'anime',
    description: '動漫周邊收藏家，熟悉各大会場限定及一番賞商品。',
  },
  {
    id: 3, name: 'Haru Tanaka', icon: '👟', location: '京都', experience: '12年',
    specialty: 'VINTAGE', score: '5.0', reviews: 445,
    tags: ['陶藝', '古布', '民藝'], filter: 'vintage',
    description: '京都傳統工藝職人，深入市場尋找稀有古董與手工藝品。',
  },
  {
    id: 4, name: 'Sato Sensei', icon: '📷', location: '東京', experience: '6年',
    specialty: 'TECH', score: '4.7', reviews: 267,
    tags: ['電子', 'Apple', 'Sony'], filter: 'fashion',
    description: '秋葉原常駐，最新電子產品及限定版發售第一手資訊。',
  },
  {
    id: 5, name: 'Mina Ayo', icon: '👕', location: '福岡', experience: '4年',
    specialty: 'BEAUTY', score: '4.7', reviews: 189,
    tags: ['美妝', '護膚', '藥粧'], filter: 'fashion',
    description: '藥妝店達人，熟悉各大品牌限定色及季節限定商品。',
  },
  {
    id: 6, name: 'Kenji', icon: '🎮', location: '名古屋', experience: '9年',
    specialty: 'ANIME', score: '3', reviews: 334,
    tags: ['遊戲', 'Pokemon', '卡牌'], filter: 'anime',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉各地中古市場。',
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function MichiMarketplace() {
  const locale = useLocale();

  // Shopper state
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredShoppers, setFilteredShoppers] = useState(SHOPPERS);

  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);
  const [scraping, setScraping] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductError(null);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products ?? []);
      } else {
        setProductError(data.error || 'Failed to load products');
      }
    } catch {
      setProductError('無法連接伺服器，請稍後再試。');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Filter shoppers
  const filterShoppers = (f: string) => {
    setActiveFilter(f);
    setFilteredShoppers(f === 'all' ? SHOPPERS : SHOPPERS.filter(s => s.filter === f));
  };

  // Trigger AI scrape
  const handleScrape = async () => {
    setScraping(true);
    try {
      const res = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) await fetchProducts();
    } finally {
      setScraping(false);
    }
  };

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('zh-HK', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  // Locale-aware URL helper
  const url = (path: string) => `/${locale}${path}`;

  // ───────────────────────────────────────────────────────────
  return (
    <main className="bg-[#F9F7F2] min-h-screen">

      {/* ══ TOP DISCLAIMER BAR ══════════════════════════════ */}
      <div className="bg-[#1C1C1C] text-[#F9F7F2]/60 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
        MICHI • 代購職人資訊平台 • 非交易提供方 • 透明直接
      </div>

      {/* ══ NAVIGATION ══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          {/* Logo */}
          <a href={url('/')} className="flex items-center space-x-6 group">
            <div className="w-10 h-10 bg-[#B22222] flex items-center justify-center text-white font-serif text-2xl font-black transition-transform group-hover:rotate-6">
              道
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-[#1C1C1C]">みち</span>
              <span className="text-[8px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
            </div>
          </a>

          {/* Nav links */}
          <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
            <a href="#market" className="hover:text-[#1A237E] transition-colors">專家名錄</a>
            <a href="#products" className="hover:text-[#1A237E] transition-colors">最新商品</a>
            <a href={`/${locale}/about`} className="hover:text-[#1A237E] transition-colors">關於我們</a>
          </div>

          {/* ✅ "發布需求" — links to a contact/request page */}
          <a
            href={url('/buyers')}
            className="font-serif text-sm italic border-b border-[#1C1C1C] pb-1 hover:text-stone-400 transition-all font-black"
          >
            發布需求
          </a>
        </div>
      </nav>

      {/* ══ HERO SECTION ════════════════════════════════════ */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        {/* Watermark */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[30rem] font-serif text-stone-100 pointer-events-none select-none leading-none">
          道
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#B22222]">The Japanese Way</span>
                <div className="h-px w-24 bg-stone-200" />
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-[#1C1C1C] leading-[1] font-black">
                尋覓日本<br />
                <span className="italic font-serif font-normal text-[#C5A059]">Authenticity</span>
              </h1>
            </div>

            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-xl">
              Michi Project 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人與最新商品情報。
            </p>

            {/* ✅ Hero CTA buttons — proper <a> links */}
            <div className="flex items-center space-x-8 pt-6">
              <a
                href="#market"
                className="bg-[#1A237E] text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] transition-all"
              >
                瀏覽專家名錄
              </a>
              <a
                href="#products"
                className="border border-[#1C1C1C] text-[#1C1C1C] px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
              >
                探索最新商品
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="text-center">
              <div className="text-9xl opacity-10 font-serif select-none leading-none text-[#1C1C1C]">道</div>
              <p className="text-stone-400 text-sm mt-4 tracking-widest uppercase text-[10px]">Information Platform</p>
            </div>
          </div>
        </div>

        {/* Marquee bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#FFD700] py-3 overflow-hidden rotate-[-0.5deg] scale-x-110">
          <div className="flex whitespace-nowrap animate-marquee text-black font-black text-[9px] tracking-[0.4em] uppercase">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="mx-12">Michi Project: Connecting Personal Buyers to Professional Shoppers •</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — 代購職人市場 ══════════════════════════ */}
      <section id="market" className="max-w-7xl mx-auto px-8 py-32 space-y-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif text-[#1C1C1C] font-black">探索代購職人</h2>
            <p className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px]">
              認識日本各地的專業代購員
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-6 border-b border-stone-200 pb-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'vintage', label: 'Vintage' },
              { key: 'anime', label: 'Anime' },
              { key: 'fashion', label: 'Fashion' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => filterShoppers(key)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 transition-colors ${
                  activeFilter === key
                    ? 'text-[#1A237E] border-b-2 border-[#1A237E] -mb-[2px]'
                    : 'text-stone-400 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Shopper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredShoppers.map((shopper) => (
            <div key={shopper.id} className="group">
              {/* Avatar card */}
              <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center text-6xl relative overflow-hidden border border-stone-200">
                <span className="z-10 text-7xl">{shopper.icon}</span>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all" />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
                  {shopper.specialty}
                </div>
              </div>

              {/* Info */}
              <div className="mt-8 space-y-4 bg-white p-6 border border-stone-200 border-t-0">
                <div className="flex justify-between items-end border-b border-stone-100 pb-2">
                  <h4 className="text-2xl font-serif text-[#1C1C1C] font-black group-hover:text-[#B22222] transition-colors">
                    {shopper.name}
                  </h4>
                  <span className="font-serif italic text-xl text-[#C5A059]">{shopper.score}</span>
                </div>

                <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                  <span>{shopper.location} / {shopper.experience}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {shopper.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-bold text-stone-500 border border-stone-100 px-2 py-1 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 text-[9px] text-stone-400">{shopper.reviews} 評價</div>

                {/* ✅ FIX: "聯繫" button → <a href="mailto:"> */}
                <a
                  href={`mailto:hello@michi.jp?subject=代購諮詢 - ${shopper.name}`}
                  className="block w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all text-center"
                >
                  聯繫
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 2 — 日本最新商品情報 ═══════════════════════ */}
      <section id="products" className="bg-[#1C1C1C] text-white py-32">
        <div className="max-w-7xl mx-auto px-8 space-y-20">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-serif font-black leading-tight">
                日本最新商品情報<br />
                <span className="text-[#C5A059] italic font-serif font-normal text-3xl">Latest Japanese Releases</span>
              </h2>
              <p className="text-stone-400 font-light leading-relaxed max-w-2xl text-sm">
                AI 實時監測日本官方發布的最新商品、聯名系列與工藝佳作，每日更新資訊要點。
              </p>
            </div>

            {/* AI refresh — this IS a button (triggers JS action, not navigation) */}
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="self-start lg:self-end flex items-center gap-2 border border-stone-600 text-stone-400 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all disabled:opacity-40"
            >
              {scraping
                ? <><span className="animate-spin inline-block">⟳</span> AI 搜尋中…</>
                : <>⟳ AI 更新商品</>}
            </button>
          </div>

          {/* Products */}
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border border-stone-200 p-8 space-y-6 animate-pulse">
                  <div className="h-4 bg-stone-100 w-1/3" />
                  <div className="h-6 bg-stone-100 w-full" />
                  <div className="h-16 bg-stone-50 w-full" />
                </div>
              ))}
            </div>
          ) : productError ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-stone-400 text-sm">{productError}</p>
              <button onClick={fetchProducts} className="border border-stone-600 text-stone-400 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all">
                重試
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-stone-400 text-sm">暫無商品資訊。點擊「AI 更新商品」搜尋最新情報。</p>
              <button onClick={handleScrape} disabled={scraping} className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-40">
                {scraping ? 'AI 搜尋中…' : '🤖 立即 AI 搜尋'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-stone-200 p-8 space-y-6 group hover:border-stone-400 transition-all">

                  {product.category && (
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B22222] border border-[#B22222]/20 px-2 py-1 inline-block">
                      {product.category}
                    </div>
                  )}

                  <h3 className="font-serif font-black text-xl text-[#1C1C1C] leading-tight line-clamp-2">
                    {product.title}
                  </h3>

                  {product.ai_summary ? (
                    <div className="border-l-2 border-[#C5A059] pl-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#C5A059] mb-1">AI 摘要</p>
                      <p className="text-xs text-stone-700 leading-relaxed line-clamp-4">{product.ai_summary}</p>
                    </div>
                  ) : product.description ? (
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-4">{product.description}</p>
                  ) : null}

                  <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-100">
                    <span>{product.source ?? 'Japan'} · {formatDate(product.published_at)}</span>

                    {/* ✅ FIX: "了解更多" → <a> with real href */}
                    {product.source_url ? (
                      <a
                        href={product.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1A237E] hover:text-[#B22222] transition-colors cursor-pointer"
                      >
                        了解更多 ↗
                      </a>
                    ) : (
                      <a
                        href={url(`/products/${product.id}`)}
                        className="text-[#1A237E] hover:text-[#B22222] transition-colors cursor-pointer"
                      >
                        了解更多 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ✅ FIX: "查看所有商品" → <a> link to /products */}
          <div className="text-center pt-8">
            <a
              href={url('/products')}
              className="inline-block border border-white text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all"
            >
              查看所有商品 →
            </a>
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY SECTION ══════════════════════════════ */}
      <section id="philosophy" className="bg-white py-32 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-serif font-black leading-tight">
                關於我們<br />
                <span className="text-[#C5A059] italic font-serif font-normal text-3xl">Our Philosophy</span>
              </h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed">
                Michi 不只是代購平台，而是一條通往日本真實好物的道路。我們相信，在透明、信任與專業之間，
                代購可以成為一種藝術。
              </p>
            </div>

            <div className="space-y-8">
              {[
                { num: '01', title: '自主指導', desc: '深入了解文化根源，讓每次推薦都有意義。' },
                { num: '02', title: '資訊共享篩選', desc: '只分享通過嚴格篩選的職人，確保品質一致。' },
                { num: '03', title: 'AI 輔助情報', desc: '以人工智慧輔助，以人文關懷把關，兩者缺一不可。' },
              ].map((item) => (
                <div key={item.num} className="flex gap-8 items-start border-l-2 border-stone-100 pl-6 hover:border-[#1A237E] transition-colors">
                  <span className="text-[10px] font-black text-stone-300 tracking-widest mt-1">{item.num}</span>
                  <div>
                    <h4 className="font-black text-[#1C1C1C] mb-1">{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-serif italic text-[#C5A059] mb-2">99.2%</p>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">資訊準確度</p>
              </div>
              <div>
                <p className="text-4xl font-serif italic text-[#C5A059] mb-2">88.5%</p>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">專家留存率</p>
              </div>
            </div>

            <div className="bg-stone-50 p-12 space-y-6">
              <div className="text-6xl opacity-10 font-serif">道</div>
              <blockquote className="text-stone-600 text-lg font-light leading-relaxed italic">
                「在代購的世界裡，我們是那道引導光線。」
              </blockquote>
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                — Michi 核心理念
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="bg-[#1C1C1C] text-white py-24 px-8 border-t border-stone-700">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-xl font-black">
                  道
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter">みち</span>
                  <span className="text-[8px] font-bold text-stone-400 tracking-[0.5em] uppercase">Information Hub</span>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 leading-relaxed">
                Build a bridge of trust between local Japanese experts and global personal buyers.
              </p>
              <div className="flex gap-4 pt-2">
                {['Instagram', 'WeChat', 'LINE'].map((s) => (
                  <a key={s} href="#" className="text-[9px] font-black uppercase tracking-widest text-stone-500 hover:text-white transition-colors">{s}</a>
                ))}
              </div>
            </div>

            {/* Discover */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">DISCOVER</h4>
              <nav className="space-y-3">
                {[
                  { label: '代購職人', href: url('/buyers') },
                  { label: '最新商品', href: url('/products') },
                  { label: '發布需求', href: url('/buyers') },
                  { label: '關於我們', href: url('/about') },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="block text-[10px] text-stone-400 hover:text-white transition-colors uppercase tracking-wider font-bold">
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">SUPPORT</h4>
              <nav className="space-y-3">
                {[
                  { label: 'FAQ', href: '#' },
                  { label: '聯絡我們', href: 'mailto:hello@michi.jp' },
                  { label: '隱私條款', href: '#' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="block text-[10px] text-stone-400 hover:text-white transition-colors uppercase tracking-wider font-bold">
                    {label}
                  </a>
                ))}
              </nav>

              {/* Newsletter */}
              <div className="pt-4 space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Newsletter</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-stone-800 border border-stone-700 px-3 py-2 text-[10px] text-white placeholder-stone-500 focus:outline-none focus:border-stone-500"
                  />
                  <button className="bg-white text-[#1C1C1C] px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition-colors">
                    訂閱
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] text-stone-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Michi Project. All Rights Reserved.
            </p>
            <p className="text-[9px] text-stone-600 uppercase tracking-widest">
              Your Path to Japan's Best
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}