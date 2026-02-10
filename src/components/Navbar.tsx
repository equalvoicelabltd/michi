'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <span className="text-2xl font-bold text-primary">JP</span>
            <span className="text-2xl font-bold text-secondary">Daigou</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}/buyers`} className="hover:text-primary transition">
              {t('nav.buyers')}
            </Link>
            <Link href={`/${locale}/products`} className="hover:text-primary transition">
              {t('nav.products')}
            </Link>

            {session?.user ? (
              <>
                <Link
                  href={`/${locale}/dashboard`}
                  className="hover:text-primary transition"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-outline px-4 py-2"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link href={`/${locale}/auth/signin`} className="btn-primary">
                {t('auth.signIn')}
              </Link>
            )}

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href={`/${locale}/buyers`}
                className="hover:text-primary transition"
              >
                {t('nav.buyers')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="hover:text-primary transition"
              >
                {t('nav.products')}
              </Link>
              {session?.user ? (
                <>
                  <Link
                    href={`/${locale}/dashboard`}
                    className="hover:text-primary transition"
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="btn-outline px-4 py-2 text-left"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link href={`/${locale}/auth/signin`} className="btn-primary">
                  {t('auth.signIn')}
                </Link>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
