'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// SERVICE TYPES — 新增服務類型定義
// ─────────────────────────────────────────────────────────────
interface BuyerServices {
  livestream: boolean;          // 現場直播
  photoVideo: boolean;          // 現場拍照/影片
  queueing: boolean;            // 排隊限定商品
  queueRate: string;            // 排隊收費方式
  shipping: boolean;            // 代寄服務
  paymentTerms: string;         // 付款條件
  depositRate: string;          // 訂金比例（如需要）
}

// ─────────────────────────────────────────────────────────────
// BUYERS DATA
// ─────────────────────────────────────────────────────────────
const BUYERS = [
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
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥3,000/小時',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
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
    description: '動漫周邊收藏家出身，熟悉各大コミケ及会場限定商品。善用人脈提前預約，確保搶手商品到手。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: '大阪 Namba 扭蛋倉庫合作夥伴',
    completedOrders: 678,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,500/小時',
      shipping: true,
      paymentTerms: '訂金50%',
      depositRate: '50%',
    },
    livestreamRate: '¥4,000/30分鐘',
    photoVideoRate: '¥1,000/組',
  },
  {
    id: 3,
    name: 'Aoyama Mei', nameJp: '青山芽衣',
    icon: '🏺',
    location: '京都 Kyoto', area: 'kyoto',
    experience: '12年',
    specialty: 'VINTAGE', specialtyLabel: '古董工藝',
    score: 5.0, reviews: 445,
    commission: '8-12%',
    responseTime: '< 6小時',
    languages: ['繁中', '日文', 'English'],
    tags: ['陶藝', '古布', '民藝', '漆器'],
    filter: 'vintage',
    description: '京都傳統工藝職人，深入西陣織、錦市場等百年市場。專門尋訪老店與職人直售商品。',
    level: 'MICHI 達人', levelNum: 4,
    highlight: '與京都70+年老店建立獨家合作',
    completedOrders: 2100,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: true,
      paymentTerms: '訂金30%',
      depositRate: '30%',
    },
    livestreamRate: '—',
    photoVideoRate: '¥2,000/組',
  },
  {
    id: 4,
    name: 'Shimizu Ryo', nameJp: '清水遼',
    icon: '📷',
    location: '東京 Tokyo', area: 'tokyo',
    experience: '6年',
    specialty: 'TECH', specialtyLabel: '電子科技',
    score: 4.7, reviews: 267,
    commission: '4-7%',
    responseTime: '< 3小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Sony', 'Panasonic', 'Fujifilm', 'Nintendo'],
    filter: 'tech',
    description: '秋葉原電子達人，每週到場探貨。熟悉各大電量販店會員制度，能搶到最優惠價格及最新限定款式。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: 'Yodobashi/BIC 忠誠會員，最高折扣',
    completedOrders: 892,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,000/小時',
      shipping: false,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '¥3,500/30分鐘',
    photoVideoRate: '¥800/組',
  },
  {
    id: 5,
    name: 'Fujita Hana', nameJp: '藤田花',
    icon: '🌿',
    location: '福岡 Fukuoka', area: 'fukuoka',
    experience: '4年',
    specialty: 'BEAUTY', specialtyLabel: '美妝藥粧',
    score: 4.9, reviews: 189,
    commission: '5-9%',
    responseTime: '< 2小時',
    languages: ['繁中', '簡中', '泰文'],
    tags: ['COSME大賞', '藥妝', 'DHC', 'Canmake'],
    filter: 'beauty',
    description: '藥妝店達人，深入研究日本年度 COSME 大賞排行。熟悉各大連鎖藥妝折扣期及海外未上市商品。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: '福岡限定品及九州區域商品專家',
    completedOrders: 534,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: true,
      paymentTerms: '訂金50%',
      depositRate: '50%',
    },
    livestreamRate: '—',
    photoVideoRate: '¥1,200/組',
  },
  {
    id: 6,
    name: 'Ono Takashi', nameJp: '小野貴',
    icon: '🎴',
    location: '名古屋 Nagoya', area: 'nagoya',
    experience: '9年',
    specialty: 'GAMING', specialtyLabel: '遊戲卡牌',
    score: 4.8, reviews: 334,
    commission: '6-10%',
    responseTime: '< 5小時',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Pokemon', 'ワンピース', 'Dragon Ball', '遊戲王'],
    filter: 'anime',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉名古屋各大中古市場。擅長鑑定稀有卡及限定版。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: 'Pokemon Center Nagoya 每日探貨',
    completedOrders: 1560,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥15,000/日',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '¥6,000/30分鐘',
    photoVideoRate: '¥1,000/組',
  },
  {
    id: 7,
    name: 'Nishida Yoko', nameJp: '西田陽子',
    icon: '☕',
    location: '東京 Tokyo', area: 'tokyo',
    experience: '3年',
    specialty: 'FOOD', specialtyLabel: '食品零食',
    score: 4.6, reviews: 88,
    commission: '7-12%',
    responseTime: '< 3小時',
    languages: ['繁中', '日文'],
    tags: ['限定口味', '地區特產', '和菓子', '抹茶'],
    filter: 'food',
    description: '日本食品愛好者，專注季節限定口味及地區特產。定期探索各大便利店、超市及百貨食品館期間限定商品。',
    level: 'MICHI 新人', levelNum: 1,
    highlight: 'TOKYO Banana / Shiroi Koibito 限定專家',
    completedOrders: 213,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: false,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '—',
    photoVideoRate: '¥800/組',
  },
  {
    id: 8,
    name: 'Kobayashi Sota', nameJp: '小林颯太',
    icon: '⌚',
    location: '大阪 Osaka', area: 'osaka',
    experience: '7年',
    specialty: 'LUXURY', specialtyLabel: '精品名錶',
    score: 4.9, reviews: 156,
    commission: '3-5%',
    responseTime: '< 24小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Seiko', 'Grand Seiko', 'Omega', '精品'],
    filter: 'fashion',
    description: '精品腕錶及名牌包專家，熟悉日本正規經銷商及 outlet。提供正品收據、海外購物退稅協助及安全寄送服務。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: 'Grand Seiko 大阪旗艦店 VIP 會員',
    completedOrders: 445,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: true,
      paymentTerms: '訂金30%',
      depositRate: '30%',
    },
    livestreamRate: '¥8,000/30分鐘',
    photoVideoRate: '¥3,000/組',
  },
  {
    id: 9,
    name: 'Hayashi Rina', nameJp: '林里奈',
    icon: '🎋',
    location: '京都 Kyoto', area: 'kyoto',
    experience: '10年',
    specialty: 'LIFESTYLE', specialtyLabel: '生活雜貨',
    score: 4.8, reviews: 290,
    commission: '5-8%',
    responseTime: '< 4小時',
    languages: ['繁中', '日文', 'English', '泰文'],
    tags: ['無印良品', '北歐風', '文具', '香薰'],
    filter: 'lifestyle',
    description: '日本生活選物達人，專注高質感生活雜貨。熟悉 Loft、東急Hands、蔦屋書店等選品店限定款。',
    level: 'MICHI 達人', levelNum: 4,
    highlight: '京都限定文具及和風生活用品達人',
    completedOrders: 1890,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,500/小時',
      shipping: true,
      paymentTerms: '訂金50%',
      depositRate: '50%',
    },
    livestreamRate: '¥4,500/30分鐘',
    photoVideoRate: '¥1,500/組',
  },
];

