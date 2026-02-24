'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 類型定義
interface Shopper {
  id: number;
  name: string;
  type: 'vintage' | 'anime' | 'fashion';
  location: string;
  exp: string;
  score: string;
  reviews: string;
  tags: string[];
  icon: string;
  specialty: string;
}

interface Product {
  id: string;
  title: string;
  category: string;
  source: string;
  image_url?: string;
  published_at: string;
  summary?: string;
}

// 代購員數據
const SHOPPERS_DATA: Shopper[] = [
  {
    id: 1,
    name: 'Saito Kaito',
    type: 'vintage',
    location: 'Tokyo, Ginza',
    exp: '12 YRS',
    score: '4.9',
    reviews: '450',
    tags: ['Hermès', 'Classic Watches'],
    icon: '👔',
    specialty: 'Luxury Authentication'
  },
  {
    id: 2,
    name: 'Asuka Yuki',
    type: 'anime',
    location: 'Akihabara',
    exp: '5 YRS',
    score: '5.0',
    reviews: '210',
    tags: ['C88 Limited', 'Resin Kits'],
    icon: '🎨',
    specialty: 'Rare Anime Finds'
  },
  {
    id: 3,
    name: 'Haru Tanaka',
    type: 'fashion',
    location: 'Daikanyama',
    exp: '4 YRS',
    score: '4.8',
    reviews: '125',
    tags: ['Streetwear', 'Independent'],
    icon: '👟',
    specialty: 'Boutique Sourcing'
  },
  {
    id: 4,
    name: 'Sato Sensei',
    type: 'vintage',
    location: 'Osaka',
    exp: '15 YRS',
    score: '4.9',
    reviews: '380',
    tags: ['Leica', 'Hasselblad'],
    icon: '📷',
    specialty: 'Optical Perfection'
  },
  {
    id: 5,
    name: 'Mina Kyo',
    type: 'fashion',
    location: 'Kyoto',
    exp: '6 YRS',
    score: '4.7',
    reviews: '90',
    tags: ['Traditional', 'Kimono'],
    icon: '👘',
    specialty: 'Textile Expert'
  },
  {
    id: 6,
    name: 'Kenji',
    type: 'anime',
    location: 'Nakano Broadway',
    exp: '7 YRS',
    score: '5.0',
    reviews: '260',
    tags: ['Soft Vinyl', 'Vintage Toys'],
    icon: '🎮',
    specialty: 'Toy Restoration'
  }
];

