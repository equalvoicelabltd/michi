"use client";

import React, { useState, useEffect } from 'react';

/**
 * MICHI JP - 職人精品誌平台 (Full Implementation - Client Side)
 * 修正說明：加入了 "use client" 指令以支援 React Hooks。
 * * 核心規範：
 * 1. 品牌色：朱砂紅 (#B22222), 勝色 (#1A237E), 和紙白 (#F9F7F2), 墨黑 (#1C1C1C)
 * 2. 字體：Noto Serif JP (標題), Playfair Display (斜體裝飾), Noto Sans JP (內文)
 * 3. 定位：資訊中心 (Information Hub)，強調 Verified Data 概念。
 */

// --- 模擬數據 ---
const SHOPPER_DATA = [
  { id: 1, name: "Saito Kaito", type: "vintage", location: "東京・銀座", exp: "12 年", score: "4.9", reviews: "450", tags: ["Hermès", "Rolex"], icon: "👔", specialty: "奢侈品鑑定" },
  { id: 2, name: "Asuka Yuki", type: "anime", location: "東京・秋葉原", exp: "5 年", score: "5.0", reviews: "210", tags: ["限定一番賞", "美少女模型"], icon: "🎨", specialty: "稀有動漫尋蹤" },
  { id: 3, name: "Haru Tanaka", type: "fashion", location: "東京・代官山", exp: "4 年", score: "4.8", reviews: "125", tags: ["Supreme", "限定聯名"], icon: "👟", specialty: "買手店採購" },
  { id: 4, name: "佐藤 先生", type: "vintage", location: "大阪・心齋橋", exp: "15 年", score: "4.9", reviews: "380", tags: ["Leica", "中古菲林機"], icon: "📷", specialty: "光學器材專家" },
  { id: 5, name: "Mina Kyo", type: "fashion", location: "京都", exp: "6 年", score: "4.7", reviews: "90", tags: ["和服", "手工藝品"], icon: "👘", specialty: "傳統工藝導航" },
  { id: 6, name: "Kenji", type: "anime", location: "中野百老匯", exp: "7 年", score: "5.0", reviews: "260", tags: ["懷舊玩具", "卡牌遊戲"], icon: "🎮", specialty: "玩具修復諮詢" }
];

// --- 組件：導航列 ---
const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="w-12 h-12 bg-[#B22222] flex items-center justify-center text-white font-serif text-3xl shadow-sm rounded-sm">
          道
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-black font-serif tracking-tighter text-[#1C1C1C]">みち</span>
          <span className="text-[8px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
        <a href="#market" className="text-[#1C1C1C] border-b-2 border-[#B22222] pb-1">專家名錄</a>
        <a href="#about" className="hover:text-[#1A237E] transition-colors pb-1">最新商品</a>
        <a href="#philosophy" className="hover:text-[#1A237E] transition-colors pb-1">平台理念</a>
      </div>

      <button className="font-serif text-sm italic border-b border-[#1C1C1C] pb-1 hover:text-stone-400 transition-all font-black">
        發布代購需求
      </button>
    </div>
  </nav>
);

// --- 組件：Hero 區域 ---
const HeroSection = () => (
  <section className="relative bg-[#F9F7F2] pt-24 pb-48 overflow-hidden">
    {/* 背景裝飾大字 (道) */}
    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-[25rem] md:text-[40rem] font-serif text-stone-900 opacity-[0.03] pointer-events-none select-none leading-none">
      道
    </div>

    <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-8 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">The Japanese Way</span>
            <div className="h-[1px] w-24 bg-stone-300"></div>
          </div>
          <div className="space-y-0">
            <h1 className="text-7xl md:text-[9rem] font-serif font-black text-[#1C1C1C] leading-none tracking-tighter">
              尋覓日本
            </h1>
            <h2 className="text-7xl md:text-[10rem] italic text-[#C5A059] leading-[0.8] mt-[-5px]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Authenticity
            </h2>
          </div>
        </div>

        <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
          Michi JP 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人。直接對話，無需中介，回歸最誠實的物資交換。
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-6">
          <button className="bg-[#1C1C1C] text-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all shadow-xl">
            瀏覽專家名錄
          </button>
          <button className="border border-[#1C1C1C] text-[#1C1C1C] px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
            探索最新商品
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 hidden lg:flex flex-col items-end">
        <div style={{ writingMode: 'vertical-rl' }} className="text-[10px] font-black text-stone-300 uppercase tracking-[0.6em] h-64 border-r border-stone-200 pr-4">
          Authentic • Verified • Direct • Michi JP
        </div>
      </div>
    </div>

    {/* 動態黃色封條 */}
    <div className="bg-[#FFD700] py-5 border-y-2 border-black/10 overflow-hidden shadow-lg z-20 absolute bottom-12 left-[-5%] w-[110%] rotate-[-1.5deg] origin-center">
      <div className="flex whitespace-nowrap animate-marquee text-black font-black text-[11px] tracking-[0.4em] uppercase">
        <span className="mx-8">Michi JP: Connecting Personal Buyers to Professional Shoppers • </span>
        <span className="mx-8">A Pure Information Platform • </span>
        <span className="mx-8">Transparent • Direct • Honorable • </span>
        <span className="mx-8">Michi JP: Connecting Personal Buyers to Professional Shoppers • </span>
      </div>
    </div>
  </section>
);

