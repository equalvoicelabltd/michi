'use client';

import { useEffect, useState } from 'react';

// ============================================================
// TYPES
// ============================================================
interface Shopper {
  id: number;
  name: string;
  icon: string;
  location: string;
  experience: string;
  specialty: string;
  specialtyLabel: string;
  score: string;
  reviews: number;
  tags: string[];
  filter: string;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  ai_summary?: string;
  published_at: string;
  image_url?: string;
  source_url?: string;
}

// ============================================================
// MOCK DATA
// ============================================================
const SHOPPERS: Shopper[] = [
  {
    id: 1,
    name: 'Yuki Tanaka',
    icon: '🌸',
    location: '東京',
    experience: '8年',
    specialty: 'FASHION',
    specialtyLabel: 'Fashion',
    score: '★ 4.9',
    reviews: 312,
    tags: ['Harajuku', 'Vintage', 'Streetwear'],
    filter: 'fashion',
    description: '原宿時尚達人，專注裏原宿 vintage 及限定聯名系列。',
  },
  {
    id: 2,
    name: 'Kenji Matsuda',
    icon: '🎌',
    location: '大阪',
    experience: '5年',
    specialty: 'ANIME',
    specialtyLabel: 'Anime',
    score: '★ 4.8',
    reviews: 198,
    tags: ['Gundam', 'Figure', 'Goods'],
    filter: 'anime',
    description: '動漫周邊收藏家，熟悉各大会場限定及一番賞商品。',
  },
  {
    id: 3,
    name: 'Mei Aoyama',
    icon: '🏺',
    location: '京都',
    experience: '12年',
    specialty: 'VINTAGE',
    specialtyLabel: 'Vintage',
    score: '★ 5.0',
    reviews: 445,
    tags: ['陶藝', '古布', '民藝'],
    filter: 'vintage',
    description: '京都傳統工藝職人，深入市場尋找稀有古董與手工藝品。',
  },
  {
    id: 4,
    name: 'Ryo Shimizu',
    icon: '💻',
    location: '東京',
    experience: '6年',
    specialty: 'TECH',
    specialtyLabel: 'Electronics',
    score: '★ 4.7',
    reviews: 267,
    tags: ['電子', 'Apple', 'Sony'],
    filter: 'fashion',
    description: '秋葉原常駐，最新電子產品及限定版發售第一手資訊。',
  },
  {
    id: 5,
    name: 'Hana Fujita',
    icon: '🌿',
    location: '福岡',
    experience: '4年',
    specialty: 'BEAUTY',
    specialtyLabel: 'Beauty',
    score: '★ 4.9',
    reviews: 189,
    tags: ['美妝', '護膚', '藥粧'],
    filter: 'fashion',
    description: '藥妝店達人，熟悉各大品牌限定色及季節限定商品。',
  },
  {
    id: 6,
    name: 'Takashi Ono',
    icon: '🎴',
    location: '名古屋',
    experience: '9年',
    specialty: 'ANIME',
    specialtyLabel: 'Anime',
    score: '★ 4.8',
    reviews: 334,
    tags: ['遊戲', 'Pokemon', '卡牌'],
    filter: 'anime',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉各地中古市場。',
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MichiMarketplace() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredShoppers, setFilteredShoppers] = useState<Shopper[]>(SHOPPERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);
  const [scraping, setScraping] = useState(false);
  const [buyerSearch, setBuyerSearch] = useState('');

  // ── Fetch products from API ──────────────────────────────
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductError(null);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        setProductError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setProductError('Network error. Please try again.');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ── Filter shoppers ──────────────────────────────────────
  const filterShoppers = (f: string) => {
    setActiveFilter(f);
    setFilteredShoppers(f === 'all' ? SHOPPERS : SHOPPERS.filter((s) => s.filter === f));
  };

  // ── Search shoppers ──────────────────────────────────────
  const searchedShoppers = filteredShoppers.filter(
    (s) =>
      buyerSearch === '' ||
      s.name.toLowerCase().includes(buyerSearch.toLowerCase()) ||
      s.location.includes(buyerSearch) ||
      s.tags.some((t) => t.toLowerCase().includes(buyerSearch.toLowerCase()))
  );

  // ── Trigger AI scrape ────────────────────────────────────
  const handleScrape = async () => {
    setScraping(true);
    try {
      const res = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) {
        await fetchProducts();
      }
    } catch (_) {
      // silent
    } finally {
      setScraping(false);
    }
  };

  // ── Format date ──────────────────────────────────────────
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('zh-HK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  // ── Category badge color ─────────────────────────────────
  const categoryColor: Record<string, string> = {
    fashion: 'bg-pink-50 text-pink-700 border-pink-200',
    beauty: 'bg-rose-50 text-rose-700 border-rose-200',
    electronics: 'bg-blue-50 text-blue-700 border-blue-200',
    home: 'bg-amber-50 text-amber-700 border-amber-200',
    anime: 'bg-purple-50 text-purple-700 border-purple-200',
    food: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — 代購買手市場
      ═══════════════════════════════════════════════════════ */}
      <section id="market" className="max-w-7xl mx-auto px-6 py-24 space-y-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
              Section 01 — 代購買手市場
            </p>
            <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
              尋找你的<br />
              <span className="italic text-[#C5A059] font-normal">專屬代購職人</span>
            </h2>
            <p className="text-stone-500 text-sm max-w-lg leading-relaxed">
              認識日本各地的專業代購員。每位職人均通過 Michi 認證，確保您的每次購物都安心可靠。
            </p>
          </div>

          {/* Search + filter row */}
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋城市、專長或標籤…"
                value={buyerSearch}
                onChange={(e) => setBuyerSearch(e.target.value)}
                className="w-full lg:w-72 px-4 py-3 text-sm border border-stone-200 bg-white focus:outline-none focus:border-[#1A237E] text-[#1C1C1C] placeholder-stone-400"
              />
              <span className="absolute right-3 top-3 text-stone-400 text-xs">🔍</span>
            </div>

            {/* Category tabs */}
            <div className="flex gap-6 border-b border-stone-200 pb-2">
              {[
                { key: 'all', label: 'ALL' },
                { key: 'vintage', label: 'VINTAGE' },
                { key: 'anime', label: 'ANIME' },
                { key: 'fashion', label: 'FASHION' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => filterShoppers(key)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 transition-colors ${
                    activeFilter === key
                      ? 'text-[#1A237E] border-b-2 border-[#1A237E] -mb-[2px]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shopper grid */}
        {searchedShoppers.length === 0 ? (
          <p className="text-stone-400 text-center py-16">找不到符合條件的代購職人</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {searchedShoppers.map((shopper) => (
              <div key={shopper.id} className="group">
                {/* Avatar card */}
                <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center relative overflow-hidden border border-stone-200">
                  <span className="z-10 text-7xl">{shopper.icon}</span>
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all" />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
                    {shopper.specialtyLabel}
                  </div>
                  {/* Verified badge */}
                  <div className="absolute bottom-4 left-4 bg-[#1A237E] text-white text-[8px] font-black px-2 py-1 uppercase tracking-wider">
                    ✓ Michi 認證
                  </div>
                </div>

                {/* Info */}
                <div className="mt-0 space-y-4 bg-white p-6 border border-stone-200 border-t-0">
                  <div className="flex justify-between items-end border-b border-stone-100 pb-2">
                    <h4 className="text-xl font-serif text-[#1C1C1C] font-black group-hover:text-[#B22222] transition-colors">
                      {shopper.name}
                    </h4>
                    <span className="font-serif italic text-[#C5A059] font-normal">{shopper.score}</span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed">{shopper.description}</p>

                  <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                    {shopper.location} · {shopper.experience} 經驗 · {shopper.reviews} 評價
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {shopper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-stone-500 border border-stone-100 px-2 py-1 uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ✅ FIX: Use <a> with mailto or href, NOT plain <button> */}
                  <a
                    href={`mailto:hello@michi.jp?subject=代購諮詢 - ${shopper.name}`}
                    className="block w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all text-center"
                  >
                    聯絡職人
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ FIX: "更多代購職人" — link to /buyers page */}
        <div className="text-center pt-4">
          <a
            href="/en/buyers"
            className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
          >
            更多代購職人 →
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — 日本最新商品情報 (AI-powered)
      ═══════════════════════════════════════════════════════ */}
      <section id="products" className="bg-[#1C1C1C] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">
                Section 02 — AI 商品情報
              </p>
              <h2 className="text-5xl font-serif font-black leading-tight">
                日本最新商品情報<br />
                <span className="text-[#C5A059] italic font-normal text-3xl">Latest Japanese Releases</span>
              </h2>
              <p className="text-stone-400 text-sm max-w-xl leading-relaxed">
                AI 實時監測日本官方發布的最新商品、聯名系列與工藝佳作，每日自動更新資訊要點。
              </p>
            </div>

            {/* Refresh button */}
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="self-start lg:self-end flex items-center gap-2 border border-stone-600 text-stone-400 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all disabled:opacity-40"
            >
              {scraping ? (
                <>
                  <span className="animate-spin">⟳</span> AI 搜尋中…
                </>
              ) : (
                <>⟳ AI 更新商品</>
              )}
            </button>
          </div>

          {/* Product grid */}
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-stone-800 animate-pulse h-72 rounded-none" />
              ))}
            </div>
          ) : productError ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-stone-400 text-sm">{productError}</p>
              <button
                onClick={fetchProducts}
                className="border border-stone-600 text-stone-400 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all"
              >
                重試
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-stone-400 text-sm">暫無商品資訊。點擊「AI 更新商品」搜尋最新情報。</p>
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-40"
              >
                {scraping ? 'AI 搜尋中…' : '🤖 立即 AI 搜尋'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all group flex flex-col"
                >
                  {/* Image / placeholder */}
                  <div className="aspect-video bg-stone-800 overflow-hidden relative">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-700">
                        <span className="text-6xl opacity-20 font-serif">道</span>
                      </div>
                    )}
                    {/* Category badge */}
                    {product.category && (
                      <span
                        className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2 py-1 border ${
                          categoryColor[product.category.toLowerCase()] ||
                          'bg-stone-700 text-stone-300 border-stone-600'
                        }`}
                      >
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <h3 className="font-serif font-black text-lg text-white leading-tight line-clamp-2">
                      {product.title}
                    </h3>

                    {product.ai_summary && (
                      <div className="border-l-2 border-[#C5A059] pl-3">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#C5A059] mb-1">
                          AI 摘要
                        </p>
                        <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                          {product.ai_summary}
                        </p>
                      </div>
                    )}

                    {!product.ai_summary && product.description && (
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-stone-800 flex justify-between items-center">
                      <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                        {product.source} · {formatDate(product.published_at)}
                      </span>

                      <div className="flex gap-3">
                        {/* ✅ FIX: "了解更多" — link to source URL or product detail */}
                        {product.source_url ? (
                          <a
                            href={product.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-black uppercase tracking-widest text-[#1A237E] hover:text-white transition-colors"
                          >
                            了解更多 ↗
                          </a>
                        ) : (
                          <a
                            href={`/en/products/${product.id}`}
                            className="text-[9px] font-black uppercase tracking-widest text-[#1A237E] hover:text-white transition-colors"
                          >
                            了解更多 →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ✅ FIX: "更多產品" — link to /products page */}
          <div className="text-center pt-4">
            <a
              href="/en/products"
              className="inline-block border border-white text-white px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all"
            >
              更多產品 →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}