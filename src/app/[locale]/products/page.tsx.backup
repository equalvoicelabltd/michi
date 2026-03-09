'use client';

import { useEffect, useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string;
  source: string;
  ai_summary: string | null;
  published_at: string;
  image_url?: string | null;
  source_url?: string | null;
  ai_generated?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  fashion: '👔', beauty: '🌿', anime: '⚡', food: '☕', electronics: '📷', craft: '🎋', luxury: '💎', all: '◉',
};
const CAT_KEYS = ['all', 'fashion', 'beauty', 'anime', 'food', 'electronics', 'craft'];

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'category'>('newest');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products ?? []);
      else setError(t('products.errorLoad'));
    } catch { setError(t('products.errorNetwork')); }
    finally { setLoading(false); }
  };

  const handleRefresh = async () => {
    setRefreshing(true); setRefreshMsg('');
    try {
      const res = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) { setRefreshMsg(`✦ ${t('products.scrapeSuccess')} ${data.count ?? 0}`); await fetchProducts(); }
      else setRefreshMsg(`⚠ ${data.error || t('products.scrapeFail')}`);
    } catch { setRefreshMsg(`⚠ ${t('products.errorNetwork')}`); }
    finally { setRefreshing(false); setTimeout(() => setRefreshMsg(''), 6000); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const displayed = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || (p.ai_summary ?? '').toLowerCase().includes(q) || p.source.toLowerCase().includes(q));
    }
    return sortBy === 'newest'
      ? [...list].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      : [...list].sort((a, b) => a.category.localeCompare(b.category));
  }, [products, activeCategory, searchQuery, sortBy]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [products]);

  const localeMap: Record<string, string> = { zh: 'zh-TW', 'zh-CN': 'zh-CN', en: 'en-US', ja: 'ja-JP', th: 'th-TH' };
  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString(localeMap[locale] ?? 'en-US', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <main className="min-h-screen bg-[#1C1C1C]">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative pt-20 pb-14 px-8 overflow-hidden">
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[28rem] font-serif text-white/[0.02] pointer-events-none select-none leading-none">情</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">AI · Japan Product Intelligence</p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                {t('pp.heroTitle1')}<br /><span className="text-[#C5A059] italic font-serif font-normal text-3xl">{t('pp.heroTitle2')}</span>
              </h1>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">{t('pp.heroDesc')}</p>
            </div>
            <button onClick={handleRefresh} disabled={refreshing}
              className="flex-shrink-0 border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50 flex items-center gap-2">
              {refreshing ? <><span className="w-3 h-3 border border-[#C5A059] border-t-transparent rounded-full animate-spin" />{t('products.aiRefreshing')}</> : <>✦ {t('products.aiRefresh')}</>}
            </button>
          </div>
          {refreshMsg && <p className="mt-4 text-[10px] font-bold text-white/50">{refreshMsg}</p>}
        </div>
      </section>

      {/* ══ SEARCH + FILTERS ══════════════════════════════ */}
      <section className="border-t border-b border-white/10 px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('pp.searchPlaceholder')}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-[#C5A059] placeholder-white/30" />
              <span className="absolute right-3 top-2.5 text-white/30 text-sm pointer-events-none">🔍</span>
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 text-white/60 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-[#C5A059]">
              <option value="newest">{t('pp.sort_newest')}</option>
              <option value="category">{t('pp.sort_category')}</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {CAT_KEYS.map(key => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all border ${
                  activeCategory === key ? 'bg-[#C5A059] text-[#1C1C1C] border-[#C5A059]' : 'border-white/20 text-white/50 hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}>
                {CATEGORY_ICONS[key]} {t(`products.categories.${key}`)} {counts[key] !== undefined ? `(${counts[key]})` : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCT GRID ═══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse">
                <div className="aspect-[4/3] bg-white/5" />
                <div className="p-6 space-y-3"><div className="h-3 bg-white/10 rounded w-1/3" /><div className="h-4 bg-white/15 rounded w-3/4" /><div className="h-3 bg-white/10 rounded w-full" /></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-28 space-y-4">
            <p className="text-4xl">⚠️</p>
            <p className="text-white/50 font-bold text-sm">{error}</p>
            <button onClick={() => { setError(''); setLoading(true); fetchProducts(); }}
              className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all">{t('products.retry')}</button>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-28 space-y-4">
            <p className="text-5xl">📦</p>
            <p className="text-white/40 font-bold text-sm">{t('products.noProducts')}</p>
            <button onClick={handleRefresh} disabled={refreshing}
              className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50">
              ✦ {t('products.aiRefresh')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(product => {
              const catLabel = t(`products.categories.${product.category}`) || product.category;
              const icon = CATEGORY_ICONS[product.category] ?? '✦';
              return (
                <article key={product.id} className="group border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col">
                  {product.image_url ? (
                    <div className="aspect-[4/3] overflow-hidden border-b border-white/10 relative">
                      <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.ai_generated && <div className="absolute top-3 right-3 bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1">AI</div>}
                      <div className="absolute top-3 left-3 text-white text-[7px] font-black uppercase tracking-[0.3em] px-2 py-1 bg-[#1C1C1C]/80">{icon} {catLabel}</div>
                    </div>
                  ) : null}
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#C5A059]">{catLabel}</span>
                      <span className="text-[8px] text-white/30 font-bold">{formatDate(product.published_at)}</span>
                    </div>
                    <h3 className="text-sm font-black text-white leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2">{product.title}</h3>
                    {product.ai_summary && (
                      <div className="border-l-2 border-[#C5A059]/40 pl-3 flex-1">
                        <p className="text-[10px] text-white/45 leading-relaxed line-clamp-4">{product.ai_summary}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[9px] font-bold text-white/25 uppercase tracking-widest pt-3 border-t border-white/10 mt-auto">
                      <span>{product.source ?? 'Japan'}</span>
                      {product.source_url ? (
                        <a href={product.source_url} target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:text-white transition-colors">{t('products.viewDetails')} ↗</a>
                      ) : (
                        <span className="text-white/15">Japan Exclusive</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center pt-12">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">{t('products.poweredBy')}</p>
        </div>
      </section>
    </main>
  );
}