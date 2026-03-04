'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface PremiumBuyer {
  id: number;
  name: string;
  nameJp: string;
  icon: string;
  location: string;
  specialty: string;
  score: number;
  reviews: number;
  monthlyFee: string;
  experience: string;
  responseTime: string;
  languages: string[];
  tags: string[];
  completedOrders: number;
  descKey: string;
  showcaseImages: string[];
  verified: boolean;
  featured: boolean;
  joinedDate: string;
}

// ─────────────────────────────────────────────────────────────
// DATA — 10 premium slots
// ─────────────────────────────────────────────────────────────
const MAX_SLOTS = 10;

const PREMIUM_BUYERS: PremiumBuyer[] = [
  {
    id: 1, name: 'Tanaka Yuki', nameJp: '田中雪', icon: '🌸',
    location: '東京 Tokyo', specialty: 'FASHION', score: 4.9, reviews: 312,
    monthlyFee: '¥29,800', experience: '8', responseTime: '< 1h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Harajuku', 'Vintage', 'Supreme', 'Nike SB'],
    completedOrders: 1240, descKey: 'premium.buyer1_desc',
    showcaseImages: ['/about/bao-bao.jpg', '/about/wooden-goods.jpg'],
    verified: true, featured: true, joinedDate: '2025-06',
  },
  {
    id: 2, name: 'Suzuki Aoi', nameJp: '鈴木葵', icon: '💄',
    location: '東京 Tokyo', specialty: 'BEAUTY', score: 4.9, reviews: 445,
    monthlyFee: '¥29,800', experience: '6', responseTime: '< 30min',
    languages: ['繁中', '日文', 'English', 'ไทย'],
    tags: ['SK-II', 'Shiseido', '@cosme', 'DHC'],
    completedOrders: 2100, descKey: 'premium.buyer2_desc',
    showcaseImages: ['/about/office.jpg', '/about/plushies.jpg'],
    verified: true, featured: true, joinedDate: '2025-08',
  },
  {
    id: 3, name: 'Mina Fujii', nameJp: '藤井美奈', icon: '👠',
    location: '福岡 Fukuoka', specialty: 'LUXURY', score: 4.7, reviews: 189,
    monthlyFee: '¥29,800', experience: '4', responseTime: '< 2h',
    languages: ['繁中', '日文', 'English'],
    tags: ['Asics', 'Porter', 'Onitsuka Tiger', 'Bao Bao'],
    completedOrders: 650, descKey: 'premium.buyer3_desc',
    showcaseImages: ['/about/bao-bao.jpg', '/about/shipping-box.jpg'],
    verified: true, featured: false, joinedDate: '2025-10',
  },
];

const REMAINING_SLOTS = MAX_SLOTS - PREMIUM_BUYERS.length;

// ─────────────────────────────────────────────────────────────
// APPLY MODAL
// ─────────────────────────────────────────────────────────────
function PremiumApplyModal({ onClose, t }: { onClose: () => void; t: (k: string) => string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', location: '', specialty: '', experience: '', portfolio: '', agree: false });
  const inputCls = 'w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] bg-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">
        <div className="bg-gradient-to-r from-[#1C1C1C] to-[#2C2C2C] text-white p-7">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-lg">✦</span>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059]">{t('premium.applyTag')}</p>
              </div>
              <h3 className="text-xl font-serif font-black">{t('premium.applyTitle')}</h3>
              <p className="text-white/50 text-xs">{t('premium.applySubtitle')}</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">×</button>
          </div>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-4">
            <p className="text-4xl">✦</p>
            <h4 className="text-lg font-black text-[#1C1C1C]">{t('premium.applySentTitle')}</h4>
            <p className="text-sm text-stone-500">{t('premium.applySentDesc')}</p>
            <button onClick={onClose} className="border border-stone-300 text-stone-500 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em]">{t('bp.close')}</button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (form.agree) setSent(true); }} className="p-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourName')} *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourEmail')} *</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
            </div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.cityInJapan')} *</label><input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.specialtyLabel')} *</label><input required value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} className={inputCls} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('premium.portfolioLabel')}</label><textarea rows={3} value={form.portfolio} onChange={e => setForm({ ...form, portfolio: e.target.value })} className={`${inputCls} resize-none`} placeholder={t('premium.portfolioPlaceholder')} /></div>

            <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-4 space-y-2">
              <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">{t('premium.feeTitle')}</p>
              <p className="text-sm font-black text-[#1C1C1C]">¥29,800 / {t('premium.perMonth')}</p>
              <p className="text-[9px] text-stone-500 leading-relaxed">{t('premium.feeDesc')}</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} className="mt-1 w-4 h-4" />
              <span className="text-[10px] text-stone-500 leading-relaxed">{t('premium.agreeTerms')}</span>
            </label>

            <button type="submit" disabled={!form.agree} className="w-full py-4 bg-[#C5A059] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              {t('premium.submitBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT MODAL (simplified)
