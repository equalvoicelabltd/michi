'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function DisclaimerPage() {
  const t = useTranslations('disclaimer');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-red-900 mb-4">
            ⚠️ {t('page_title')}
          </h1>
          <p className="text-red-900 mb-4 font-semibold">
            {t('intro')}
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. {t('s1_title')}</h2>
            <p className="text-gray-700">{t('s1_content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. {t('s2_title')}</h2>
            <p className="text-gray-700 mb-3">{t('s2_intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('s2_p1')}</li>
              <li>{t('s2_p2')}</li>
              <li>{t('s2_p3')}</li>
              <li>{t('s2_p4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. {t('s3_title')}</h2>
            <p className="text-gray-700 mb-3">{t('s3_intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('s3_p1')}</li>
              <li>{t('s3_p2')}</li>
              <li>{t('s3_p3')}</li>
              <li>{t('s3_p4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. {t('s4_title')}</h2>
            <p className="text-gray-700 mb-3">{t('s4_intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('s4_p1')}</li>
              <li>{t('s4_p2')}</li>
              <li>{t('s4_p3')}</li>
              <li>{t('s4_p4')}</li>
              <li>{t('s4_p5')}</li>
              <li>{t('s4_p6')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. {t('s5_title')}</h2>
            <p className="text-gray-700 mb-3">{t('s5_intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('s5_p1')}</li>
              <li>{t('s5_p2')}</li>
              <li>{t('s5_p3')}</li>
            </ul>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h2 className="text-2xl font-bold text-yellow-900 mb-3">⚠️ {t('legal_title')}</h2>
            <p className="text-yellow-900">{t('legal_content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}