'use client';

import React from 'react';

/**
 * Michi Project 導航列組件
 * 採用「新和風・職人精品誌」設計風格
 * 使用高對比朱紅色朱印 Logo 與精緻的日系排版
 */
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* 左側：品牌識別區域 */}
        <div className="flex items-center space-x-6">
          {/* 朱印風格 Logo (道) - 象徵專業與認證 */}
          <div className="w-12 h-12 bg-[#B22222] flex items-center justify-center text-white font-serif text-3xl shadow-sm rounded-sm">
            道
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black font-serif tracking-tighter text-[#1C1C1C]">
              みち
            </span>
            <span className="text-[8px] font-bold text-stone-400 tracking-[0.4em] uppercase">
              Michi Project
            </span>
          </div>
        </div>

        {/* 中間：導航選單 */}
        <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
          <a
            href="/"
            className="text-[#1C1C1C] border-b-2 border-[#B22222] pb-1 transition-all"
          >
            專家名錄
          </a>
          <a
            href="/"
            className="hover:text-[#1A237E] transition-colors pb-1"
          >
            最新商品
          </a>
          <a
            href="/"
            className="hover:text-[#1A237E] transition-colors pb-1"
          >
            平台理念
          </a>
        </div>

        {/* 右側：行動呼籲按鈕 */}
        <button className="font-serif text-sm italic border-b border-[#1C1C1C] pb-1 hover:text-stone-400 transition-all font-bold">
          發布代購需求
        </button>
      </div>
    </nav>
  );
}