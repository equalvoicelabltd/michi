/**
 * src/components/Footer.tsx
 *
 * Michi 完整頁腳組件
 * 包含：
 * - 法律頁面連結
 * - 公司信息
 * - 聯繫方式
 * - 社交媒體連結
 * - 多語言支持
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, Instagram, TikTok, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">🌸 Michi</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform to connect with Japan's best proxy shoppers.
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} Equal Voice Lab Ltd. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/buyers`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  {t('buyers')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/disputes`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  {t('disputes')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal/terms`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal/disclaimer`}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <a
                  href="mailto:legal@michi.com"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Legal Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-pink-500" />
                <a
                  href="mailto:support@michi.com"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  support@michi.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-pink-500" />
                <a
                  href="tel:+85227893456"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  +852 2789 3456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-pink-500" />
                <div className="text-gray-400 text-sm">
                  <p>Equal Voice Lab Ltd</p>
                  <p>Hong Kong</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/michi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@michi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
                title="TikTok"
              >
                <TikTok className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/michi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/michi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Notice */}
            <p className="text-xs text-gray-500 text-center md:text-right">
              Michi is a pure information intermediary. We do not participate in transactions and assume no liability for disputes.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            Michi © {currentYear}. All rights reserved. |
            <Link
              href={`/${locale}/legal/privacy`}
              className="hover:text-gray-400 ml-2"
            >
              Privacy
            </Link>
            {' '}|
            <Link
              href={`/${locale}/legal/terms`}
              className="hover:text-gray-400 ml-2"
            >
              Terms
            </Link>
          </p>
          <div className="flex gap-4">
            <span>Language: {locale.toUpperCase()}</span>
            <span>|</span>
            <span>Status: 🟢 Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}