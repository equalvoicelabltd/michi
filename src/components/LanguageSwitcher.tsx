'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useState, useTransition } from 'react';

const languages = [
  { code: 'zh',    name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en',    name: 'English',  flag: '🇺🇸' },
  { code: 'ja',    name: '日本語',   flag: '🇯🇵' },
  { code: 'th',    name: 'ไทย',      flag: '🇹🇭' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages.find((l) => l.code === locale);

  const handleChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
        aria-label="切換語言"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline text-stone-700">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform text-stone-600 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-stone-200 z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition text-left ${
                  locale === lang.code ? 'bg-stone-50' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium flex-1 text-stone-700">{lang.name}</span>
                {locale === lang.code && (
                  <svg className="w-4 h-4 text-[#1A237E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}