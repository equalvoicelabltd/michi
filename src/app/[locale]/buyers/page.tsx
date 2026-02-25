'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// SERVICE TYPES
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
  { key: 'all',       label: 'All',       icon: '◉' },
  { key: 'fashion',   label: 'Fashion',   icon: '👔' },
  { key: 'anime',     label: 'Anime',     icon: '⚡' },
  { key: 'vintage',   label: 'Vintage',   icon: '🏺' },
  { key: 'beauty',    label: 'Beauty',    icon: '🌿' },
  { key: 'tech',      label: 'Tech',      icon: '📷' },
  { key: 'food',      label: 'Food',      icon: '☕' },
  { key: 'lifestyle', label: 'Lifestyle', icon: '🎋' },
];

const AREAS = [
  { key: 'all',      label: '全部地區' },
  { key: 'tokyo',    label: '東京' },
  { key: 'osaka',    label: '大阪' },
  { key: 'kyoto',    label: '京都' },
  { key: 'fukuoka',  label: '福岡' },
  { key: 'nagoya',   label: '名古屋' },
];

const SERVICE_FILTERS = [
  { key: 'all',        label: '全部' },
  { key: 'livestream', label: '📹 直播' },
  { key: 'queueing',   label: '⏳ 排隊' },
  { key: 'shipping',   label: '📦 代寄' },
];

