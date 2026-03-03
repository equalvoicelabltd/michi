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
  category: string | null;
  source: string | null;
  ai_summary: string | null;
  published_at: string;
  image_url?: string | null;
  source_url?: string | null;
  ai_generated?: boolean;
}

interface BuyerServices {
  livestream: boolean;
  photoVideo: boolean;
  queueing: boolean;
  queueRate: string;
  shipping: boolean;
  paymentTerms: string;
  depositRate: string;
}

interface Buyer {
  id: number;
  name: string;
  nameJp: string;
  icon: string;
  location: string;
  area: string;
  experience: string;
  specialty: string;
  specialtyLabel: string;
  score: number;
  reviews: number;
  commission: string;
  responseTime: string;
  languages: string[];
  tags: string[];
  filter: string;
  description: string;
  level: string;
  levelNum: number;
  highlight: string;
  completedOrders: number;
  services: BuyerServices;
  livestreamRate?: string;
  photoVideoRate?: string;
}

// ─────────────────────────────────────────────────────────────
// BUYERS DATA (names/proper nouns stay as-is; UI labels use t())
// ─────────────────────────────────────────────────────────────
const BUYERS: Buyer[] = [
  {
    id: 1,
    name: 'Tanaka Yuki',
    nameJp: '田中雪',
    icon: '🌸',
    location: '東京 Tokyo',
    area: 'tokyo',
    experience: '8年',
    specialty: 'FASHION',
    specialtyLabel: '時尚服飾',
    score: 4.9,
    reviews: 312,
    commission: '5-8%',
    responseTime: '< 2h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Harajuku', 'Vintage', 'Streetwear', 'Luxury'],
    filter: 'fashion',
    description: '原宿時尚達人，深耕裏原宿 vintage 及限定聯名系列。擅長尋找 Supreme、Palace、Undercover 等品牌限定款。',
    level: 'MICHI 達人',
    levelNum: 4,
    highlight: '專攻 Nike SB 系列及 Tokyo 限定款',
    completedOrders: 1240,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥3,000/h',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '¥5,000/30min',
    photoVideoRate: '¥1,500',
  },
  {
    id: 2,
    name: 'Matsuda Kenji',
    nameJp: '松田健二',
    icon: '⚡',
    location: '大阪 Osaka',
    area: 'osaka',
    experience: '5年',
    specialty: 'ANIME',
    specialtyLabel: '動漫周邊',
    score: 4.8,
    reviews: 198,
    commission: '6-10%',
    responseTime: '< 4h',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Gundam', 'Figure', 'Limited', '一番賞'],
    filter: 'anime',
    description: '大阪動漫周邊專家，精通 Bandai Namco 限定商品及模型。每月親赴秋葉原大阪店搜羅限定品。',
    level: 'MICHI 職人',
    levelNum: 3,
    highlight: '連續 3 年搶得 RG Evangelion 初版',
    completedOrders: 867,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,500/h',
      shipping: true,
      paymentTerms: '50% 訂金',
      depositRate: '50%',
    },
    livestreamRate: '¥3,000/30min',
    photoVideoRate: '¥1,000',
  },
  {
    id: 3,
    name: 'Suzuki Aoi',
    nameJp: '鈴木葵',
    icon: '💄',
    location: '東京 Tokyo',
    area: 'tokyo',
    experience: '6年',
    specialty: 'BEAUTY',
    specialtyLabel: '美容護膚',
    score: 4.9,
    reviews: 445,
    commission: '4-7%',
    responseTime: '< 1h',
    languages: ['繁中', '日文', 'English', 'ไทย'],
    tags: ['SK-II', 'Shiseido', 'Canmake', 'DHC'],
    filter: 'beauty',
    description: '日本藥妝及高端護膚專家，熟悉 @cosme 排名及百貨限定套裝。每週更新最新藥妝優惠情報。',
    level: 'MICHI 達人',
    levelNum: 4,
    highlight: '@cosme Best Awards 年度推薦達人',
    completedOrders: 2100,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: false,
      queueRate: '',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '¥4,000/30min',
    photoVideoRate: '¥800',
  },
  {
    id: 4,
    name: 'Watanabe Riku',
    nameJp: '渡邊陸',
    icon: '🎌',
    location: '京都 Kyoto',
    area: 'kyoto',
    experience: '3年',
    specialty: 'ANIME',
    specialtyLabel: '動漫周邊',
    score: 4.5,
    reviews: 87,
    commission: '8-12%',
    responseTime: '< 6h',
    languages: ['繁中', '日文'],
    tags: ['一番賞', 'Gashapon', 'Limited'],
    filter: 'anime',
    description: '動漫周邊收藏家，熟悉各大会場限定、一番賞及扭蛋稀有商品，全國追蹤。',
    level: 'MICHI 買手',
    levelNum: 2,
    highlight: '京都地區唯一 Michi 動漫專員',
    completedOrders: 310,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,000/h',
      shipping: true,
      paymentTerms: '50% 訂金',
      depositRate: '50%',
    },
    photoVideoRate: '¥500',
  },
  {
    id: 5,
    name: 'Mina Fujii',
    nameJp: '藤井美奈',
    icon: '👠',
    location: '福岡 Fukuoka',
    area: 'fukuoka',
    experience: '4年',
    specialty: 'LUXURY',
    specialtyLabel: '精品名牌',
    score: 4.7,
    reviews: 189,
    commission: '5-8%',
    responseTime: '< 3h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Asics', 'Porter', 'Onitsuka Tiger'],
    filter: 'luxury',
    description: '球鞋及手袋達人，掌握日本限定球鞋抽籤資訊及 Porter、Bao Bao 最新款式。',
    level: 'MICHI 職人',
    levelNum: 3,
    highlight: '福岡地區限定球鞋第一手情報',
    completedOrders: 650,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,800/h',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '¥4,500/30min',
    photoVideoRate: '¥1,200',
  },
  {
    id: 6,
    name: 'Kenji Mori',
    nameJp: '森健二',
    icon: '🎮',
    location: '名古屋 Nagoya',
    area: 'nagoya',
    experience: '9年',
    specialty: 'ELECTRONICS',
    specialtyLabel: '電子遊戲',
    score: 4.3,
    reviews: 334,
    commission: '5-9%',
    responseTime: '< 4h',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Pokemon', 'TCG', 'Retro Games'],
    filter: 'electronics',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉各地中古市場及限定發售，收藏評估經驗豐富。',
    level: 'MICHI 達人',
    levelNum: 4,
    highlight: 'Pokemon TCG 鑑定認證收藏家',
    completedOrders: 1800,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,000/h',
      shipping: true,
      paymentTerms: '50% 訂金',
      depositRate: '50%',
    },
    livestreamRate: '¥3,500/30min',
    photoVideoRate: '¥800',
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function formatDate(iso: string, locale: string): string {
  try {
    const localeMap: Record<string, string> = {
      zh: 'zh-TW', 'zh-CN': 'zh-CN', en: 'en-US', ja: 'ja-JP', th: 'th-TH',
    };
    return new Date(iso).toLocaleDateString(localeMap[locale] ?? 'en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────────────────────
// BUYER CARD (i18n)
// ─────────────────────────────────────────────────────────────
function BuyerCard({ buyer, locale, t }: { buyer: Buyer; locale: string; t: (key: string) => string }) {
  const levelLabels: Record<number, string> = {
    1: t('buyers.level_newcomer'),
    2: t('buyers.level_buyer'),
    3: t('buyers.level_artisan'),
    4: t('buyers.level_master'),
  };
  const LEVEL_STYLES: Record<number, { bg: string; text: string }> = {
    1: { bg: 'bg-stone-200', text: 'text-stone-600' },
    2: { bg: 'bg-amber-100', text: 'text-amber-700' },
    3: { bg: 'bg-blue-100', text: 'text-blue-700' },
    4: { bg: 'bg-[#1A237E]', text: 'text-white' },
  };
  const lvl = LEVEL_STYLES[buyer.levelNum] ?? LEVEL_STYLES[1];
  const lvlLabel = levelLabels[buyer.levelNum] ?? levelLabels[1];

  return (
    <div className="border border-stone-200 bg-white hover:border-[#1A237E] transition-all group flex flex-col">
      <div className="p-6 space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-2xl rounded-sm">
              {buyer.icon}
            </div>
            <div>
              <h3 className="font-black text-sm text-[#1C1C1C]">{buyer.name}</h3>
              <p className="text-[9px] text-stone-400 font-bold">{buyer.nameJp} · {buyer.location}</p>
            </div>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 ${lvl.bg} ${lvl.text}`}>
            {lvlLabel}
          </span>
        </div>

        {/* Score row */}
        <div className="flex items-center gap-4 text-[10px] text-stone-500 font-bold">
          <span className="text-[#C5A059]">★ {buyer.score}</span>
          <span>{buyer.reviews} {t('buyers.reviews')}</span>
          <span>{buyer.experience}</span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-3">{buyer.description}</p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {buyer.services.livestream && (
            <span className="text-[8px] font-bold bg-red-50 text-red-500 px-2 py-0.5">
              📺 {t('buyers.service_livestream')}
            </span>
          )}
          {buyer.services.photoVideo && (
            <span className="text-[8px] font-bold bg-purple-50 text-purple-500 px-2 py-0.5">
              📷 {t('buyers.service_photo')}
            </span>
          )}
          {buyer.services.queueing && (
            <span className="text-[8px] font-bold bg-blue-50 text-blue-500 px-2 py-0.5">
              🕐 {t('buyers.service_queue')}
            </span>
          )}
          {buyer.services.shipping && (
            <span className="text-[8px] font-bold bg-green-50 text-green-500 px-2 py-0.5">
              📦 {t('buyers.service_shipping')}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {buyer.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[8px] font-bold border border-stone-200 text-stone-400 px-2 py-0.5 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* Commission & response */}
        <div className="flex items-center justify-between text-[9px] font-bold text-stone-400 pt-2 border-t border-stone-100">
          <span>{t('buyers.commission')} {buyer.commission}</span>
          <span>{t('buyers.response')} {buyer.responseTime}</span>
        </div>
      </div>

      <div className="border-t border-stone-100 p-4">
        <a
          href={`/${locale}/buyers`}
          className="block w-full text-center text-[9px] font-black uppercase tracking-[0.3em] border border-[#1C1C1C] text-[#1C1C1C] py-3 hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all"
        >
          {t('buyers.viewDetail')} →
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD (i18n)
// ─────────────────────────────────────────────────────────────
function ProductCard({ product, locale, t }: { product: Product; locale: string; t: (key: string) => string }) {
  const catKey = product.category ?? 'all';
  const catLabel = t(`products.categories.${catKey}`);

  return (
    <article className="group border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col">
      <div className="p-5 pb-0 flex items-center justify-between">
        <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#C5A059]">{catLabel}</span>
        <span className="text-[8px] text-white/30 font-bold">{formatDate(product.published_at, locale)}</span>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="text-sm font-black text-white leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-[10px] text-white/50 font-bold">{product.description}</p>
        )}

        {product.ai_summary && (
          <div className="border-l-2 border-[#C5A059]/40 pl-3 flex-1">
            <p className="text-[10px] text-white/45 leading-relaxed line-clamp-4">{product.ai_summary}</p>
          </div>
        )}

        <div className="flex justify-between items-center text-[9px] font-bold text-white/25 uppercase tracking-widest pt-3 border-t border-white/10 mt-auto">
          <span>{product.source ?? 'Japan'}</span>
          {product.source_url ? (
            <a
              href={product.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:text-white transition-colors"
            >
              {t('products.viewDetails')} ↗
            </a>
          ) : (
            <span className="text-white/15">Japan Exclusive</span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="border border-white/10 animate-pulse">
      <div className="p-5 space-y-3">
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/15 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function MichiMarketplace() {
  const locale = useLocale();
  const t = useTranslations();
  const url = (path: string) => `/${locale}${path}`;

  // Buyer filter keys (translation happens in render)
  const BUYER_FILTER_KEYS = ['all', 'fashion', 'anime', 'beauty', 'luxury', 'food', 'electronics'];
  const AREA_KEYS = ['all', 'tokyo', 'osaka', 'kyoto', 'fukuoka', 'nagoya'];
  const PRODUCT_CAT_KEYS = ['all', 'fashion', 'beauty', 'anime', 'food', 'electronics', 'craft'];

  // Buyer state
  const [activeBuyerFilter, setActiveBuyerFilter] = useState('all');
  const [activeArea, setActiveArea] = useState('all');
  const [buyerSearch, setBuyerSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'reviews'>('score');

  const filteredBuyers = useMemo(() => {
    let list = [...BUYERS];
    if (activeBuyerFilter !== 'all') list = list.filter((b) => b.filter === activeBuyerFilter);
    if (activeArea !== 'all') list = list.filter((b) => b.area === activeArea);
    if (buyerSearch.trim()) {
      const q = buyerSearch.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          b.specialtyLabel.includes(q) ||
          b.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => (sortBy === 'score' ? b.score - a.score : b.reviews - a.reviews));
  }, [activeBuyerFilter, activeArea, buyerSearch, sortBy]);

  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProds, setLoadingProds] = useState(true);
  const [prodError, setProdError] = useState<string | null>(null);
  const [scraping, setScraping] = useState(false);
  const [scrapeMsg, setScrapeMsg] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const fetchProducts = async () => {
    try {
      setLoadingProds(true);
      setProdError(null);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products ?? []);
      } else {
        setProdError(t('products.errorLoad'));
      }
    } catch {
      setProdError(t('products.errorNetwork'));
    } finally {
      setLoadingProds(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleScrape = async () => {
    setScraping(true);
    setScrapeMsg('');
    try {
      const res = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) {
        setScrapeMsg(`✅ ${t('products.scrapeSuccess', { count: data.count ?? 0 })}`);
        await fetchProducts();
      } else {
        setScrapeMsg(`❌ ${data.error ?? t('products.scrapeFail')}`);
      }
    } catch {
      setScrapeMsg(`❌ ${t('products.errorNetwork')}`);
    } finally {
      setScraping(false);
    }
  };

  const displayedProducts = useMemo(
    () => (activeCat === 'all' ? products : products.filter((p) => p.category === activeCat)),
    [products, activeCat]
  );

  return (
    <div className="min-h-screen bg-[#F9F7F2]">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative bg-white pt-24 pb-36 overflow-hidden">
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[32rem] font-serif text-stone-100 pointer-events-none select-none leading-none">
          道
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400">
                  Est. 2011 · Global EZshop
                </span>
                <div className="h-px flex-1 bg-stone-200 max-w-[60px]" />
              </div>
              <h1 className="text-7xl lg:text-8xl font-serif font-black text-[#1C1C1C] leading-none">
                みち
                <br />
                <span className="text-4xl lg:text-5xl italic font-normal text-stone-400 font-serif">Michi</span>
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#buyers"
                className="bg-[#1A237E] text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all"
              >
                {t('hero.findBuyer')}
              </a>
              <a
                href="#products"
                className="border border-[#1C1C1C] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all"
              >
                {t('hero.latestProducts')}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            {[
              { n: '13+', label: t('hero.stat_years'), sub: 'Since 2011' },
              { n: '7', label: t('hero.stat_categories'), sub: 'Categories' },
              { n: '5K+', label: t('hero.stat_clients'), sub: 'Clients' },
              { n: '4', label: t('hero.stat_cities'), sub: 'Cities' },
            ].map(({ n, label, sub }) => (
              <div key={sub} className="border border-stone-200 p-6 text-center hover:border-[#C5A059] transition-all">
                <p className="text-4xl font-serif italic text-[#C5A059] font-black">{n}</p>
                <p className="text-xs font-black text-[#1C1C1C] mt-1">{label}</p>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#C5A059] py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-white font-black text-[9px] tracking-[0.4em] uppercase">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-10">
                Michi · {t('hero.marquee')} ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — BUYER DIRECTORY ════════════════════ */}
      <section id="buyers" className="py-28 px-8 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header + Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">Buyer Directory</p>
              <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
                {t('buyers.title')}
                <br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">{t('buyers.subtitle')}</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                {t('buyers.description')}
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-72">
              <input
                type="text"
                value={buyerSearch}
                onChange={(e) => setBuyerSearch(e.target.value)}
                placeholder={t('buyers.searchPlaceholder')}
                className="w-full border border-stone-300 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#1A237E] bg-white"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {BUYER_FILTER_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveBuyerFilter(key)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all border ${
                    activeBuyerFilter === key
                      ? 'bg-[#1A237E] text-white border-[#1A237E]'
                      : 'border-stone-300 text-stone-500 hover:border-[#1A237E] hover:text-[#1A237E]'
                  }`}
                >
                  {t(`buyers.filter_${key}`)}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-stone-200 hidden md:block" />

            <select
              value={activeArea}
              onChange={(e) => setActiveArea(e.target.value)}
              className="border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white focus:border-[#1A237E]"
            >
              {AREA_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`buyers.area_${key}`)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'reviews')}
              className="border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white focus:border-[#1A237E]"
            >
              <option value="score">{t('buyers.sort_score')}</option>
              <option value="reviews">{t('buyers.sort_reviews')}</option>
            </select>

            <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
              {filteredBuyers.length} {t('buyers.count_unit')}
            </span>
          </div>

          {/* Buyer Grid or Empty */}
          {filteredBuyers.length === 0 ? (
            <div className="text-center py-28 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">{t('buyers.noResults')}</p>
              <button
                onClick={() => {
                  setBuyerSearch('');
                  setActiveBuyerFilter('all');
                  setActiveArea('all');
                }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all"
              >
                {t('buyers.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBuyers.map((buyer) => (
                <BuyerCard key={buyer.id} buyer={buyer} locale={locale} t={t} />
              ))}
            </div>
          )}

          {/* More buyers link */}
          <div className="text-center pt-4">
            <a
              href={url('/buyers')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-14 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all"
            >
              {t('buyers.moreBuyers')} →
            </a>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — AI PRODUCTS ════════════════════════ */}
      <section id="products" className="py-28 px-8 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">
                AI · Japan Product Intelligence
              </p>
              <h2 className="text-5xl font-serif font-black text-white leading-tight">
                {t('products.title')}
                <br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">Japan Trends</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                {t('products.description')}
              </p>
            </div>

            <div className="flex-shrink-0 space-y-2 text-right">
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
              >
                {scraping ? (
                  <>
                    <span className="w-3 h-3 border border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                    {t('products.aiRefreshing')}
                  </>
                ) : (
                  <>✦ {t('products.aiRefresh')}</>
                )}
              </button>
              {scrapeMsg && (
                <p className="text-[9px] font-bold text-white/40">{scrapeMsg}</p>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CAT_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCat(key)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all border ${
                  activeCat === key
                    ? 'bg-[#C5A059] text-[#1C1C1C] border-[#C5A059]'
                    : 'border-white/20 text-white/50 hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}
              >
                {t(`products.categories.${key}`)}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loadingProds ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : prodError ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-4xl">⚠️</p>
              <p className="text-white/50 font-bold text-sm">{prodError}</p>
              <button
                onClick={fetchProducts}
                className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all"
              >
                {t('products.retry')}
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-5xl">📦</p>
              <p className="text-white/40 font-bold text-sm">{t('products.noProducts')}</p>
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50"
              >
                ✦ {t('products.aiRefresh')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} t={t} />
              ))}
            </div>
          )}

          {/* More products + powered by */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <a
              href={url('/products')}
              className="inline-block border border-[#C5A059] text-[#C5A059] px-14 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all"
            >
              {t('products.moreProducts')} →
            </a>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
              {t('products.poweredBy')}
            </p>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE CSS ═══════════════════════════════════ */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}