'use client';

/**
 * src/app/[locale]/products/page.tsx
 * Navbar / Footer provided by src/app/[locale]/layout.tsx — not repeated here.
 */

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Product {
  id: string;
  title: string;
  description: string | null;
  ai_summary: string | null;
  source: string | null;
  source_url: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string;
  ai_generated: boolean;
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES — 7 品類（與 products/route.ts 及 MichiMarketplace.tsx 一致）
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
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
// SKELETON
// ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="border border-stone-200 bg-white animate-pulse">
      <div className="aspect-[4/3] bg-stone-100" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-stone-100 rounded w-1/3" />
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-full" />
        <div className="h-3 bg-stone-100 rounded w-5/6" />
        <div className="h-3 bg-stone-100 rounded w-2/3" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORY_MAP[product.category ?? ''] ?? {
    label: product.category ?? '', icon: '✦', color: '#1C1C1C',
  };
  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('zh-HK', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <article className="group border border-stone-200 bg-white hover:border-[#1A237E] transition-all duration-300 flex flex-col">
      {/* Image / Placeholder */}
      <div className="aspect-[4/3] bg-stone-50 border-b border-stone-100 flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-6xl">{cat.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: cat.color }}>
              {cat.label}
            </span>
          </div>
        )}

        {/* Badges */}
        {product.ai_generated && (
          <div className="absolute top-3 right-3 bg-[#1C1C1C] text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1">
            AI 情報
          </div>
        )}
        <div className="absolute top-3 left-3 text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1"
          style={{ backgroundColor: cat.color }}>
          {cat.icon} {cat.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-400">
            {product.source ?? 'Japan'}
          </span>
          <span className="text-[8px] text-stone-300 font-bold">{formatDate(product.published_at)}</span>
        </div>

        <h3 className="text-sm font-black text-[#1C1C1C] leading-tight group-hover:text-[#1A237E] transition-colors line-clamp-2">
          {product.title}
        </h3>

        {product.ai_summary && (
          <div className="border-l-2 border-stone-200 group-hover:border-[#C5A059] pl-3 transition-colors flex-1">
            <p className="text-[10px] text-stone-500 leading-relaxed line-clamp-5">
              {product.ai_summary}
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <span className="text-[8px] font-black uppercase tracking-wider text-white px-2 py-1"
            style={{ backgroundColor: cat.color }}>
            {cat.label}
          </span>
          {product.source_url ? (
            <a href={product.source_url} target="_blank" rel="noopener noreferrer"
              className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1A237E] hover:text-[#B22222] transition-colors">
              查看原文 ↗
            </a>
          ) : (
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-wider">Japan Exclusive</span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────
function EmptyState({ onRefresh, refreshing }: { onRefresh: () => void; refreshing: boolean }) {
  return (
    <div className="text-center py-32 space-y-6">
      <p className="text-6xl">🌸</p>
      <div className="space-y-2">
        <p className="text-stone-600 font-black text-sm">尚未有商品情報</p>
        <p className="text-stone-400 text-xs">點擊下方按鈕，讓 AI 搜尋最新日本商品</p>
      </div>
      <button onClick={onRefresh} disabled={refreshing}
        className="border border-[#1A237E] text-[#1A237E] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white transition-all disabled:opacity-50">
        {refreshing ? '搜尋中…' : '✦ AI 搜尋最新商品'}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const locale = useLocale();
  const url = (path: string) => `/${locale}${path}`;

  const [products, setProducts]               = useState<Product[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState('');
  const [refreshing, setRefreshing]           = useState(false);
  const [refreshMsg, setRefreshMsg]           = useState('');
  const [activeCategory, setActiveCategory]   = useState('all');
  const [search, setSearch]                   = useState('');
  const [sortBy, setSortBy]                   = useState<'newest' | 'category'>('newest');

  // ── Fetch ──────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res  = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products ?? []);
      else setError(data.error || '無法載入商品');
    } catch { setError('無法連接伺服器，請稍後再試'); }
    finally { setLoading(false); }
  };

  // ── AI Refresh ─────────────────────────────────────────────
  const handleRefresh = async () => {
    setRefreshing(true); setRefreshMsg('');
    try {
      const res  = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) {
        setRefreshMsg(`✦ 已新增 ${data.count} 件最新商品`);
        await fetchProducts();
      } else {
        setRefreshMsg(`⚠ ${data.error || '更新失敗'}`);
      }
    } catch { setRefreshMsg('⚠ 網絡錯誤，請稍後再試'); }
    finally { setRefreshing(false); setTimeout(() => setRefreshMsg(''), 7000); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Filtered / sorted list ─────────────────────────────────
  const displayed = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.ai_summary ?? '').toLowerCase().includes(q) ||
        (p.source ?? '').toLowerCase().includes(q)
      );
    }
    return sortBy === 'newest'
      ? [...list].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      : [...list].sort((a, b) => (a.category ?? '').localeCompare(b.category ?? ''));
  }, [products, activeCategory, search, sortBy]);

  // ── Counts per category ────────────────────────────────────
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: products.length };
    for (const p of products) { const c = p.category ?? 'other'; m[c] = (m[c] ?? 0) + 1; }
    return m;
  }, [products]);

  // ════════════════════════════════════════════════════════════
  return (
    <div className="bg-[#F9F7F2] min-h-screen flex flex-col">

      {/* ══ HERO HEADER ════════════════════════════════════════ */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
                Michi × AI · 商品情報
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                日本最新<br />
                <span className="text-[#C5A059]">商品情報</span>
              </h1>
              <p className="text-[12px] text-white/50 max-w-lg leading-relaxed">
                AI 每日自動搜尋日本最新商品發布。護膚、美妝、名牌精品、動漫、時裝、手袋、鞋履，
                七大品類第一手情報，日本限定盡在掌握。
              </p>
            </div>

            {/* Refresh button */}
            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <button onClick={handleRefresh} disabled={refreshing}
                className="flex items-center gap-3 border border-white/20 text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all disabled:opacity-40">
                <span className={refreshing ? 'animate-spin inline-block' : ''}>✦</span>
                {refreshing ? 'AI 搜尋中…' : 'AI 更新情報'}
              </button>
              {refreshMsg && <p className="text-[10px] font-bold text-[#C5A059] tracking-wide">{refreshMsg}</p>}
            </div>
          </div>

          {/* Category quick-jump strip */}
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.filter(c => c.key !== 'all').map(c => (
              <button key={c.key} onClick={() => setActiveCategory(c.key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all ${
                  activeCategory === c.key
                    ? 'bg-[#C5A059] text-[#1C1C1C]'
                    : 'border border-white/15 text-white/50 hover:border-white/40 hover:text-white'
                }`}>
                <span>{c.icon}</span>
                <span>{c.label}</span>
                {counts[c.key] != null && (
                  <span className={activeCategory === c.key ? 'text-[#1C1C1C]/50' : 'text-white/30'}>
                    {counts[c.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COUNTS BAR ═════════════════════════════════════════ */}
      <div className="bg-[#1A237E] text-white">
        <div className="max-w-7xl mx-auto px-8 py-3 flex flex-wrap gap-5 items-center">
          <button onClick={() => setActiveCategory('all')}
            className={`text-[9px] font-black uppercase tracking-[0.4em] transition-colors ${
              activeCategory === 'all' ? 'text-[#C5A059]' : 'text-white/50 hover:text-white'
            }`}>
            全部 {products.length}
          </button>
          {CATEGORIES.filter(c => c.key !== 'all').map(c => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)}
              className={`flex items-center gap-1 text-[9px] font-bold transition-colors ${
                activeCategory === c.key ? 'text-[#C5A059]' : 'text-white/40 hover:text-white'
              }`}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
              <span className="font-black">{counts[c.key] ?? 0}</span>
            </button>
          ))}
          <span className="ml-auto text-[9px] font-bold text-white/30">共 {products.length} 件商品</span>
        </div>
      </div>

      {/* ══ STICKY FILTER BAR ══════════════════════════════════ */}
      <section className="bg-white border-b border-stone-200 sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="搜尋品牌、商品名稱…"
                className="w-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm pr-9 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
              <span className="absolute right-3 top-2.5 text-stone-400 text-sm pointer-events-none">🔍</span>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(({ key, label, icon }) => (
                <button key={key} onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeCategory === key ? 'bg-[#1A237E] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}>
                  {key !== 'all' && `${icon} `}{label}
                  {counts[key] != null && (
                    <span className={`ml-1 ${activeCategory === key ? 'text-white/60' : 'text-stone-400'}`}>
                      {counts[key]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'category')}
              className="ml-auto border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
              <option value="newest">最新優先</option>
              <option value="category">按品類</option>
            </select>
          </div>

          {/* Active filter info */}
          {(search || activeCategory !== 'all') && (
            <div className="flex items-center gap-3 mt-2.5">
              <span className="text-[9px] font-bold text-stone-400">
                找到 {displayed.length} 件
                {activeCategory !== 'all' ? `「${CATEGORY_MAP[activeCategory]?.label ?? activeCategory}」` : ''}
                商品
              </span>
              <button onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="text-[9px] font-black text-[#B22222] hover:underline uppercase tracking-wider">
                清除篩選
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ MAIN GRID ══════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-14 w-full">

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-32 space-y-4">
            <p className="text-5xl">⚠️</p>
            <p className="text-stone-500 font-bold text-sm">{error}</p>
            <button onClick={fetchProducts}
              className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              重新載入
            </button>
          </div>
        )}

        {/* Empty — no products at all */}
        {!loading && !error && products.length === 0 && (
          <EmptyState onRefresh={handleRefresh} refreshing={refreshing} />
        )}

        {/* Empty after filter */}
        {!loading && !error && products.length > 0 && displayed.length === 0 && (
          <div className="text-center py-32 space-y-4">
            <p className="text-5xl">🔍</p>
            <p className="text-stone-400 font-bold text-sm">找不到符合條件的商品</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              清除篩選
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && displayed.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {displayed.map(product => <ProductCard key={product.id} product={product} />)}
            </div>

            {/* Refresh CTA if many results */}
            {displayed.length >= 18 && (
              <div className="text-center mt-14">
                <button onClick={handleRefresh} disabled={refreshing}
                  className="border border-[#1A237E] text-[#1A237E] px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white transition-all disabled:opacity-50">
                  {refreshing ? 'AI 搜尋中…' : '✦ 載入更多最新商品'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
      <section className="bg-[#1C1C1C] text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25 mb-10">
            平台運作方式
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01', title: 'AI 每日搜尋',
                desc: '系統每天自動搜尋護膚、美妝、名牌精品、動漫、時裝、手袋、鞋履七大品類的日本最新商品發布。',
              },
              {
                step: '02', title: '繁中摘要生成',
                desc: 'OpenAI 為每件商品生成繁體中文摘要，涵蓋品牌特色、商品亮點及代購價值，讓你一看即明。',
              },
              {
                step: '03', title: '聯絡買手代購',
                desc: '發現心水商品後，前往「找買手」頁面聯絡在日買手，直接安排代購服務，Michi 不介入交易。',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="space-y-4 border-t border-white/10 pt-6">
                <span className="text-[#C5A059] font-black text-xs tracking-[0.4em]">{step}</span>
                <h3 className="font-black text-base">{title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-black text-sm">找到心水商品？立即聯絡買手代購。</p>
            <a href={url('/buyers')}
              className="text-[10px] font-black uppercase tracking-[0.3em] border border-[#C5A059] text-[#C5A059] px-8 py-3 hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all">
              前往找買手 →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}