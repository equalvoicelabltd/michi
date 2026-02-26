'use client';

/**
 * src/app/[locale]/products/page.tsx
 * Navbar & Footer are injected by src/app/[locale]/layout.tsx — do NOT add them here.
 */

import React, { useState, useEffect, useMemo } from 'react';

interface Product {
  id: number;
  title: string;
  description: string | null;
  ai_summary: string | null;
  source: string;
  source_url: string | null;
  category: string;
  image_url: string | null;
  published_at: string;
  ai_generated: boolean;
}

const CATEGORIES = [
  { key: 'all',         label: '全部',    icon: '✦' },
  { key: 'fashion',     label: '時尚服飾', icon: '👘' },
  { key: 'beauty',      label: '美容護膚', icon: '💄' },
  { key: 'anime',       label: '動漫周邊', icon: '🎌' },
  { key: 'food',        label: '零食食品', icon: '🍡' },
  { key: 'electronics', label: '電子產品', icon: '📱' },
  { key: 'craft',       label: '工藝文化', icon: '🏮' },
];

const CATEGORY_MAP: Record<string, { label: string; icon: string; color: string }> = {
  fashion:     { label: '時尚服飾', icon: '👘', color: '#1A237E' },
  beauty:      { label: '美容護膚', icon: '💄', color: '#B22222' },
  anime:       { label: '動漫周邊', icon: '🎌', color: '#C5A059' },
  food:        { label: '零食食品', icon: '🍡', color: '#2E7D32' },
  electronics: { label: '電子產品', icon: '📱', color: '#4A148C' },
  craft:       { label: '工藝文化', icon: '🏮', color: '#BF360C' },
};

