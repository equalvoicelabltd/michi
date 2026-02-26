'use client';

/**
 * src/components/MichiMarketplace.tsx
 *
 * 首頁主組件：代購買手目錄 + AI 日本商品情報
 *
 * ⚠️  TopBar / Navbar / Footer 已由 src/app/[locale]/layout.tsx 統一提供
 *     此組件不可重複渲染這些元素
 */

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
    specialty: 'ANIME', score: '4.3', reviews: 334,
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

  // ── Fetch products ───────────────────────────────────────────
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

  // ── Filter shoppers ──────────────────────────────────────────
  const filterShoppers = (f: string) => {
    setActiveFilter(f);
    setFilteredShoppers(f === 'all' ? SHOPPERS : SHOPPERS.filter(s => s.filter === f));
  };

  // ── Trigger AI scrape ────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // RENDER — no TopBar / Navbar / Footer here
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F9F7F2] min-h-screen">

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
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#B22222]">
                  The Japanese Way
                </span>
                <div className="h-px w-24 bg-stone-200" />
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-[#1C1C1C] leading-[1] font-black">
                尋覓日本<br />
                <span className="italic font-serif font-normal text-[#C5A059]">Authenticity</span>
              </h1>
            </div>

            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-xl">
              Michi 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人與最新商品情報。
            </p>

            {/* Hero CTA buttons */}
            <div className="flex items-center space-x-8 pt-6">
              <a
                href="#market"
                className="bg-[#1A237E] text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] transition-all"
              >
                瀏覽買手名錄
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
              <p className="text-stone-400 text-sm mt-4 tracking-widest uppercase text-[10px]">
                Information Platform
              </p>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1C] py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-[#F9F7F2]/30 font-black text-[9px] tracking-[0.4em] uppercase">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-8">
                MICHI · 代購職人資訊平台 · 非交易提供方 · 透明直接 ·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MARKET SECTION ══════════════════════════════════ */}
      <section id="market" className="py-32 px-8 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">
                Buyer Directory
              </p>
              <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
                代購買手<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-4xl">名錄</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                由真實業者嚴選，每位買手均提供詳盡服務資訊。
                Michi 不介入交易，直接聯絡買手安排代購。
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all',     label: '全部' },
                { key: 'fashion', label: '時尚服飾' },
                { key: 'anime',   label: '動漫周邊' },
                { key: 'vintage', label: '古著職藝' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => filterShoppers(key)}
                  className={`px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em] transition-all ${
                    activeFilter === key
                      ? 'bg-[#1A237E] text-white'
                      : 'border border-stone-300 text-stone-500 hover:border-[#1A237E] hover:text-[#1A237E]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Shopper grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShoppers.map((shopper) => (
              <div
                key={shopper.id}
                className="group bg-white border border-stone-200 hover:border-[#1A237E] transition-all duration-300 flex flex-col"
              >
                {/* Card header */}
                <div className="p-8 space-y-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-stone-100 flex items-center justify-center text-3xl flex-shrink-0">
                        {shopper.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-[#1C1C1C] tracking-tight">{shopper.name}</h3>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em]">
                          {shopper.location} · {shopper.experience}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-serif italic text-[#C5A059] font-black">{shopper.score}</p>
                      <p className="text-[8px] text-stone-400">{shopper.reviews} 評價</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] bg-[#1A237E] text-white px-2 py-1">
                      {shopper.specialty}
                    </span>
                  </div>

                  <p className="text-sm text-stone-500 leading-relaxed">{shopper.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {shopper.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[8px] font-bold uppercase tracking-wider border border-stone-200 text-stone-400 px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="border-t border-stone-100 p-6">
                  <a
                    href={url('/buyers')}
                    className="block w-full text-center text-[9px] font-black uppercase tracking-[0.3em] border border-[#1C1C1C] text-[#1C1C1C] py-3 hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all"
                  >
                    查看詳情 →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View all buyers */}
          <div className="text-center pt-8">
            <a
              href={url('/buyers')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-16 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
            >
              查看全部買手 →
            </a>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS SECTION ════════════════════════════════ */}
      <section id="products" className="bg-[#1C1C1C] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                AI · 日本最新情報
              </p>
              <h2 className="text-5xl font-serif font-black leading-tight">
                最新商品<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-4xl">情報</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                由 AI 每日自動搜尋日本最新商品發布，涵蓋時尚、美妝、動漫、電子、食品及工藝文化。
              </p>
            </div>

            <button
              onClick={handleScrape}
              disabled={scraping}
              className="flex-shrink-0 flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all disabled:opacity-40"
            >
              <span className={scraping ? 'animate-spin inline-block' : ''}>✦</span>
              {scraping ? 'AI 搜尋中…' : 'AI 更新情報'}
            </button>
          </div>

          {/* Products grid */}
          {loadingProducts && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-white/10 animate-pulse">
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingProducts && productError && (
            <div className="text-center py-20 space-y-4">
              <p className="text-white/40 text-sm">{productError}</p>
              <button
                onClick={fetchProducts}
                className="border border-white/20 text-white/60 px-8 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all"
              >
                重試
              </button>
            </div>
          )}

          {!loadingProducts && !productError && products.length === 0 && (
            <div className="text-center py-20 space-y-6">
              <p className="text-4xl">🌿</p>
              <p className="text-white/40 text-sm">尚未有商品情報</p>
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50"
              >
                {scraping ? '搜尋中…' : '✦ AI 搜尋最新商品'}
              </button>
            </div>
          )}

          {!loadingProducts && !productError && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="group border border-white/10 hover:border-[#C5A059] transition-all duration-300 flex flex-col bg-white/5"
                >
                  {/* Placeholder image area */}
                  <div className="aspect-[4/3] bg-white/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-5xl opacity-30">
                        {product.category === 'fashion' ? '👕' :
                         product.category === 'beauty' ? '💄' :
                         product.category === 'anime' ? '🎌' :
                         product.category === 'food' ? '🍡' :
                         product.category === 'electronics' ? '📱' : '🏮'}
                      </span>
                    )}
                    {/* AI badge */}
                    <div className="absolute top-3 right-3 bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1">
                      AI 情報
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">
                        {product.source ?? 'Japan'}
                      </span>
                      <span className="text-[8px] text-white/20 font-bold">
                        {formatDate(product.published_at)}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-white leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2">
                      {product.title}
                    </h3>

                    {product.ai_summary && (
                      <div className="border-l-2 border-[#C5A059] pl-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#C5A059] mb-1">AI 摘要</p>
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-4">{product.ai_summary}</p>
                      </div>
                    )}

                    {/* Source link */}
                    <div className="flex justify-between items-center text-[9px] font-bold text-white/30 uppercase tracking-widest pt-4 border-t border-white/10 mt-auto">
                      <span>{product.source ?? 'Japan'} · {formatDate(product.published_at)}</span>
                      {product.source_url ? (
                        <a
                          href={product.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C5A059] hover:text-white transition-colors"
                        >
                          了解更多 ↗
                        </a>
                      ) : (
                        <a href={url(`/products/${product.id}`)} className="text-[#C5A059] hover:text-white transition-colors">
                          了解更多 →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View all products */}
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
                Michi 不只是代購平台，而是一條通往日本真實好物的道路。
                我們相信，在透明、信任與專業之間，代購可以成為一種藝術。
              </p>
            </div>

            <div className="space-y-8">
              {[
                { num: '01', title: '自主導向', desc: '深入了解文化根源，讓每次推薦都有意義。' },
                { num: '02', title: '資訊共享篩選', desc: '只分享通過嚴格篩選的職人，確保品質一致。' },
                { num: '03', title: 'AI 輔助情報', desc: '以人工智慧輔助，以人文關懷把關，兩者缺一不可。' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex gap-8 items-start border-l-2 border-stone-100 pl-6 hover:border-[#1A237E] transition-colors"
                >
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

            <a
              href={url('/about')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
            >
              了解更多關於我們 →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}