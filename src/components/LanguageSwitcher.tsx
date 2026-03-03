'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/navigation';
import { useState } from 'react';
import { Link } from '@/navigation';

const languages = [
  { code: 'zh' as const, name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN' as const, name: '简体中文', flag: '🇨🇳' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
  { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative">
      {/* 當前語言按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition text-[10px] font-bold uppercase tracking-widest"
        aria-label="切換語言"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline text-stone-700">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform text-stone-600 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 語言下拉選單 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 下拉選單 */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-stone-200 z-20">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-stone-50 transition first:rounded-t-lg last:rounded-b-lg ${
                  locale === lang.code ? 'bg-stone-100' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium flex-1 text-left text-stone-700">{lang.name}</span>
                {locale === lang.code && (
                  <svg className="w-5 h-5 text-[#1A237E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}