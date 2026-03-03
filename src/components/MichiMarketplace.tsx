'use client';

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
// BUYERS DATA
// ─────────────────────────────────────────────────────────────
const BUYERS: Buyer[] = [
  {
    id: 1,
    name: 'Tanaka Yuki', nameJp: '田中雪',
    icon: '🌸',
    location: '東京 Tokyo', area: 'tokyo',
    experience: '8年',
    specialty: 'FASHION', specialtyLabel: '時尚服飾',
    score: 4.9, reviews: 312,
    commission: '5-8%',
    responseTime: '< 2小時',
    languages: ['繁中', '日文', 'English'],
    tags: ['Harajuku', 'Vintage', 'Streetwear', 'Luxury'],
    filter: 'fashion',
    description: '原宿時尚達人，深耕裏原宿 vintage 及限定聯名系列。擅長尋找 Supreme、Palace、Undercover 等品牌限定款。',
    level: 'MICHI 達人', levelNum: 4,
    highlight: '專攻 Nike SB 系列及 Tokyo 限定款',
    completedOrders: 1240,
    services: {
      livestream: true, photoVideo: true, queueing: true,
      queueRate: '¥3,000/小時', shipping: true,
      paymentTerms: '全額先付', depositRate: '100%',
    },
    livestreamRate: '¥5,000/30分鐘',
    photoVideoRate: '¥1,500/組',
  },
  {
    id: 2,
    name: 'Matsuda Kenji', nameJp: '松田健二',
    icon: '⚡',
    location: '大阪 Osaka', area: 'osaka',
    experience: '5年',
    specialty: 'ANIME', specialtyLabel: '動漫周邊',
    score: 4.8, reviews: 198,
    commission: '6-10%',
    responseTime: '< 4小時',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Gundam', 'Figure', 'Limited', '一番賞'],
    filter: 'anime',
    description: '大阪動漫周邊專家，精通 Bandai Namco 限定商品及模型。每月親赴秋葉原大阪店搜羅限定品。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: '連續 3 年搶得 RG Evangelion 初版',
    completedOrders: 867,
    services: {
      livestream: true, photoVideo: true, queueing: true,
      queueRate: '¥2,500/小時', shipping: true,
      paymentTerms: '50%訂金', depositRate: '50%',
    },
    livestreamRate: '¥4,000/30分鐘',
    photoVideoRate: '¥1,000/組',
  },
  {
    id: 3,
    name: 'Yamamoto Saki', nameJp: '山本咲',
    icon: '✨',
    location: '京都 Kyoto', area: 'kyoto',
    experience: '6年',
    specialty: 'BEAUTY', specialtyLabel: '美容護膚',
    score: 4.9, reviews: 445,
    commission: '5-7%',
    responseTime: '< 1小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['SK-II', 'Shiseido', 'Cosme', '藥妝'],
    filter: 'beauty',
    description: '京都美容護膚達人，熟悉所有日本本土藥妝及高端護膚品牌。與多個品牌有直接聯絡，可預訂會員限定商品。',
    level: 'MICHI 達人', levelNum: 4,
    highlight: '成功代購超過 500 件 SK-II 限定套裝',
    completedOrders: 1890,
    services: {
      livestream: true, photoVideo: true, queueing: false,
      queueRate: '-', shipping: true,
      paymentTerms: '全額先付', depositRate: '100%',
    },
    livestreamRate: '¥3,000/30分鐘',
    photoVideoRate: '¥800/組',
  },
  {
    id: 4,
    name: 'Nakamura Ryo', nameJp: '中村涼',
    icon: '🎌',
    location: '福岡 Fukuoka', area: 'fukuoka',
    experience: '4年',
    specialty: 'LUXURY', specialtyLabel: '精品名牌',
    score: 4.7, reviews: 89,
    commission: '8-12%',
    responseTime: '< 6小時',
    languages: ['繁中', 'English'],
    tags: ['LV', 'Chanel', 'Hermès', '日本限定'],
    filter: 'luxury',
    description: '福岡精品專家，專門代購 Louis Vuitton、Chanel 日本限定版及稀有色號手袋。熟悉百貨公司 VIP 入場途徑。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: '成功代購 Hermès Birkin 日本限定配色',
    completedOrders: 234,
    services: {
      livestream: false, photoVideo: true, queueing: true,
      queueRate: '¥5,000/小時', shipping: true,
      paymentTerms: '30%訂金', depositRate: '30%',
    },
    photoVideoRate: '¥2,000/組',
  },
  {
    id: 5,
    name: 'Suzuki Hana', nameJp: '鈴木花',
    icon: '🍡',
    location: '名古屋 Nagoya', area: 'nagoya',
    experience: '3年',
    specialty: 'FOOD', specialtyLabel: '食品零食',
    score: 4.6, reviews: 156,
    commission: '8-15%',
    responseTime: '< 3小時',
    languages: ['繁中', '簡中', '日文'],
    tags: ['限定口味', '季節限定', '地區限定', '和菓子'],
    filter: 'food',
    description: '名古屋本地美食達人，專門搜羅各地限定口味零食、季節限定和菓子及地方限定伴手禮。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: '收錄超過 200 種日本地區限定零食資料庫',
    completedOrders: 678,
    services: {
      livestream: false, photoVideo: true, queueing: false,
      queueRate: '-', shipping: true,
      paymentTerms: '全額先付', depositRate: '100%',
    },
    photoVideoRate: '¥500/組',
  },
  {
    id: 6,
    name: 'Ito Takeshi', nameJp: '伊藤武',
    icon: '🎮',
    location: '東京 Tokyo', area: 'tokyo',
    experience: '7年',
    specialty: 'ELECTRONICS', specialtyLabel: '電子產品',
    score: 4.8, reviews: 267,
    commission: '5-8%',
    responseTime: '< 2小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Sony', 'Nintendo', 'Limited Edition', 'Akihabara'],
    filter: 'electronics',
    description: '秋葉原電子產品專家，精通 Sony、Nintendo、Panasonic 日本限定版本。熟悉新品發售排隊及預約策略。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: '成功代購 PlayStation 5 發售日首批',
    completedOrders: 1120,
    services: {
      livestream: true, photoVideo: true, queueing: true,
      queueRate: '¥4,000/小時', shipping: true,
      paymentTerms: '50%訂金', depositRate: '50%',
    },
    livestreamRate: '¥6,000/30分鐘',
    photoVideoRate: '¥1,200/組',
  },
];

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const BUYER_FILTERS = [
  { key: 'all',         label: '全部' },
  { key: 'fashion',     label: '時尚' },
  { key: 'anime',       label: '動漫' },
  { key: 'beauty',      label: '美容' },
  { key: 'luxury',      label: '精品' },
  { key: 'food',        label: '食品' },
  { key: 'electronics', label: '電子' },
];

