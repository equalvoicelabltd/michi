'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// ─────────────────────────────────────────────────────────────
// SHIPPING RATES (EMS Japan → destinations, per kg)
// ─────────────────────────────────────────────────────────────
const SHIPPING_ZONES: Record<string, { label: string; rates: Record<string, number> }> = {
  hk:    { label: '🇭🇰 Hong Kong',   rates: { '0.5': 1450, '1': 1900, '2': 2750, '3': 3600, '5': 5300, '10': 9550 } },
  tw:    { label: '🇹🇼 Taiwan',      rates: { '0.5': 1450, '1': 1900, '2': 2750, '3': 3600, '5': 5300, '10': 9550 } },
  cn:    { label: '🇨🇳 China',       rates: { '0.5': 1450, '1': 1900, '2': 2750, '3': 3600, '5': 5300, '10': 9550 } },
  th:    { label: '🇹🇭 Thailand',    rates: { '0.5': 1500, '1': 2000, '2': 2900, '3': 3800, '5': 5600, '10': 10100 } },
  uk:    { label: '🇬🇧 UK',          rates: { '0.5': 2000, '1': 2600, '2': 3800, '3': 5000, '5': 7400, '10': 13400 } },
  us:    { label: '🇺🇸 USA',         rates: { '0.5': 2000, '1': 2600, '2': 3800, '3': 5000, '5': 7400, '10': 13400 } },
  my:    { label: '🇲🇾 Malaysia',    rates: { '0.5': 1500, '1': 2000, '2': 2900, '3': 3800, '5': 5600, '10': 10100 } },
  other: { label: '🌐 Other',        rates: { '0.5': 2000, '1': 2600, '2': 3800, '3': 5000, '5': 7400, '10': 13400 } },
};

const WEIGHT_OPTIONS = ['0.5', '1', '2', '3', '5', '10'];

