'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const BUYERS = [
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
    responseTime: '< 2小時',
    languages: ['繁中', '日文', 'English'],
    tags: ['Harajuku', 'Vintage', 'Streetwear', 'Luxury'],
    filter: 'fashion',
    description: '原宿時尚達人，深耕裏原宿 vintage 及限定聯名系列。擅長尋找 Supreme、Palace、Undercover 等品牌限定款，並提供詳細真偽鑑定。',
    badge: 'MICHI 大師',
    badgeLevel: 4,
    verified: true,
    highlight: '專攻 Nike SB 系列及 Tokyo 限定款',
    completedOrders: 1240,
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
    responseTime: '< 4小時',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Gundam', 'Figure', 'Limited', '一番賞'],
    filter: 'anime',
    description: '動漫周邊收藏家出身，熟悉各大コミケ及会場限定商品。善用人脈提前預約，確保搶手商品到手。',
    badge: 'MICHI 精選',
    badgeLevel: 3,
    verified: true,
    highlight: '大阪 Namba 扭蛋倉庫合作夥伴',
    completedOrders: 678,
  },
  {
    id: 3,
    name: 'Aoyama Mei',
    nameJp: '青山芽衣',
    icon: '🏺',
    location: '京都 Kyoto',
    area: 'kyoto',
    experience: '12年',
    specialty: 'VINTAGE',
    specialtyLabel: '古董工藝',
    score: 5.0,
    reviews: 445,
    commission: '8-12%',
    responseTime: '< 6小時',
    languages: ['繁中', '日文', 'English'],
    tags: ['陶藝', '古布', '民藝', '漆器'],
    filter: 'vintage',
    description: '京都傳統工藝職人，深入西陣織、錦市場等百年市場。專門尋訪老店與職人直售，提供正宗工藝品鑑定書。',
    badge: 'MICHI 大師',
    badgeLevel: 4,
    verified: true,
    highlight: '與京都70+年老店建立獨家合作',
    completedOrders: 2100,
  },
  {
    id: 4,
    name: 'Shimizu Ryo',
    nameJp: '清水遼',
    icon: '📷',
    location: '東京 Tokyo',
    area: 'tokyo',
    experience: '6年',
    specialty: 'TECH',
    specialtyLabel: '電子科技',
    score: 4.7,
    reviews: 267,
    commission: '4-7%',
    responseTime: '< 3小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Sony', 'Panasonic', 'Fujifilm', 'Nintendo'],
    filter: 'tech',
    description: '秋葉原電子達人，每週到場探貨。熟悉各大電量販店會員制度，能搶到最優惠價格及最新限定款式。',
    badge: 'MICHI 認證',
    badgeLevel: 2,
    verified: true,
    highlight: 'Yodobashi/BIC 忠誠會員，最高折扣',
    completedOrders: 892,
  },
  {
    id: 5,
    name: 'Fujita Hana',
    nameJp: '藤田花',
    icon: '🌿',
    location: '福岡 Fukuoka',
    area: 'fukuoka',
    experience: '4年',
    specialty: 'BEAUTY',
    specialtyLabel: '美妝藥粧',
    score: 4.9,
    reviews: 189,
    commission: '5-9%',
    responseTime: '< 2小時',
    languages: ['繁中', '簡中', '泰文'],
    tags: ['COSME大賞', '藥妝', 'DHC', 'Canmake'],
    filter: 'beauty',
    description: '藥妝店達人，深入研究日本年度 COSME 大賞排行。熟悉各大連鎖藥妝折扣期，確保最低價入手限定色及海外未上市商品。',
    badge: 'MICHI 認證',
    badgeLevel: 2,
    verified: true,
    highlight: '福岡限定品及九州區域商品專家',
    completedOrders: 534,
  },
  {
    id: 6,
    name: 'Ono Takashi',
    nameJp: '小野貴',
    icon: '🎴',
    location: '名古屋 Nagoya',
    area: 'nagoya',
    experience: '9年',
    specialty: 'GAMING',
    specialtyLabel: '遊戲卡牌',
    score: 4.8,
    reviews: 334,
    commission: '6-10%',
    responseTime: '< 5小時',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Pokemon', 'ワンピース', 'Dragon Ball', '遊戲王'],
    filter: 'anime',
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉名古屋各大中古市場。擅長鑑定稀有卡及限定版，提供專業卡況評估。',
    badge: 'MICHI 精選',
    badgeLevel: 3,
    verified: true,
    highlight: 'Pokemon Center Nagoya 每日探貨',
    completedOrders: 1560,
  },
  {
    id: 7,
    name: 'Nishida Yoko',
    nameJp: '西田陽子',
    icon: '☕',
    location: '東京 Tokyo',
    area: 'tokyo',
    experience: '3年',
    specialty: 'FOOD',
    specialtyLabel: '食品零食',
    score: 4.6,
    reviews: 88,
    commission: '7-12%',
    responseTime: '< 3小時',
    languages: ['繁中', '日文'],
    tags: ['限定口味', '地區特產', '和菓子', '抹茶'],
    filter: 'food',
    description: '日本食品愛好者，專注季節限定口味及地區特產。定期探索各大便利店、超市及百貨食品館的期間限定商品。',
    badge: 'MICHI 新手',
    badgeLevel: 1,
    verified: true,
    highlight: 'TOKYO Banana / Shiroi Koibito 限定專家',
    completedOrders: 213,
  },
  {
    id: 8,
    name: 'Kobayashi Sota',
    nameJp: '小林颯太',
    icon: '⌚',
    location: '大阪 Osaka',
    area: 'osaka',
    experience: '7年',
    specialty: 'LUXURY',
    specialtyLabel: '精品名錶',
    score: 4.9,
    reviews: 156,
    commission: '3-5%',
    responseTime: '< 24小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Seiko', 'Grand Seiko', 'Omega', '精品'],
    filter: 'fashion',
    description: '精品腕錶及名牌包專家，熟悉日本正規經銷商及outlet。提供正品保證書、海外購物退稅協助及安全寄送服務。',
    badge: 'MICHI 精選',
    badgeLevel: 3,
    verified: true,
    highlight: 'Grand Seiko 大阪旗艦店 VIP 會員',
    completedOrders: 445,
  },
  {
    id: 9,
    name: 'Hayashi Rina',
    nameJp: '林里奈',
    icon: '🎋',
    location: '京都 Kyoto',
    area: 'kyoto',
    experience: '10年',
    specialty: 'LIFESTYLE',
    specialtyLabel: '生活雜貨',
    score: 4.8,
    reviews: 290,
    commission: '5-8%',
    responseTime: '< 4小時',
    languages: ['繁中', '日文', 'English', '泰文'],
    tags: ['無印良品', '北歐風', '文具', '香薰'],
    filter: 'lifestyle',
    description: '日本生活選物達人，專注高質感生活雜貨。熟悉 Loft、東急Hands、蔦屋書店等選品店，尋找設計師聯名限定款。',
    badge: 'MICHI 大師',
    badgeLevel: 4,
    verified: true,
    highlight: '京都限定文具及和風生活用品達人',
    completedOrders: 1890,
  },
];

