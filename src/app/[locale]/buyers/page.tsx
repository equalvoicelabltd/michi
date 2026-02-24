'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// DATA — 移除所有「認證」「verified」字眼
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
    description: '原宿時尚達人，深耕裏原宿 vintage 及限定聯名系列。擅長尋找 Supreme、Palace、Undercover 等品牌限定款。',
    level: 'MICHI 達人',
    levelNum: 4,
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
    level: 'MICHI 職人',
    levelNum: 3,
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
    description: '京都傳統工藝職人，深入西陣織、錦市場等百年市場。專門尋訪老店與職人直售商品。',
    level: 'MICHI 達人',
    levelNum: 4,
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
    level: 'MICHI 買手',
    levelNum: 2,
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
    description: '藥妝店達人，深入研究日本年度 COSME 大賞排行。熟悉各大連鎖藥妝折扣期及海外未上市商品。',
    level: 'MICHI 買手',
    levelNum: 2,
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
    description: '專注卡牌遊戲及電子遊戲周邊，熟悉名古屋各大中古市場。擅長鑑定稀有卡及限定版。',
    level: 'MICHI 職人',
    levelNum: 3,
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
    description: '日本食品愛好者，專注季節限定口味及地區特產。定期探索各大便利店、超市及百貨食品館期間限定商品。',
    level: 'MICHI 新人',
    levelNum: 1,
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
    description: '精品腕錶及名牌包專家，熟悉日本正規經銷商及 outlet。提供正品收據、海外購物退稅協助及安全寄送服務。',
    level: 'MICHI 職人',
    levelNum: 3,
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
    description: '日本生活選物達人，專注高質感生活雜貨。熟悉 Loft、東急Hands、蔦屋書店等選品店限定款。',
    level: 'MICHI 達人',
    levelNum: 4,
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

// 等級樣式 — 純粹描述性，無「認證」含義
const LEVEL_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-stone-100',  text: 'text-stone-500',  border: 'border-stone-300' },
  2: { bg: 'bg-blue-50',   text: 'text-[#1A237E]',  border: 'border-[#1A237E]/30' },
  3: { bg: 'bg-pink-50',   text: 'text-[#B22222]',  border: 'border-[#B22222]/30' },
  4: { bg: 'bg-amber-50',  text: 'text-[#C5A059]',  border: 'border-[#C5A059]/50' },
};