// ─────────────────────────────────────────────────────────────
// EXCHANGE RATES (approximate, for reference only)
// ─────────────────────────────────────────────────────────────
const FX_RATES: Record<string, { symbol: string; rate: number }> = {
  JPY: { symbol: '¥', rate: 1 },
  HKD: { symbol: 'HK$', rate: 0.052 },
  TWD: { symbol: 'NT$', rate: 0.21 },
  CNY: { symbol: '¥', rate: 0.047 },
  THB: { symbol: '฿', rate: 0.23 },
  GBP: { symbol: '£', rate: 0.0053 },
  USD: { symbol: '$', rate: 0.0067 },
  MYR: { symbol: 'RM', rate: 0.029 },
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function QuoteCalculatorPage() {
  const locale = useLocale();
  const t = useTranslations();

  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    quantity: '1',
    commission: '10',
    customCommission: false,
    destination: 'hk',
    weight: '1',
    currency: 'JPY',
    includeShipping: true,
    shopperName: '',
    buyerName: '',
    notes: '',
  });

  const [showQuote, setShowQuote] = useState(false);

  // ── Calculations ──────────────────────────────────────────
  const calc = useMemo(() => {
    const price = parseInt(form.productPrice) || 0;
    const qty = parseInt(form.quantity) || 1;
    const commRate = parseFloat(form.commission) || 10;
    const subtotal = price * qty;
    const commissionAmount = Math.round(subtotal * commRate / 100);
    const zone = SHIPPING_ZONES[form.destination] || SHIPPING_ZONES.other;
    const shippingJPY = form.includeShipping ? (zone.rates[form.weight] || 0) : 0;
    const totalJPY = subtotal + commissionAmount + shippingJPY;
    const fx = FX_RATES[form.currency] || FX_RATES.JPY;
    const totalLocal = form.currency === 'JPY' ? totalJPY : Math.round(totalJPY * fx.rate * 100) / 100;

    return { price, qty, subtotal, commRate, commissionAmount, shippingJPY, totalJPY, totalLocal, fx };
  }, [form]);

  const formatJPY = (n: number) => `¥${n.toLocaleString()}`;
  const formatLocal = (n: number) => {
    const fx = FX_RATES[form.currency] || FX_RATES.JPY;
    return form.currency === 'JPY' ? formatJPY(n) : `${fx.symbol}${n.toLocaleString()}`;
  };

  const quoteDate = new Date().toLocaleDateString('ja-JP');
  const quoteId = `MQ-${Date.now().toString(36).toUpperCase()}`;

  const COMMISSION_OPTS = ['5', '8', '10', '12', '15', '20'];
  const selectCls = "border border-stone-200 px-3 py-3 text-sm focus:outline-none focus:border-[#C5A059] bg-white w-full";
  const inputCls = "w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] bg-white";
  const labelCls = "text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 mb-1 block";

  return (
    <main className="min-h-screen bg-[#F9F7F2]">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#C5A059] text-xl">✦</span>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Michi Tools</p>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">{t('quote.heroTitle')}</h1>
          <p className="text-white/50 text-sm max-w-lg">{t('quote.heroDesc')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ══ LEFT: INPUT FORM ══════════════════════════ */}
          <div className="lg:col-span-3 space-y-6">

            {/* Product Info */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A237E]">① {t('quote.section1')}</p>
              <div className="space-y-1"><label className={labelCls}>{t('quote.productName')}</label>
                <input value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} className={inputCls} placeholder={t('quote.productPlaceholder')} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className={labelCls}>{t('quote.unitPrice')} (¥) *</label>
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">¥</span>
                    <input required type="text" value={form.productPrice} onChange={e => setForm({ ...form, productPrice: e.target.value.replace(/[^\d]/g, '') })}
                      className="w-full border border-stone-200 pl-8 pr-3 py-3 text-sm focus:outline-none focus:border-[#C5A059]" placeholder="15,000" /></div></div>
                <div className="space-y-1"><label className={labelCls}>{t('quote.quantity')}</label>
                  <input type="number" min="1" max="99" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className={inputCls} /></div>
              </div>
            </div>

            {/* Commission */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A237E]">② {t('quote.section2')}</p>
              <div className="flex flex-wrap gap-2">
                {COMMISSION_OPTS.map(c => (
                  <button key={c} type="button" onClick={() => setForm({ ...form, commission: c, customCommission: false })}
                    className={`px-5 py-2.5 text-sm font-bold border transition-all ${!form.customCommission && form.commission === c ? 'border-[#1A237E] bg-[#1A237E] text-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}>
                    {c}%
                  </button>
                ))}
                <button type="button" onClick={() => setForm({ ...form, customCommission: true, commission: '' })}
                  className={`px-5 py-2.5 text-sm font-bold border transition-all ${form.customCommission ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]' : 'border-stone-200 text-stone-500'}`}>
                  {t('bp.customRate')}
                </button>
              </div>
              {form.customCommission && (
                <div className="relative w-32"><input type="number" min="1" max="50" step="0.5" value={form.commission} onChange={e => setForm({ ...form, commission: e.target.value })}
                  className="w-full border border-[#C5A059] px-4 py-2 text-sm focus:outline-none pr-8" placeholder="7.5" autoFocus />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">%</span></div>
              )}
            </div>

            {/* Shipping */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A237E]">③ {t('quote.section3')}</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.includeShipping} onChange={e => setForm({ ...form, includeShipping: e.target.checked })} className="w-4 h-4" />
                  <span className="text-[9px] font-bold text-stone-400">{t('quote.includeShipping')}</span>
                </label>
              </div>
              {form.includeShipping && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className={labelCls}>{t('quote.destination')}</label>
                    <select value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} className={selectCls}>
                      {Object.entries(SHIPPING_ZONES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select></div>
                  <div className="space-y-1"><label className={labelCls}>{t('quote.weight')}</label>
                    <select value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} className={selectCls}>
                      {WEIGHT_OPTIONS.map(w => <option key={w} value={w}>{w} kg</option>)}
                    </select></div>
                </div>
              )}
            </div>

            {/* Display Currency */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A237E]">④ {t('quote.section4')}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(FX_RATES).map(([code, { symbol }]) => (
                  <button key={code} type="button" onClick={() => setForm({ ...form, currency: code })}
                    className={`px-4 py-2 text-xs font-bold border transition-all ${form.currency === code ? 'border-[#C5A059] bg-[#C5A059] text-white' : 'border-stone-200 text-stone-500'}`}>
                    {code} {symbol}
                  </button>
                ))}
              </div>
              {form.currency !== 'JPY' && <p className="text-[9px] text-stone-400">* {t('quote.fxNote')}</p>}
            </div>

            {/* Optional: Names */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">{t('quote.optional')}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className={labelCls}>{t('quote.shopperName')}</label>
                  <input value={form.shopperName} onChange={e => setForm({ ...form, shopperName: e.target.value })} className={inputCls} /></div>
                <div className="space-y-1"><label className={labelCls}>{t('quote.buyerName')}</label>
                  <input value={form.buyerName} onChange={e => setForm({ ...form, buyerName: e.target.value })} className={inputCls} /></div>
              </div>
              <div className="space-y-1"><label className={labelCls}>{t('quote.notes')}</label>
                <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className={`${inputCls} resize-none`} placeholder={t('quote.notesPlaceholder')} /></div>
            </div>
          </div>

          {/* ══ RIGHT: LIVE QUOTE ═════════════════════════ */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">

              {/* Quote Card */}
              <div className="bg-white border-2 border-[#C5A059]/30 shadow-lg" id="quote-card">
                <div className="bg-gradient-to-r from-[#1C1C1C] to-[#2C2C2C] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-[#B22222] flex items-center justify-center text-white text-[10px] font-serif font-black">道</div>
                        <span className="text-white text-xs font-black">Michi</span>
                      </div>
                      <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{t('quote.quoteLabel')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-white/30">{quoteId}</p>
                      <p className="text-[8px] text-white/30">{quoteDate}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Parties */}
                  {(form.shopperName || form.buyerName) && (
                    <div className="grid grid-cols-2 gap-3 text-[9px] pb-3 border-b border-stone-100">
                      {form.shopperName && <div><span className="text-stone-400">{t('quote.from')}:</span> <span className="font-bold">{form.shopperName}</span></div>}
                      {form.buyerName && <div><span className="text-stone-400">{t('quote.to')}:</span> <span className="font-bold">{form.buyerName}</span></div>}
                    </div>
                  )}

                  {/* Line items */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#1C1C1C]">{form.productName || t('quote.untitled')}</p>
                        <p className="text-[9px] text-stone-400">{formatJPY(calc.price)} × {calc.qty}</p>
                      </div>
                      <p className="text-sm font-black text-[#1C1C1C]">{formatJPY(calc.subtotal)}</p>
                    </div>

                    <div className="flex justify-between text-xs text-stone-500">
                      <span>{t('quote.commission')} ({calc.commRate}%)</span>
                      <span className="font-bold">{formatJPY(calc.commissionAmount)}</span>
                    </div>

                    {form.includeShipping && (
                      <div className="flex justify-between text-xs text-stone-500">
                        <span>{t('quote.shipping')} ({SHIPPING_ZONES[form.destination]?.label} · {form.weight}kg)</span>
                        <span className="font-bold">{formatJPY(calc.shippingJPY)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t-2 border-[#1C1C1C] pt-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('quote.total')}</span>
                      <div className="text-right">
                        <p className="text-2xl font-black text-[#1C1C1C]">{formatJPY(calc.totalJPY)}</p>
                        {form.currency !== 'JPY' && (
                          <p className="text-sm font-bold text-[#C5A059]">≈ {formatLocal(calc.totalLocal)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {form.notes && (
                    <div className="bg-stone-50 p-3 mt-2">
                      <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('quote.notes')}</p>
                      <p className="text-[10px] text-stone-600">{form.notes}</p>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="text-[7px] text-stone-300 leading-relaxed pt-2">{t('quote.disclaimer')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button onClick={() => { if (typeof window !== 'undefined') window.print(); }}
                  className="w-full py-3 bg-[#1C1C1C] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
                  🖨️ {t('quote.print')}
                </button>
                <button onClick={() => {
                  const text = `${t('quote.quoteLabel')} ${quoteId}\n${form.productName || t('quote.untitled')}\n${t('quote.subtotal')}: ${formatJPY(calc.subtotal)}\n${t('quote.commission')}: ${formatJPY(calc.commissionAmount)}\n${form.includeShipping ? t('quote.shipping') + ': ' + formatJPY(calc.shippingJPY) + '\n' : ''}${t('quote.total')}: ${formatJPY(calc.totalJPY)}${form.currency !== 'JPY' ? ' ≈ ' + formatLocal(calc.totalLocal) : ''}`;
                  if (navigator.clipboard) navigator.clipboard.writeText(text);
                }}
                  className="w-full py-3 border border-stone-300 text-stone-500 text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all">
                  📋 {t('quote.copy')}
                </button>
              </div>

              {/* Breakdown hint */}
              <div className="bg-[#C5A059]/10 border border-[#C5A059]/20 p-4">
                <p className="text-[9px] font-bold text-[#C5A059] mb-1">💡 {t('quote.tip')}</p>
                <p className="text-[9px] text-stone-500 leading-relaxed">{t('quote.tipDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #quote-card, #quote-card * { visibility: visible; }
          #quote-card { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 400px; border: 2px solid #C5A059 !important; }
          nav, footer { display: none !important; }
        }
      `}</style>
    </main>
  );
}