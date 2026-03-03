'use client';

/**
 * src/components/MichiMarketplace.tsx
 * Navbar / Footer provided by src/app/[locale]/layout.tsx — not repeated here.
 */

import { useEffect, useState, useMemo } from 'react';
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
  ai_generated?: boolean;
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES — 7 品類
// ─────────────────────────────────────────────────────────────
const PROD_CATEGORIES = [
  { key: 'all',      label: '全部',    icon: '✦'  },
  { key: 'skincare', label: '護膚美肌', icon: '🧴' },
  { key: 'makeup',   label: '彩妝美容', icon: '💄' },
  { key: 'anime',    label: '動漫周邊', icon: '🎌' },
  { key: 'fashion',  label: '時裝服飾', icon: '👗' },
  { key: 'bags',     label: '手袋包款', icon: '👜' },
  { key: 'shoes',    label: '鞋履配件', icon: '👠' },
  { key: 'luxury',   label: '名牌精品', icon: '💎' },
];

const CATEGORY_MAP: Record<string, { label: string; icon: string; color: string }> = {
  skincare: { label: '護膚美肌', icon: '🧴', color: '#C5A059' },
  makeup:   { label: '彩妝美容', icon: '💄', color: '#B22222' },
  anime:    { label: '動漫周邊', icon: '🎌', color: '#1A237E' },
  fashion:  { label: '時裝服飾', icon: '👗', color: '#2E7D32' },
  bags:     { label: '手袋包款', icon: '👜', color: '#4A148C' },
  shoes:    { label: '鞋履配件', icon: '👠', color: '#BF360C' },
  luxury:   { label: '名牌精品', icon: '💎', color: '#1C1C1C' },
};

// ─────────────────────────────────────────────────────────────
// BUYERS DATA
// ─────────────────────────────────────────────────────────────
const BUYERS = [
  {
    id: 1, name: 'Saito Kaito', icon: '👔', location: '東京', experience: '8年',
    specialty: 'FASHION', score: 4.9, reviews: 312,
    tags: ['Harajuku', 'Vintage', 'Streetwear'], filter: 'fashion',
    description: '原宿時尚達人，專注裏原宿 vintage 及限定聯名系列，熟悉東京各大街頭品牌發售資訊。',
  },
  {
    id: 2, name: 'Yuki Asuka', icon: '💄', location: '大阪', experience: '6年',
    specialty: 'BEAUTY', score: 4.9, reviews: 421,
    tags: ['SK-II', 'SUQQU', '限定彩妝'], filter: 'beauty',
    description: '美妝達人，專注日本高端護膚及限定彩妝系列，熟悉各大百貨快閃活動及限定情報。',
  },
  {
    id: 3, name: 'Haru Tanaka', icon: '👜', location: '東京', experience: '12年',
    specialty: 'LUXURY', score: 5.0, reviews: 445,
    tags: ['LV', 'Chanel', '日本限定'], filter: 'luxury',
    description: '名牌精品職人，深入東京各大旗艦店，專找日本限定及亞洲獨家版本，經驗豐富。',
  },
  {
    id: 4, name: 'Sato Nana', icon: '🎌', location: '大阪', experience: '5年',
    specialty: 'ANIME', score: 4.8, reviews: 267,
    tags: ['Pokemon', 'Sanrio', '一番賞'], filter: 'anime',
    description: '動漫周邊收藏家，熟悉各大会場限定、一番賞及扭蛋稀有商品，全國追蹤。',
  },
  {
    id: 5, name: 'Mina Fujii', icon: '👠', location: '福岡', experience: '4年',
    specialty: 'SHOES & BAGS', score: 4.7, reviews: 189,
    tags: ['Asics', 'Porter', 'Onitsuka Tiger'], filter: 'shoes',
    description: '球鞋及手袋達人，掌握日本限定球鞋抽籤資訊及 Porter、Bao Bao 最新款式。',
  },
  {
    id: 6, name: 'Kenji Mori', icon: '🎮', location: '名古屋', experience: '9年',
    specialty: 'ANIME & GAMES', score: 4.3, reviews: 334,
    tags: ['卡牌', 'Pokemon', '遊戲周邊'], filter: 'anime',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉各地中古市場及限定發售，收藏評估經驗豐富。',
  },
];