// ─────────────────────────────────────────────────────────────
function ContactModal({ buyer, onClose, t }: { buyer: PremiumBuyer; onClose: () => void; t: (k: string) => string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const inputCls = 'w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl my-auto">
        <div className="bg-[#1C1C1C] text-white p-7">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#C5A059]">✦</span>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Premium Shopper</p>
          </div>
          <h3 className="text-xl font-serif font-black">{buyer.name}</h3>
          <p className="text-white/50 text-xs">{buyer.nameJp} · {buyer.location}</p>
          <button onClick={onClose} className="absolute top-7 right-7 text-white/40 hover:text-white text-2xl">×</button>
        </div>
        {sent ? (
          <div className="p-10 text-center space-y-4">
            <p className="text-4xl">✅</p>
            <h4 className="text-lg font-black">{t('bp.sentTitle')}</h4>
            <p className="text-sm text-stone-500">{t('premium.priorityReply')}</p>
            <button onClick={onClose} className="border border-stone-300 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em]">{t('bp.close')}</button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="p-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourName')} *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourEmail')} *</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
            </div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.requestDetails')} *</label><textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inputCls} /></div>
            <button type="submit" className="w-full py-4 bg-[#C5A059] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all">{t('bp.sendInquiry')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function PremiumPage() {
  const locale = useLocale();
  const t = useTranslations();
  const [contactBuyer, setContactBuyer] = useState<PremiumBuyer | null>(null);
  const [showApply, setShowApply] = useState(false);

  return (
    <>
      {contactBuyer && <ContactModal buyer={contactBuyer} onClose={() => setContactBuyer(null)} t={t} />}
      {showApply && <PremiumApplyModal onClose={() => setShowApply(false)} t={t} />}

      <main className="min-h-screen bg-[#F9F7F2]">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white relative overflow-hidden">
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[28rem] font-serif text-white/[0.02] pointer-events-none select-none leading-none">匠</div>
          <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[#C5A059] text-xl">✦</span>
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Michi Premium · {t('premium.heroTag')}</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  {t('premium.heroTitle1')}<br />
                  <span className="text-[#C5A059] italic font-serif font-normal text-3xl md:text-4xl">{t('premium.heroTitle2')}</span>
                </h1>
                <p className="text-[12px] text-white/50 max-w-md leading-relaxed">{t('premium.heroDesc')}</p>
              </div>

              <div className="flex-shrink-0 space-y-3 text-right">
                <div className="bg-white/5 border border-[#C5A059]/30 px-6 py-4 inline-block">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{t('premium.slotsLabel')}</p>
                  <p className="text-3xl font-black text-[#C5A059]">{REMAINING_SLOTS}<span className="text-lg text-white/30">/{MAX_SLOTS}</span></p>
                  <p className="text-[9px] text-white/40 mt-1">{t('premium.slotsRemaining')}</p>
                </div>
                <button onClick={() => setShowApply(true)} className="block w-full border border-[#C5A059] text-[#C5A059] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all">
                  ✦ {t('premium.applyNow')}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: `${PREMIUM_BUYERS.length}`, labelKey: 'premium.stat_active' },
                { n: `${REMAINING_SLOTS}`, labelKey: 'premium.stat_slots' },
                { n: '¥29,800', labelKey: 'premium.stat_fee' },
                { n: '✦', labelKey: 'premium.stat_boost' },
              ].map(({ n, labelKey }) => (
                <div key={labelKey} className="space-y-1">
                  <p className="text-3xl font-black text-white">{n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS ══════════════════════════════════════ */}
        <section className="bg-white border-b border-stone-200 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-3">{t('premium.benefitsTag')}</p>
              <h2 className="text-3xl font-serif font-black text-[#1C1C1C]">{t('premium.benefitsTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🔝', titleKey: 'premium.benefit1_title', descKey: 'premium.benefit1_desc' },
                { icon: '✦', titleKey: 'premium.benefit2_title', descKey: 'premium.benefit2_desc' },
                { icon: '📊', titleKey: 'premium.benefit3_title', descKey: 'premium.benefit3_desc' },
              ].map(({ icon, titleKey, descKey }) => (
                <div key={titleKey} className="border border-stone-200 p-8 space-y-4 hover:border-[#C5A059] transition-colors">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="text-sm font-black text-[#1C1C1C] uppercase tracking-wider">{t(titleKey)}</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PREMIUM BUYERS GRID ══════════════════════════ */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">{t('premium.directoryTag')}</p>
              <h2 className="text-3xl font-serif font-black text-[#1C1C1C]">{t('premium.directoryTitle')}</h2>
            </div>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest hidden md:block">
              {PREMIUM_BUYERS.length} / {MAX_SLOTS} {t('premium.slotsActive')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PREMIUM_BUYERS.map(buyer => (
              <div key={buyer.id} className="group border-2 border-[#C5A059]/30 bg-white hover:border-[#C5A059] transition-all duration-300">
                {/* Header with gold accent */}
                <div className="bg-gradient-to-r from-[#1C1C1C] to-[#2A2A2A] p-5 relative">
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {buyer.verified && <span className="bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5">✓ Verified</span>}
                    {buyer.featured && <span className="bg-[#B22222] text-white text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5">★ Featured</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 border border-[#C5A059]/40 flex items-center justify-center text-3xl">{buyer.icon}</div>
                    <div>
                      <h3 className="text-white font-black text-sm">{buyer.name}</h3>
                      <p className="text-white/40 text-[9px] font-bold">{buyer.nameJp} · {buyer.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#C5A059] text-[10px] font-black">★ {buyer.score}</span>
                        <span className="text-white/30 text-[9px]">{buyer.reviews} {t('buyers.reviews')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-3">{t(buyer.descKey)}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {buyer.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-2 py-0.5 font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-100 pt-3">
                    {[
                      [t('bp.years'), `${buyer.experience}年`],
                      [t('bp.records'), buyer.completedOrders.toLocaleString()],
                      [t('buyers.response'), buyer.responseTime],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p className="text-[7px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                        <p className="text-[9px] font-black text-[#1C1C1C]">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1.5">
                    {buyer.languages.map(lang => (
                      <span key={lang} className="text-[8px] bg-blue-50 text-[#1A237E] px-1.5 py-0.5 font-bold">{lang}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button onClick={() => setContactBuyer(buyer)}
                    className="w-full py-3 bg-[#C5A059] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all">
                    ✦ {t('premium.contactPremium')}
                  </button>
                </div>
              </div>
            ))}

            {/* Empty slots indicator */}
            {Array.from({ length: Math.min(REMAINING_SLOTS, 3) }).map((_, i) => (
              <div key={`empty-${i}`} className="border-2 border-dashed border-stone-200 flex flex-col items-center justify-center py-16 space-y-4 bg-stone-50/50">
                <span className="text-4xl opacity-30">✦</span>
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em]">{t('premium.emptySlot')}</p>
                <button onClick={() => setShowApply(true)} className="border border-stone-300 text-stone-400 px-6 py-2 text-[9px] font-black uppercase tracking-[0.2em] hover:border-[#C5A059] hover:text-[#C5A059] transition-all">
                  {t('premium.applyNow')}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════ */}
        <section className="bg-[#1C1C1C] text-white py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-3">{t('premium.howTag')}</p>
              <h2 className="text-3xl font-serif font-black">{t('premium.howTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[#C5A059] text-[#1C1C1C] flex items-center justify-center font-black text-lg">{step}</div>
                  <h3 className="text-sm font-black">{t(`premium.step${step}_title`)}</h3>
                  <p className="text-white/40 text-[10px] leading-relaxed">{t(`premium.step${step}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════ */}
        <section className="py-16 px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">{t('premium.ctaTag')}</p>
            <h2 className="text-3xl font-serif font-black text-[#1C1C1C]">{t('premium.ctaTitle')}</h2>
            <p className="text-stone-500 text-sm max-w-lg mx-auto">{t('premium.ctaDesc')}</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowApply(true)} className="bg-[#C5A059] text-[#1C1C1C] px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all">
                ✦ {t('premium.applyNow')} — {REMAINING_SLOTS} {t('premium.slotsLeft')}
              </button>
              <a href={`/${locale}/buyers`} className="border border-stone-300 text-stone-500 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all">
                {t('premium.viewAll')}
              </a>
            </div>
            <p className="text-[9px] text-stone-400">{t('premium.platformNote')}</p>
          </div>
        </section>
      </main>
    </>
  );
}