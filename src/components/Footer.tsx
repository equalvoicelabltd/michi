'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">JP</span>
              <span className="text-secondary">Daigou</span>
            </h3>
            <p className="text-gray-400">
              Connecting buyers worldwide with trusted Japanese shoppers
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.about')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="mailto:support@jpdaigou.com" className="hover:text-white transition">
                  support@jpdaigou.com
                </Link>
              </li>
              <li>
                <Link href="tel:+81312345678" className="hover:text-white transition">
                  +81 3-1234-5678
                </Link>
              </li>
              <li>Twitter: @jpdaigou</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.terms')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