const BUYER_FILTERS = [
  { key: 'all',     label: '全部'    },
  { key: 'fashion', label: '時裝'    },
  { key: 'beauty',  label: '美妝護膚' },
  { key: 'luxury',  label: '名牌精品' },
  { key: 'anime',   label: '動漫周邊' },
  { key: 'shoes',   label: '鞋履手袋' },
];

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORY_MAP[product.category ?? ''] ?? { label: product.category ?? '', icon: '✦', color: '#1C1C1C' };
  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('zh-HK', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <article className="group border border-white/10 hover:border-[#C5A059] transition-all duration-300 flex flex-col bg-white/5">
      <div className="aspect-[4/3] bg-white/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="text-5xl opacity-25">{cat.icon}</span>
        )}
        {product.ai_generated && (
          <div className="absolute top-3 right-3 bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1">
            AI 情報
          </div>
        )}
        <div className="absolute top-3 left-3 text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1"
          style={{ backgroundColor: cat.color }}>
          {cat.icon} {cat.label}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">{product.source ?? 'Japan'}</span>
          <span className="text-[8px] text-white/20 font-bold">{formatDate(product.published_at)}</span>
        </div>
        <h3 className="text-sm font-black text-white leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2">
          {product.title}
        </h3>
        {product.ai_summary && (
          <div className="border-l-2 border-[#C5A059]/40 pl-3">
            <p className="text-[10px] text-white/45 leading-relaxed line-clamp-4">{product.ai_summary}</p>
          </div>
        )}
        <div className="flex justify-between items-center text-[9px] font-bold text-white/25 uppercase tracking-widest pt-3 border-t border-white/10 mt-auto">
          <span>{cat.label}</span>
          {product.source_url
            ? <a href={product.source_url} target="_blank" rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-white transition-colors">了解更多 ↗</a>
            : <span className="text-white/15">Japan Exclusive</span>
          }
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
function SkeletonDark() {
  return (
    <div className="border border-white/10 animate-pulse">
      <div className="aspect-[4/3] bg-white/5" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/15 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function MichiMarketplace() {
  const locale = useLocale();
  const url = (path: string) => `/${locale}${path}`;

  // Buyer filter
  const [activeBuyerFilter, setActiveBuyerFilter] = useState('all');
  const filteredBuyers = useMemo(
    () => activeBuyerFilter === 'all' ? BUYERS : BUYERS.filter(b => b.filter === activeBuyerFilter),
    [activeBuyerFilter]
  );

  // Product state
  const [products, setProducts]       = useState<Product[]>([]);
  const [loadingProds, setLoadingProds] = useState(true);
  const [prodError, setProdError]     = useState<string | null>(null);
  const [scraping, setScraping]       = useState(false);
  const [scrapeMsg, setScrapeMsg]     = useState('');
  const [activeCat, setActiveCat]     = useState('all');

  const fetchProducts = async () => {
    try {
      setLoadingProds(true);
      setProdError(null);
      const res  = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products ?? []);
      else setProdError(data.error || 'Failed to load products');
    } catch {
      setProdError('無法連接伺服器，請稍後再試。');
    } finally {
      setLoadingProds(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleScrape = async () => {
    setScraping(true); setScrapeMsg('');
    try {
      const res  = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) { setScrapeMsg(`✦ 已新增 ${data.count} 件最新商品`); await fetchProducts(); }
      else setScrapeMsg(`⚠ ${data.error || '更新失敗'}`);
    } catch { setScrapeMsg('⚠ 網絡錯誤，請稍後再試'); }
    finally { setScraping(false); setTimeout(() => setScrapeMsg(''), 7000); }
  };

  const displayed = useMemo(() => {
    if (activeCat === 'all') return products.slice(0, 9);
    return products.filter(p => p.category === activeCat).slice(0, 9);
  }, [products, activeCat]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: products.length };
    for (const p of products) { const c = p.category ?? 'other'; m[c] = (m[c] ?? 0) + 1; }
    return m;
  }, [products]);

  // ════════════════════════════════════════════════════════════
  return (
    <div className="bg-[#F9F7F2] min-h-screen">

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[28rem] font-serif text-stone-100 pointer-events-none select-none leading-none">
          道
        </div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#B22222]">The Japanese Way</span>
                <div className="h-px w-24 bg-stone-200" />
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-[#1C1C1C] leading-[1] font-black">
                尋覓日本<br />
                <span className="italic font-serif font-normal text-[#C5A059]">Authenticity</span>
              </h1>
              <p className="text-stone-500 text-lg font-light leading-relaxed max-w-xl">
                連結日本在地買手，掌握護膚、美妝、名牌精品、動漫、時裝、手袋、鞋履最新情報。
                Michi 是資訊索引平台，不介入任何交易。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#market" className="bg-[#1A237E] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] transition-all">
                瀏覽買手名錄
              </a>
              <a href="#products" className="border border-[#1C1C1C] text-[#1C1C1C] px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
                最新商品情報
              </a>
            </div>

            {/* Category quick links */}
            <div className="flex flex-wrap gap-2 pt-2">
              {PROD_CATEGORIES.filter(c => c.key !== 'all').map(c => (
                <a key={c.key} href="#products"
                  onClick={() => setActiveCat(c.key)}
                  className="text-[9px] font-bold uppercase tracking-wider border border-stone-200 text-stone-400 px-3 py-1.5 hover:border-[#1A237E] hover:text-[#1A237E] transition-all cursor-pointer">
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-[9rem] opacity-10 font-serif select-none leading-none text-[#1C1C1C]">道</div>
              <p className="text-stone-400 tracking-widest uppercase text-[9px] font-bold">Japan Information Platform</p>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1C] py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-[#F9F7F2]/30 font-black text-[9px] tracking-[0.4em] uppercase">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-6">MICHI · 護膚美肌 · 彩妝美容 · 名牌精品 · 動漫周邊 · 時裝服飾 · 手袋包款 · 鞋履配件 · 日本限定 ·&nbsp;</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ════════════════════════════════════════ */}
      <div className="bg-[#1A237E] text-white py-5 px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-10 justify-center">
          {[
            { n: '7',     label: '商品品類'   },
            { n: '13+',   label: '年代購經驗'  },
            { n: '5,000+', label: '服務客戶'   },
            { n: '4',     label: '日本城市網絡' },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-serif italic text-[#C5A059] font-black">{n}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ BUYER DIRECTORY ════════════════════════════════════ */}
      <section id="market" className="py-28 px-8 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto space-y-14">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Buyer Directory</p>
              <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
                代購買手<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">名錄</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                各地買手均提供詳盡服務資訊。Michi 不介入交易，直接聯絡買手安排代購。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {BUYER_FILTERS.map(({ key, label }) => (
                <button key={key} onClick={() => setActiveBuyerFilter(key)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all ${
                    activeBuyerFilter === key
                      ? 'bg-[#1A237E] text-white'
                      : 'border border-stone-300 text-stone-500 hover:border-[#1A237E] hover:text-[#1A237E]'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuyers.map(buyer => (
              <div key={buyer.id} className="group bg-white border border-stone-200 hover:border-[#1A237E] transition-all duration-300 flex flex-col">
                <div className="p-8 space-y-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-stone-100 flex items-center justify-center text-3xl flex-shrink-0">
                        {buyer.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-[#1C1C1C] tracking-tight">{buyer.name}</h3>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em]">{buyer.location} · {buyer.experience}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-serif italic text-[#C5A059] font-black">{buyer.score}</p>
                      <p className="text-[8px] text-stone-400">{buyer.reviews} 評價</p>
                    </div>
                  </div>
                  <span className="inline-block text-[8px] font-black uppercase tracking-[0.4em] bg-[#1A237E] text-white px-2 py-1">
                    {buyer.specialty}
                  </span>
                  <p className="text-sm text-stone-500 leading-relaxed">{buyer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {buyer.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-bold uppercase tracking-wider border border-stone-200 text-stone-400 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-stone-100 p-5">
                  <a href={url('/buyers')}
                    className="block w-full text-center text-[9px] font-black uppercase tracking-[0.3em] border border-[#1C1C1C] text-[#1C1C1C] py-3 hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all">
                    查看詳情 →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={url('/buyers')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-14 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              查看全部買手名錄 →
            </a>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS SECTION ═══════════════════════════════════ */}
      <section id="products" className="bg-[#1C1C1C] text-white py-28 px-8">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">AI × Japan · 最新情報</p>
              <h2 className="text-5xl font-serif font-black leading-tight">
                日本最新<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">商品情報</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                AI 每日自動搜尋日本最新商品發布。護膚、美妝、名牌精品、動漫、時裝、手袋、鞋履，
                七大品類第一手掌握日本限定情報。
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <button onClick={handleScrape} disabled={scraping}
                className="flex items-center gap-3 border border-white/20 text-white px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all disabled:opacity-40">
                <span className={scraping ? 'animate-spin inline-block' : ''}>✦</span>
                {scraping ? 'AI 搜尋中…' : 'AI 更新情報'}
              </button>
              {scrapeMsg && <p className="text-[10px] font-bold text-[#C5A059] tracking-wide">{scrapeMsg}</p>}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6">
            {PROD_CATEGORIES.map(({ key, label, icon }) => (
              <button key={key} onClick={() => setActiveCat(key)}
                className={`px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeCat === key
                    ? 'bg-[#C5A059] text-[#1C1C1C]'
                    : 'border border-white/15 text-white/50 hover:border-white/40 hover:text-white/80'
                }`}>
                {key !== 'all' && `${icon} `}{label}
                {counts[key] != null && (
                  <span className={`ml-1.5 ${activeCat === key ? 'text-[#1C1C1C]/60' : 'text-white/30'}`}>
                    {counts[key]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loadingProds && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonDark key={i} />)}
            </div>
          )}

          {/* Error */}
          {!loadingProds && prodError && (
            <div className="text-center py-20 space-y-4">
              <p className="text-white/40 text-sm">{prodError}</p>
              <button onClick={fetchProducts}
                className="border border-white/20 text-white/60 px-8 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all">
                重試
              </button>
            </div>
          )}

          {/* Empty — no products */}
          {!loadingProds && !prodError && products.length === 0 && (
            <div className="text-center py-20 space-y-6">
              <p className="text-5xl">🌸</p>
              <div className="space-y-2">
                <p className="text-white/60 font-black text-sm">尚未有商品情報</p>
                <p className="text-white/30 text-xs">點擊下方按鈕，讓 AI 搜尋最新日本商品</p>
              </div>
              <button onClick={handleScrape} disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50">
                {scraping ? '搜尋中…' : '✦ AI 搜尋最新商品'}
              </button>
            </div>
          )}

          {/* Empty — filter returns nothing */}
          {!loadingProds && !prodError && products.length > 0 && displayed.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <p className="text-white/40 text-sm">此品類暫無商品情報</p>
              <button onClick={() => setActiveCat('all')}
                className="border border-white/20 text-white/60 px-8 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all">
                顯示全部
              </button>
            </div>
          )}

          {/* Grid */}
          {!loadingProds && !prodError && displayed.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayed.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}

          <div className="text-center pt-4">
            <a href={url('/products')}
              className="inline-block border border-white text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all">
              查看所有商品情報 →
            </a>
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY ═════════════════════════════════════════ */}
      <section id="philosophy" className="bg-white py-28 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div className="space-y-5">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Our Philosophy</p>
              <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
                為何選擇<br />
                <span className="text-[#C5A059] italic font-serif font-normal text-3xl">Michi</span>
              </h2>
              <p className="text-stone-500 text-base font-light leading-relaxed">
                由 Global EZshop 創辦人於 2011 年起深耕日本代購，13 年經驗造就 Michi——
                連接全球買家與日本在地買手的資訊索引平台。
              </p>
            </div>
            <div className="space-y-7">
              {[
                { num: '01', title: '真實業者背景',  desc: '由 13 年代購經驗的 Global EZshop 創辦人建立，非一般 startup，有真實辦公室與買手網絡。' },
                { num: '02', title: 'AI 即時情報',   desc: '每日由 AI 搜尋護膚美妝、名牌精品、動漫時裝、手袋鞋履七大品類最新商品發布，第一手掌握。' },
                { num: '03', title: '透明資訊平台',  desc: 'Michi 不介入交易，直接連接買家與買手，讓你自主安排代購，完全透明。' },
              ].map(item => (
                <div key={item.num} className="flex gap-7 items-start border-l-2 border-stone-100 pl-5 hover:border-[#1A237E] transition-colors">
                  <span className="text-[10px] font-black text-stone-300 tracking-widest mt-1 flex-shrink-0">{item.num}</span>
                  <div>
                    <h4 className="font-black text-[#1C1C1C] mb-1">{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href={url('/about')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              了解更多關於我們 →
            </a>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: '13+',    label: '年代購經驗'   },
                { n: '5,000+', label: '服務客戶'     },
                { n: '4',      label: '日本城市網絡'  },
                { n: '7',      label: '商品品類'     },
              ].map(({ n, label }) => (
                <div key={label} className="bg-stone-50 p-6">
                  <p className="text-3xl font-serif italic text-[#C5A059] mb-2 font-black">{n}</p>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1A237E] p-10 space-y-5">
              <div className="text-5xl opacity-20 font-serif text-white">道</div>
              <blockquote className="text-white/80 text-base font-light leading-relaxed italic">
                「在代購的世界裡，我們是那道引導光線。」
              </blockquote>
              <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">— Michi 核心理念</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}