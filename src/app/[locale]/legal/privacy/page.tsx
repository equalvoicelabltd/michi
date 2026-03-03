'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('page_title')}</h1>
        <p className="text-gray-600 mb-8">{t('last_updated')}: 2026-03-03</p>

        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-gray-700">{t('intro')}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. {t('section1_title')}</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t('section1_1_title')}</h3>
                <p>{t('section1_1_desc')}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t('section1_2_title')}</h3>
                <p>{t('section1_2_desc')}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t('section1_3_title')}</h3>
                <p>{t('section1_3_desc')}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t('section1_4_title')}</h3>
                <p>{t('section1_4_desc')}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. {t('section2_title')}</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section2_point1')}</li>
              <li>{t('section2_point2')}</li>
              <li>{t('section2_point3')}</li>
              <li>{t('section2_point4')}</li>
              <li>{t('section2_point5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. {t('section3_title')}</h2>
            <p className="text-gray-700 mb-4">{t('section3_intro')}</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-700 text-sm">{t('section3_warning')}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. {t('section4_title')}</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><strong>{t('section4_right1_title')}</strong>: {t('section4_right1_desc')}</li>
              <li><strong>{t('section4_right2_title')}</strong>: {t('section4_right2_desc')}</li>
              <li><strong>{t('section4_right3_title')}</strong>: {t('section4_right3_desc')}</li>
              <li><strong>{t('section4_right4_title')}</strong>: {t('section4_right4_desc')}</li>
              <li><strong>{t('section4_right5_title')}</strong>: {t('section4_right5_desc')}</li>
            </ul>
            <p className="text-gray-700 mt-4">{t('section4_footer')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. {t('section5_title')}</h2>
            <p className="text-gray-700 mb-4">{t('section5_desc')}</p>
            <div className="space-y-2 text-gray-700">
              <div><strong>{t('section5_essential')}</strong>: {t('section5_essential_desc')}</div>
              <div><strong>{t('section5_analytics')}</strong>: {t('section5_analytics_desc')}</div>
              <div><strong>{t('section5_marketing')}</strong>: {t('section5_marketing_desc')}</div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. {t('section6_title')}</h2>
            <p className="text-gray-700 mb-4">{t('section6_intro')}</p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section6_point1')}</li>
              <li>{t('section6_point2')}</li>
              <li>{t('section6_point3')}</li>
              <li>{t('section6_point4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. {t('section7_title')}</h2>
            <p className="text-gray-700">{t('section7_desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. {t('section8_title')}</h2>
            <div className="space-y-4 text-gray-700">
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-bold mb-2">{t('section8_us_title')}</h3>
                <p>{t('section8_us_desc')}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-bold mb-2">{t('section8_hk_title')}</h3>
                <p>{t('section8_hk_desc')}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-bold mb-2">{t('section8_eu_title')}</h3>
                <p>{t('section8_eu_desc')}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-bold mb-2">{t('section8_jp_title')}</h3>
                <p>{t('section8_jp_desc')}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. {t('section9_title')}</h2>
            <p className="text-gray-700 mb-4">{t('section9_intro')}</p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700"><strong>{t('section9_email')}</strong>: privacy@michi.com</p>
              <p className="text-gray-700 mt-2"><strong>{t('section9_address')}</strong>: Equal Voice Lab Ltd, Hong Kong</p>
              <p className="text-gray-700 mt-2"><strong>{t('section9_response_time')}</strong>: {t('section9_response_time_value')}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. {t('section10_title')}</h2>
            <p className="text-gray-700">{t('section10_desc')}</p>
          </section>
        </div>

        <div className="mt-12 p-4 bg-green-50 border-l-4 border-green-400 rounded">
          <p className="text-green-900 font-semibold">✓ {t('confirmation')}</p>
        </div>
      </div>
    </div>
  );
}