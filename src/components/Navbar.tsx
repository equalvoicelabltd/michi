'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');

  const navLinks = [
    { href: '/buyers',   label: t('buyers') },
    { href: '/products', label: t('products') },
    { href: '/about',    label: t('about') },
    { href: '/premium', label: t('premium') },
    { href: '/tools/quote', label: tn('quote') },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Top disclaimer bar — uses translation */}
      <div className="bg-[#1C1C1C] text-[#F9F7F2]/50 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
        {t('disclaimer')}
      </div>

      <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group flex-shrink-0">
            <div className="w-9 h-9 bg-[#B22222] flex items-center justify-center text-white font-serif text-xl font-black transition-transform group-hover:rotate-6">
              道
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-tighter text-[#1C1C1C]">みち</span>
              <span className="text-[7px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors pb-0.5 ${
                  isActive(href)
                    ? 'text-[#1A237E] border-b border-[#1A237E]'
                    : 'text-stone-500 hover:text-[#1A237E]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + Language + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/buyers#apply"
              className="hidden lg:block text-[10px] font-black uppercase tracking-[0.3em] bg-[#1A237E] text-white px-5 py-2.5 hover:bg-[#B22222] transition-all"
            >
              {t('applyBuyer')}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-[#1C1C1C] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-[#1C1C1C] transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-[#1C1C1C] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#F9F7F2] border-t border-stone-200 px-8 py-6 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-bold uppercase tracking-widest ${
                  isActive(href)
                    ? 'text-[#1A237E]'
                    : 'text-stone-500'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/buyers#apply"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest text-[#B22222]"
            >
              {t('applyBuyer')}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}