const FILTERS = [
  { key: 'all', label: 'All', icon: '◉' },
  { key: 'fashion', label: 'Fashion', icon: '👔' },
  { key: 'anime', label: 'Anime', icon: '⚡' },
  { key: 'vintage', label: 'Vintage', icon: '🏺' },
  { key: 'beauty', label: 'Beauty', icon: '🌿' },
  { key: 'tech', label: 'Tech', icon: '📷' },
  { key: 'food', label: 'Food', icon: '☕' },
  { key: 'lifestyle', label: 'Lifestyle', icon: '🎋' },
];

const AREAS = [
  { key: 'all', label: '全部地區' },
  { key: 'tokyo', label: '東京' },
  { key: 'osaka', label: '大阪' },
  { key: 'kyoto', label: '京都' },
  { key: 'fukuoka', label: '福岡' },
  { key: 'nagoya', label: '名古屋' },
];

const BADGE_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-stone-100', text: 'text-stone-600', border: 'border-stone-300' },
  2: { bg: 'bg-blue-50', text: 'text-[#1A237E]', border: 'border-[#1A237E]/30' },
  3: { bg: 'bg-pink-50', text: 'text-[#B22222]', border: 'border-[#B22222]/30' },
  4: { bg: 'bg-amber-50', text: 'text-[#C5A059]', border: 'border-[#C5A059]/50' },
};