const FILTERS = [
  { key: 'all',      label: 'All',       icon: '◉' },
  { key: 'fashion',  label: 'Fashion',   icon: '👔' },
  { key: 'anime',    label: 'Anime',     icon: '⚡' },
  { key: 'vintage',  label: 'Vintage',   icon: '🏺' },
  { key: 'beauty',   label: 'Beauty',    icon: '🌿' },
  { key: 'tech',     label: 'Tech',      icon: '📷' },
  { key: 'food',     label: 'Food',      icon: '☕' },
  { key: 'lifestyle',label: 'Lifestyle', icon: '🎋' },
];

const AREAS = [
  { key: 'all',     label: '全部地區' },
  { key: 'tokyo',   label: '東京' },
  { key: 'osaka',   label: '大阪' },
  { key: 'kyoto',   label: '京都' },
  { key: 'fukuoka', label: '福岡' },
  { key: 'nagoya',  label: '名古屋' },
];

// Service filter
const SERVICE_FILTERS = [
  { key: 'all',        label: '全部' },
  { key: 'livestream', label: '📹 直播' },
  { key: 'queueing',   label: '⏳ 排隊' },
  { key: 'shipping',   label: '📦 代寄' },
];

const LEVEL_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-stone-100', text: 'text-stone-500', border: 'border-stone-300' },
  2: { bg: 'bg-blue-50',   text: 'text-[#1A237E]', border: 'border-[#1A237E]/30' },
  3: { bg: 'bg-pink-50',   text: 'text-[#B22222]', border: 'border-[#B22222]/30' },
  4: { bg: 'bg-amber-50',  text: 'text-[#C5A059]', border: 'border-[#C5A059]/50' },
};

