'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';

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
  descKey: string;
  level: string;
  levelNum: number;
  highlightKey: string;
  completedOrders: number;
  services: BuyerServices;
  livestreamRate?: string;
  photoVideoRate?: string;
}

// ─────────────────────────────────────────────────────────────
// BUYERS DATA — description/highlight use translation keys
// ─────────────────────────────────────────────────────────────
const BUYERS: Buyer[] = [
  {
    id: 1, name: 'Tanaka Yuki', nameJp: '田中雪', icon: '🌸',
    location: '東京 Tokyo', area: 'tokyo', experience: '8',
    specialty: 'FASHION', specialtyLabel: 'fashion', score: 4.9, reviews: 312,
    commission: '5-8%', responseTime: '< 2h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Harajuku', 'Vintage', 'Streetwear', 'Luxury'],
    filter: 'fashion', descKey: 'buyer1_desc', level: 'master', levelNum: 4,
    highlightKey: 'buyer1_highlight', completedOrders: 1240,
    services: { livestream: true, photoVideo: true, queueing: true, queueRate: '¥3,000/h', shipping: true, paymentTerms: 'full', depositRate: '100%' },
    livestreamRate: '¥5,000/30min', photoVideoRate: '¥1,500',
  },
  {
    id: 2, name: 'Matsuda Kenji', nameJp: '松田健二', icon: '⚡',
    location: '大阪 Osaka', area: 'osaka', experience: '5',
    specialty: 'ANIME', specialtyLabel: 'anime', score: 4.8, reviews: 198,
    commission: '6-10%', responseTime: '< 4h',
    languages: ['繁中', '簡中', '日文'],
    tags: ['Gundam', 'Figure', 'Limited', '一番賞'],
    filter: 'anime', descKey: 'buyer2_desc', level: 'artisan', levelNum: 3,
    highlightKey: 'buyer2_highlight', completedOrders: 867,
    services: { livestream: true, photoVideo: true, queueing: true, queueRate: '¥2,500/h', shipping: true, paymentTerms: 'deposit', depositRate: '50%' },
    livestreamRate: '¥3,000/30min', photoVideoRate: '¥1,000',
  },
  {
    id: 3, name: 'Suzuki Aoi', nameJp: '鈴木葵', icon: '💄',
    location: '東京 Tokyo', area: 'tokyo', experience: '6',
    specialty: 'BEAUTY', specialtyLabel: 'beauty', score: 4.9, reviews: 445,
    commission: '4-7%', responseTime: '< 1h',
    languages: ['繁中', '日文', 'English', 'ไทย'],
    tags: ['SK-II', 'Shiseido', 'Canmake', 'DHC'],
    filter: 'beauty', descKey: 'buyer3_desc', level: 'master', levelNum: 4,
    highlightKey: 'buyer3_highlight', completedOrders: 2100,
    services: { livestream: true, photoVideo: true, queueing: false, queueRate: '', shipping: true, paymentTerms: 'full', depositRate: '100%' },
    livestreamRate: '¥4,000/30min', photoVideoRate: '¥800',
  },
  {
    id: 4, name: 'Watanabe Riku', nameJp: '渡邊陸', icon: '🎌',
    location: '京都 Kyoto', area: 'kyoto', experience: '3',
    specialty: 'ANIME', specialtyLabel: 'anime', score: 4.5, reviews: 87,
    commission: '8-12%', responseTime: '< 6h',
    languages: ['繁中', '日文'],
    tags: ['一番賞', 'Gashapon', 'Limited'],
    filter: 'anime', descKey: 'buyer4_desc', level: 'buyer', levelNum: 2,
    highlightKey: 'buyer4_highlight', completedOrders: 310,
    services: { livestream: false, photoVideo: true, queueing: true, queueRate: '¥2,000/h', shipping: true, paymentTerms: 'deposit', depositRate: '50%' },
    photoVideoRate: '¥500',
  },
  {
    id: 5, name: 'Mina Fujii', nameJp: '藤井美奈', icon: '👠',
    location: '福岡 Fukuoka', area: 'fukuoka', experience: '4',
    specialty: 'LUXURY', specialtyLabel: 'luxury', score: 4.7, reviews: 189,
    commission: '5-8%', responseTime: '< 3h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Asics', 'Porter', 'Onitsuka Tiger'],
    filter: 'luxury', descKey: 'buyer5_desc', level: 'artisan', levelNum: 3,
    highlightKey: 'buyer5_highlight', completedOrders: 650,
    services: { livestream: true, photoVideo: true, queueing: true, queueRate: '¥2,800/h', shipping: true, paymentTerms: 'full', depositRate: '100%' },
    livestreamRate: '¥4,500/30min', photoVideoRate: '¥1,200',
  },
  {
    id: 6, name: 'Kenji Mori', nameJp: '森健二', icon: '🎮',
    location: '名古屋 Nagoya', area: 'nagoya', experience: '9',
    specialty: 'ELECTRONICS', specialtyLabel: 'electronics', score: 4.3, reviews: 334,
    commission: '5-9%', responseTime: '< 4h',
    languages: ['繁中', '簡中', '日文', 'English'],
    tags: ['Pokemon', 'TCG', 'Retro Games'],
    filter: 'electronics', descKey: 'buyer6_desc', level: 'master', levelNum: 4,
    highlightKey: 'buyer6_highlight', completedOrders: 1800,
    services: { livestream: true, photoVideo: true, queueing: true, queueRate: '¥2,000/h', shipping: true, paymentTerms: 'deposit', depositRate: '50%' },
    livestreamRate: '¥3,500/30min', photoVideoRate: '¥800',
  },
];

