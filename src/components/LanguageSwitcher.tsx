'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const languages = [
  { code: 'zh', name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale);

  // 獲取切換後的路徑
  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;

    // 移除當前語言前綴
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');

    // 添加新語言前綴
    return `/${newLocale}${pathWithoutLocale || ''}`;
  };

  return (
    <div className="relative">
      {/* 當前語言按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="切換語言"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={getLocalizedPath(lang.code)}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg ${
                  locale === lang.code ? 'bg-michi-light' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium flex-1 text-left">{lang.name}</span>
                {locale === lang.code && (
                  <svg className="w-5 h-5 text-michi-primary" fill="currentColor" viewBox="0 0 20 20">
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