// ─────────────────────────────────────────────────────────────
// SERVICE BADGE helper
// ─────────────────────────────────────────────────────────────
function ServiceBadge({ active, label, sub }: { active: boolean; label: string; sub?: string }) {
  if (!active) return (
    <div className="flex flex-col items-center p-2 bg-stone-50 border border-stone-100 opacity-40 min-w-0">
      <span className="text-[8px] font-black text-stone-300 uppercase tracking-wider leading-none">{label}</span>
      <span className="text-[8px] text-stone-300 mt-1">✕</span>
    </div>
  );
  return (
    <div className="flex flex-col items-center p-2 bg-[#1A237E]/5 border border-[#1A237E]/20 min-w-0">
      <span className="text-[8px] font-black text-[#1A237E] uppercase tracking-wider leading-none">{label}</span>
      {sub && <span className="text-[7px] text-[#C5A059] font-bold mt-1 text-center leading-tight">{sub}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT MODAL
// ─────────────────────────────────────────────────────────────
function ContactModal({ buyer, onClose }: { buyer: typeof BUYERS[0]; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', message: '',
    needLivestream: false,
    needPhoto: false,
    needQueueing: false,
    needShipping: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls = "w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">

        {/* Header */}
        <div className="bg-[#1A237E] text-white p-7 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">聯絡買手</p>
            <h3 className="text-xl font-serif font-black">{buyer.name}</h3>
            <p className="text-white/50 text-xs">{buyer.nameJp} · {buyer.location}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-4">
            <div className="text-5xl">✓</div>
            <h4 className="text-xl font-serif font-black">訊息已發送</h4>
            <p className="text-stone-500 text-sm">預計回覆時間：<span className="font-bold text-[#1A237E]">{buyer.responseTime}</span></p>
            <button onClick={onClose} className="mt-2 border border-[#1C1C1C] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">你的名字 *</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="姓名" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">電郵 *</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="email@example.com" />
              </div>
            </div>

            {/* 額外服務選擇 */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">需要的額外服務</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'needLivestream', label: '📹 現場直播', rate: buyer.livestreamRate, avail: buyer.services.livestream },
                  { key: 'needPhoto',      label: '📸 拍照/影片', rate: buyer.photoVideoRate, avail: buyer.services.photoVideo },
                  { key: 'needQueueing',   label: '⏳ 排隊代購', rate: buyer.services.queueRate, avail: buyer.services.queueing },
                  { key: 'needShipping',   label: '📦 代寄服務',  rate: '另議', avail: buyer.services.shipping },
                ].map(({ key, label, rate, avail }) => (
                  <label key={key}
                    className={`flex items-start gap-2.5 p-3 border cursor-pointer transition-all ${
                      !avail ? 'opacity-30 cursor-not-allowed bg-stone-50' :
                      (form as any)[key] ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                    <input type="checkbox" disabled={!avail}
                      checked={(form as any)[key]}
                      onChange={e => avail && setForm({ ...form, [key]: e.target.checked })}
                      className="mt-0.5 accent-[#1A237E]" />
                    <div>
                      <p className="text-[9px] font-black text-[#1C1C1C]">{label}</p>
                      <p className="text-[8px] text-[#C5A059] font-bold mt-0.5">{avail ? rate : '此買手不提供'}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">代購需求 *</label>
              <textarea required rows={3} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-none`}
                placeholder="描述商品、預算、時間要求…" />
            </div>

            {/* Payment terms info */}
            <div className="bg-amber-50 border border-amber-200 p-3 space-y-1">
              <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest">此買手付款條件</p>
              <p className="text-[10px] text-amber-900 font-bold">
                {buyer.services.paymentTerms === '全額先付'
                  ? `💳 全額先付 — 確認訂單後須支付全數貨款及服務費`
                  : `💳 訂金制 — 確認後先付 ${buyer.services.depositRate} 訂金，收貨後付尾數`}
              </p>
            </div>

            <button type="submit"
              className="w-full py-4 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
              發送詢問
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function BuyersPage() {
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeArea, setActiveArea] = useState('all');
  const [activeService, setActiveService] = useState('all');
  const [sortBy, setSortBy] = useState<'score' | 'reviews' | 'experience'>('score');
  const [contactBuyer, setContactBuyer] = useState<typeof BUYERS[0] | null>(null);
  const [showApply, setShowApply] = useState(false);

  const displayed = useMemo(() => {
    let list = BUYERS;
    if (activeFilter !== 'all')   list = list.filter(b => b.filter === activeFilter);
    if (activeArea !== 'all')     list = list.filter(b => b.area === activeArea);
    if (activeService === 'livestream') list = list.filter(b => b.services.livestream);
    if (activeService === 'queueing')   list = list.filter(b => b.services.queueing);
    if (activeService === 'shipping')   list = list.filter(b => b.services.shipping);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.specialtyLabel.includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'score')    return b.score - a.score;
      if (sortBy === 'reviews')  return b.reviews - a.reviews;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  }, [search, activeFilter, activeArea, activeService, sortBy]);

  return (
    <>
      {contactBuyer && <ContactModal buyer={contactBuyer} onClose={() => setContactBuyer(null)} />}
      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* TOP BAR */}
        <div className="bg-[#1C1C1C] text-[#F9F7F2]/50 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
          MICHI • 代購買手資訊平台 • 平台不參與任何交易 • 透明直接
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
              <a href={`/${locale}#market`} className="hover:text-[#1A237E] transition-colors">買手名錄</a>
              <a href={'/products'} className="hover:text-[#1A237E] transition-colors">最新商品</a>
              <a href={`/${locale}#philosophy`} className="hover:text-[#1A237E] transition-colors">平台理念</a>
              <a href={`/${locale}/about`} className="hover:text-[#1A237E] transition-colors">關於我們</a>
            </div>
            <button onClick={() => setShowApply(true)}
              className="text-[10px] font-black uppercase tracking-[0.3em] bg-[#1A237E] text-white px-5 py-2.5 hover:bg-[#B22222] transition-all">
              申請成為買手
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#1A237E] text-white py-20 px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none">
            <span className="text-[18rem] font-serif text-white/5 leading-none">人</span>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Michi — 代購買手名錄</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black leading-tight">
                尋覓你的<br />
                <span className="italic font-serif font-normal text-[#C5A059]">專屬日本買手</span>
              </h1>
            </div>
            <p className="text-white/50 max-w-xl text-sm font-light leading-relaxed">
              Michi 是資訊平台，連接有代購需求的買家與在日本的買手。
              各買手獨立提供服務，所有交易由雙方自行協議，Michi 不介入、不擔保。
            </p>

            {/* Service highlight pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: '📹', label: '現場直播', desc: '實時觀看選購' },
                { icon: '📸', label: '拍照/影片', desc: '確認商品細節' },
                { icon: '⏳', label: '排隊代購', desc: '小時制或日計' },
                { icon: '📦', label: '代寄服務', desc: '直送到你家' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="bg-white/10 px-4 py-2.5 flex items-center gap-2.5">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-white">{label}</p>
                    <p className="text-[9px] text-white/40">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-10 pt-2">
              {[['9+', '平台買手'], ['5', '日本城市'], ['4.8★', '平均評分'], ['9,700+', '完成紀錄']].map(([n, label]) => (
                <div key={label}>
                  <p className="text-2xl font-serif italic text-[#C5A059] font-black">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="bg-stone-100 border-b border-stone-200 py-3 px-8">
          <p className="max-w-7xl mx-auto text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">
            ⚠️ Michi 為資訊索引平台，不對買手的服務質素、交易安全或商品真偽作出任何保證。請買家自行審慎評估。
          </p>
        </div>

        {/* SERVICE INFO STRIP */}
        <div className="bg-white border-b border-stone-200 py-6 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: '📹',
                title: '現場直播',
                desc: '買手進行店內直播，讓你實時選購、確認商品狀態',
                note: '各買手自訂收費，以 30 分鐘為單位計算',
                color: 'border-[#1A237E]',
              },
              {
                icon: '📸',
                title: '現場拍照/影片',
                desc: '買手為你拍攝商品細節照或短片，確認後才落單',
                note: '以每組（1個商品）計費，費用另計於佣金之外',
                color: 'border-[#B22222]',
              },
              {
                icon: '⏳',
                title: '排隊限定商品',
                desc: '買手代你排隊搶購限量版，可選小時制或全日計',
                note: '小時制適合短時排隊；全日計（約8小時）適合超長龍活動',
                color: 'border-[#C5A059]',
              },
              {
                icon: '📦',
                title: '代寄服務',
                desc: '買手購入商品後，代為整理並寄往你指定地址',
                note: '運費及包裝費另計，建議出發前確認買手接受的運送方式',
                color: 'border-stone-400',
              },
            ].map(({ icon, title, desc, note, color }) => (
              <div key={title} className={`border-l-2 ${color} pl-4 py-1`}>
                <p className="text-base font-black text-[#1C1C1C] mb-1">{icon} {title}</p>
                <p className="text-[10px] text-stone-500 leading-relaxed mb-2">{desc}</p>
                <p className="text-[9px] text-stone-400 italic">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT INFO STRIP */}
        <div className="bg-[#1C1C1C] text-white py-5 px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 flex-shrink-0">付款條件說明</p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: '💳 全額先付', desc: '確認訂單後即付全數。買手購入商品風險較低，多用於搶手限定款。' },
                { label: '💳 訂金制', desc: '先付訂金（通常30-50%），買手入手商品後付尾數。適合大額訂單。' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3 max-w-sm">
                  <span className="text-[10px] font-black text-[#C5A059] flex-shrink-0 mt-0.5">{label}</span>
                  <p className="text-[9px] text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <section className="bg-white border-b border-stone-200 sticky top-[81px] z-30">
          <div className="max-w-7xl mx-auto px-8 py-5 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="搜尋買手、城市、專長…"
                  className="w-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
                <span className="absolute right-3 top-2.5 text-stone-400 text-sm pointer-events-none">🔍</span>
              </div>

              {/* Category */}
              <div className="flex flex-wrap gap-1">
                {FILTERS.map(({ key, label, icon }) => (
                  <button key={key} onClick={() => setActiveFilter(key)}
                    className={`px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                      activeFilter === key ? 'bg-[#1A237E] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}>
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Service filter */}
              <div className="flex gap-1">
                {SERVICE_FILTERS.map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveService(key)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all border ${
                      activeService === key
                        ? 'bg-[#C5A059] text-white border-[#C5A059]'
                        : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>

              <div className="h-5 w-px bg-stone-200" />

              <select value={activeArea} onChange={e => setActiveArea(e.target.value)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                {AREAS.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
              </select>

              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                <option value="score">評分排序</option>
                <option value="reviews">評價數排序</option>
                <option value="experience">經驗排序</option>
              </select>

              <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
                {displayed.length} 位買手
              </span>
            </div>
          </div>
        </section>

        {/* BUYER GRID */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          {displayed.length === 0 ? (
            <div className="text-center py-28 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">找不到符合條件的買手</p>
              <button onClick={() => { setSearch(''); setActiveFilter('all'); setActiveArea('all'); setActiveService('all'); }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {displayed.map(buyer => {
                const lvl = LEVEL_STYLES[buyer.levelNum];
                return (
                  <div key={buyer.id} className="group flex flex-col">
                    {/* Avatar */}
                    <div className="aspect-[4/3] bg-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden">
                      <span className="text-7xl z-10">{buyer.icon}</span>
                      <div className="absolute inset-0 bg-[#1A237E]/0 group-hover:bg-[#1A237E]/5 transition-all duration-300" />
                      <div className="absolute top-4 left-4 bg-white border border-stone-200 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-500">
                        {buyer.specialtyLabel}
                      </div>
                      <div className="absolute top-4 right-4 bg-[#1C1C1C] text-white px-2 py-1 text-[9px] font-black">
                        ★ {buyer.score}
                      </div>
                      {/* Service quick icons */}
                      <div className="absolute bottom-3 left-3 flex gap-1">
                        {buyer.services.livestream && <span className="bg-[#1A237E] text-white text-[8px] px-1.5 py-0.5 font-black">📹 直播</span>}
                        {buyer.services.queueing && <span className="bg-[#B22222] text-white text-[8px] px-1.5 py-0.5 font-black">⏳ 排隊</span>}
                        {buyer.services.shipping && <span className="bg-stone-700 text-white text-[8px] px-1.5 py-0.5 font-black">📦 代寄</span>}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-grow border border-stone-200 border-t-0 bg-white p-5 space-y-4">

                      {/* Name + level */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-serif font-black text-[#1C1C1C] group-hover:text-[#B22222] transition-colors leading-tight">
                            {buyer.name}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-bold tracking-wider mt-0.5">
                            {buyer.nameJp} · {buyer.location}
                          </p>
                        </div>
                        <span className={`flex-shrink-0 text-[8px] font-black uppercase tracking-wider px-2 py-1 border ${lvl.bg} ${lvl.text} ${lvl.border}`}>
                          {buyer.level}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{buyer.description}</p>

                      {/* Service grid — 4 cells */}
                      <div className="grid grid-cols-4 gap-1.5">
                        <ServiceBadge active={buyer.services.livestream} label="直播" sub={buyer.livestreamRate !== '—' ? buyer.livestreamRate : undefined} />
                        <ServiceBadge active={buyer.services.photoVideo} label="拍照" sub={buyer.photoVideoRate !== '—' ? buyer.photoVideoRate : undefined} />
                        <ServiceBadge active={buyer.services.queueing}   label="排隊" sub={buyer.services.queueRate !== '—' ? buyer.services.queueRate : undefined} />
                        <ServiceBadge active={buyer.services.shipping}   label="代寄" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-100 pt-3">
                        {[
                          ['佣金', buyer.commission],
                          ['付款', buyer.services.paymentTerms],
                          ['回覆', buyer.responseTime],
                        ].map(([label, value]) => (
                          <div key={label} className="space-y-0.5">
                            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                            <p className="text-[9px] font-black text-[#1C1C1C] leading-tight">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {buyer.languages.map(lang => (
                          <span key={lang} className="text-[8px] bg-blue-50 text-[#1A237E] px-1.5 py-0.5 font-bold">{lang}</span>
                        ))}
                        <span className="ml-auto text-[9px] text-stone-400">{buyer.completedOrders.toLocaleString()} 紀錄</span>
                      </div>

                      <button onClick={() => setContactBuyer(buyer)}
                        className="w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
                        聯絡買手
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* JOIN CTA */}
        <section className="bg-[#1C1C1C] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">加入平台</p>
              <h2 className="text-3xl font-serif font-black leading-tight">
                在日本？加入 Michi<br />
                <span className="text-[#C5A059] italic font-serif font-normal">成為平台買手</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                免費建立個人資料頁，展示你的服務詳情及收費標準，讓全球買家找到你。Michi 不收上架費，不介入任何交易。
              </p>
            </div>
            <button onClick={() => setShowApply(true)}
              className="flex-shrink-0 bg-[#C5A059] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
              立即申請 →
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111] text-white py-14 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-lg font-black">道</div>
              <div>
                <p className="font-black tracking-tighter">みち</p>
                <p className="text-[8px] text-stone-500 uppercase tracking-[0.4em]">Information Hub</p>
              </div>
            </div>
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}`} className="hover:text-white transition-colors">首頁</a>
              <a href={`/${locale}/products`} className="hover:text-white transition-colors">商品</a>
              <a href={`/${locale}/about`} className="hover:text-white transition-colors">關於我們</a>
              <a href="mailto:hello@michi.jp" className="hover:text-white transition-colors">聯絡</a>
            </div>
            <p className="text-[9px] text-stone-600 uppercase tracking-widest">© {new Date().getFullYear()} Michi.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// APPLY MODAL
// ─────────────────────────────────────────────────────────────
function ApplyModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', nameJp: '', email: '',
    whatsapp: '', wechat: '', line: '',
    city: '', cityOther: '', residency: '',
    specialties: [] as string[],
    otherSpecialty: '',
    languages: [] as string[],
    commission: '', minOrder: '', responseTime: '',
    bio: '', experience: '', highlight: '',
    // 新增服務選項
    offersLivestream: false,
    livestreamRate: '',
    livestreamUnit: '30分鐘',
    offersPhotoVideo: false,
    photoVideoRate: '',
    offersQueueing: false,
    queueingRate: '',
    queueingUnit: 'hourly' as 'hourly' | 'daily' | 'both',
    offersShipping: false,
    shippingMethods: [] as string[],
    paymentTerms: '' as string,
    depositRate: '',
    agreeTerms: false,
    agreeDisclaimer: false,
  });

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const SPECIALTY_OPTIONS = ['時尚服飾','動漫周邊','古董工藝','電子科技','美妝藥粧','遊戲卡牌','食品零食','精品名錶','生活雜貨','其他'];
  const LANGUAGE_OPTIONS  = ['繁體中文','簡體中文','English','日本語','ภาษาไทย'];
  const CITY_OPTIONS      = ['東京','大阪','京都','福岡','名古屋','札幌','仙台','廣島','其他'];
  const SHIPPING_OPTIONS  = ['EMS','DHL/FedEx','日本郵便','Sea Mail（船運）','自取（東京/大阪）'];

  const inputCls = "w-full border border-stone-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] text-[#1C1C1C] placeholder-stone-300";
  const Field = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
        {label}{req && <span className="text-[#B22222] ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {}
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl shadow-2xl my-auto">

        {/* Header */}
        <div className="bg-[#1A237E] text-white px-8 py-6 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Michi Platform</p>
            <h2 className="text-xl font-serif font-black">申請成為 Michi 買手</h2>
            <p className="text-white/40 text-xs">加入平台，讓全球買家找到你 · 免費上架</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {step === 2 ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-14 h-14 bg-[#1A237E] text-white flex items-center justify-center text-2xl mx-auto font-serif">道</div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-black">申請已收到！</h3>
              <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
                我們的團隊會在 <span className="font-bold text-[#1A237E]">3–5 個工作天</span> 內通過電郵與你聯絡，
                商討建立個人頁面的詳情。
              </p>
            </div>
            <div className="bg-stone-50 p-4 text-left space-y-2 text-[10px] max-w-xs mx-auto">
              <p className="text-stone-400 uppercase tracking-widest font-black mb-2">申請摘要</p>
              {[['姓名', form.name], ['城市', form.city === '其他' ? form.cityOther : form.city], ['電郵', form.email]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-stone-400">{k}</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="border border-[#1C1C1C] px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="divide-y divide-stone-100">

            {/* 01 基本資料 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">01 — 基本資料</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="姓名（英文）" req><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Tanaka Yuki" /></Field>
                <Field label="姓名（日文）"><input type="text" value={form.nameJp} onChange={e => setForm({ ...form, nameJp: e.target.value })} className={inputCls} placeholder="田中雪" /></Field>
              </div>
              <Field label="聯絡電郵" req><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="your@email.com" /></Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="WhatsApp"><input type="text" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} className={inputCls} placeholder="+81..." /></Field>
                <Field label="WeChat ID"><input type="text" value={form.wechat} onChange={e => setForm({ ...form, wechat: e.target.value })} className={inputCls} placeholder="ID" /></Field>
                <Field label="LINE ID"><input type="text" value={form.line} onChange={e => setForm({ ...form, line: e.target.value })} className={inputCls} placeholder="ID" /></Field>
              </div>
            </div>

            {/* 02 在日資訊 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">02 — 在日資訊</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="所在城市" req>
                  <select required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    {CITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                {form.city === '其他' && (
                  <Field label="請填寫城市"><input type="text" value={form.cityOther} onChange={e => setForm({ ...form, cityOther: e.target.value })} className={inputCls} /></Field>
                )}
                <Field label="在日身份" req>
                  <select required value={form.residency} onChange={e => setForm({ ...form, residency: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="citizen">日本公民</option>
                    <option value="pr">永久居民</option>
                    <option value="working">工作簽證</option>
                    <option value="student">學生簽證</option>
                    <option value="other">其他長期居留</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* 03 專長 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">03 — 專長 & 語言</h3>
              <Field label="專長類別（可多選）" req>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SPECIALTY_OPTIONS.map(s => (
                    <button key={s} type="button" onClick={() => setForm({ ...form, specialties: toggle(form.specialties, s) })}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-all ${form.specialties.includes(s) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A237E]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="溝通語言（可多選）" req>
                <div className="flex flex-wrap gap-2 mt-1">
                  {LANGUAGE_OPTIONS.map(l => (
                    <button key={l} type="button" onClick={() => setForm({ ...form, languages: toggle(form.languages, l) })}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-all ${form.languages.includes(l) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A237E]'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* 04 附加服務 ← NEW */}
            <div className="px-8 py-6 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">04 — 附加服務 & 收費</h3>
              <p className="text-[10px] text-stone-400">勾選你提供的服務並填寫收費標準（費用以日圓 ¥ 計）</p>

              {/* 直播 */}
              <div className={`border p-4 space-y-3 transition-all ${form.offersLivestream ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.offersLivestream} onChange={e => setForm({ ...form, offersLivestream: e.target.checked })} className="accent-[#1A237E] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-black text-[#1C1C1C]">📹 提供現場直播服務</p>
                    <p className="text-[9px] text-stone-400">在店鋪或活動現場進行直播，讓買家實時選購</p>
                  </div>
                </label>
                {form.offersLivestream && (
                  <div className="grid grid-cols-2 gap-3 pl-7">
                    <Field label="收費（¥）" req>
                      <input type="number" value={form.livestreamRate} onChange={e => setForm({ ...form, livestreamRate: e.target.value })}
                        className={inputCls} placeholder="e.g. 5000" />
                    </Field>
                    <Field label="計費單位" req>
                      <select value={form.livestreamUnit} onChange={e => setForm({ ...form, livestreamUnit: e.target.value })} className={inputCls}>
                        <option value="30分鐘">每 30 分鐘</option>
                        <option value="1小時">每 1 小時</option>
                        <option value="半日">每半日（約4小時）</option>
                        <option value="全日">每全日（約8小時）</option>
                      </select>
                    </Field>
                  </div>
                )}
              </div>

              {/* 拍照/影片 */}
              <div className={`border p-4 space-y-3 transition-all ${form.offersPhotoVideo ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.offersPhotoVideo} onChange={e => setForm({ ...form, offersPhotoVideo: e.target.checked })} className="accent-[#1A237E] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-black text-[#1C1C1C]">📸 提供現場拍照 / 影片服務</p>
                    <p className="text-[9px] text-stone-400">為商品拍攝細節照片或短片，確認後才落單</p>
                  </div>
                </label>
                {form.offersPhotoVideo && (
                  <div className="pl-7">
                    <Field label="收費（¥ / 每組商品）" req>
                      <input type="number" value={form.photoVideoRate} onChange={e => setForm({ ...form, photoVideoRate: e.target.value })}
                        className={inputCls} placeholder="e.g. 1500" />
                    </Field>
                  </div>
                )}
              </div>

              {/* 排隊 */}
              <div className={`border p-4 space-y-3 transition-all ${form.offersQueueing ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.offersQueueing} onChange={e => setForm({ ...form, offersQueueing: e.target.checked })} className="accent-[#1A237E] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-black text-[#1C1C1C]">⏳ 提供排隊代購服務</p>
                    <p className="text-[9px] text-stone-400">代你排隊搶購限量版商品</p>
                  </div>
                </label>
                {form.offersQueueing && (
                  <div className="grid grid-cols-2 gap-3 pl-7">
                    <Field label="收費（¥）" req>
                      <input type="number" value={form.queueingRate} onChange={e => setForm({ ...form, queueingRate: e.target.value })}
                        className={inputCls} placeholder="e.g. 3000" />
                    </Field>
                    <Field label="計費方式" req>
                      <select value={form.queueingUnit} onChange={e => setForm({ ...form, queueingUnit: e.target.value as any })} className={inputCls}>
                        <option value="hourly">小時計（每小時）</option>
                        <option value="daily">日計（全日 ~8小時）</option>
                        <option value="both">兩者皆提供</option>
                      </select>
                    </Field>
                    {form.queueingUnit === 'both' && (
                      <div className="col-span-2 bg-amber-50 border border-amber-200 p-3 text-[9px] text-amber-700">
                        💡 請在個人簡介中說明小時及日計的各自收費，方便買家比較。
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 代寄 */}
              <div className={`border p-4 space-y-3 transition-all ${form.offersShipping ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.offersShipping} onChange={e => setForm({ ...form, offersShipping: e.target.checked })} className="accent-[#1A237E] w-4 h-4" />
                  <div>
                    <p className="text-[10px] font-black text-[#1C1C1C]">📦 提供代寄服務</p>
                    <p className="text-[9px] text-stone-400">購入商品後代為整理並寄往買家指定地址</p>
                  </div>
                </label>
                {form.offersShipping && (
                  <div className="pl-7 space-y-3">
                    <Field label="接受的運送方式（可多選）" req>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {SHIPPING_OPTIONS.map(s => (
                          <button key={s} type="button" onClick={() => setForm({ ...form, shippingMethods: toggle(form.shippingMethods, s) })}
                            className={`px-3 py-1.5 text-[9px] font-black border transition-all ${form.shippingMethods.includes(s) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A237E]'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>
                )}
              </div>
            </div>

            {/* 05 付款條件 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">05 — 付款條件</h3>
              <Field label="付款方式" req>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { val: 'full', label: '💳 全額先付', desc: '確認訂單後買家須付全數貨款及服務費，才開始代購' },
                    { val: 'deposit', label: '💳 訂金制', desc: '確認後先付訂金，買手入手商品後買家付清尾數' },
                    { val: 'negotiate', label: '💬 面議', desc: '按每次訂單情況與買家協商' },
                  ].map(({ val, label, desc }) => (
                    <label key={val} className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${form.paymentTerms === val ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200 hover:border-stone-300'}`}>
                      <input type="radio" name="paymentTerms" value={val} checked={form.paymentTerms === val} onChange={() => setForm({ ...form, paymentTerms: val })} className="mt-0.5 accent-[#1A237E]" required />
                      <div>
                        <p className="text-[10px] font-black text-[#1C1C1C]">{label}</p>
                        <p className="text-[9px] text-stone-400 mt-0.5">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Field>
              {form.paymentTerms === 'deposit' && (
                <Field label="訂金比例" req>
                  <select required value={form.depositRate} onChange={e => setForm({ ...form, depositRate: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="20%">20%</option>
                    <option value="30%">30%</option>
                    <option value="50%">50%</option>
                    <option value="70%">70%</option>
                  </select>
                </Field>
              )}
            </div>

            {/* 06 服務詳情 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">06 — 服務詳情</h3>
              <div className="grid grid-cols-3 gap-4">
                <Field label="佣金範圍" req>
                  <select required value={form.commission} onChange={e => setForm({ ...form, commission: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="3-5%">3–5%</option>
                    <option value="5-8%">5–8%</option>
                    <option value="8-12%">8–12%</option>
                    <option value="12%+">12% 以上</option>
                    <option value="negotiate">面議</option>
                  </select>
                </Field>
                <Field label="最低訂單（¥）">
                  <input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} className={inputCls} placeholder="e.g. 3000" />
                </Field>
                <Field label="平均回覆時間" req>
                  <select required value={form.responseTime} onChange={e => setForm({ ...form, responseTime: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="< 1小時">1 小時內</option>
                    <option value="< 4小時">4 小時內</option>
                    <option value="< 12小時">12 小時內</option>
                    <option value="< 24小時">24 小時內</option>
                    <option value="1-3天">1–3 天</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* 07 自我介紹 */}
            <div className="px-8 py-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">07 — 自我介紹</h3>
              <Field label="個人簡介" req>
                <textarea required rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  className={`${inputCls} resize-none`} maxLength={150}
                  placeholder="簡介你的代購背景、服務特色（150字以內）" />
                <p className="text-[9px] text-stone-400 text-right">{form.bio.length}/150</p>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="代購年資" req>
                  <select required value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="< 1年">不足 1 年</option>
                    <option value="1-3年">1–3 年</option>
                    <option value="3-5年">3–5 年</option>
                    <option value="5-10年">5–10 年</option>
                    <option value="10年+">10 年以上</option>
                  </select>
                </Field>
                <Field label="個人亮點（展示於卡片）">
                  <input type="text" value={form.highlight} onChange={e => setForm({ ...form, highlight: e.target.value })}
                    className={inputCls} maxLength={60} placeholder="e.g. Pokemon Center 每日探貨" />
                </Field>
              </div>
            </div>

            {/* 08 聲明條款 */}
            <div className="px-8 py-6 space-y-4 bg-stone-50">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">08 — 聲明與條款</h3>
              {[
                { key: 'agreeTerms' as const, text: '我明白 Michi 是資訊索引平台，不保證任何交易、不介入買賣雙方糾紛，亦不對買手服務質素、商品真偽作出任何保證或背書。' },
                { key: 'agreeDisclaimer' as const, text: '我確認所填資料屬實，同意以個人身份在 Michi 展示資料頁面。所有交易責任由本人與買家自行承擔，與 Michi 無關。' },
              ].map(({ key, text }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })}
                    className="mt-0.5 flex-shrink-0 accent-[#1A237E] w-4 h-4" />
                  <span className="text-[10px] text-stone-500 leading-relaxed">{text}</span>
                </label>
              ))}
              <button type="submit" disabled={!form.agreeTerms || !form.agreeDisclaimer || loading}
                className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all mt-2 ${
                  form.agreeTerms && form.agreeDisclaimer && !loading
                    ? 'bg-[#1A237E] text-white hover:bg-[#B22222]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}>
                {loading ? '提交中…' : '提交申請 →'}
              </button>
              <p className="text-[9px] text-stone-400 text-center">提交後 3–5 個工作天內以電郵回覆</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}