const FILTER_KEYS = ['all', 'fashion', 'anime', 'vintage', 'beauty', 'luxury', 'electronics', 'food'];
const FILTER_ICONS: Record<string, string> = { all: '◉', fashion: '👔', anime: '⚡', vintage: '🏺', beauty: '🌿', luxury: '💎', electronics: '📷', food: '☕' };
const AREA_KEYS = ['all', 'tokyo', 'osaka', 'kyoto', 'fukuoka', 'nagoya'];
const SERVICE_FILTER_KEYS = ['all', 'livestream', 'queueing', 'shipping'];
const SERVICE_ICONS: Record<string, string> = { all: '', livestream: '📹', queueing: '⏳', shipping: '📦' };

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
function ContactModal({ buyer, onClose, t }: { buyer: Buyer; onClose: () => void; t: (k: string) => string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', needLivestream: false, needPhoto: false, needQueueing: false, needShipping: false });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const inputCls = "w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1A237E]";

  const serviceOptions = [
    { key: 'needLivestream', label: t('bp.service_livestream'), avail: buyer.services.livestream, rate: buyer.livestreamRate },
    { key: 'needPhoto',      label: t('bp.service_photo'),     avail: buyer.services.photoVideo, rate: buyer.photoVideoRate },
    { key: 'needQueueing',   label: t('bp.service_queue'),     avail: buyer.services.queueing,   rate: buyer.services.queueRate },
    { key: 'needShipping',   label: t('bp.service_shipping'),  avail: buyer.services.shipping,   rate: t('bp.byWeight') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">
        <div className="bg-[#1A237E] text-white p-7 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">{t('bp.contactBuyer')}</p>
            <h3 className="text-xl font-serif font-black">{buyer.name}</h3>
            <p className="text-white/50 text-xs">{buyer.nameJp} · {buyer.location}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-4">
            <p className="text-4xl">✅</p>
            <h4 className="text-lg font-black text-[#1C1C1C]">{t('bp.sentTitle')}</h4>
            <p className="text-sm text-stone-500">{t('bp.sentDesc')}</p>
            <button onClick={onClose} className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">{t('bp.close')}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourName')} *</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourEmail')} *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.servicesNeeded')}</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map(opt => (
                  <label key={opt.key} className={`flex items-center gap-2 p-2 border text-xs cursor-pointer transition-all ${!opt.avail ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#1A237E]'}`}>
                    <input type="checkbox" disabled={!opt.avail} checked={(form as any)[opt.key]} onChange={e => setForm({ ...form, [opt.key]: e.target.checked })} className="w-3.5 h-3.5" />
                    <div>
                      <span className="font-bold">{opt.label}</span>
                      {opt.rate && <span className="text-[9px] text-[#C5A059] block">{opt.rate}</span>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">{t('bp.requestDetails')} *</label>
              <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className={inputCls} placeholder={t('bp.requestPlaceholder')} />
            </div>

            <div className="bg-stone-50 p-4 text-[9px] text-stone-500 leading-relaxed">
              <p className="font-black text-stone-400 uppercase tracking-widest mb-1">{t('bp.paymentTerms')}</p>
              <p>{buyer.services.paymentTerms === 'full' ? t('bp.payFull') : t('bp.payDeposit', { rate: buyer.services.depositRate })}</p>
            </div>

            <button type="submit" className="w-full py-4 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
              {t('bp.sendInquiry')}
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
function ApplyModal({ onClose, t }: { onClose: () => void; t: (k: string) => string }) {
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
            <h3 className="text-xl font-serif font-black">{t('bp.applyTitle')}</h3>
            <p className="text-white/50 text-xs">{t('bp.applySubtitle')}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none mt-1">×</button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-4">
            <p className="text-4xl">🎉</p>
            <h4 className="text-lg font-black text-[#1C1C1C]">{t('bp.applySentTitle')}</h4>
            <p className="text-sm text-stone-500">{t('bp.applySentDesc')}</p>
            <button onClick={onClose} className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em]">{t('bp.close')}</button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.yourName')} *</label><input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.yourEmail')} *</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
            </div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.cityInJapan')} *</label><input required type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.specialtyLabel')} *</label><input required type="text" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} className={inputCls} placeholder={t('bp.specialtyPlaceholder')} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.yearsExp')} *</label><input required type="text" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className={inputCls} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('bp.selfIntro')}</label><textarea rows={3} value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} className={`${inputCls} resize-none`} placeholder={t('bp.introPlaceholder')} /></div>
            <button type="submit" className="w-full py-4 bg-[#1C1C1C] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">{t('bp.submitApplication')}</button>
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
  const t = useTranslations();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeArea, setActiveArea] = useState('all');
  const [activeService, setActiveService] = useState('all');
  const [sortBy, setSortBy] = useState<'score' | 'reviews' | 'experience'>('score');
  const [contactBuyer, setContactBuyer] = useState<Buyer | null>(null);
  const [showApply, setShowApply] = useState(false);

  const displayed = useMemo(() => {
    let list: Buyer[] = [...BUYERS];
    if (activeFilter !== 'all') list = list.filter(b => b.filter === activeFilter);
    if (activeArea !== 'all') list = list.filter(b => b.area === activeArea);
    if (activeService === 'livestream') list = list.filter(b => b.services.livestream);
    if (activeService === 'queueing') list = list.filter(b => b.services.queueing);
    if (activeService === 'shipping') list = list.filter(b => b.services.shipping);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q) || b.tags.some(tg => tg.toLowerCase().includes(q)));
    }
    return list.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  }, [search, activeFilter, activeArea, activeService, sortBy]);

  return (
    <>
      {contactBuyer && <ContactModal buyer={contactBuyer} onClose={() => setContactBuyer(null)} t={t} />}
      {showApply && <ApplyModal onClose={() => setShowApply(false)} t={t} />}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white">
          <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Michi · {t('bp.heroTag')}</p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  {t('bp.heroTitle1')}<br /><span className="text-[#C5A059]">{t('bp.heroTitle2')}</span>
                </h1>
                <p className="text-[12px] text-white/50 max-w-md leading-relaxed">{t('bp.heroDesc')}</p>
              </div>
              <button onClick={() => setShowApply(true)} className="flex-shrink-0 border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all">
                ✦ {t('bp.applyBuyer')}
              </button>
            </div>

            <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: `${BUYERS.length}+`, labelKey: 'bp.stat_buyers' },
                { n: '5', labelKey: 'bp.stat_cities' },
                { n: '7', labelKey: 'bp.stat_specialties' },
                { n: '2011', labelKey: 'bp.stat_since' },
              ].map(({ n, labelKey }) => (
                <div key={labelKey} className="space-y-1">
                  <p className="text-3xl font-black text-white">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PAYMENT INFO ══════════════════════════════════ */}
        <div className="bg-[#1C1C1C] border-t border-white/5 text-white py-5 px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 flex-shrink-0">{t('bp.paymentInfo')}</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-start gap-3 max-w-sm">
                <span className="text-[10px] font-black text-[#C5A059] flex-shrink-0 mt-0.5">💳 {t('bp.payFullLabel')}</span>
                <p className="text-[9px] text-white/40 leading-relaxed">{t('bp.payFullDesc')}</p>
              </div>
              <div className="flex items-start gap-3 max-w-sm">
                <span className="text-[10px] font-black text-[#C5A059] flex-shrink-0 mt-0.5">💳 {t('bp.payDepositLabel')}</span>
                <p className="text-[9px] text-white/40 leading-relaxed">{t('bp.payDepositDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ SEARCH + FILTERS ══════════════════════════════ */}
        <section className="bg-white border-b border-stone-200 sticky top-[80px] z-30">
          <div className="max-w-7xl mx-auto px-8 py-5 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('bp.searchPlaceholder')}
                  className="w-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-[#1A237E] placeholder-stone-400" />
                <span className="absolute right-3 top-2.5 text-stone-400 text-sm pointer-events-none">🔍</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {FILTER_KEYS.map(key => (
                  <button key={key} onClick={() => setActiveFilter(key)}
                    className={`px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === key ? 'bg-[#1A237E] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>
                    {FILTER_ICONS[key]} {t(`buyers.filter_${key}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {SERVICE_FILTER_KEYS.map(key => (
                  <button key={key} onClick={() => setActiveService(key)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all border ${activeService === key ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400'}`}>
                    {SERVICE_ICONS[key]} {t(`bp.svcFilter_${key}`)}
                  </button>
                ))}
              </div>
              <div className="h-5 w-px bg-stone-200" />
              <select value={activeArea} onChange={e => setActiveArea(e.target.value)} className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                {AREA_KEYS.map(key => <option key={key} value={key}>{t(`buyers.area_${key}`)}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border border-stone-200 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 focus:outline-none bg-white">
                <option value="score">{t('buyers.sort_score')}</option>
                <option value="reviews">{t('buyers.sort_reviews')}</option>
                <option value="experience">{t('bp.sort_experience')}</option>
              </select>
              <span className="ml-auto text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden lg:block">
                {displayed.length} {t('buyers.count_unit')}
              </span>
            </div>
          </div>
        </section>

        {/* ══ BUYER GRID ═══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          {displayed.length === 0 ? (
            <div className="text-center py-28 space-y-4">
              <p className="text-5xl">🔍</p>
              <p className="text-stone-400 font-bold text-sm">{t('buyers.noResults')}</p>
              <button onClick={() => { setSearch(''); setActiveFilter('all'); setActiveArea('all'); setActiveService('all'); }}
                className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1A237E] hover:text-[#1A237E] transition-all">
                {t('buyers.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {displayed.map(buyer => {
                const lvl = LEVEL_STYLES[buyer.levelNum] ?? LEVEL_STYLES[1];
                return (
                  <div key={buyer.id} className="group flex flex-col">
                    <div className="aspect-[4/3] bg-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden">
                      <span className="text-7xl z-10">{buyer.icon}</span>
                      <div className="absolute inset-0 bg-[#1A237E]/0 group-hover:bg-[#1A237E]/5 transition-all" />
                      <div className="absolute top-3 right-3">
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 border ${lvl.bg} ${lvl.text} ${lvl.border}`}>
                          {t(`buyers.level_${buyer.level}`)}
                        </span>
                      </div>
                    </div>
                    <div className="border border-t-0 border-stone-200 bg-white p-5 space-y-3 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-sm font-black text-[#1C1C1C]">{buyer.name}</h3>
                        <p className="text-[9px] text-stone-400 font-bold">{buyer.nameJp} · {buyer.location}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500">
                        <span className="text-[#C5A059]">★ {buyer.score}</span>
                        <span>{buyer.reviews} {t('buyers.reviews')}</span>
                        <span>{buyer.experience} {t('bp.years')}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">{t(buyer.descKey)}</p>
                      <div className="grid grid-cols-4 gap-1">
                        <ServiceBadge active={buyer.services.livestream} label={t('bp.service_livestream')} sub={buyer.livestreamRate} />
                        <ServiceBadge active={buyer.services.photoVideo} label={t('bp.service_photo')} sub={buyer.photoVideoRate} />
                        <ServiceBadge active={buyer.services.queueing} label={t('bp.service_queue')} sub={buyer.services.queueRate || undefined} />
                        <ServiceBadge active={buyer.services.shipping} label={t('bp.service_shipping')} />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-100 pt-3">
                        {[
                          [t('buyers.commission'), buyer.commission],
                          [t('bp.paymentTerms'), buyer.services.paymentTerms === 'full' ? t('bp.payFullShort') : t('bp.payDepositShort', { rate: buyer.services.depositRate })],
                          [t('buyers.response'), buyer.responseTime],
                        ].map(([label, value]) => (
                          <div key={label} className="space-y-0.5">
                            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                            <p className="text-[9px] font-black text-[#1C1C1C] leading-tight">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {buyer.languages.map(lang => (
                          <span key={lang} className="text-[8px] bg-blue-50 text-[#1A237E] px-1.5 py-0.5 font-bold">{lang}</span>
                        ))}
                        <span className="ml-auto text-[9px] text-stone-400">{buyer.completedOrders.toLocaleString()} {t('bp.records')}</span>
                      </div>
                      <button onClick={() => setContactBuyer(buyer)}
                        className="mt-auto block w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all text-center">
                        {t('bp.contactBuyer')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}