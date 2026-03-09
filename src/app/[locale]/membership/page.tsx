'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function MembershipPage() {
  const locale = useLocale();
  const t = useTranslations();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'trial' | 'active' | 'expired' | 'not_found'>('idle');
  const [membership, setMembership] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkOrRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // First check if already registered
    const checkRes = await fetch(`/api/membership?email=${encodeURIComponent(email)}`);
    const checkData = await checkRes.json();

    if (checkData.is_member) {
      setMembership(checkData);
      setStatus(checkData.is_active ? (checkData.status === 'trial' ? 'trial' : 'active') : 'expired');
    } else {
      // Register new trial
      const regRes = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const regData = await regRes.json();
      if (regData.success) {
        setMembership({ is_active: true, status: 'trial', trial_days_left: 90 });
        setStatus('trial');
      }
    }
    setLoading(false);
  };

  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    setLoading(true);
    const res = await fetch('/api/membership/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan, locale }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  };

  const inputCls = "w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A059] placeholder-white/20";

  return (
    <main className="min-h-screen bg-[#1C1C1C] text-white">

      {/* Hero */}
      <section className="pt-20 pb-14 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#C5A059] text-xl">✦</span>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Michi Membership</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t('mem.heroTitle')}</h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto">{t('mem.heroDesc')}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-white/10 px-8 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🔓', titleKey: 'mem.b1_title', descKey: 'mem.b1_desc' },
            { icon: '💬', titleKey: 'mem.b2_title', descKey: 'mem.b2_desc' },
            { icon: '🔔', titleKey: 'mem.b3_title', descKey: 'mem.b3_desc' },
          ].map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="border border-white/10 p-6 space-y-3">
              <span className="text-3xl">{icon}</span>
              <h3 className="text-sm font-black uppercase tracking-wider">{t(titleKey)}</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Register / Status */}
      <section className="border-t border-white/10 px-8 py-14">
        <div className="max-w-md mx-auto">

          {status === 'idle' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black">{t('mem.startFree')}</h2>
                <p className="text-white/40 text-xs">{t('mem.trialNote')}</p>
              </div>
              <form onSubmit={checkOrRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Email *</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="your@email.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{t('mem.yourName')}</label>
                  <input value={name} onChange={e => setName(e.target.value)} className={inputCls} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-[#C5A059] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50">
                  {loading ? '⏳...' : t('mem.startTrialBtn')}
                </button>
              </form>
            </div>
          )}

          {status === 'trial' && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <p className="text-4xl">✅</p>
                <h2 className="text-2xl font-black">{t('mem.trialActive')}</h2>
                <p className="text-[#C5A059] font-bold">{membership?.trial_days_left} {t('mem.daysLeft')}</p>
                <p className="text-white/40 text-xs">{t('mem.trialDesc')}</p>
              </div>

              {/* Pricing cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border border-white/20 p-5 space-y-3 hover:border-[#C5A059] transition-all">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mem.monthly')}</p>
                  <p className="text-2xl font-black">£5<span className="text-sm text-white/40 font-normal">/{t('mem.perMonth')}</span></p>
                  <button onClick={() => handleCheckout('monthly')} disabled={loading}
                    className="w-full py-2.5 border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#1C1C1C] transition-all disabled:opacity-50">
                    {t('mem.subscribe')}
                  </button>
                </div>
                <div className="border-2 border-[#C5A059] p-5 space-y-3 relative">
                  <div className="absolute -top-3 left-4 bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5">{t('mem.bestValue')}</div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mem.yearly')}</p>
                  <p className="text-2xl font-black">£50<span className="text-sm text-white/40 font-normal">/{t('mem.perYear')}</span></p>
                  <p className="text-[9px] text-[#C5A059] font-bold">{t('mem.save10')}</p>
                  <button onClick={() => handleCheckout('yearly')} disabled={loading}
                    className="w-full py-2.5 bg-[#C5A059] text-[#1C1C1C] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50">
                    {t('mem.subscribe')}
                  </button>
                </div>
              </div>
              <p className="text-[8px] text-white/20 text-center">{t('mem.noChargeTrial')}</p>
            </div>
          )}

          {status === 'active' && (
            <div className="text-center space-y-3">
              <p className="text-4xl">🎉</p>
              <h2 className="text-2xl font-black">{t('mem.memberActive')}</h2>
              <p className="text-[#C5A059] font-bold uppercase text-sm">{membership?.plan} plan</p>
              <p className="text-white/40 text-xs">{t('mem.memberDesc')}</p>
              <a href={`/${locale}/buyers`} className="inline-block mt-4 bg-[#C5A059] text-[#1C1C1C] px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em]">{t('mem.browseBuyers')}</a>
            </div>
          )}

          {status === 'expired' && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <p className="text-4xl">⏰</p>
                <h2 className="text-2xl font-black">{t('mem.trialEnded')}</h2>
                <p className="text-white/40 text-xs">{t('mem.upgradeNote')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/20 p-5 space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mem.monthly')}</p>
                  <p className="text-2xl font-black">£5<span className="text-sm text-white/40 font-normal">/{t('mem.perMonth')}</span></p>
                  <button onClick={() => handleCheckout('monthly')} disabled={loading}
                    className="w-full py-2.5 border border-[#C5A059] text-[#C5A059] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#1C1C1C] transition-all disabled:opacity-50">
                    {t('mem.subscribe')}
                  </button>
                </div>
                <div className="border-2 border-[#C5A059] p-5 space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mem.yearly')}</p>
                  <p className="text-2xl font-black">£50<span className="text-sm text-white/40 font-normal">/{t('mem.perYear')}</span></p>
                  <button onClick={() => handleCheckout('yearly')} disabled={loading}
                    className="w-full py-2.5 bg-[#C5A059] text-[#1C1C1C] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50">
                    {t('mem.subscribe')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-8 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-center text-lg font-black uppercase tracking-wider">{t('mem.faqTitle')}</h2>
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="border-b border-white/10 pb-4 space-y-2">
              <h3 className="text-sm font-bold">{t(`mem.faq${n}_q`)}</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">{t(`mem.faq${n}_a`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}