const AREAS = [
  { key: 'all',     label: '全日本' },
  { key: 'tokyo',   label: '東京' },
  { key: 'osaka',   label: '大阪' },
  { key: 'kyoto',   label: '京都' },
  { key: 'fukuoka', label: '福岡' },
  { key: 'nagoya',  label: '名古屋' },
];

const PRODUCT_CATS = [
  { key: 'all',         label: '全部' },
  { key: 'fashion',     label: '時尚' },
  { key: 'beauty',      label: '美容' },
  { key: 'anime',       label: '動漫' },
  { key: 'food',        label: '食品' },
  { key: 'electronics', label: '電子' },
  { key: 'craft',       label: '工藝' },
];

const LEVEL_STYLES: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: 'bg-stone-200',  text: 'text-stone-600', label: '新人' },
  2: { bg: 'bg-amber-100',  text: 'text-amber-700', label: '買手' },
  3: { bg: 'bg-blue-100',   text: 'text-blue-700',  label: '職人' },
  4: { bg: 'bg-[#1A237E]',  text: 'text-white',     label: '達人' },
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────────────────────
// BUYER CARD
// ─────────────────────────────────────────────────────────────
function BuyerCard({ buyer, locale }: { buyer: Buyer; locale: string }) {
  const lvl = LEVEL_STYLES[buyer.levelNum] ?? LEVEL_STYLES[1];
  return (
    <div className="group bg-white border border-stone-200 hover:border-[#1A237E] hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Avatar */}
      <div className="aspect-[4/3] bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center relative overflow-hidden">
        <span className="text-6xl z-10">{buyer.icon}</span>
        <div className="absolute inset-0 bg-[#1A237E] opacity-0 group-hover:opacity-5 transition-all duration-300" />
        <div className="absolute top-3 left-3">
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 ${lvl.bg} ${lvl.text}`}>
            {lvl.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/90 text-stone-600 border border-stone-200">
            {buyer.specialty}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-black text-[#1C1C1C] tracking-tight text-base">{buyer.name}</h3>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em]">
              {buyer.location} · {buyer.experience}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-serif italic text-[#C5A059] font-black">{buyer.score}</p>
            <p className="text-[8px] text-stone-400">{buyer.reviews} 評價</p>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed flex-1">{buyer.description}</p>

        {/* Service badges */}
        <div className="flex flex-wrap gap-1.5">
          {buyer.services.livestream && (
            <span className="text-[7px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-2 py-0.5">
              🎥 直播
            </span>
          )}
          {buyer.services.queueing && (
            <span className="text-[7px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5">
              ⏰ 排隊
            </span>
          )}
          {buyer.services.shipping && (
            <span className="text-[7px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-200 px-2 py-0.5">
              📦 代運
            </span>
          )}
          {buyer.services.photoVideo && (
            <span className="text-[7px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5">
              📷 拍攝
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {buyer.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[8px] font-bold border border-stone-200 text-stone-400 px-2 py-0.5 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-[9px] font-bold text-stone-400 pt-2 border-t border-stone-100">
          <span>佣金 {buyer.commission}</span>
          <span>回覆 {buyer.responseTime}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-stone-100 p-4">

          href={`/${locale}/buyers`}
          className="block w-full text-center text-[9px] font-black uppercase tracking-[0.3em] border border-[#1C1C1C] text-[#1C1C1C] py-3 hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all"
        >
          查看詳情 →
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const cat = PRODUCT_CATS.find(c => c.key === product.category) ?? PRODUCT_CATS[0];
  return (
    <article className="group border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col">
      <div className="p-5 pb-0 flex items-center justify-between">
        <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#C5A059]">{cat.label}</span>
        <span className="text-[8px] text-white/30 font-bold">{formatDate(product.published_at)}</span>
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

// Product skeleton loader
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
  const url = (path: string) => `/${locale}${path}`;

  // ── Buyer state ──────────────────────────────────────────
  const [activeBuyerFilter, setActiveBuyerFilter] = useState('all');
  const [activeArea, setActiveArea]               = useState('all');
  const [buyerSearch, setBuyerSearch]             = useState('');
  const [sortBy, setSortBy]                       = useState<'score' | 'reviews'>('score');

  const filteredBuyers = useMemo(() => {
    let list = BUYERS;
    if (activeBuyerFilter !== 'all') list = list.filter(b => b.filter === activeBuyerFilter);
    if (activeArea !== 'all')        list = list.filter(b => b.area === activeArea);
    if (buyerSearch.trim()) {
      const q = buyerSearch.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.specialtyLabel.includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) =>
      sortBy === 'score' ? b.score - a.score : b.reviews - a.reviews
    );
  }, [activeBuyerFilter, activeArea, buyerSearch, sortBy]);

  // ── Product state ─────────────────────────────────────────
  const [products, setProducts]         = useState<Product[]>([]);
  const [loadingProds, setLoadingProds] = useState(true);
  const [prodError, setProdError]       = useState<string | null>(null);
  const [scraping, setScraping]         = useState(false);
  const [scrapeMsg, setScrapeMsg]       = useState('');
  const [activeCat, setActiveCat]       = useState('all');

  const fetchProducts = async () => {
    try {
      setLoadingProds(true);
      setProdError(null);
      const res  = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products ?? []);
      else setProdError('無法載入商品');
    } catch {
      setProdError('網絡錯誤，請重試');
    } finally {
      setLoadingProds(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleScrape = async () => {
    setScraping(true);
    setScrapeMsg('');
    try {
      const res  = await fetch('/api/products?action=scrape');
      const data = await res.json();
      if (data.success) {
        setScrapeMsg(`✅ 已新增 ${data.count ?? 0} 個商品`);
        await fetchProducts();
      } else {
        setScrapeMsg(`❌ ${data.error ?? '更新失敗'}`);
      }
    } catch {
      setScrapeMsg('❌ 網絡錯誤');
    } finally {
      setScraping(false);
    }
  };

  const displayedProducts = useMemo(
    () => activeCat === 'all' ? products : products.filter(p => p.category === activeCat),
    [products, activeCat]
  );

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9F7F2]">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative bg-white pt-24 pb-36 overflow-hidden">
        {/* Watermark kanji */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[32rem] font-serif text-stone-100 pointer-events-none select-none leading-none">
          道
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left: headline */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400">
                  Est. 2011 · Global EZshop
                </span>
                <div className="h-px flex-1 bg-stone-200 max-w-[60px]" />
              </div>
              <h1 className="text-7xl lg:text-8xl font-serif font-black text-[#1C1C1C] leading-none">
                みち<br />
                <span className="text-4xl lg:text-5xl italic font-normal text-stone-400 font-serif">Michi</span>
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-lg">
                連接全球買家與日本本地代購職人。13年代購經驗，真實可信的日本商品橋樑。
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#buyers"
                className="bg-[#1A237E] text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
                搵代購買手
              </a>
              <a href="#products"
                className="border border-[#1C1C1C] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all">
                最新商品情報
              </a>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            {[
              { n: '13+', label: '年代購經驗', sub: 'Since 2011' },
              { n: '7',   label: '商品品類',   sub: 'Categories' },
              { n: '5K+', label: '服務客戶',   sub: 'Clients' },
              { n: '4',   label: '日本城市',   sub: 'Cities' },
            ].map(({ n, label, sub }) => (
              <div key={label} className="border border-stone-200 p-6 text-center hover:border-[#C5A059] transition-all">
                <p className="text-4xl font-serif italic text-[#C5A059] font-black">{n}</p>
                <p className="text-xs font-black text-[#1C1C1C] mt-1">{label}</p>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gold marquee bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#C5A059] py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-white font-black text-[9px] tracking-[0.4em] uppercase">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-10">
                Michi · 日本代購平台 · 連接買家與職人 · 13年信譽保證 ·
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ══ SECTION 1 — 代購買手搜尋 ═══════════════════════ */}
      <section id="buyers" className="py-28 px-8 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">
                Buyer Directory
              </p>
              <h2 className="text-5xl font-serif font-black text-[#1C1C1C] leading-tight">
                代購買手<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">名錄</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                各地買手均提供詳盡服務資訊。Michi 不介入交易，直接聯絡買手安排代購。
              </p>
            </div>

            {/* Search input */}
            <div className="flex-shrink-0 w-full md:w-72">
              <input
                type="text"
                value={buyerSearch}
                onChange={e => setBuyerSearch(e.target.value)}
                placeholder="搜尋買手、地區或專長..."
                className="w-full border border-stone-300 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#1A237E] bg-white"
              />
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {BUYER_FILTERS.map(({ key, label }) => (
                <button key={key} onClick={() => setActiveBuyerFilter(key)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all border ${
                    activeBuyerFilter === key
                      ? 'bg-[#1A237E] text-white border-[#1A237E]'
                      : 'border-stone-300 text-stone-500 hover:border-[#1A237E] hover:text-[#1A237E]'
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-stone-200 hidden md:block" />

            {/* Area select */}
            <select value={activeArea} onChange={e => setActiveArea(e.target.value)}
              className="border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white focus:border-[#1A237E]">
              {AREAS.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            {/* Sort select */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'score' | 'reviews')}
              className="border border-stone-200 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white focus:border-[#1A237E]">
              <option value="score">評分排序</option>
              <option value="reviews">評價數排序</option>
            </select>

            <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
              {filteredBuyers.length} 位買手
            </span>
          </div>

          {/* Buyer grid or empty state */}
          {filteredBuyers.length === 0 ? (
            <div className="text-center py-28 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">找不到符合條件的買手</p>
              <button
                onClick={() => { setBuyerSearch(''); setActiveBuyerFilter('all'); setActiveArea('all'); }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBuyers.map(buyer => (
                <BuyerCard key={buyer.id} buyer={buyer} locale={locale} />
              ))}
            </div>
          )}

          {/* View all CTA */}
          <div className="text-center pt-4">
            <a href={url('/buyers')}
              className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-14 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all">
              查看全部買手 →
            </a>
          </div>
        </div>
      </section>


      {/* ══ SECTION 2 — AI 日本最新商品情報 ═══════════════ */}
      <section id="products" className="py-28 px-8 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">
                AI · Japan Product Intelligence
              </p>
              <h2 className="text-5xl font-serif font-black text-white leading-tight">
                最新商品情報<br />
                <span className="italic font-serif font-normal text-[#C5A059] text-3xl">Japan Trends</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                AI 自動搜索日本最新商品發佈，涵蓋時尚、美容、動漫、電子及限定品。每日更新。
              </p>
            </div>

            {/* Refresh / scrape button */}
            <div className="flex-shrink-0 space-y-2 text-right">
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="border border-[#C5A059] text-[#C5A059] px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
              >
                {scraping ? (
                  <>
                    <span className="animate-spin inline-block w-3 h-3 border-2 border-[#C5A059] border-t-transparent rounded-full" />
                    AI 搜索中...
                  </>
                ) : (
                  <>🔍 AI 更新商品</>
                )}
              </button>
              {scrapeMsg && (
                <p className="text-[10px] text-white/50 font-bold">{scrapeMsg}</p>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATS.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveCat(key)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] transition-all border ${
                  activeCat === key
                    ? 'bg-[#C5A059] text-[#1C1C1C] border-[#C5A059]'
                    : 'border-white/20 text-white/50 hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Products: loading / error / empty / grid */}
          {loadingProds ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : prodError ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-5xl">⚠️</p>
              <p className="text-white/40 font-bold text-sm">{prodError}</p>
              <button onClick={fetchProducts}
                className="border border-white/20 text-white/50 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#C5A059] hover:text-[#C5A059] transition-all">
                重試
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <p className="text-5xl">📭</p>
              <p className="text-white/40 font-bold text-sm">
                暫無商品情報，點擊 AI 更新獲取最新資訊
              </p>
              <button onClick={handleScrape} disabled={scraping}
                className="bg-[#C5A059] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90 transition-all disabled:opacity-50">
                {scraping ? 'AI 搜索中...' : '🔍 立即獲取日本最新商品'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* View all products */}
          <div className="text-center pt-4">
            <a href={url('/products')}
              className="inline-block border border-white/20 text-white/60 px-14 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] hover:border-[#C5A059] transition-all">
              查看全部商品情報 →
            </a>
          </div>
        </div>
      </section>


      {/* ══ ABOUT STRIP ════════════════════════════════════ */}
      <section className="py-20 px-8 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">About Michi</p>
              <h2 className="text-4xl font-serif font-black text-[#1C1C1C]">
                13年代購信譽<br />
                <span className="italic font-normal text-stone-400">Global EZshop</span>
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                2011年從 Facebook 開始，從個人代購發展為正式香港公司。
                服務過數千名客戶，熟悉日本七大商品品類，建立了完善的買手網絡。
              </p>
              <a href={url('/about')}
                className="inline-block border border-[#1C1C1C] text-[#1C1C1C] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A237E] hover:text-white hover:border-[#1A237E] transition-all">
                了解我們的故事 →
              </a>
            </div>

            {/* Category icons grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: '👜', label: '精品名牌' },
                { emoji: '💄', label: '美容護膚' },
                { emoji: '🎌', label: '動漫周邊' },
                { emoji: '👗', label: '時尚服飾' },
                { emoji: '🍡', label: '食品零食' },
                { emoji: '⚡', label: '電子產品' },
              ].map(({ emoji, label }) => (
                <div key={label} className="border border-stone-200 p-4 text-center hover:border-[#1A237E] transition-all group cursor-default">
                  <span className="text-3xl block mb-2">{emoji}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-[#1A237E] transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee keyframe */}
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
}