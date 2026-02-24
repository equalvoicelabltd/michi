'use client';

import { Link } from '@/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: '平台',
      links: [
        { href: '/buyers',   label: '找買手' },
        { href: '/products', label: '最新商品情報' },
        { href: '/about',    label: '關於我們' },
      ],
    },
    {
      heading: '買手',
      links: [
        { href: '/buyers',        label: '瀏覽買手名錄' },
        { href: '/buyers#apply',  label: '申請成為買手' },
      ],
    },
    {
      heading: '支援',
      links: [
        { href: 'mailto:hello@michi.jp', label: '聯絡我們', external: true },
      ],
    },
  ];

  return (
    <footer className="bg-[#111] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

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
              由 Global EZshop 創辦人於 2011 年起深耕日本代購。
              Michi 是資訊索引平台，連接全球買家與日本在地買手。
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
                {links.map(({ href, label, external }) => (
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
            Michi 為資訊索引平台，不對任何買手的服務質素、交易安全或商品真偽作出保證。所有交易由買賣雙方自行承擔責任。
          </p>
          <div className="flex gap-4 text-[9px] text-stone-600 uppercase tracking-widest">
            <span>私隱政策</span>
            <span>·</span>
            <span>服務條款</span>
          </div>
        </div>
      </div>
    </footer>
  );
}