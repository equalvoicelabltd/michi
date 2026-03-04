'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  const cols = [
    {
      heading: t('col_platform'),
      links: [
        { href: '/buyers',   label: tn('buyers') },
        { href: '/products', label: tn('products') },
        { href: '/about',    label: tn('about') },
      ],
    },
    {
      heading: t('col_buyers'),
      links: [
        { href: '/buyers',       label: t('browseBuyers') },
        { href: '/buyers#apply', label: tn('applyBuyer') },
      ],
    },
    {
      heading: t('col_support'),
      links: [
        { href: '/about',                label: tn('about') },
        { href: 'mailto:hello@michiproject.com', label: tn('contact'), external: true },
      ],
    },
    {
      heading: t('col_legal'),
      links: [
        { href: '/legal/privacy',    label: t('privacy') },
        { href: '/legal/terms',      label: t('terms') },
        { href: '/legal/disclaimer', label: t('disclaimer') },
      ],
    },
  ];

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Brand block */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-xl font-black transition-transform group-hover:rotate-6">
                道
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black tracking-tighter">みち</span>
                <span className="text-[7px] font-bold text-stone-500 tracking-[0.4em] uppercase">Michi Project</span>
              </div>
            </Link>
            <p className="text-[10px] text-stone-500 leading-relaxed">
              {t('brandDescription')}
            </p>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-600">
              Since 2011 · Global EZshop
            </p>
          </div>

          {/* Link columns */}
          {cols.map(({ heading, links }) => (
            <div key={heading} className="space-y-4">
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-500">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ href, label, external }: any) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        className="text-[10px] font-bold text-stone-400 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-[10px] font-bold text-stone-400 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="border-t border-white/5 px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[9px] text-stone-600 uppercase tracking-widest">
            © {year} Michi Project · All Rights Reserved
          </p>
          <p className="text-[9px] text-stone-700 text-center max-w-xl">
            {t('platformNote')}
          </p>
          <div className="flex gap-4 text-[9px] text-stone-600 uppercase tracking-widest">
            <Link href="/legal/privacy">{t('privacy')}</Link>
            <span>·</span>
            <Link href="/legal/terms">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}