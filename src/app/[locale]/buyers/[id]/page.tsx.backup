'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
}

function ContactForm({ buyer, t }: { buyer: Buyer; t: (k: string) => string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const inputCls = 'w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]';

  if (sent) return (
    <div className="text-center space-y-3 py-8">
      <p className="text-3xl">✅</p>
      <h4 className="font-black text-lg">{t('bp.sentTitle')}</h4>
      <p className="text-sm text-stone-500">{t('bp.sentDesc')}</p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourName')} *</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.yourEmail')} *</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('bp.requestDetails')} *</label>
        <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inputCls} placeholder={t('bp.requestPlaceholder')} />
      </div>
      <button type="submit" className="w-full py-4 bg-[#C5A059] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-[#C5A059] transition-all">
        {t('bp.sendInquiry')}
      </button>
    </form>
  );
}

export default function BuyerProfilePage() {
  const params = useParams();
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

      if (err || !data) {
        setError('Buyer not found');
      } else {
        setBuyer(data as Buyer);
      }
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
        <a href="/buyers" className="text-[#C5A059] text-sm font-bold underline">{t('premium.viewAll')}</a>
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
          <div className="flex flex-col md:flex-row md:items-end gap-8">
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
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left column: Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Bio */}
            {buyer.bio && (
              <section className="bg-white border border-stone-200 p-6 space-y-3">
                <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.selfIntro')}</h2>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{buyer.bio}</p>
              </section>
            )}

            {/* Services */}
            <section className="bg-white border border-stone-200 p-6 space-y-4">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.servicesNeeded')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {services.map(svc => (
                  <div key={svc.key} className={`p-4 border text-center space-y-2 ${svc.active ? 'border-[#C5A059]/40 bg-[#C5A059]/5' : 'border-stone-100 bg-stone-50 opacity-40'}`}>
                    <span className="text-2xl">{svc.icon}</span>
                    <p className="text-[9px] font-black uppercase tracking-wider">{t(`bp.service_${svc.key === 'queueing' ? 'queue' : svc.key}`)}</p>
                    {svc.active && svc.rate && <p className="text-[10px] text-[#C5A059] font-bold">{svc.rate}</p>}
                    {!svc.active && <p className="text-[8px] text-stone-300">✕</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-white border border-stone-200 p-6 space-y-4">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.paymentTerms')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Commission</p>
                  <p className="text-lg font-black text-[#1C1C1C]">{buyer.commission_rate}%</p>
                </div>
                {buyer.min_order_amount && (
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Min Order</p>
                    <p className="text-lg font-black text-[#1C1C1C]">{buyer.min_order_amount}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">{t('bp.paymentTerms')}</p>
                  <p className="text-lg font-black text-[#1C1C1C]">
                    {buyer.payment_terms === 'full' ? t('bp.payFullShort') : `${t('bp.payDepositShortPrefix')} ${buyer.deposit_rate}`}
                  </p>
                </div>
              </div>

              {paymentMethods.length > 0 && (
                <div className="pt-3 border-t border-stone-100">
                  <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest mb-2">Payment Methods</p>
                  <div className="flex flex-wrap gap-2">
                    {paymentMethods.map(m => (
                      <span key={m} className="text-[9px] bg-blue-50 text-[#1A237E] px-2 py-1 font-bold">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Stats */}
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

          {/* Right column: Contact + Info */}
          <div className="space-y-6">

            {/* Contact Card */}
            <div className="bg-white border-2 border-[#C5A059]/30 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059]">✦</span>
                <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">{t('bp.contactBuyer')}</h2>
              </div>
              <ContactForm buyer={buyer} t={t} />
            </div>

            {/* Quick Info */}
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

            {/* Platform note */}
            <div className="bg-stone-50 border border-stone-200 p-4">
              <p className="text-[9px] text-stone-400 leading-relaxed">{t('ap.platformNoteDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}