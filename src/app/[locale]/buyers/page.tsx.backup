'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface BuyerServices {
  livestream: boolean;
  photoVideo: boolean;
  queueing: boolean;
  queueRate: string;
  shipping: boolean;
  paymentTerms: string;
  depositRate: string;
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
    tags: ['Gundam', 'Figure', 'Pokemon', 'Jump'],
    filter: 'anime',
    description: '動漫周邊收藏家，熟悉各大會場限定及一番賞。日本橋及秋葉原常駐，第一時間掌握新品動態。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: '大阪難波 Jump 旗艦店限定品專家',
    completedOrders: 876,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: true,
      queueRate: '¥2,000/小時',
      shipping: true,
      paymentTerms: '訂金50%',
      depositRate: '50%',
    },
    livestreamRate: '¥3,500/30分鐘',
    photoVideoRate: '¥1,200/組',
  },
  {
    id: 3,
    name: 'Haru Nakamura', nameJp: '中村晴',
    icon: '🏮',
    location: '京都 Kyoto', area: 'kyoto',
    experience: '12年',
    specialty: 'VINTAGE', specialtyLabel: '古著工藝',
    score: 5.0, reviews: 445,
    commission: '8-12%',
    responseTime: '< 6小時',
    languages: ['繁中', '日文'],
    tags: ['陶藝', '古布', '民藝', '古道具'],
    filter: 'vintage',
    description: '京都傳統工藝職人，深入寺町、錦市場尋找稀有工藝品。專注昭和古著、手作陶器及民藝器物。',
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
  {
    id: 4,
    name: 'Sato Hiroshi', nameJp: '佐藤博',
    icon: '📷',
    location: '東京 Tokyo', area: 'tokyo',
    experience: '6年',
    specialty: 'TECH', specialtyLabel: '電子數碼',
    score: 4.7, reviews: 267,
    commission: '5-9%',
    responseTime: '< 3小時',
    languages: ['繁中', '英文', '日文'],
    tags: ['Sony', 'Apple', 'Fujifilm', 'Limited'],
    filter: 'tech',
    description: '秋葉原常駐，專注最新日本限定版電子產品。相機、音響、遊戲機限定色及日版開箱。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: 'Sony / Fujifilm 日本限定色專家',
    completedOrders: 534,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: true,
      queueRate: '¥3,500/小時',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '—',
    photoVideoRate: '¥1,000/組',
  },
  {
    id: 5,
    name: 'Mina Yoshida', nameJp: '吉田美奈',
    icon: '💄',
    location: '福岡 Fukuoka', area: 'fukuoka',
    experience: '4年',
    specialty: 'BEAUTY', specialtyLabel: '美妝護膚',
    score: 4.7, reviews: 189,
    commission: '6-9%',
    responseTime: '< 2小時',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['藥妝', 'CANMAKE', 'KOSE', '限定色'],
    filter: 'beauty',
    description: '福岡藥妝店達人，熟悉各大品牌季節限定色及九州限定商品。Instagram 粉絲 2 萬，每週直播選品。',
    level: 'MICHI 買手', levelNum: 2,
    highlight: '九州限定 & 季節限定美妝首選',
    completedOrders: 421,
    services: {
      livestream: true,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: true,
      paymentTerms: '訂金30%',
      depositRate: '30%',
    },
    livestreamRate: '¥2,500/30分鐘',
    photoVideoRate: '¥800/組',
  },
  {
    id: 6,
    name: 'Kenji Fujimoto', nameJp: '藤本健二',
    icon: '🎮',
    location: '名古屋 Nagoya', area: 'nagoya',
    experience: '9年',
    specialty: 'FOOD', specialtyLabel: '食品零食',
    score: 4.6, reviews: 334,
    commission: '5-7%',
    responseTime: '< 5小時',
    languages: ['繁中', '日文'],
    tags: ['名古屋限定', '卡牌', '零食', 'Pokemon'],
    filter: 'food',
    description: '中部地區代購老手，專注名古屋限定食品及名產。同時熟悉卡牌遊戲二手市場，可代尋稀有絕版卡牌。',
    level: 'MICHI 職人', levelNum: 3,
    highlight: '名古屋限定食品 & Pokemon 卡牌',
    completedOrders: 1102,
    services: {
      livestream: false,
      photoVideo: true,
      queueing: false,
      queueRate: '—',
      shipping: true,
      paymentTerms: '全額先付',
      depositRate: '100%',
    },
    livestreamRate: '—',
    photoVideoRate: '¥1,000/組',
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
];

const AREAS = [
  { key: 'all',     label: '全部地區' },
  { key: 'tokyo',   label: '東京' },
  { key: 'osaka',   label: '大阪' },
  { key: 'kyoto',   label: '京都' },
  { key: 'fukuoka', label: '福岡' },
  { key: 'nagoya',  label: '名古屋' },
];

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
// SERVICE BADGE
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

  const serviceOptions = [
    { key: 'needLivestream', label: '現場直播',  avail: buyer.services.livestream, rate: buyer.livestreamRate },
    { key: 'needPhoto',      label: '現場拍照',  avail: buyer.services.photoVideo, rate: buyer.photoVideoRate },
    { key: 'needQueueing',   label: '排隊服務',  avail: buyer.services.queueing,   rate: buyer.services.queueRate },
    { key: 'needShipping',   label: '代寄服務',  avail: buyer.services.shipping,   rate: '按重量報價' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">
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
            <div className="text-5xl">✦</div>
            <h3 className="text-xl font-black text-[#1C1C1C]">詢問已發送</h3>
            <p className="text-stone-500 text-sm">{buyer.name} 將在 {buyer.responseTime} 內回覆您。</p>
            <button onClick={onClose}
              className="mt-4 border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">姓名 *</label>
                <input required type="text" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputCls} placeholder="你的名字" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Email *</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputCls} placeholder="your@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">所需服務</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map(({ key, label, avail, rate }) => (
                  <label key={key}
                    className={`flex items-start gap-2 p-3 border cursor-pointer transition-all ${
                      !avail
                        ? 'opacity-30 cursor-not-allowed bg-stone-50'
                        : (form as any)[key] ? 'border-[#1A237E] bg-[#1A237E]/5' : 'border-stone-200 hover:border-stone-300'
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
// APPLY MODAL
// ─────────────────────────────────────────────────────────────
function ApplyModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', location: '', specialty: '', experience: '', intro: '' });
  const inputCls = "w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E] bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">
        <div className="bg-[#1C1C1C] text-white p-7 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Join Michi</p>
            <h3 className="text-xl font-serif font-black">申請成為買手</h3>
            <p className="text-white/50 text-xs">加入 Michi 買手網絡，連接全球買家</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-4">
            <div className="text-5xl">🎌</div>
            <h3 className="text-xl font-black text-[#1C1C1C]">申請已收到</h3>
            <p className="text-stone-500 text-sm">我們將在 3 個工作天內審核您的申請並回覆。</p>
            <button onClick={onClose}
              className="mt-4 border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="p-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">姓名 *</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="你的姓名" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">現居日本城市 *</label>
              <input required type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="東京、大阪、京都…" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">代購專長 *</label>
              <input required type="text" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} className={inputCls} placeholder="時尚、動漫、美妝…" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">代購年資 *</label>
              <input required type="text" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className={inputCls} placeholder="例如：3年" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">自我介紹</label>
              <textarea rows={3} value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} className={`${inputCls} resize-none`} placeholder="簡介你的代購經驗及優勢…" />
            </div>
            <button type="submit"
              className="w-full py-4 bg-[#1C1C1C] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
              提交申請
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

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white">
          <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">
                  Michi · 買手名錄
                </p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  找到你的<br />
                  <span className="text-[#C5A059]">日本買手</span>
                </h1>
                <p className="text-[12px] text-white/50 max-w-md leading-relaxed">
                  Michi 收錄在日本各城市的代購買手，提供直播、拍照、排隊及代寄服務。平台不參與任何交易，資訊僅供參考。
                </p>
              </div>
              <button
                onClick={() => setShowApply(true)}
                className="flex-shrink-0 border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all"
              >
                ✦ 申請成為買手
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: `${BUYERS.length}+`, label: '買手' },
                { n: '5', label: '日本城市' },
                { n: '7', label: '專長分類' },
                { n: '2011', label: '年起創辦' },
              ].map(({ n, label }) => (
                <div key={label} className="space-y-1">
                  <p className="text-3xl font-black text-white">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PAYMENT INFO STRIP ════════════════════════════ */}
        <div className="bg-[#1C1C1C] border-t border-white/5 text-white py-5 px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 flex-shrink-0">付款條件說明</p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: '💳 全額先付', desc: '確認訂單後即付全數。買手購入商品風險較低，多用於搶手限定款。' },
                { label: '💳 訂金制',   desc: '先付訂金（通常30-50%），買手入手商品後付尾數。適合大額訂單。' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3 max-w-sm">
                  <span className="text-[10px] font-black text-[#C5A059] flex-shrink-0 mt-0.5">{label}</span>
                  <p className="text-[9px] text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SEARCH + FILTERS ══════════════════════════════ */}
        <section className="bg-white border-b border-stone-200 sticky top-[80px] z-30">
          <div className="max-w-7xl mx-auto px-8 py-5 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="搜尋買手、城市、專長…"
                  className="w-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
                <span className="absolute right-3 top-2.5 text-stone-400 text-sm pointer-events-none">🔍</span>
              </div>

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

        {/* ══ BUYER GRID ════════════════════════════════════ */}
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
                      {/* Level badge */}
                      <div className={`absolute top-3 left-3 px-2 py-1 text-[7px] font-black uppercase tracking-[0.3em] border ${lvl.bg} ${lvl.text} ${lvl.border}`}>
                        {buyer.level}
                      </div>
                      {/* Score */}
                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 flex items-center gap-1">
                        <span className="text-[#C5A059] text-xs">★</span>
                        <span className="text-[10px] font-black text-[#1C1C1C]">{buyer.score}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="border border-t-0 border-stone-200 p-5 flex flex-col gap-4 flex-1 bg-white group-hover:border-[#1A237E]/30 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-black text-[#1C1C1C] text-sm">{buyer.name}</h3>
                            <p className="text-[9px] text-stone-400 font-bold">{buyer.nameJp} · {buyer.location}</p>
                          </div>
                          <span className="text-[8px] font-bold text-stone-400 flex-shrink-0">{buyer.experience}</span>
                        </div>
                        <p className="text-[9px] font-black text-[#B22222] uppercase tracking-widest">{buyer.highlight}</p>
                      </div>

                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">{buyer.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {buyer.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[8px] bg-stone-100 text-stone-500 px-1.5 py-0.5 font-bold">{tag}</span>
                        ))}
                        <span className="text-[8px] bg-stone-100 text-stone-400 px-1.5 py-0.5 font-bold">{buyer.specialty}</span>
                      </div>

                      {/* Services */}
                      <div className="grid grid-cols-4 gap-1">
                        <ServiceBadge active={buyer.services.livestream} label="直播" sub={buyer.services.livestream ? buyer.livestreamRate : undefined} />
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

        {/* ══ APPLY CTA ═════════════════════════════════════ */}
        <section id="apply" className="bg-[#1A237E] text-white py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">For Buyers in Japan</p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">你也在日本？<br />加入 Michi 買手網絡</h2>
              <p className="text-white/50 text-sm max-w-md leading-relaxed">
                無論你在東京、大阪、京都還是其他城市，Michi 讓全球買家主動找到你。設定你的專長、服務與費用，建立你的代購品牌。
              </p>
            </div>
            <button
              onClick={() => setShowApply(true)}
              className="flex-shrink-0 border border-white text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1A237E] transition-all"
            >
              立即申請成為買手 →
            </button>
          </div>
        </section>

      </main>
    </>
  );
}