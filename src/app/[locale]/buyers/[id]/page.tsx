/**
 * src/app/[locale]/buyers/[id]/page.tsx
 *
 * 公開買手個人頁面
 * 聯絡方式根據會員狀態顯示/遮蔽
 * 免費/試用期會員 → 見到 click-to-chat link
 * 非會員 → 見到 🔒 + 註冊提示
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Buyer {
  id: string;
  name: string;
  name_jp?: string;
  bio?: string;
  base_location?: string;
  specialty?: string;
  categories: string[];
  languages: string[];
  rating: number;
  total_reviews: number;
  commission_rate: number;
  experience_years: number;
  completed_orders: number;
  response_time_hours: number;
  avatar_url?: string;
  portfolio_url?: string;
  is_premium: boolean;
  service_livestream: boolean;
  service_photo: boolean;
  service_queueing: boolean;
  service_shipping: boolean;
  livestream_rate?: string;
  photo_rate?: string;
  queue_rate?: string;
  shipping_note?: string;
  min_order_amount?: string;
  payment_terms?: string;
  deposit_rate?: string;
  payment_methods?: { methods?: string[] };
  contact_line?: string;
  contact_whatsapp?: string;
  contact_wechat?: string;
  contact_instagram?: string;
  contact_email?: string;
}

// ─────────────────────────────────────────────────────────────
// MEMBERSHIP GATE — check if user email is active member
// ─────────────────────────────────────────────────────────────
function MembershipGate({ buyer, locale, t }: { buyer: Buyer; locale: string; t: (k: string) => string }) {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [memberStatus, setMemberStatus] = useState<'unknown' | 'active' | 'expired' | 'not_found'>('unknown');
  const [trialDays, setTrialDays] = useState<number | null>(null);

  // Check localStorage for saved email
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage?.getItem?.('michi_member_email') : null;
    if (saved) { setEmail(saved); checkMembership(saved); }
  }, []);

  const checkMembership = async (emailToCheck: string) => {
    setChecking(true);
    try {
      const res = await fetch(`/api/membership?email=${encodeURIComponent(emailToCheck)}`);
      const data = await res.json();
      if (data.is_active) {
        setMemberStatus('active');
        setTrialDays(data.trial_days_left);
        if (typeof window !== 'undefined') window.localStorage?.setItem?.('michi_member_email', emailToCheck);
      } else if (data.is_member) {
        setMemberStatus('expired');
      } else {
        setMemberStatus('not_found');
      }
    } catch { setMemberStatus('not_found'); }
    setChecking(false);
  };

  const handleRegister = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success && data.membership?.is_active) {
        setMemberStatus('active');
        setTrialDays(90);
        if (typeof window !== 'undefined') window.localStorage?.setItem?.('michi_member_email', email);
      }
    } catch {}
    setChecking(false);
  };

  const hasContacts = buyer.contact_line || buyer.contact_whatsapp || buyer.contact_wechat || buyer.contact_instagram || buyer.contact_email;

  // ── Active member: show contacts ──────────────────────────
  if (memberStatus === 'active') {
    return (
      <div className="space-y-4">
        {trialDays && trialDays <= 90 && (
          <div className="bg-[#C5A059]/10 border border-[#C5A059]/20 px-4 py-2 text-center">
            <p className="text-[9px] text-[#C5A059] font-bold">{t('mem.trialActive')} · {trialDays} {t('mem.daysLeft')}</p>
          </div>
        )}

        {hasContacts ? (
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('contact.directContact')}</p>
            {buyer.contact_whatsapp && (
              <a href={`https://wa.me/${buyer.contact_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 hover:bg-green-100 transition-all">
                <span className="text-xl">💬</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-green-800">WhatsApp</p>
                  <p className="text-[10px] text-green-600">{buyer.contact_whatsapp}</p>
                </div>
                <span className="text-green-500 text-xs">→</span>
              </a>
            )}
            {buyer.contact_line && (
              <a href={`https://line.me/ti/p/~${buyer.contact_line}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-green-200 bg-[#00B900]/5 hover:bg-[#00B900]/10 transition-all">
                <span className="text-xl">🟢</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#00B900]">LINE</p>
                  <p className="text-[10px] text-[#00B900]/70">{buyer.contact_line}</p>
                </div>
                <span className="text-[#00B900] text-xs">→</span>
              </a>
            )}
            {buyer.contact_wechat && (
              <div className="flex items-center gap-3 p-3 border border-green-200 bg-[#07C160]/5">
                <span className="text-xl">🟩</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#07C160]">WeChat</p>
                  <p className="text-[10px] text-[#07C160]/70">{buyer.contact_wechat}</p>
                </div>
              </div>
            )}
            {buyer.contact_instagram && (
              <a href={`https://instagram.com/${buyer.contact_instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-pink-200 bg-pink-50 hover:bg-pink-100 transition-all">
                <span className="text-xl">📷</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-pink-700">Instagram</p>
                  <p className="text-[10px] text-pink-500">@{buyer.contact_instagram.replace('@', '')}</p>
                </div>
                <span className="text-pink-400 text-xs">→</span>
              </a>
            )}
            {buyer.contact_email && (
              <a href={`mailto:${buyer.contact_email}`}
                className="flex items-center gap-3 p-3 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all">
                <span className="text-xl">📧</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-700">Email</p>
                  <p className="text-[10px] text-blue-500">{buyer.contact_email}</p>
                </div>
                <span className="text-blue-400 text-xs">→</span>
              </a>
            )}
          </div>
        ) : (
          <p className="text-xs text-stone-400 text-center py-4">{t('contact.noContacts')}</p>
        )}
      </div>
    );
  }

  // ── Not member / expired: show gate ───────────────────────
  return (
    <div className="space-y-4">
      {/* Blurred preview */}
      <div className="relative">
        <div className="space-y-3 filter blur-sm pointer-events-none select-none">
          <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50">
            <span className="text-xl">💬</span>
            <div><p className="text-xs font-bold text-green-800">WhatsApp</p><p className="text-[10px] text-green-600">+81 XXX XXXX</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-green-200 bg-[#00B900]/5">
            <span className="text-xl">🟢</span>
            <div><p className="text-xs font-bold text-[#00B900]">LINE</p><p className="text-[10px] text-[#00B900]/70">XXXXXXXX</p></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/95 border-2 border-[#C5A059] px-6 py-3 shadow-lg text-center">
            <p className="text-lg">🔒</p>
            <p className="text-[10px] font-black text-[#1C1C1C]">{t('contact.locked')}</p>
          </div>
        </div>
      </div>

      {/* Register / Check */}
      <div className="bg-stone-50 border border-stone-200 p-4 space-y-3">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
          {memberStatus === 'expired' ? t('contact.expiredNote') : t('contact.freeTrialNote')}
        </p>
        <div className="flex gap-2">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059]" placeholder="your@email.com" />
          <button onClick={memberStatus === 'not_found' || memberStatus === 'unknown' ? handleRegister : () => checkMembership(email)}
            disabled={!email || checking}
            className="px-4 py-2 bg-[#C5A059] text-[#1C1C1C] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all disabled:opacity-50 whitespace-nowrap">
            {checking ? '⏳' : memberStatus === 'unknown' ? t('contact.checkOrStart') : memberStatus === 'expired' ? t('contact.upgrade') : t('contact.startTrial')}
          </button>
        </div>
        {memberStatus === 'expired' && (
          <a href={`/${locale}/membership`} className="block text-center text-[9px] text-[#C5A059] font-bold underline">{t('contact.viewPlans')}</a>
        )}
        <p className="text-[8px] text-stone-300">{t('contact.trialDesc')}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function BuyerProfilePage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const { data, error: err } = await supabase
        .from('buyers')
        .select('*')
        .eq('id', params.id)
        .eq('verified', true)
        .single();
      if (err || !data) setError('Buyer not found');
      else setBuyer(data as Buyer);
      setLoading(false);
    }
    if (params.id) load();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
      <div className="animate-pulse text-stone-400 text-sm">Loading...</div>
    </div>
  );

  if (error || !buyer) return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-4xl">🔍</p>
        <p className="text-stone-500">{error || 'Buyer not found'}</p>
        <a href={`/${locale}/buyers`} className="text-[#C5A059] text-sm font-bold underline">{t('premium.viewAll')}</a>
      </div>
    </div>
  );

  const services = [
    { key: 'livestream', active: buyer.service_livestream, rate: buyer.livestream_rate, icon: '📹' },
    { key: 'photo', active: buyer.service_photo, rate: buyer.photo_rate, icon: '📸' },
    { key: 'queueing', active: buyer.service_queueing, rate: buyer.queue_rate, icon: '⏳' },
    { key: 'shipping', active: buyer.service_shipping, rate: buyer.shipping_note, icon: '📦' },
  ];
  const paymentMethods = buyer.payment_methods?.methods || [];

  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      {/* Header */}
      <div className="bg-[#1C1C1C] text-white">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 border-2 border-[#C5A059]/40 flex items-center justify-center text-4xl shrink-0">
              {buyer.avatar_url ? <img src={buyer.avatar_url} className="w-full h-full object-cover" /> : '🛍️'}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black">{buyer.name}</h1>
                {buyer.is_premium && <span className="bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5">✦ Premium</span>}
              </div>
              {buyer.name_jp && <p className="text-white/40 text-sm">{buyer.name_jp}</p>}
              <p className="text-white/50 text-xs">📍 {buyer.base_location} · {buyer.specialty}</p>
              <div className="flex items-center gap-3">
                <span className="text-[#C5A059] font-black">★ {buyer.rating.toFixed(1)}</span>
                <span className="text-white/30 text-xs">{buyer.total_reviews} {t('buyers.reviews')}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/30 text-xs">{buyer.completed_orders} {t('bp.records')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {buyer.bio && (
              <section className="bg-white border border-stone-200 p-6 space-y-3">
                <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.selfIntro')}</h2>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{buyer.bio}</p>
              </section>
            )}

            <section className="bg-white border border-stone-200 p-6 space-y-4">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.servicesNeeded')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {services.map(svc => (
                  <div key={svc.key} className={`p-4 border text-center space-y-2 ${svc.active ? 'border-[#C5A059]/40 bg-[#C5A059]/5' : 'border-stone-100 bg-stone-50 opacity-40'}`}>
                    <span className="text-2xl">{svc.icon}</span>
                    <p className="text-[9px] font-black uppercase tracking-wider">{t(`bp.service_${svc.key === 'queueing' ? 'queue' : svc.key}`)}</p>
                    {svc.active && svc.rate && <p className="text-[10px] text-[#C5A059] font-bold">{svc.rate}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-stone-200 p-6 space-y-4">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.paymentTerms')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1"><p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Commission</p><p className="text-lg font-black text-[#1C1C1C]">{buyer.commission_rate}%</p></div>
                {buyer.min_order_amount && <div className="space-y-1"><p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Min Order</p><p className="text-lg font-black text-[#1C1C1C]">{buyer.min_order_amount}</p></div>}
                <div className="space-y-1"><p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">{t('bp.paymentTerms')}</p>
                  <p className="text-lg font-black text-[#1C1C1C]">{buyer.payment_terms === 'full' ? t('bp.payFullShort') : `${t('bp.payDepositLabel')} ${buyer.deposit_rate}`}</p></div>
              </div>
              {paymentMethods.length > 0 && (
                <div className="pt-3 border-t border-stone-100">
                  <div className="flex flex-wrap gap-2">{paymentMethods.map(m => <span key={m} className="text-[9px] bg-blue-50 text-[#1A237E] px-2 py-1 font-bold">{m}</span>)}</div>
                </div>
              )}
            </section>

            <section className="bg-white border border-stone-200 p-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { label: t('bp.years'), value: `${buyer.experience_years}年` },
                  { label: t('bp.records'), value: buyer.completed_orders.toLocaleString() },
                  { label: t('buyers.response'), value: `< ${buyer.response_time_hours}h` },
                  { label: 'Rating', value: `★ ${buyer.rating.toFixed(1)}` },
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-black text-[#1C1C1C]">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Contact (gated) + Info */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#C5A059]/30 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059]">✦</span>
                <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('contact.contactShopper')}</h2>
              </div>
              <MembershipGate buyer={buyer} locale={locale} t={t} />
            </div>

            <div className="bg-white border border-stone-200 p-6 space-y-3">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">Info</h3>
              <div className="space-y-2 text-sm">
                {buyer.languages.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-xs">Languages</span>
                    <div className="flex gap-1">{buyer.languages.map(l => <span key={l} className="text-[8px] bg-stone-100 px-1.5 py-0.5 font-bold">{l}</span>)}</div>
                  </div>
                )}
                {buyer.categories.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-xs">Categories</span>
                    <div className="flex gap-1 flex-wrap justify-end">{buyer.categories.map(c => <span key={c} className="text-[8px] bg-[#C5A059]/10 text-[#C5A059] px-1.5 py-0.5 font-bold">{c}</span>)}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4">
              <p className="text-[9px] text-stone-400 leading-relaxed">{t('ap.platformNoteDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}