// --- 組件：專家卡片 ---
const ShopperCard = ({ shopper }) => (
  <div className="group flex flex-col p-4 bg-white border border-stone-100 hover:border-[#C5A059] transition-all duration-500">
    <div className="aspect-[4/5] bg-stone-50 flex items-center justify-center text-6xl group-hover:bg-stone-100 transition-colors relative overflow-hidden">
      <span className="z-10">{shopper.icon}</span>
      <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
        {shopper.specialty}
      </div>
    </div>

    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-end border-b border-stone-100 pb-2">
        <h4 className="text-2xl font-serif text-[#1C1C1C] font-black group-hover:text-[#B22222] transition-colors">
          {shopper.name}
        </h4>
        <span className="italic font-serif text-[#C5A059] text-xl">{shopper.score}</span>
      </div>

      <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest">
        <span>{shopper.location} / EXP {shopper.exp}</span>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {shopper.tags.map(tag => (
          <span key={tag} className="text-[9px] font-bold text-stone-500 border border-stone-100 px-2 py-1 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-6">
        <button className="w-full py-4 bg-white border border-[#1C1C1C] text-[#1C1C1C] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all">
          獲取聯絡資訊 / Contact
        </button>
      </div>
    </div>
  </div>
);

// --- 主應用組件 ---
export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredShoppers = activeFilter === 'all'
    ? SHOPPER_DATA
    : SHOPPER_DATA.filter(s => s.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans selection:bg-amber-100">
      {/* 注入自定義動畫 CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Noto+Serif+JP:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .washi-texture {
          position: relative;
        }
        .washi-texture::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('https://www.transparenttextures.com/patterns/handmade-paper.png');
          opacity: 0.15;
          pointer-events: none;
          z-index: 1;
        }
      `}} />

      <Navbar />

      <main>
        <HeroSection />

        {/* 專家名錄區塊 */}
        <section id="market" className="max-w-7xl mx-auto px-8 py-32 space-y-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-stone-200 pb-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif text-[#1C1C1C] font-black">探索代購職人</h2>
              <p className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px]">Curated listing of professional proxy shoppers in Japan</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {['all', 'vintage', 'anime', 'fashion'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 transition-all border-b-2 ${
                    activeFilter === filter ? 'text-[#B22222] border-[#B22222]' : 'text-stone-400 border-transparent hover:text-stone-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredShoppers.map(shopper => (
              <ShopperCard key={shopper.id} shopper={shopper} />
            ))}
          </div>
        </section>

        {/* 平台理念區塊 */}
        <section id="philosophy" className="bg-[#1C1C1C] text-white py-32 washi-texture">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-black leading-tight">
                  關於我們的角色<br />
                  <span className="text-[#C5A059] italic text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>Platform Philosophy</span>
                </h2>
                <p className="text-stone-400 leading-relaxed font-light text-lg">
                  我們相信最好的交易發生在彼此尊重與資訊透明的基礎上。Michi JP 不是代購公司，而是一個資訊橋樑，讓有才華的代購員能被有眼光的買家看見。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="flex items-start space-x-6 group">
                  <div className="text-[10px] font-bold text-[#B22222] border border-[#B22222] px-2 py-1 group-hover:bg-[#B22222] group-hover:text-white transition-all">01</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 uppercase tracking-widest">已驗證資料 (Verified Data)</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">我們僅核實代購專家的背景與聯繫方式，旨在消除資訊不對稱。所有的交易詳情均為個人行為。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="text-[10px] font-bold text-[#B22222] border border-[#B22222] px-2 py-1 group-hover:bg-[#B22222] group-hover:text-white transition-all">02</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 uppercase tracking-widest">自主風險承擔</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">Michi JP 不介入對話、不經手款項。我們建議用戶要求查看歷史採購紀錄，並選擇具保障的支付工具。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-white/5 p-16 border border-white/10 text-center space-y-8 rounded-sm">
               <div className="text-8xl opacity-20 font-serif">道</div>
               <div className="space-y-4">
                 <h4 className="text-2xl font-serif italic text-[#C5A059]">Integrity is the Path</h4>
                 <p className="text-stone-500 text-sm leading-relaxed uppercase tracking-[0.2em]">
                   Michi JP 提供透明的數據參考，幫助小用戶做出明智的判斷。
                 </p>
               </div>
               <div className="pt-8 border-t border-white/5 flex justify-center space-x-8 text-[10px] font-black tracking-widest text-stone-600">
                  <span>99.2% INFO ACCURACY</span>
                  <span>2.5K+ REVIEWS</span>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* 頁腳 */}
      <footer className="bg-white py-24 px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#B22222] flex items-center justify-center text-white font-serif text-2xl">道</div>
              <div className="flex flex-col">
                <span className="text-2xl font-black font-serif tracking-tighter text-[#1C1C1C]">みち</span>
                <span className="text-[8px] font-bold text-stone-300 tracking-[0.5em] uppercase">Information Hub</span>
              </div>
            </div>
            <p className="text-[10px] text-stone-400 max-w-xs leading-loose tracking-widest uppercase text-center md:text-left">
              Building a bridge of trust between Japanese experts and global personal buyers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
            <a href="#" className="hover:text-[#B22222] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#B22222] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#B22222] transition-colors">Safety</a>
            <a href="#" className="hover:text-[#B22222] transition-colors">Contact</a>
          </div>

          <div className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
            © 2026 Michi Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}