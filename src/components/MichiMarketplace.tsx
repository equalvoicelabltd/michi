'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

interface Shopper {
  id: string;
  name: string;
  type: 'vintage' | 'anime' | 'fashion';
  location: string;
  experience: string;
  score: number;
  reviews: number;
  tags: string[];
  icon: string;
  specialty: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  source: string;
  ai_summary?: string;
  published_at: string;
}

export default function MichiMarketplace() {
  const t = useTranslations();
  const [shoppers, setShoppers] = useState<Shopper[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredShoppers, setFilteredShoppers] = useState<Shopper[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Mock shoppers data
  const mockShoppers: Shopper[] = [
    {
      id: '1',
      name: 'Saito Kaito',
      type: 'vintage',
      location: 'Tokyo, Ginzai',
      experience: '12 YRS',
      score: 4.9,
      reviews: 450,
      tags: ['Hermès', 'Classic Watches'],
      icon: '👔',
      specialty: 'Luxury Authentication'
    },
    {
      id: '2',
      name: 'Asuka Yuki',
      type: 'anime',
      location: 'Akihabara',
      experience: '5 YRS',
      score: 5.0,
      reviews: 210,
      tags: ['C88 Limited', 'Resin Kits'],
      icon: '🎨',
      specialty: 'Rare Anime Finds'
    },
    {
      id: '3',
      name: 'Haru Tanaka',
      type: 'fashion',
      location: 'Daikanyama',
      experience: '4 YRS',
      score: 4.8,
      reviews: 125,
      tags: ['Streetwear', 'Independent'],
      icon: '👟',
      specialty: 'Boutique Sourcing'
    },
    {
      id: '4',
      name: 'Sato Sensei',
      type: 'vintage',
      location: 'Osaka',
      experience: '15 YRS',
      score: 4.9,
      reviews: 380,
      tags: ['Leica', 'Hasselblad'],
      icon: '📷',
      specialty: 'Optical Perfection'
    },
    {
      id: '5',
      name: 'Mina Kyo',
      type: 'fashion',
      location: 'Kyoto',
      experience: '6 YRS',
      score: 4.7,
      reviews: 90,
      tags: ['Traditional', 'Kimono'],
      icon: '👘',
      specialty: 'Textile Expert'
    },
    {
      id: '6',
      name: 'Kenji',
      type: 'anime',
      location: 'Nakano Broadway',
      experience: '7 YRS',
      score: 5.0,
      reviews: 260,
      tags: ['Soft Vinyl', 'Vintage Toys'],
      icon: '🎮',
      specialty: 'Toy Restoration'
    }
  ];

  useEffect(() => {
    setShoppers(mockShoppers);
    filterShoppers('all');
    loadLatestProducts();
  }, []);

  const filterShoppers = (type: string) => {
    setActiveFilter(type);
    const filtered = type === 'all'
      ? mockShoppers
      : mockShoppers.filter(s => s.type === type);
    setFilteredShoppers(filtered);
  };

  const loadLatestProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(getMockProducts());
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(getMockProducts());
    } finally {
      setLoadingProducts(false);
    }
  };

  const getMockProducts = (): Product[] => [
    {
      id: '1',
      title: 'Uniqlo x JW Anderson 新系列',
      description: '極簡設計與日本工藝的完美融合',
      category: 'Fashion',
      source: 'Uniqlo Official',
      published_at: new Date().toISOString(),
      ai_summary: 'JW Anderson 以其獨特的視角重新詮釋 Uniqlo 的經典款式，強調立體剪裁和創新面料運用。預期發售：下個月，限量 500 件。'
    },
    {
      id: '2',
      title: 'Muji 春季新作：竹製傢具系列',
      description: '環保材料打造的日常生活美學',
      category: 'Home',
      source: 'Muji Magazine',
      ai_summary: 'Muji 推出全新竹製傢具系列，採用可持續的京都竹材，每件都經過職人手工打磨。適合小戶型公寓。',
      published_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: '奈良漆器工坊：手繪蒔絵餐具',
      description: '傳統技藝與當代設計的對話',
      category: 'Craft',
      source: 'Nara Craft Association',
      ai_summary: '奈良漆器職人推出新系列，融合傳統蒔絵技法與北歐極簡風格，每套限量 20 件，適合收藏與日常使用。',
      published_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  return (
    <main className="bg-[#F9F7F2] min-h-screen">
      {/* Top Disclaimer */}
      <div className="bg-[#1C1C1C] text-[#F9F7F2]/60 py-2 px-6 text-[9px] tracking-[0.4em] text-center uppercase font-bold">
        MICHI • 代購職人資訊平台 • 非交易提供方 • 透明直接
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 bg-[#B22222] flex items-center justify-center text-white font-serif text-2xl font-black">
              道
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-[#1C1C1C]">みち</span>
              <span className="text-[8px] font-bold text-stone-400 tracking-[0.4em] uppercase">Michi Project</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
            <a href="#market" className="hover:text-[#1A237E] transition-colors">專家名錄</a>
            <a href="#products" className="hover:text-[#1A237E] transition-colors">最新商品</a>
            <a href="#philosophy" className="hover:text-[#1A237E] transition-colors">平台理念</a>
          </div>

          <button className="font-serif text-sm italic border-b border-[#1C1C1C] pb-1 hover:text-stone-400 transition-all">
            發布需求
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-12 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#B22222]">The Japanese Way</span>
                <div className="h-px w-24 bg-stone-200"></div>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-[#1C1C1C] leading-[1] font-black">
                尋覓日本<br />
                <span className="italic font-playfair font-normal text-[#C5A059]">Authenticity</span>
              </h1>
            </div>

            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Michi JP 轉化為精緻的資訊索引，為追求生活品質的用戶連結日本各地的代購職人與最新商品情報。
            </p>

            <div className="flex items-center space-x-8 pt-6">
              <a
                href="#market"
                className="bg-[#1A237E] text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] transition-all"
              >
                瀏覽專家名錄
              </a>
              <a
                href="#products"
                className="border border-[#1C1C1C] text-[#1C1C1C] px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1C1C1C] hover:text-white transition-all"
              >
                探索商品
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="text-center">
              <div className="text-9xl opacity-20 font-serif select-none leading-none">
                道
              </div>
              <p className="text-stone-400 text-sm mt-4">Information Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 代購職人市場 */}
      <section id="market" className="max-w-7xl mx-auto px-8 py-32 space-y-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif text-[#1C1C1C] font-black">探索代購職人</h2>
            <p className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px]">
              認識日本各地的專業代購員
            </p>
          </div>

          <div className="flex flex-wrap gap-6 border-b border-stone-200 pb-2">
            {['all', 'vintage', 'anime', 'fashion'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => filterShoppers(filterType)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 transition-colors ${
                  activeFilter === filterType
                    ? 'text-[#1A237E] border-b-2 border-[#1A237E]'
                    : 'text-stone-400 hover:text-stone-900'
                }`}
              >
                {filterType === 'all' && 'All'}
                {filterType === 'vintage' && 'Vintage'}
                {filterType === 'anime' && 'Anime'}
                {filterType === 'fashion' && 'Fashion'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredShoppers.map((shopper) => (
            <div key={shopper.id} className="group">
              <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center text-6xl relative overflow-hidden border border-stone-200">
                <span className="z-10 text-7xl">{shopper.icon}</span>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all"></div>
                <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-stone-400 border border-stone-200">
                  {shopper.specialty}
                </div>
              </div>

              <div className="mt-8 space-y-4 bg-white p-6 border border-stone-200 border-t-0">
                <div className="flex justify-between items-end border-b border-stone-100 pb-2">
                  <h4 className="text-2xl font-serif text-[#1C1C1C] font-black group-hover:text-[#B22222] transition-colors">
                    {shopper.name}
                  </h4>
                  <span className="font-playfair italic text-xl text-[#C5A059]">{shopper.score}</span>
                </div>

                <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                  <span>
                    {shopper.location} / {shopper.experience}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {shopper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold text-stone-500 border border-stone-100 px-2 py-1 uppercase tracking-tighter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 text-[9px] text-stone-400">
                  {shopper.reviews} 評價
                </div>

                <button className="w-full py-3 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B22222] transition-all">
                  聯絡
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: 日本最新商品情報 */}
      <section id="products" className="bg-[#1C1C1C] text-white py-32">
        <div className="max-w-7xl mx-auto px-8 space-y-20">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-black leading-tight">
              日本最新商品情報<br />
              <span className="text-[#C5A059] italic font-playfair font-normal text-3xl">Latest Japanese Releases</span>
            </h2>
            <p className="text-stone-400 font-light leading-relaxed max-w-2xl">
              AI 實時監測日本官方發布的最新商品、聯名系列與工藝佳作，每日更新資訊要點。
            </p>
          </div>

          {loadingProducts ? (
            <div className="text-center py-12">
              <p className="text-stone-400">加載中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#F9F7F2] text-[#1C1C1C] p-8 border border-stone-300 hover:border-[#C5A059] transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B22222] border border-[#B22222] px-2 py-1">
                        {product.category}
                      </span>
                      <span className="text-[9px] font-bold text-stone-400">
                        {new Date(product.published_at).toLocaleDateString('zh-Hant')}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-black leading-tight group-hover:text-[#B22222] transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-stone-500 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {product.ai_summary && (
                      <div className="bg-stone-100 p-4 border-l-2 border-[#C5A059] space-y-2">
                        <p className="text-[9px] font-bold text-[#B22222] uppercase tracking-widest">AI 摘要</p>
                        <p className="text-xs text-stone-700 leading-relaxed">{product.ai_summary}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-200">
                      <span>來源：{product.source}</span>
                      <button className="text-[#1A237E] hover:text-[#B22222] transition-colors">
                        了解更多 →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-8">
            <button className="border border-white text-white px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1C1C] transition-all">
              查看所有商品
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="bg-white py-32 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-serif font-black leading-tight">
                關於我們<br />
                <span className="text-[#C5A059] italic font-playfair font-normal text-3xl">Our Philosophy</span>
              </h2>
              <p className="text-stone-500 leading-relaxed font-light">
                Michi JP 相信最好的交易發生在彼此尊重與資訊透明的基礎上。我們不是代購公司，而是一個資訊橋樑，讓才華的代購員能被眼光獨到的買家看見。
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  num: '01',
                  title: '自主聯繫權',
                  desc: '所有的聯繫、協商與交易都發生在買賣雙方之間，回歸人與人的對話。'
                },
                {
                  num: '02',
                  title: '資訊共享義務',
                  desc: '我們開放社區評價功能，旨在透過透明的數據降低交易風險。'
                },
                {
                  num: '03',
                  title: 'AI 輔助發現',
                  desc: '通過人工智能實時監測日本最新商品發布，幫助你發現值得購買的好物。'
                }
              ].map((item) => (
                <div key={item.num} className="flex items-start space-x-6">
                  <div className="text-[10px] font-bold text-[#B22222] border border-[#B22222] px-3 py-2 whitespace-nowrap">
                    {item.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 p-12 border border-stone-200 space-y-8">
            <div className="text-center">
              <h4 className="text-[9px] font-black text-stone-400 uppercase tracking-[0.5em] mb-6">
                社區數據統計
              </h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-playfair italic text-[#C5A059] mb-2">99.2%</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">資訊準確度</p>
                </div>
                <div>
                  <p className="text-4xl font-playfair italic text-[#C5A059] mb-2">88.5%</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">專家留存率</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white py-24 px-8 border-t border-stone-700">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white text-[#1C1C1C] flex items-center justify-center font-serif text-xl font-black">
                  道
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter">みち</span>
                  <span className="text-[8px] font-bold text-stone-400 tracking-[0.5em] uppercase">Information Hub</span>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 leading-relaxed">
                Build a bridge of trust between local Japanese experts and global personal buyers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
              <div className="space-y-3">
                <p className="text-white">Discover</p>
                <a href="#" className="block hover:text-[#C5A059] transition-colors">Experts</a>
                <a href="#" className="block hover:text-[#C5A059] transition-colors">Products</a>
              </div>
              <div className="space-y-3">
                <p className="text-white">Support</p>
                <a href="#" className="block hover:text-[#C5A059] transition-colors">Safety</a>
                <a href="#" className="block hover:text-[#C5A059] transition-colors">Contact</a>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-stone-800 text-white px-4 py-2 text-xs outline-none"
                />
                <button className="bg-[#B22222] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-colors">
                  訂閱
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-700 flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase tracking-widest">
            <span>© 2026 Michi Project. All rights reserved.</span>
            <span>Made in Tradition</span>
          </div>
        </div>
      </footer>
    </main>
  );
}