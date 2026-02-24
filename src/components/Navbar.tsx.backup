'use client';

import React from 'react';
import { useLocale } from 'next-intl';
// 必須從專案導航設定中匯入 Link，確保多國語道路徑正確
import { Link } from '@/navigation';

export default function Navbar() {
  const locale = useLocale();

  return (
    <nav className="sticky top-0 z-50 bg-michi-washi/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* 修正後的 Logo 區塊 */}
        <Link href="/" className="flex items-center space-x-6 group">
          <div className="w-12 h-12 bg-michi-vermilion flex items-center justify-center text-white font-serif text-3xl shadow-sm rounded-sm transition-transform group-hover:rotate-6">
            道
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black font-serif tracking-tighter text-michi-ink">みち</span>
            <span className="text-[8px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
          </div>
        </Link>

        {/* 導航選單 */}
        <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
          <Link href="/buyers" className="hover:text-michi-vermilion transition-colors">專家名錄</Link>
          <Link href="/products" className="hover:text-michi-vermilion transition-colors">最新商品</Link>
          <a href="#philosophy" className="hover:text-michi-navy transition-colors">平台理念</a>
        </div>

        <button className="font-serif text-sm italic border-b border-michi-ink pb-1 hover:text-stone-400 transition-all font-black">
          發布代購需求
        </button>
      </div>
    </nav>
  );
}