const LEVEL_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-stone-100', text: 'text-stone-500',  border: 'border-stone-300' },
  2: { bg: 'bg-blue-50',   text: 'text-[#1A237E]',  border: 'border-[#1A237E]/30' },
  3: { bg: 'bg-pink-50',   text: 'text-[#B22222]',  border: 'border-[#B22222]/30' },
  4: { bg: 'bg-amber-50',  text: 'text-[#C5A059]',  border: 'border-[#C5A059]/50' },
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
            <h4 className="text-xl font-serif font-black text-[#1C1C1C]">詢問已送出</h4>
            <p className="text-stone-400 text-sm">買手將盡快與您聯絡，請留意 WhatsApp / LINE / WeChat 訊息。</p>
            <button onClick={onClose}
              className="mt-4 border border-stone-200 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">您的姓名 *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputCls} placeholder="Hong Tai Ming" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">聯絡電郵 *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputCls} placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">所需服務</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'needLivestream', label: '📹 直播' },
                  { key: 'needPhoto',      label: '📸 拍照' },
                  { key: 'needQueueing',   label: '⏳ 排隊' },
                  { key: 'needShipping',   label: '📦 代寄' },
                ].map(({ key, label }) => (
                  <button key={key} type="button"
                    onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                    className={`py-2 text-[9px] font-black border transition-all ${
                      form[key as keyof typeof form]
                        ? 'bg-[#1A237E] text-white border-[#1A237E]'
                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">代購需求詳情 *</label>
              <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4} className={inputCls}
                placeholder="請描述想購買的商品、預算、數量及任何特殊要求…" />
            </div>

            <div className="bg-stone-50 p-4 text-[9px] text-stone-500 leading-relaxed">
              <p className="font-black text-stone-400 uppercase tracking-widest mb-1">付款條件</p>
              <p>{buyer.services.paymentTerms === '全額先付'
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
      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">
        {label}{req && <span className="text-[#B22222] ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep(4);
  };

  const STEPS = ['基本資料', '服務設定', '確認提交'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl shadow-2xl my-8">

        {/* Header */}
        <div className="bg-[#1C1C1C] text-white p-6 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Michi Project</p>
            <h3 className="text-lg font-serif font-black">申請成為買手</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
        </div>

        {step < 4 && (
          <div className="flex border-b border-stone-200">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex-1 py-3 text-center text-[9px] font-black uppercase tracking-widest transition-colors ${
                i + 1 === step ? 'text-[#1A237E] border-b-2 border-[#1A237E]' :
                i + 1 < step  ? 'text-[#C5A059]' : 'text-stone-300'
              }`}>
                {i + 1 < step ? '✓ ' : `${i + 1}. `}{s}
              </div>
            ))}
          </div>
        )}

        {step === 4 ? (
          <div className="p-12 text-center space-y-4">
            <div className="text-6xl">🌸</div>
            <h4 className="text-2xl font-serif font-black text-[#1C1C1C]">申請已送出！</h4>
            <p className="text-stone-400 text-sm max-w-sm mx-auto">我們將在 3-5 個工作天內審核您的申請，並通過電郵通知您結果。</p>
            <button onClick={onClose}
              className="mt-4 bg-[#1A237E] text-white px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
              關閉
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-5 max-h-[70vh] overflow-y-auto">

            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="英文姓名" req>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className={inputCls} placeholder="Tanaka Yuki" />
                  </Field>
                  <Field label="日文姓名">
                    <input value={form.nameJp} onChange={e => setForm({...form, nameJp: e.target.value})}
                      className={inputCls} placeholder="田中雪" />
                  </Field>
                </div>
                <Field label="電郵地址" req>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className={inputCls} placeholder="you@email.com" />
                </Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="WhatsApp">
                    <input value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})}
                      className={inputCls} placeholder="+852 XXXX XXXX" />
                  </Field>
                  <Field label="WeChat">
                    <input value={form.wechat} onChange={e => setForm({...form, wechat: e.target.value})}
                      className={inputCls} placeholder="WeChat ID" />
                  </Field>
                  <Field label="LINE">
                    <input value={form.line} onChange={e => setForm({...form, line: e.target.value})}
                      className={inputCls} placeholder="LINE ID" />
                  </Field>
                </div>
                <Field label="現居城市" req>
                  <div className="flex flex-wrap gap-2">
                    {CITY_OPTIONS.map(c => (
                      <button key={c} type="button" onClick={() => setForm({...form, city: c})}
                        className={`px-3 py-1.5 text-[10px] font-black border transition-all ${
                          form.city === c ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                        }`}>{c}</button>
                    ))}
                  </div>
                </Field>
                <Field label="專長類別" req>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTY_OPTIONS.map(s => (
                      <button key={s} type="button"
                        onClick={() => setForm({...form, specialties: toggle(form.specialties, s)})}
                        className={`px-3 py-1.5 text-[10px] font-black border transition-all ${
                          form.specialties.includes(s) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                        }`}>{s}</button>
                    ))}
                  </div>
                </Field>
                <Field label="溝通語言" req>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGE_OPTIONS.map(l => (
                      <button key={l} type="button"
                        onClick={() => setForm({...form, languages: toggle(form.languages, l)})}
                        className={`px-3 py-1.5 text-[10px] font-black border transition-all ${
                          form.languages.includes(l) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                        }`}>{l}</button>
                    ))}
                  </div>
                </Field>
                <Field label="個人簡介" req>
                  <textarea required rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})}
                    className={inputCls} placeholder="介紹您的代購經驗、專長及服務特色…" />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="佣金率" req>
                    <input required value={form.commission} onChange={e => setForm({...form, commission: e.target.value})}
                      className={inputCls} placeholder="e.g. 5-8%" />
                  </Field>
                  <Field label="最低訂單">
                    <input value={form.minOrder} onChange={e => setForm({...form, minOrder: e.target.value})}
                      className={inputCls} placeholder="e.g. ¥3,000" />
                  </Field>
                  <Field label="平均回覆時間">
                    <input value={form.responseTime} onChange={e => setForm({...form, responseTime: e.target.value})}
                      className={inputCls} placeholder="e.g. < 2小時" />
                  </Field>
                </div>

                <Field label="付款條件" req>
                  <div className="flex gap-3">
                    {['全額先付', '訂金制'].map(t => (
                      <button key={t} type="button" onClick={() => setForm({...form, paymentTerms: t})}
                        className={`flex-1 py-3 text-[10px] font-black border transition-all ${
                          form.paymentTerms === t ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                        }`}>{t}</button>
                    ))}
                  </div>
                </Field>

                <div className="space-y-3 border border-stone-200 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">提供服務</p>
                  {[
                    { key: 'offersLivestream', label: '📹 現場直播' },
                    { key: 'offersPhotoVideo', label: '📸 現場拍照/影片' },
                    { key: 'offersQueueing',   label: '⏳ 排隊代購' },
                    { key: 'offersShipping',   label: '📦 代寄服務' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox"
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={e => setForm({...form, [key]: e.target.checked})}
                        className="w-4 h-4 accent-[#1A237E]" />
                      <span className="text-sm font-bold text-[#1C1C1C]">{label}</span>
                    </label>
                  ))}
                </div>

                {form.offersShipping && (
                  <Field label="代寄方式">
                    <div className="flex flex-wrap gap-2">
                      {SHIPPING_OPTIONS.map(s => (
                        <button key={s} type="button"
                          onClick={() => setForm({...form, shippingMethods: toggle(form.shippingMethods, s)})}
                          className={`px-3 py-1.5 text-[10px] font-black border transition-all ${
                            form.shippingMethods.includes(s) ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                          }`}>{s}</button>
                      ))}
                    </div>
                  </Field>
                )}
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-stone-50 p-5 space-y-3 text-sm">
                  <p className="font-black text-[#1C1C1C]">申請確認</p>
                  {[
                    ['姓名', form.name],
                    ['城市', form.city],
                    ['佣金', form.commission],
                    ['語言', form.languages.join(', ')],
                    ['專長', form.specialties.join(', ')],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-[11px]">
                      <span className="text-stone-400 font-bold uppercase tracking-widest">{label}</span>
                      <span className="text-[#1C1C1C] font-bold">{value || '—'}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={form.agreeTerms}
                    onChange={e => setForm({...form, agreeTerms: e.target.checked})}
                    className="w-4 h-4 mt-0.5 accent-[#1A237E]" />
                  <span className="text-[11px] text-stone-500">我同意 Michi Project 的使用條款及隱私政策，並確認所提供的資料真實準確。</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={form.agreeDisclaimer}
                    onChange={e => setForm({...form, agreeDisclaimer: e.target.checked})}
                    className="w-4 h-4 mt-0.5 accent-[#1A237E]" />
                  <span className="text-[11px] text-stone-500">我明白 Michi 為資訊平台，不參與任何交易，所有交易責任由買手自行承擔。</span>
                </label>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 border border-stone-200 text-stone-500 text-[10px] font-black uppercase tracking-[0.3em] hover:border-stone-400 transition-all">
                  上一步
                </button>
              )}
              <button type="submit" disabled={loading}
                className="flex-1 py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all disabled:opacity-50">
                {loading ? '提交中…' : step < 3 ? '下一步 →' : '提交申請'}
              </button>
            </div>
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
    if (activeFilter !== 'all')          list = list.filter(b => b.filter === activeFilter);
    if (activeArea !== 'all')            list = list.filter(b => b.area === activeArea);
    if (activeService === 'livestream')  list = list.filter(b => b.services.livestream);
    if (activeService === 'queueing')    list = list.filter(b => b.services.queueing);
    if (activeService === 'shipping')    list = list.filter(b => b.services.shipping);
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
      if (sortBy === 'score')   return b.score - a.score;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  }, [search, activeFilter, activeArea, activeService, sortBy]);

  return (
    <>
      {contactBuyer && <ContactModal buyer={contactBuyer} onClose={() => setContactBuyer(null)} />}
      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ── TOP BAR ── */}
        <div className="bg-[#1C1C1C] text-[#F9F7F2]/50 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
          MICHI • 代購買手資訊平台 • 平台不參與任何交易 • 透明直接
        </div>

        {/* ── NAV ── */}
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
              <a href={`/${locale}/buyers`} className="text-[#1A237E] border-b border-[#1A237E] pb-0.5 transition-colors">買手名錄</a>
              <a href={`/${locale}/products`} className="hover:text-[#1A237E] transition-colors">最新商品</a>
              <a href={`/${locale}/about`} className="hover:text-[#1A237E] transition-colors">關於我們</a>
            </div>
            <button onClick={() => setShowApply(true)}
              className="text-[10px] font-black uppercase tracking-[0.3em] bg-[#1A237E] text-white px-5 py-2.5 hover:bg-[#B22222] transition-all">
              申請成為買手
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="bg-[#1A237E] text-white py-16 px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[20rem] font-serif text-white/5 pointer-events-none select-none leading-none">道</div>
          <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-4">Michi Project · 代購買手資訊平台</p>
            <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight mb-4">
              探索代購買手<br />
              <span className="italic font-normal text-[#C5A059]">Find Your Shopper</span>
            </h1>
            <p className="text-white/60 text-sm max-w-xl leading-relaxed">
              瀏覽來自日本各地的認證代購買手，比較服務、評分與專長，找到最適合您的購物夥伴。
            </p>
          </div>
        </section>

        {/* ── PAYMENT INFO ── */}
        <div className="bg-[#1C1C1C] text-white py-5 px-8">
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

        {/* ── FILTERS ── */}
        <section className="bg-white border-b border-stone-200 sticky top-[81px] z-30">
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

        {/* ── BUYER GRID ── */}
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
                      <div className="absolute inset-0 bg-[#1A237E]/0 group-hover:bg-[#1A237E]/5 transition-all" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 border ${lvl.bg} ${lvl.text} ${lvl.border}`}>
                          {buyer.level}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
                        {buyer.specialty}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 text-[10px] font-black text-[#1C1C1C]">
                        ★ {buyer.score}
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="flex-1 bg-white p-5 border border-stone-200 border-t-0 space-y-4">

                      {/* Name + Location */}
                      <div className="border-b border-stone-100 pb-3">
                        <h4 className="text-xl font-serif font-black text-[#1C1C1C] group-hover:text-[#B22222] transition-colors">{buyer.name}</h4>
                        <p className="text-[10px] text-stone-400 font-bold mt-0.5">{buyer.nameJp} · {buyer.location} · {buyer.experience}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {buyer.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-bold text-stone-500 border border-stone-100 px-2 py-0.5 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">{buyer.description}</p>

                      {/* Highlight */}
                      <p className="text-[9px] font-black text-[#C5A059] uppercase tracking-wider">✦ {buyer.highlight}</p>

                      {/* Services */}
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

                      {/* ✅ 聯繫按鈕 → 導向 /[locale]/buyers 頁面，不再使用 email */}
                      <a href={`/${locale}/buyers`}
                        className="block w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all text-center">
                        聯繫
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#1C1C1C] text-white py-12 px-8 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-8 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#B22222] flex items-center justify-center text-white font-serif text-lg font-black">道</div>
                  <span className="text-lg font-black tracking-tighter">みち</span>
                </div>
                <p className="text-[10px] text-stone-500 max-w-xs leading-relaxed">日本代購職人資訊平台，連結買手與代購專家。平台不參與任何交易。</p>
              </div>
              <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
                <a href={`/${locale}`} className="hover:text-white transition-colors">首頁</a>
                <a href={`/${locale}/products`} className="hover:text-white transition-colors">商品</a>
                <a href={`/${locale}/about`} className="hover:text-white transition-colors">關於我們</a>
                <a href="mailto:hello@michi.jp" className="hover:text-white transition-colors">聯絡</a>
              </div>
            </div>
            <p className="text-[9px] text-stone-600 uppercase tracking-widest mt-8">© {new Date().getFullYear()} Michi Project. All Rights Reserved.</p>
          </div>
        </footer>

      </main>
    </>
  );
}