export default function MichiMarketplace() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState('hero');
  const [filteredShoppers, setFilteredShoppers] = useState<Shopper[]>(SHOPPERS_DATA);
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  // 加載商品
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products?.slice(0, 3) || []);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadProducts();
  }, []);

  // 篩選邏輯
  const handleFilter = (type: string) => {
    setActiveFilter(type);
    if (type === 'all') {
      setFilteredShoppers(SHOPPERS_DATA);
    } else {
      setFilteredShoppers(SHOPPERS_DATA.filter(s => s.type === type));
    }
  };

  const navigateTo = (section: string) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1C1C1C]">
      {/* Top Bar */}
      <div className="bg-stone-50 text-stone-500 py-1 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold border-b border-stone-100">
        MICHI • 代購職人資訊平台 • 非交易提供方 • 透明直接
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#B22222] flex items-center justify-center text-white font-serif-jp text-2xl shadow-sm">
              道
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-black font-serif-jp tracking-tight">みち</span>
              <span className="text-[8px] font-bold text-stone-400 tracking-[0.2em] uppercase">Michi Project</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-12 text-[11px] font-bold tracking-widest text-stone-600">
            <button
              onClick={() => navigateTo('hero')}
              className={`hover:text-black transition-colors ${activeSection === 'hero' ? 'text-black font-black' : ''}`}
            >
              專家名錄
            </button>
            <button
              onClick={() => navigateTo('market')}
              className={`hover:text-black transition-colors ${activeSection === 'market' ? 'text-black font-black' : ''}`}
            >
              最新商品
            </button>
            <button
              onClick={() => navigateTo('philosophy')}
              className={`hover:text-black transition-colors ${activeSection === 'philosophy' ? 'text-black font-black' : ''}`}
            >
              平台理念
            </button>
          </div>

          {/* CTA Button */}
          <button className="font-serif-jp text-sm border-b-2 border-black pb-1 hover:text-stone-400 transition-all font-bold">
            發布需求
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <section className="relative bg-[#F9F7F2] pt-24 pb-48 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center relative z-10">
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B22222]">
                      The Japanese Way
                    </span>
                    <div className="h-[1px] w-24 bg-stone-300"></div>
                  </div>
                  <h1 className="text-8xl font-serif-jp text-[#1C1C1C] font-black leading-none">尋覓日本</h1>
                  <h2 className="text-8xl font-playfair italic text-[#C5A059] leading-none">Authenticity</h2>
                </div>

                <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  Michi JP 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人與最新商品情報。
                </p>

                <div className="flex items-center space-x-6 pt-6">
                  <button
                    onClick={() => navigateTo('market')}
                    className="bg-[#1A237E] text-white px-12 py-5 text-sm font-bold tracking-widest shadow-xl hover:brightness-110 transition-all"
                  >
                    瀏覽專家名錄
                  </button>
                  <button
                    onClick={() => navigateTo('market')}
                    className="px-12 py-5 text-sm font-bold tracking-widest border border-stone-800 hover:bg-stone-800 hover:text-white transition-all"
                  >
                    探索商品
                  </button>
                </div>
              </div>

              {/* Right Decor */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
                <div className="text-[18rem] md:text-[22rem] font-serif-jp text-stone-200 select-none leading-none opacity-80">
                  道
                </div>
                <div className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-bold -mt-8">
                  Information Platform
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gold Tape Accent */}
        {(activeSection === 'hero' || activeSection === 'market') && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 py-5 border-y border-black/5 overflow-hidden shadow-sm relative z-20">
            <div className="whitespace-nowrap text-black font-black text-[10px] tracking-[0.5em] uppercase animate-pulse">
              Michi JP: Connecting Personal Buyers to Professional Shoppers • A Pure Information Platform • Transparent • Direct • Honorable
            </div>
          </div>
        )}

        {/* Market Section */}
        {activeSection === 'market' && (
          <section className="max-w-7xl mx-auto px-8 py-32 space-y-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif-jp text-[#1C1C1C] font-black">探索代購職人</h2>
                <p className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px]">
                  Curated listing of professional proxy shoppers in Japan
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-6 border-b border-stone-200 pb-2">
                {['all', 'vintage', 'anime', 'fashion'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => handleFilter(filter)}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 relative transition-colors ${
                      activeFilter === filter
                        ? 'text-[#1A237E] border-b-2 border-[#1A237E]'
                        : 'text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Shoppers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {filteredShoppers.map(shopper => (
                <div
                  key={shopper.id}
                  className="shopper-card flex flex-col group p-2 bg-white border border-transparent hover:border-[#C5A059] transition-all shadow-sm hover:shadow-lg"
                >
                  {/* Avatar */}
                  <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center text-6xl relative overflow-hidden">
                    <span className="z-10">{shopper.icon}</span>
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
                      {shopper.specialty}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-black font-serif-jp">{shopper.name}</h3>
                      <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">
                        {shopper.location}
                      </p>
                    </div>

                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-stone-400">
                      <span>{shopper.exp}</span>
                      <span>⭐ {shopper.score}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {shopper.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[8px] px-2 py-1 bg-stone-50 border border-stone-200 text-stone-600 font-bold uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-[#1A237E] text-white py-3 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                      聯絡 {shopper.name}
                    </button>

                    <p className="text-[9px] text-stone-400 text-center border-t border-stone-100 pt-4">
                      {shopper.reviews} 評價
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Philosophy Section */}
        {activeSection === 'philosophy' && (
          <section className="bg-[#1C1C1C] text-white py-32">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-serif-jp font-black leading-tight">
                    關於我們的角色
                    <br />
                    <span className="text-[#C5A059] italic font-playfair font-normal text-3xl">
                      Platform Philosophy
                    </span>
                  </h2>
                  <p className="text-stone-400 leading-relaxed font-light">
                    我們相信最好的交易發生在彼此尊重與資訊透明的基礎上。Michi JP
                    不是代購公司，而是一個資訊橋樑，讓有才華的代購員能被有眼光的買家看見。
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      num: '01',
                      title: '自主聯繫權',
                      desc: '我們不提供自動化下單。所有的聯繫、協商與交易都發生在買賣雙方之間，回歸人與人的對話。'
                    },
                    {
                      num: '02',
                      title: '資訊共享義務',
                      desc: '我們開放社區評價功能，旨在透過透明的數據降低交易風險，而非提供官方擔保。'
                    }
                  ].map(point => (
                    <div key={point.num} className="flex items-start space-x-6">
                      <div className="text-[10px] font-bold text-[#B22222] border border-[#B22222] px-2 py-1">
                        {point.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">{point.title}</h4>
                        <p className="text-stone-500 text-xs leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-[#F9F7F2] p-12 border border-stone-200 text-[#1C1C1C] space-y-12">
                <div className="text-center">
                  <h4 className="text-[9px] font-black text-stone-400 uppercase tracking-[0.5em] mb-8">
                    社區信譽數據分析
                  </h4>
                  <div className="text-6xl font-playfair italic text-[#1A237E]">99.2%</div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-2">資訊準確度</p>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-stone-200 pt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      專家留存率
                    </span>
                    <span className="font-playfair italic text-3xl">88.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      平台信譽
                    </span>
                    <span className="font-playfair italic text-3xl">⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#F9F7F2] py-24 px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#1C1C1C] text-[#F9F7F2] flex items-center justify-center font-serif-jp text-2xl">
                道
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black font-serif-jp tracking-tighter text-[#1C1C1C]">
                  みち
                </span>
                <span className="text-[8px] font-bold text-stone-300 tracking-[0.5em] uppercase">
                  Information Hub
                </span>
              </div>
            </div>
            <p className="text-[10px] text-stone-400 max-w-xs leading-loose tracking-widest uppercase">
              Build a bridge of trust between local Japanese experts and global personal buyers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
            <div className="space-y-4 flex flex-col">
              <span className="text-stone-900">Discover</span>
              <button onClick={() => navigateTo('hero')} className="text-left hover:text-[#1A237E]">
                Experts
              </button>
              <button onClick={() => navigateTo('market')} className="text-left hover:text-[#1A237E]">
                Products
              </button>
            </div>
            <div className="space-y-4 flex flex-col">
              <span className="text-stone-900">Support</span>
              <button onClick={() => navigateTo('philosophy')} className="text-left hover:text-[#1A237E]">
                Philosophy
              </button>
              <button className="text-left hover:text-[#1A237E]">Contact</button>
            </div>
            <div className="space-y-4 flex flex-col">
              <span className="text-stone-900">Legal</span>
              <button className="text-left hover:text-[#1A237E]">Privacy</button>
              <button className="text-left hover:text-[#1A237E]">Terms</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-200 flex justify-between items-center text-[9px] font-bold text-stone-300 uppercase tracking-widest">
          <span>© 2026 Michi Project. All rights reserved.</span>
          <span>Made in Tradition</span>
        </div>
      </footer>

      {/* Add Playfair font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .font-serif-jp {
          font-family: 'Noto Sans JP', serif;
        }

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .shopper-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .shopper-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}