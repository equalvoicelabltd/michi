'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo 和品牌 */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-michi rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <div className="text-xl font-bold text-michi-primary">Michi</div>
              <div className="text-xs text-michi-secondary hidden sm:block">
                {t('tagline')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={`/${locale}/buyers`}
              className="nav-link-michi"
            >
              {t('buyers')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="nav-link-michi"
            >
              {t('products')}
            </Link>

            {session ? (
              <>
                <Link
                  href={`/${locale}/dashboard`}
                  className="nav-link-michi"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  href={`/${locale}/chat`}
                  className="nav-link-michi"
                >
                  {t('chat')}
                </Link>
              </>
            ) : null}

            {/* 語言切換器 */}
            <LanguageSwitcher />

            {/* 登入/登出 */}
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-michi-primary rounded-full flex items-center justify-center text-white text-sm">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="btn-michi-outline text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                className="btn-michi"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile 語言切換 */}
            <LanguageSwitcher />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                href={`/${locale}/buyers`}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('buyers')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('products')}
              </Link>

              {session ? (
                <>
                  <Link
                    href={`/${locale}/dashboard`}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  <Link
                    href={`/${locale}/chat`}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('chat')}
                  </Link>

                  {/* 用戶信息 */}
                  <div className="px-4 py-3 border-t border-gray-200 mt-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-michi-primary rounded-full flex items-center justify-center text-white">
                        {session.user?.name?.[0] || 'U'}
                      </div>
                      <div>
                        <div className="font-medium">{session.user?.name}</div>
                        <div className="text-sm text-gray-500">{session.user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full btn-michi-outline"
                    >
                      {t('logout')}
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="mx-4 btn-michi text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}