// ─────────────────────────────────────────────────────────────
// CONTACT MODAL
// ─────────────────────────────────────────────────────────────
function ContactModal({ buyer, onClose }: { buyer: typeof BUYERS[0]; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl">
        <div className="bg-[#1A237E] text-white p-8 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">聯絡買手</p>
            <h3 className="text-2xl font-serif font-black">{buyer.name}</h3>
            <p className="text-white/60 text-sm">{buyer.nameJp} · {buyer.location}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {sent ? (
          <div className="p-12 text-center space-y-4">
            <div className="text-5xl">✓</div>
            <h4 className="text-xl font-serif font-black">訊息已發送</h4>
            <p className="text-stone-500 text-sm">
              {buyer.name} 會在 <span className="font-bold text-[#1A237E]">{buyer.responseTime}</span> 內回覆
            </p>
            <button onClick={onClose} className="mt-4 border border-[#1C1C1C] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">你的名字</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E]" placeholder="姓名" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">電郵地址</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E]" placeholder="email@example.com" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">代購需求</label>
              <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] resize-none"
                placeholder="請描述你想購買的商品、預算及時間要求…" />
            </div>
            <div className="bg-stone-50 p-4 space-y-2 text-[10px]">
              {[['佣金', buyer.commission], ['回覆時間', buyer.responseTime], ['語言', buyer.languages.join(' · ')]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-widest font-bold">{k}</span>
                  <span className="font-black text-[#1C1C1C]">{v}</span>
                </div>
              ))}
            </div>
            <button type="submit" className="w-full py-4 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
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
  const [contactBuyer, setContactBuyer] = useState<typeof BUYERS[0] | null>(null);
  const [showApply, setShowApply] = useState(false);

  const displayed = useMemo(() => {
    let list = BUYERS;
    if (activeFilter !== 'all') list = list.filter(b => b.filter === activeFilter);
    if (activeArea !== 'all') list = list.filter(b => b.area === activeArea);
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
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  }, [search, activeFilter, activeArea, sortBy]);

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
              <a href={`/${locale}/products`} className="hover:text-[#1A237E] transition-colors">最新商品</a>
              <a href={`/${locale}#philosophy`} className="hover:text-[#1A237E] transition-colors">平台理念</a>
            </div>
            <button
              onClick={() => setShowApply(true)}
              className="text-[10px] font-black uppercase tracking-[0.3em] bg-[#1A237E] text-white px-5 py-2.5 hover:bg-[#B22222] transition-all"
            >
              申請成為買手
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#1A237E] text-white py-24 px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none">
            <span className="text-[20rem] font-serif text-white/5 leading-none">人</span>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Michi — 代購買手名錄</p>
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight">
                尋覓你的<br />
                <span className="italic font-serif font-normal text-[#C5A059]">專屬買手</span>
              </h1>
            </div>
            <p className="text-white/50 max-w-xl text-base font-light leading-relaxed">
              Michi 是一個資訊平台，連接有代購需求的買家與在日本的買手。
              所有交易由雙方自行協議，Michi 不介入、不擔保。
            </p>
            <div className="flex flex-wrap gap-12 pt-4">
              {[['9+', '平台買手'], ['5', '日本城市'], ['4.8★', '平均評分'], ['9,700+', '完成紀錄']].map(([n, label]) => (
                <div key={label}>
                  <p className="text-3xl font-serif italic text-[#C5A059] font-black">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER STRIP */}
        <div className="bg-stone-100 border-b border-stone-200 py-3 px-8">
          <p className="max-w-7xl mx-auto text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">
            ⚠️ Michi 為資訊索引平台，不對任何買手的服務質素、交易安全或商品真偽作出保證。請買家自行審慎評估。
          </p>
        </div>

        {/* SEARCH + FILTERS */}
        <section className="bg-white border-b border-stone-200 sticky top-[81px] z-30">
          <div className="max-w-7xl mx-auto px-8 py-5 space-y-4">
            <div className="relative max-w-xl">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="搜尋買手名字、城市、專長或標籤…"
                className="w-full border border-stone-200 bg-stone-50 px-5 py-3 text-sm pr-10 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
              <span className="absolute right-4 top-3.5 text-stone-400 pointer-events-none">🔍</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-1">
                {FILTERS.map(({ key, label, icon }) => (
                  <button key={key} onClick={() => setActiveFilter(key)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] transition-all ${
                      activeFilter === key ? 'bg-[#1A237E] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}>
                    {icon} {label}
                  </button>
                ))}
              </div>
              <div className="h-5 w-px bg-stone-200 hidden lg:block" />
              <select value={activeArea} onChange={e => setActiveArea(e.target.value)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                {AREAS.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                <option value="score">按評分排序</option>
                <option value="reviews">按評價數排序</option>
                <option value="experience">按經驗排序</option>
              </select>
              <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
                找到 {displayed.length} 位買手
              </span>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          {displayed.length === 0 ? (
            <div className="text-center py-32 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">找不到符合條件的買手</p>
              <button onClick={() => { setSearch(''); setActiveFilter('all'); setActiveArea('all'); }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
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
                      <div className="absolute bottom-4 right-4 text-[8px] font-bold text-stone-400 uppercase tracking-widest">
                        {buyer.completedOrders.toLocaleString()} 紀錄
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-grow border border-stone-200 border-t-0 bg-white p-6 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-serif font-black text-[#1C1C1C] group-hover:text-[#B22222] transition-colors leading-tight">
                            {buyer.name}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-bold tracking-wider mt-0.5">
                            {buyer.nameJp} · {buyer.location}
                          </p>
                        </div>
                        {/* 等級 badge — 純描述性，無認證意涵 */}
                        <span className={`flex-shrink-0 text-[8px] font-black uppercase tracking-wider px-2 py-1 border ${lvl.bg} ${lvl.text} ${lvl.border}`}>
                          {buyer.level}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">{buyer.description}</p>

                      <div className="bg-amber-50 border-l-2 border-[#C5A059] px-3 py-2">
                        <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest mb-0.5">專長亮點</p>
                        <p className="text-[10px] text-stone-700 font-bold">{buyer.highlight}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-100 pt-4">
                        {[['經驗', buyer.experience], ['佣金', buyer.commission], ['回覆', buyer.responseTime]].map(([label, value]) => (
                          <div key={label} className="space-y-1">
                            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                            <p className="text-[10px] font-black text-[#1C1C1C]">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {buyer.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-[8px] font-bold text-stone-500 border border-stone-100 px-2 py-0.5 uppercase tracking-tighter">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">語言</span>
                        {buyer.languages.map(lang => (
                          <span key={lang} className="text-[8px] bg-blue-50 text-[#1A237E] px-1.5 py-0.5 font-bold">{lang}</span>
                        ))}
                      </div>

                      <p className="text-[9px] text-stone-400 font-bold">★ {buyer.score} · {buyer.reviews} 則評價</p>

                      <button onClick={() => setContactBuyer(buyer)}
                        className="mt-auto w-full py-3.5 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
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
        <section className="bg-[#1C1C1C] text-white py-24 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">加入平台</p>
              <h2 className="text-4xl font-serif font-black leading-tight">
                在日本？加入 Michi<br />
                <span className="text-[#C5A059] italic font-serif font-normal">成為平台買手</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed">
                如果你身處日本，對代購購物有熱忱，歡迎在 Michi 平台建立個人資料頁，讓全球買家找到你。
                Michi 不收取上架費用，平台不介入任何交易。
              </p>
            </div>
            <button
              onClick={() => setShowApply(true)}
              className="flex-shrink-0 bg-[#C5A059] text-[#1C1C1C] px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all"
            >
              立即申請 →
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111] text-white py-16 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-lg font-black">道</div>
              <div>
                <p className="font-black text-lg tracking-tighter">みち</p>
                <p className="text-[8px] text-stone-500 uppercase tracking-[0.4em]">Information Hub</p>
              </div>
            </div>
            <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
              <a href={`/${locale}`} className="hover:text-white transition-colors">首頁</a>
              <a href={`/${locale}/products`} className="hover:text-white transition-colors">商品</a>
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
// APPLY MODAL — 申請成為買手表單
// ─────────────────────────────────────────────────────────────
function ApplyModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // 基本資料
    name: '',
    nameJp: '',
    email: '',
    whatsapp: '',
    wechat: '',
    line: '',
    // 在日資訊
    city: '',
    cityOther: '',
    residency: '',
    // 專長
    specialties: [] as string[],
    otherSpecialty: '',
    // 服務詳情
    commission: '',
    minOrder: '',
    responseTime: '',
    languages: [] as string[],
    // 自我介紹
    bio: '',
    experience: '',
    highlight: '',
    // 條款
    agreeTerms: false,
    agreeDisclaimer: false,
  });

  const SPECIALTY_OPTIONS = [
    '時尚服飾', '動漫周邊', '古董工藝', '電子科技',
    '美妝藥粧', '遊戲卡牌', '食品零食', '精品名錶', '生活雜貨', '其他',
  ];
  const LANGUAGE_OPTIONS = ['繁體中文', '簡體中文', 'English', '日本語', 'ภาษาไทย'];
  const CITY_OPTIONS = ['東京', '大阪', '京都', '福岡', '名古屋', '札幌', '仙台', '廣島', '其他'];

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeTerms || !form.agreeDisclaimer) return;
    setLoading(true);
    // TODO: submit to /api/apply or Supabase
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(2);
  };

  const Field = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
        {label}{required && <span className="text-[#B22222] ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const inputCls = "w-full border border-stone-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] text-[#1C1C1C] placeholder-stone-300";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="bg-[#1A237E] text-white px-8 py-7 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Michi Platform</p>
            <h2 className="text-2xl font-serif font-black">申請成為 Michi 買手</h2>
            <p className="text-white/50 text-xs">加入平台，讓全球買家找到你</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {step === 2 ? (
          /* SUCCESS */
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#1A237E] text-white flex items-center justify-center text-3xl mx-auto font-serif">
              道
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-black text-[#1C1C1C]">申請已收到</h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
                我們的團隊會在 <span className="font-bold text-[#1A237E]">3-5 個工作天</span> 內通過電郵與你聯絡，
                商討在平台建立個人頁面的詳情。
              </p>
            </div>
            <div className="bg-stone-50 p-4 text-left space-y-2 text-[10px] max-w-xs mx-auto">
              <p className="text-stone-400 uppercase tracking-widest font-black mb-3">申請摘要</p>
              <div className="flex justify-between"><span className="text-stone-400">姓名</span><span className="font-bold">{form.name}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">城市</span><span className="font-bold">{form.city === '其他' ? form.cityOther : form.city}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">電郵</span><span className="font-bold">{form.email}</span></div>
            </div>
            <button onClick={onClose}
              className="border border-[#1C1C1C] px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
              關閉
            </button>
          </div>
        ) : (
          /* FORM */
          <form onSubmit={handleSubmit} className="divide-y divide-stone-100">

            {/* ── SECTION 1: 基本資料 ── */}
            <div className="px-8 py-7 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">01 — 基本資料</h3>

              <div className="grid grid-cols-2 gap-4">
                <Field label="姓名（英文）" required>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputCls} placeholder="e.g. Tanaka Yuki" />
                </Field>
                <Field label="姓名（日文，如有）">
                  <input type="text" value={form.nameJp} onChange={e => setForm({ ...form, nameJp: e.target.value })}
                    className={inputCls} placeholder="田中雪" />
                </Field>
              </div>

              <Field label="聯絡電郵" required>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputCls} placeholder="your@email.com" />
              </Field>

              <div className="grid grid-cols-3 gap-4">
                <Field label="WhatsApp">
                  <input type="text" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                    className={inputCls} placeholder="+81..." />
                </Field>
                <Field label="WeChat ID">
                  <input type="text" value={form.wechat} onChange={e => setForm({ ...form, wechat: e.target.value })}
                    className={inputCls} placeholder="WeChat ID" />
                </Field>
                <Field label="LINE ID">
                  <input type="text" value={form.line} onChange={e => setForm({ ...form, line: e.target.value })}
                    className={inputCls} placeholder="LINE ID" />
                </Field>
              </div>
            </div>

            {/* ── SECTION 2: 在日資訊 ── */}
            <div className="px-8 py-7 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">02 — 在日資訊</h3>

              <div className="grid grid-cols-2 gap-4">
                <Field label="所在城市" required>
                  <select required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                    className={inputCls}>
                    <option value="">請選擇</option>
                    {CITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                {form.city === '其他' && (
                  <Field label="請填寫城市">
                    <input type="text" value={form.cityOther} onChange={e => setForm({ ...form, cityOther: e.target.value })}
                      className={inputCls} placeholder="城市名稱" />
                  </Field>
                )}
              </div>

              <Field label="在日身份" required>
                <select required value={form.residency} onChange={e => setForm({ ...form, residency: e.target.value })}
                  className={inputCls}>
                  <option value="">請選擇</option>
                  <option value="citizen">日本公民</option>
                  <option value="pr">永久居民</option>
                  <option value="working">工作簽證</option>
                  <option value="student">學生簽證</option>
                  <option value="other">其他長期居留</option>
                </select>
              </Field>
            </div>

            {/* ── SECTION 3: 專長 ── */}
            <div className="px-8 py-7 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">03 — 專長類別</h3>

              <Field label="選擇你的專長（可多選）" required>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SPECIALTY_OPTIONS.map(s => (
                    <button key={s} type="button"
                      onClick={() => setForm({ ...form, specialties: toggleArray(form.specialties, s) })}
                      className={`px-3 py-2 text-[9px] font-black uppercase tracking-wider border transition-all ${
                        form.specialties.includes(s)
                          ? 'bg-[#1A237E] text-white border-[#1A237E]'
                          : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A237E]'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              {form.specialties.includes('其他') && (
                <Field label="其他專長說明">
                  <input type="text" value={form.otherSpecialty} onChange={e => setForm({ ...form, otherSpecialty: e.target.value })}
                    className={inputCls} placeholder="請描述你的專長" />
                </Field>
              )}

              <Field label="溝通語言（可多選）" required>
                <div className="flex flex-wrap gap-2 mt-1">
                  {LANGUAGE_OPTIONS.map(l => (
                    <button key={l} type="button"
                      onClick={() => setForm({ ...form, languages: toggleArray(form.languages, l) })}
                      className={`px-3 py-2 text-[9px] font-black uppercase tracking-wider border transition-all ${
                        form.languages.includes(l)
                          ? 'bg-[#1A237E] text-white border-[#1A237E]'
                          : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A237E]'
                      }`}>
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* ── SECTION 4: 服務詳情 ── */}
            <div className="px-8 py-7 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">04 — 服務詳情</h3>

              <div className="grid grid-cols-3 gap-4">
                <Field label="佣金範圍" required>
                  <select required value={form.commission} onChange={e => setForm({ ...form, commission: e.target.value })}
                    className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="3-5%">3–5%</option>
                    <option value="5-8%">5–8%</option>
                    <option value="8-12%">8–12%</option>
                    <option value="12%+">12% 以上</option>
                    <option value="negotiate">面議</option>
                  </select>
                </Field>
                <Field label="最低訂單金額（JPY）">
                  <input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })}
                    className={inputCls} placeholder="e.g. 3000" />
                </Field>
                <Field label="平均回覆時間" required>
                  <select required value={form.responseTime} onChange={e => setForm({ ...form, responseTime: e.target.value })}
                    className={inputCls}>
                    <option value="">請選擇</option>
                    <option value="< 1小時">1小時內</option>
                    <option value="< 4小時">4小時內</option>
                    <option value="< 12小時">12小時內</option>
                    <option value="< 24小時">24小時內</option>
                    <option value="1-3天">1–3天</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* ── SECTION 5: 自我介紹 ── */}
            <div className="px-8 py-7 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A237E]">05 — 自我介紹</h3>

              <Field label="個人簡介（展示於平台頁面）" required>
                <textarea required rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  className={`${inputCls} resize-none`} maxLength={150}
                  placeholder="簡單介紹你的代購背景及服務特色（150字以內）" />
                <p className="text-[9px] text-stone-400 text-right">{form.bio.length}/150</p>
              </Field>

              <Field label="代購年資" required>
                <select required value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
                  className={inputCls}>
                  <option value="">請選擇</option>
                  <option value="< 1年">不足1年</option>
                  <option value="1-3年">1–3年</option>
                  <option value="3-5年">3–5年</option>
                  <option value="5-10年">5–10年</option>
                  <option value="10年+">10年以上</option>
                </select>
              </Field>

              <Field label="個人亮點（一句話，展示於卡片）">
                <input type="text" value={form.highlight} onChange={e => setForm({ ...form, highlight: e.target.value })}
                  className={inputCls} maxLength={60} placeholder="e.g. 京都50+年老店獨家合作夥伴" />
              </Field>
            </div>

            {/* ── SECTION 6: 條款 ── */}
            <div className="px-8 py-7 space-y-4 bg-stone-50">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">06 — 聲明與條款</h3>

              {[
                {
                  key: 'agreeTerms' as const,
                  text: '我明白 Michi 是一個資訊索引平台，不保證任何交易、不介入買賣雙方的任何糾紛，亦不對買手的服務質素、商品真偽作出任何形式的保證或背書。',
                },
                {
                  key: 'agreeDisclaimer' as const,
                  text: '我確認所填資料屬實，我同意以個人身份在 Michi 平台展示資料頁面，所有交易責任由本人與買家自行承擔，與 Michi 平台無關。',
                },
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

              <p className="text-[9px] text-stone-400 text-center">
                提交後我們會在 3–5 個工作天內以電郵回覆
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}