/**
 * src/app/[locale]/legal/terms/page.tsx
 *
 * Michi 服務條款頁面
 * 完整的法律條款和條件
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* 標題 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t('page_title')}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('last_updated')}: 2026-03-03
        </p>

        {/* 重要警告 */}
        <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded">
          <h2 className="text-lg font-bold text-red-900 mb-3">
            ⚠️ {t('important_notice')}
          </h2>
          <p className="text-red-900 mb-2">
            {t('notice_content')}
          </p>
        </div>

        {/* 內容 */}
        <div className="space-y-8">
          {/* 1. 協議接受 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. {t('section1_title')}
            </h2>
            <p className="text-gray-700">
              {t('section1_content')}
            </p>
          </section>

          {/* 2. 使用許可 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. {t('section2_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section2_intro')}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section2_point1')}</li>
              <li>{t('section2_point2')}</li>
              <li>{t('section2_point3')}</li>
              <li>{t('section2_point4')}</li>
            </ul>
          </section>

          {/* 3. 買家責任 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. {t('section3_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section3_intro')}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section3_point1')}</li>
              <li>{t('section3_point2')}</li>
              <li>{t('section3_point3')}</li>
              <li>{t('section3_point4')}</li>
            </ul>
          </section>

          {/* 4. 買手責任 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. {t('section4_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section4_intro')}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section4_point1')}</li>
              <li>{t('section4_point2')}</li>
              <li>{t('section4_point3')}</li>
              <li>{t('section4_point4')}</li>
            </ul>
          </section>

          {/* 5. 付款和費用 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. {t('section5_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section5_intro')}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section5_point1')}</li>
              <li>{t('section5_point2')}</li>
              <li>{t('section5_point3')}</li>
            </ul>
          </section>

          {/* 6. 不提供保證 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. {t('section6_title')}
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
              <p className="text-yellow-900 font-semibold">
                {t('section6_critical')}
              </p>
            </div>
            <p className="text-gray-700">
              {t('section6_content')}
            </p>
          </section>

          {/* 7. 責任限制 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. {t('section7_title')}
            </h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
              <p className="text-red-900 font-semibold">
                {t('section7_critical')}
              </p>
            </div>
            <p className="text-gray-700">
              {t('section7_content')}
            </p>
          </section>

          {/* 8. 禁止行為 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. {t('section8_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section8_intro')}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>{t('section8_point1')}</li>
              <li>{t('section8_point2')}</li>
              <li>{t('section8_point3')}</li>
              <li>{t('section8_point4')}</li>
              <li>{t('section8_point5')}</li>
            </ul>
          </section>

          {/* 9. 爭議解決 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. {t('section9_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section9_intro')}
            </p>
            <div className="space-y-3 text-gray-700">
              <div>
                <h3 className="font-bold mb-1">{t('section9_step1')}</h3>
                <p>{t('section9_step1_desc')}</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">{t('section9_step2')}</h3>
                <p>{t('section9_step2_desc')}</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">{t('section9_step3')}</h3>
                <p>{t('section9_step3_desc')}</p>
              </div>
            </div>
          </section>

          {/* 10. 管轄法律 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. {t('section10_title')}
            </h2>
            <p className="text-gray-700 mb-3">
              {t('section10_intro')}
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <h3 className="font-bold text-gray-900 mb-1">{t('section10_us')}</h3>
                <p className="text-gray-700 text-sm">{t('section10_us_desc')}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <h3 className="font-bold text-gray-900 mb-1">{t('section10_hk')}</h3>
                <p className="text-gray-700 text-sm">{t('section10_hk_desc')}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <h3 className="font-bold text-gray-900 mb-1">{t('section10_jp')}</h3>
                <p className="text-gray-700 text-sm">{t('section10_jp_desc')}</p>
              </div>
            </div>
          </section>

          {/* 11. 終止 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. {t('section11_title')}
            </h2>
            <p className="text-gray-700">
              {t('section11_content')}
            </p>
          </section>

          {/* 12. 修訂 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. {t('section12_title')}
            </h2>
            <p className="text-gray-700">
              {t('section12_content')}
            </p>
          </section>

          {/* 13. 聯繫方式 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. {t('section13_title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('section13_intro')}
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700">
                <strong>Email:</strong> enquiry@michiproject.com
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Address:</strong> Equal Voice Lab Ltd, 66 Paul Street, London, EC2A 4NA
              </p>
            </div>
          </section>
        </div>

        {/* 法律聲明 */}
        <div className="mt-12 p-4 bg-red-50 border-2 border-red-300 rounded">
          <p className="text-red-900 font-semibold text-sm">
            {t('legal_statement')}
          </p>
        </div>
      </div>
    </div>
  );
}