// ─────────────────────────────────────────────────────────────
// CONTACT MODAL
// ─────────────────────────────────────────────────────────────
function ContactModal({
  buyer,
  onClose,
}: {
  buyer: (typeof BUYERS)[0];
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: call API to send enquiry
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="bg-[#1A237E] text-white p-8 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">聯絡代購職人</p>
            <h3 className="text-2xl font-serif font-black">{buyer.name}</h3>
            <p className="text-white/70 text-sm">{buyer.nameJp} · {buyer.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none transition-colors mt-1"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-12 text-center space-y-4">
            <div className="text-5xl">✓</div>
            <h4 className="text-xl font-serif font-black text-[#1C1C1C]">訊息已發送</h4>
            <p className="text-stone-500 text-sm">
              {buyer.name} 會在 <span className="font-bold text-[#1A237E]">{buyer.responseTime}</span> 內回覆你
            </p>
            <button
              onClick={onClose}
              className="mt-4 border border-[#1C1C1C] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
            >
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">你的名字</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] text-[#1C1C1C]"
                  placeholder="姓名"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">電郵地址</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] text-[#1C1C1C]"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">代購需求</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] text-[#1C1C1C] resize-none"
                placeholder={`請描述你想購買的商品、預算及時間要求…`}
              />
            </div>

            {/* Buyer info */}
            <div className="bg-stone-50 p-4 space-y-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-stone-400 uppercase tracking-widest font-bold">佣金</span>
                <span className="font-black text-[#1C1C1C]">{buyer.commission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400 uppercase tracking-widest font-bold">回覆時間</span>
                <span className="font-black text-[#1A237E]">{buyer.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400 uppercase tracking-widest font-bold">語言</span>
                <span className="font-black text-[#1C1C1C]">{buyer.languages.join(' · ')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all"
            >
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
  const [sortBy, setSortBy] = useState<'score' | 'reviews' | 'experience'>('score');
  const [contactBuyer, setContactBuyer] = useState<(typeof BUYERS)[0] | null>(null);

  // Filter + search + sort
  const displayed = useMemo(() => {
    let list = BUYERS;

    if (activeFilter !== 'all') list = list.filter(b => b.filter === activeFilter);
    if (activeArea !== 'all') list = list.filter(b => b.area === activeArea);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        b =>
          b.name.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          b.specialtyLabel.includes(q) ||
          b.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  }, [search, activeFilter, activeArea, sortBy]);

  return (
    <>
      {/* ══ CONTACT MODAL ══ */}
      {contactBuyer && (
        <ContactModal buyer={contactBuyer} onClose={() => setContactBuyer(null)} />
      )}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ══ TOP BAR ══ */}
        <div className="bg-[#1C1C1C] text-[#F9F7F2]/60 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
          MICHI • 代購職人資訊平台 • 非交易提供方 • 透明直接
        </div>

        {/* ══ NAV ══ */}
        <nav className="sticky top-0 z-40 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <a href={`/${locale}`} className="flex items-center space-x-4 group">
              <div className="w-9 h-9 bg-[#B22222] flex items-center justify-center text-white font-serif text-xl font-black transition-transform group-hover:rotate-6">
                道
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black tracking-tighter text-[#1C1C1C]">みち</span>
                <span className="text-[7px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
              </div>
            </a>

            <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}#market`} className="hover:text-[#1A237E] transition-colors">專家名錄</a>
              <a href={`/${locale}/products`} className="hover:text-[#1A237E] transition-colors">最新商品</a>
              <a href={`/${locale}#philosophy`} className="hover:text-[#1A237E] transition-colors">平台理念</a>
            </div>

            <a
              href={`/${locale}`}
              className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-[#1C1C1C] pb-0.5 hover:text-stone-400 transition-colors"
            >
              ← 返回首頁
            </a>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section className="bg-[#1A237E] text-white py-24 px-8 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none">
            <span className="text-[20rem] font-serif text-white/5 leading-none">人</span>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">
                Michi — 代購職人名錄
              </p>
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight">
                尋覓你的<br />
                <span className="italic font-serif font-normal text-[#C5A059]">專屬買手</span>
              </h1>
            </div>
            <p className="text-white/60 max-w-xl text-base font-light leading-relaxed">
              每位 Michi 認證職人均通過背景審查、交易記錄核實及語言評估。
              在日本代購的道路上，讓我們為你引路。
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-12 pt-4">
              {[
                { n: '9+', label: '認證職人' },
                { n: '5', label: '日本城市' },
                { n: '4.8★', label: '平均評分' },
                { n: '9,700+', label: '完成訂單' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-3xl font-serif italic text-[#C5A059] font-black">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SEARCH + FILTERS ══ */}
        <section className="bg-white border-b border-stone-200 sticky top-[81px] z-30">
          <div className="max-w-7xl mx-auto px-8 py-5 space-y-4">

            {/* Search bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜尋職人名字、城市、專長或標籤…"
                className="w-full border border-stone-200 bg-stone-50 px-5 py-3 text-sm pr-10 focus:outline-none focus:border-[#1A237E] text-[#1C1C1C] placeholder-stone-400"
              />
              <span className="absolute right-4 top-3.5 text-stone-400 text-sm pointer-events-none">🔍</span>
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Category filters */}
              <div className="flex flex-wrap gap-1">
                {FILTERS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] transition-all ${
                      activeFilter === key
                        ? 'bg-[#1A237E] text-white'
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-stone-200 hidden lg:block" />

              {/* Area filter */}
              <select
                value={activeArea}
                onChange={e => setActiveArea(e.target.value)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none focus:border-[#1A237E] bg-white"
              >
                {AREAS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none focus:border-[#1A237E] bg-white"
              >
                <option value="score">按評分排序</option>
                <option value="reviews">按評價數排序</option>
                <option value="experience">按經驗排序</option>
              </select>

              <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
                找到 {displayed.length} 位職人
              </span>
            </div>
          </div>
        </section>

        {/* ══ BUYER GRID ══ */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          {displayed.length === 0 ? (
            <div className="text-center py-32 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">找不到符合條件的職人</p>
              <button
                onClick={() => { setSearch(''); setActiveFilter('all'); setActiveArea('all'); }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all"
              >
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
              {displayed.map((buyer) => {
                const badge = BADGE_STYLES[buyer.badgeLevel];
                return (
                  <div key={buyer.id} className="group flex flex-col">

                    {/* Avatar */}
                    <div className="aspect-[4/3] bg-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden">
                      <span className="text-7xl z-10">{buyer.icon}</span>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#1A237E]/0 group-hover:bg-[#1A237E]/5 transition-all duration-300" />

                      {/* Specialty badge */}
                      <div className="absolute top-4 left-4 bg-white border border-stone-200 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-500">
                        {buyer.specialtyLabel}
                      </div>

                      {/* Score */}
                      <div className="absolute top-4 right-4 bg-[#1C1C1C] text-white px-2 py-1 text-[9px] font-black">
                        ★ {buyer.score}
                      </div>

                      {/* Completed orders */}
                      <div className="absolute bottom-4 right-4 text-[8px] font-bold text-stone-400 uppercase tracking-widest">
                        {buyer.completedOrders.toLocaleString()} 單
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-grow border border-stone-200 border-t-0 bg-white p-6 space-y-4">

                      {/* Name + badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-serif font-black text-[#1C1C1C] group-hover:text-[#B22222] transition-colors leading-tight">
                            {buyer.name}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-bold tracking-wider mt-0.5">
                            {buyer.nameJp} · {buyer.location}
                          </p>
                        </div>
                        <span className={`flex-shrink-0 text-[8px] font-black uppercase tracking-wider px-2 py-1 border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {buyer.badge}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                        {buyer.description}
                      </p>

                      {/* Highlight */}
                      <div className="bg-amber-50 border-l-2 border-[#C5A059] px-3 py-2">
                        <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest mb-0.5">亮點</p>
                        <p className="text-[10px] text-stone-700 font-bold">{buyer.highlight}</p>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-100 pt-4">
                        {[
                          { label: '經驗', value: buyer.experience },
                          { label: '佣金', value: buyer.commission },
                          { label: '回覆', value: buyer.responseTime },
                        ].map(({ label, value }) => (
                          <div key={label} className="space-y-1">
                            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                            <p className="text-[10px] font-black text-[#1C1C1C]">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {buyer.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-[8px] font-bold text-stone-500 border border-stone-100 px-2 py-0.5 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">語言</span>
                        {buyer.languages.map(lang => (
                          <span key={lang} className="text-[8px] bg-blue-50 text-[#1A237E] px-1.5 py-0.5 font-bold">
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Reviews */}
                      <p className="text-[9px] text-stone-400 font-bold">
                        ★ {buyer.score} · {buyer.reviews} 則評價
                      </p>

                      {/* CTA button */}
                      <button
                        onClick={() => setContactBuyer(buyer)}
                        className="mt-auto w-full py-3.5 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all"
                      >
                        聯絡職人
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ══ BECOME A BUYER CTA ══ */}
        <section className="bg-[#1C1C1C] text-white py-24 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">加入我們</p>
              <h2 className="text-4xl font-serif font-black leading-tight">
                成為 Michi 認證職人<br />
                <span className="text-[#C5A059] italic font-serif font-normal">Join as a Buyer</span>
              </h2>
              <p className="text-white/50 text-sm max-w-md leading-relaxed">
                如果你在日本，並對代購服務充滿熱情，歡迎申請成為 Michi 認證職人。
                通過審核後即可在平台展示個人檔案，連結全球買家。
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:apply@michi.jp?subject=職人申請`}
                className="inline-block bg-[#C5A059] text-[#1C1C1C] px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all text-center"
              >
                申請成為職人 →
              </a>
              <p className="text-[9px] text-white/30 text-center uppercase tracking-widest">
                審核期 5-7 個工作天
              </p>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="bg-[#111] text-white py-16 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-lg font-black">道</div>
              <div>
                <p className="font-black text-lg tracking-tighter">みち</p>
                <p className="text-[8px] text-stone-500 uppercase tracking-[0.4em]">Michi Project</p>
              </div>
            </div>
            <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}`} className="hover:text-white transition-colors">首頁</a>
              <a href={`/${locale}/products`} className="hover:text-white transition-colors">商品</a>
              <a href="mailto:hello@michi.jp" className="hover:text-white transition-colors">聯絡</a>
            </div>
            <p className="text-[9px] text-stone-600 uppercase tracking-widest">
              © {new Date().getFullYear()} Michi. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}