function SkeletonCard() {
  return (
    <div className="border border-stone-200 bg-white animate-pulse">
      <div className="aspect-[4/3] bg-stone-100" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-stone-100 rounded w-1/3" />
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-full" />
        <div className="h-3 bg-stone-100 rounded w-5/6" />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORY_MAP[product.category] ?? { label: product.category, icon: '✦', color: '#1C1C1C' };
  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('zh-HK', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <article className="group border border-stone-200 bg-white hover:border-[#1A237E] transition-all duration-300 flex flex-col">
      <div className="aspect-[4/3] bg-stone-50 border-b border-stone-100 flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-5xl">{cat.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: cat.color }}>{cat.label}</span>
          </div>
        )}
        {product.ai_generated && (
          <div className="absolute top-3 right-3 bg-[#1C1C1C] text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1">AI 情報</div>
        )}
        <div className="absolute top-3 left-3 text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1" style={{ backgroundColor: cat.color }}>
          {cat.icon} {cat.label}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-400">{product.source}</span>
          <span className="text-[8px] text-stone-300 font-bold">{formatDate(product.published_at)}</span>
        </div>
        <h3 className="text-sm font-black text-[#1C1C1C] leading-tight group-hover:text-[#1A237E] transition-colors line-clamp-2">
          {product.title}
        </h3>
        {product.ai_summary && (
          <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-3 flex-1">{product.ai_summary}</p>
        )}
        {product.source_url && (
          <a href={product.source_url} target="_blank" rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#1A237E] hover:text-[#B22222] transition-colors border-t border-stone-100 pt-3">
            <span>查看原文</span><span className="ml-auto">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

function EmptyState({ onRefresh, refreshing }: { onRefresh: () => void; refreshing: boolean }) {
  return (
    <div className="text-center py-28 space-y-6">
      <p className="text-6xl">🍃</p>
      <div className="space-y-2">
        <p className="text-stone-600 font-black text-sm">尚未有商品情報</p>
        <p className="text-stone-400 text-xs">點擊下方按鈕，讓 AI 為你搜尋最新日本商品</p>
      </div>
      <button onClick={onRefresh} disabled={refreshing}
        className="border border-[#1A237E] text-[#1A237E] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white transition-all disabled:opacity-50">
        {refreshing ? '搜尋中…' : '✦ AI 搜尋最新商品'}
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts]     = useState<Product[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch]         = useState('');
  const [sortBy, setSortBy]         = useState<'newest' | 'category'>('newest');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products ?? []);
      else setError(data.error || '無法載入商品');
    } catch { setError('無法連接伺服器，請稍後再試'); }
    finally { setLoading(false); }
  };

  const handleRefresh = async () => {
    setRefreshing(true); setRefreshMsg('');
    try {
      const res = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) { setRefreshMsg(`✦ 已新增 ${data.count} 件最新商品`); await fetchProducts(); }
      else setRefreshMsg(`⚠ ${data.error || '更新失敗'}`);
    } catch { setRefreshMsg('⚠ 網絡錯誤，請稍後再試'); }
    finally { setRefreshing(false); setTimeout(() => setRefreshMsg(''), 6000); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const displayed = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.ai_summary ?? '').toLowerCase().includes(q) ||
        p.source.toLowerCase().includes(q)
      );
    }
    return sortBy === 'newest'
      ? [...list].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      : [...list].sort((a, b) => a.category.localeCompare(b.category));
  }, [products, activeCategory, search, sortBy]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [products]);

  return (
    <div className="bg-[#F9F7F2] min-h-screen flex flex-col">

      {/* HERO */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Michi × AI · 商品情報</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                日本最新<br /><span className="text-[#C5A059]">商品情報</span>
              </h1>
              <p className="text-[12px] text-white/50 max-w-md leading-relaxed">
                由 AI 每日自動搜尋日本最新商品發佈，涵蓋時尚、美妝、動漫、電子、食品及工藝文化，讓你掌握第一手資訊。
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <button onClick={handleRefresh} disabled={refreshing}
                className="flex items-center gap-3 border border-white/20 text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all disabled:opacity-40">
                <span className={refreshing ? 'animate-spin inline-block' : ''}>✦</span>
                {refreshing ? 'AI 搜尋中…' : 'AI 更新商品情報'}
              </button>
              {refreshMsg && <p className="text-[10px] font-bold text-[#C5A059] tracking-wide">{refreshMsg}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-wrap gap-6 items-center">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">商品總覽</span>
          {CATEGORIES.filter(c => c.key !== 'all').map(c => (
            <div key={c.key} className="flex items-center gap-1.5">
              <span className="text-xs">{c.icon}</span>
              <span className="text-[9px] font-bold text-stone-500">{c.label}</span>
              <span className="text-[9px] font-black text-[#1A237E]">{counts[c.key] ?? 0}</span>
            </div>
          ))}
          <span className="ml-auto text-[9px] font-bold text-stone-300">共 {products.length} 件商品</span>
        </div>
      </div>

      {/* FILTERS */}
      <section className="bg-white border-b border-stone-200 sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-8 py-4 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="搜尋商品名稱、品牌…"
                className="w-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
              <span className="absolute right-3 top-2.5 text-stone-400 text-sm pointer-events-none">🔍</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map(({ key, label, icon }) => (
                <button key={key} onClick={() => setActiveCategory(key)}
                  className={`px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeCategory === key ? 'bg-[#1A237E] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}>
                  {key !== 'all' && `${icon} `}{label}
                  {counts[key] != null && (
                    <span className={`ml-1 ${activeCategory === key ? 'text-white/60' : 'text-stone-400'}`}>{counts[key]}</span>
                  )}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="ml-auto border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
              <option value="newest">最新優先</option>
              <option value="category">按分類</option>
            </select>
          </div>
          {search && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-stone-400">搜尋結果：{displayed.length} 件</span>
              <button onClick={() => setSearch('')} className="text-[9px] font-black text-[#B22222] hover:underline uppercase tracking-wider">清除</button>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-14 w-full">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {!loading && error && (
          <div className="text-center py-28 space-y-4">
            <p className="text-5xl">⚠️</p>
            <p className="text-stone-500 font-bold text-sm">{error}</p>
            <button onClick={fetchProducts}
              className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              重新載入
            </button>
          </div>
        )}
        {!loading && !error && products.length === 0 && <EmptyState onRefresh={handleRefresh} refreshing={refreshing} />}
        {!loading && !error && products.length > 0 && displayed.length === 0 && (
          <div className="text-center py-28 space-y-4">
            <p className="text-5xl">🔍</p>
            <p className="text-stone-400 font-bold text-sm">找不到符合條件的商品</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              清除篩選
            </button>
          </div>
        )}
        {!loading && !error && displayed.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {displayed.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </main>

      {/* HOW IT WORKS */}
      <section className="bg-[#1C1C1C] text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">平台運作方式</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'AI 每日搜尋',   desc: '系統每天自動使用 AI 搜尋日本各大品牌最新商品發佈，涵蓋 6 大分類。' },
              { step: '02', title: '繁中摘要生成',   desc: 'OpenAI 為每件商品生成繁體中文摘要，包括品牌特色、適合人群及購買價值。' },
              { step: '03', title: '聯絡買手代購',   desc: '發現心水商品後，前往「找買手」頁面聯絡在日買手，直接安排代購。' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="space-y-4 border-t border-white/10 pt-6">
                <span className="text-[#C5A059] font-black text-xs tracking-[0.4em]">{step}</span>
                <h3 className="font-black text-base">{title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-black text-sm">找到心儀商品？立即聯絡買手代購。</p>
            <a href="/buyers"
              className="text-[10px] font-black uppercase tracking-[0.3em] border border-[#C5A059] text-[#C5A059] px-8 py-3 hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all">
              前往找買手 →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}