/**
 * src/components/Navbar.tsx
 *
 * Michi 完整導航欄組件
 * 包含：
 * - 響應式設計（移動端友好）
 * - 多語言支持
 * - 法律頁面連結
 * - 動態活動頁面指示
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 檢查當前頁面是否活動
  const isActive = (path: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    return currentPath === path || currentPath.startsWith(path);
  };

  // 導航連結樣式
  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive(path)
        ? 'bg-pink-100 text-pink-900'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium transition ${
      isActive(path)
        ? 'bg-pink-100 text-pink-900'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center gap-3">
              <div className="text-2xl font-bold text-pink-600">🌸 Michi</div>
              <span className="hidden sm:inline text-xs text-gray-600 font-medium">
                {t('tagline')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Main Links */}
            <Link href={`/${locale}`} className={linkClass('')}>
              {t('home')}
            </Link>

            <Link href={`/${locale}/buyers`} className={linkClass('/buyers')}>
              {t('buyers')}
            </Link>

            <Link href={`/${locale}/products`} className={linkClass('/products')}>
              {t('products')}
            </Link>

            <Link href={`/${locale}/disputes`} className={linkClass('/disputes')}>
              {t('disputes')}
            </Link>

            {/* Legal Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1 transition">
                Legal
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 border border-gray-200">
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={`/${locale}/legal/terms`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Terms of Service
                </Link>
                <Link
                  href={`/${locale}/legal/disclaimer`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Disclaimer
                </Link>
              </div>
            </div>

            <Link href={`/${locale}/contact`} className={linkClass('/contact')}>
              {t('contact')}
            </Link>

            {/* Language Selector */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition">
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
              </button>
              <div className="absolute right-0 mt-0 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 border border-gray-200">
                <Link
                  href={pathname.replace(`/${locale}`, '/en')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  English
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/zh')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  繁體中文
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/zh-CN')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  简体中文
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/ja')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  日本語
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/th')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  ไทย
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none transition"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Links */}
            <Link
              href={`/${locale}`}
              className={mobileLinkClass('')}
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>

            <Link
              href={`/${locale}/buyers`}
              className={mobileLinkClass('/buyers')}
              onClick={() => setIsOpen(false)}
            >
              {t('buyers')}
            </Link>

            <Link
              href={`/${locale}/products`}
              className={mobileLinkClass('/products')}
              onClick={() => setIsOpen(false)}
            >
              {t('products')}
            </Link>

            <Link
              href={`/${locale}/disputes`}
              className={mobileLinkClass('/disputes')}
              onClick={() => setIsOpen(false)}
            >
              {t('disputes')}
            </Link>

            {/* Mobile Legal Dropdown */}
            <button
              onClick={() => setIsLegalOpen(!isLegalOpen)}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between transition"
            >
              Legal
              <ChevronDown
                className={`w-4 h-4 transition ${
                  isLegalOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLegalOpen && (
              <div className="pl-4 space-y-1">
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    setIsLegalOpen(false);
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href={`/${locale}/legal/terms`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    setIsLegalOpen(false);
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  href={`/${locale}/legal/disclaimer`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    setIsLegalOpen(false);
                  }}
                >
                  Disclaimer
                </Link>
              </div>
            )}

            <Link
              href={`/${locale}/contact`}
              className={mobileLinkClass('/contact')}
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </Link>

            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-700 mb-2">Language</div>
              <div className="space-y-1 pl-2">
                <Link
                  href={pathname.replace(`/${locale}`, '/en')}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  English
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/zh')}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  繁體中文
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/zh-CN')}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  简体中文
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/ja')}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  日本語
                </Link>
                <Link
                  href={pathname.replace(`/${locale}`, '/th')}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  ไทย
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}