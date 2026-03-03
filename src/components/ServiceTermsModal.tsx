/**
 * ServiceTermsModal.tsx
 *
 * Michi 平台免責聲明和服務條款模態框
 * 用於首次訪問時強制用戶同意
 *
 * 功能：
 * - 多層免責聲明（平台免責 + 買手風險 + 交易確認）
 * - Clickwrap 協議（必須點擊同意）
 * - 審計日誌記錄
 * - 多語言支持
 * - 司法管轄區特定條款
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

interface ServiceTermsModalProps {
  onAccepted?: () => void;
  isOpen?: boolean;
}

export const ServiceTermsModal: React.FC<ServiceTermsModalProps> = ({
  onAccepted,
  isOpen = true,
}) => {
  const t = useTranslations('legal');
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 檢測用戶司法管轄區
  const getJurisdiction = (): 'US' | 'HK' | 'JP' | 'OTHER' => {
    // 簡易實現：可以根據 IP、語言、時區判斷
    const locale = pathname.split('/')[1];

    switch (locale) {
      case 'zh':
        return 'HK';
      case 'zh-CN':
        return 'OTHER';
      case 'ja':
        return 'JP';
      case 'en':
      case 'th':
      default:
        return 'US'; // 默認美國法
    }
  };

  const jurisdiction = getJurisdiction();

  // 記錄同意到審計日誌
  const recordConsent = async () => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      // 獲取用戶信息
      const userIp = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => 'unknown');

      // 記錄到 Supabase
      const { error } = await supabase
        .from('consent_audit_log')
        .insert({
          user_id: user?.id || null,
          consent_type: 'platform_disclaimer',
          ip_address: userIp,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          timestamp: new Date().toISOString(),
          jurisdiction: jurisdiction,
          terms_version: 'v1.0_2026-03-01',
          step_1_platform_disclaimer: step >= 1,
          step_2_buyer_warning: step >= 2,
          step_3_final_confirmation: step >= 3,
        });

      if (error) {
        console.error('Error recording consent:', error);
        setError('Failed to record consent. Please try again.');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!accepted) {
      setError(t('error_must_accept'));
      return;
    }

    const success = await recordConsent();
    if (success) {
      // 設置 localStorage 標記用戶已同意
      localStorage.setItem('michi_terms_accepted', 'true');
      localStorage.setItem('michi_terms_accepted_date', new Date().toISOString());
      localStorage.setItem('michi_jurisdiction', jurisdiction);

      onAccepted?.();
      // 關閉模態框或重定向
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* 標題 */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-2">
            {step === 1 && t('step1_title')}
            {step === 2 && t('step2_title')}
            {step === 3 && t('step3_title')}
          </h1>
          <p className="text-blue-100 text-sm">
            {t('step_progress', { current: step, total: 3 })}
          </p>
        </div>

        {/* 內容區域 */}
        <div className="p-6 md:p-8">
          {/* 第一步：平台免責聲明 */}
          {step === 1 && (
            <StepOnePlatformDisclaimer
              jurisdiction={jurisdiction}
              t={t}
            />
          )}

          {/* 第二步：買手風險警告 */}
          {step === 2 && (
            <StepTwoBuyerWarning
              jurisdiction={jurisdiction}
              t={t}
            />
          )}

          {/* 第三步：最終確認 */}
          {step === 3 && (
            <StepThreeFinalConfirmation
              jurisdiction={jurisdiction}
              t={t}
              accepted={accepted}
              setAccepted={setAccepted}
              error={error}
            />
          )}
        </div>

        {/* 操作按鈕 */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-between gap-4">
          <button
            onClick={() => {
              if (step > 1) setStep((step - 1) as 1 | 2 | 3);
            }}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {t('button_previous')}
          </button>

          <button
            onClick={() => {
              if (step < 3) {
                setStep((step + 1) as 1 | 2 | 3);
              } else {
                handleAccept();
              }
            }}
            disabled={step === 3 && !accepted || isLoading}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('button_processing')}
              </span>
            ) : step < 3 ? (
              t('button_next')
            ) : (
              t('button_accept')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * 第一步：平台免責聲明
 */
interface StepProps {
  jurisdiction: 'US' | 'HK' | 'JP' | 'OTHER';
  t: any;
}

const StepOnePlatformDisclaimer: React.FC<StepProps> = ({ jurisdiction, t }) => {
  return (
    <div className="space-y-6">
      {/* 警告框 */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <h2 className="text-lg font-bold text-red-900 mb-4">
          ⚠️ {t('disclaimer_title')}
        </h2>

        <ul className="space-y-3 text-sm text-red-900">
          <li className="flex gap-3">
            <span className="text-red-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>{t('disclaimer_point1_title')}</strong>
              <br />
              {t('disclaimer_point1_desc')}
            </span>
          </li>

          <li className="flex gap-3">
            <span className="text-red-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>{t('disclaimer_point2_title')}</strong>
              <br />
              {t('disclaimer_point2_desc')}
            </span>
          </li>

          <li className="flex gap-3">
            <span className="text-red-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>{t('disclaimer_point3_title')}</strong>
              <br />
              {t('disclaimer_point3_desc')}
            </span>
          </li>

          <li className="flex gap-3">
            <span className="text-red-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>{t('disclaimer_point4_title')}</strong>
              <br />
              {t('disclaimer_point4_desc')}
            </span>
          </li>

          <li className="flex gap-3">
            <span className="text-red-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>{t('disclaimer_point5_title')}</strong>
              <br />
              {t('disclaimer_point5_desc')}
            </span>
          </li>
        </ul>
      </div>

      {/* 司法管轄區特定條款 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h3 className="font-bold text-yellow-900 mb-2">
          {t('jurisdiction_specific_title')}
        </h3>
        <p className="text-sm text-yellow-800">
          {jurisdiction === 'US' && t('jurisdiction_us')}
          {jurisdiction === 'HK' && t('jurisdiction_hk')}
          {jurisdiction === 'JP' && t('jurisdiction_jp')}
          {jurisdiction === 'OTHER' && t('jurisdiction_other')}
        </p>
      </div>

      {/* 完整條款連結 */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-sm text-gray-700">
          {t('full_terms_intro')}{' '}
          <a
            href="/legal/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            {t('full_terms_link')}
          </a>
        </p>
      </div>
    </div>
  );
};

/**
 * 第二步：買手風險警告
 */
const StepTwoBuyerWarning: React.FC<StepProps> = ({ jurisdiction, t }) => {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-6">
        <h2 className="text-lg font-bold text-orange-900 mb-4">
          ⚠️ {t('buyer_warning_title')}
        </h2>

        <div className="space-y-4 text-sm text-orange-900">
          <div>
            <h3 className="font-bold mb-1">1. {t('buyer_warning_1_title')}</h3>
            <p>{t('buyer_warning_1_desc')}</p>
          </div>

          <div>
            <h3 className="font-bold mb-1">2. {t('buyer_warning_2_title')}</h3>
            <p>{t('buyer_warning_2_desc')}</p>
          </div>

          <div>
            <h3 className="font-bold mb-1">3. {t('buyer_warning_3_title')}</h3>
            <p>{t('buyer_warning_3_desc')}</p>
          </div>

          <div>
            <h3 className="font-bold mb-1">4. {t('buyer_warning_4_title')}</h3>
            <p className="mb-2">{t('buyer_warning_4_desc')}</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>{t('buyer_warning_4_option1')}</li>
              <li>{t('buyer_warning_4_option2')}</li>
              <li>{t('buyer_warning_4_option3')}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-1">5. {t('buyer_warning_5_title')}</h3>
            <p className="mb-2">{t('buyer_warning_5_desc')}</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>{t('buyer_warning_5_option1')}</li>
              <li>{t('buyer_warning_5_option2')}</li>
              <li>{t('buyer_warning_5_option3')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 支付安全建議 */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <h3 className="font-bold text-green-900 mb-2">{t('payment_safety_title')}</h3>
        <p className="text-sm text-green-800">
          {t('payment_safety_desc')}
        </p>
      </div>
    </div>
  );
};

/**
 * 第三步：最終確認和複選框
 */
interface StepThreeProps extends StepProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  error: string | null;
}

const StepThreeFinalConfirmation: React.FC<StepThreeProps> = ({
  jurisdiction,
  t,
  accepted,
  setAccepted,
  error,
}) => {
  return (
    <div className="space-y-6">
      {/* 摘要 */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-bold text-blue-900 mb-3">{t('confirmation_summary_title')}</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex gap-2">
            <span className="text-blue-600">✓</span>
            {t('confirmation_summary_1')}
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">✓</span>
            {t('confirmation_summary_2')}
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">✓</span>
            {t('confirmation_summary_3')}
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">✓</span>
            {t('confirmation_summary_4')}
          </li>
        </ul>
      </div>

      {/* 複選框 - 必須勾選 */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 cursor-pointer"
            required
          />
          <span className="text-sm">
            <strong className="text-red-900">{t('final_confirm_strong')}</strong>
            <ul className="mt-2 ml-4 space-y-1 text-red-900 list-disc text-xs">
              <li>{t('final_confirm_point1')}</li>
              <li>{t('final_confirm_point2')}</li>
              <li>{t('final_confirm_point3')}</li>
              <li>{t('final_confirm_point4')}</li>
              <li>{t('final_confirm_point5')}</li>
            </ul>
          </span>
        </label>
      </div>

      {/* 錯誤信息 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* 最後的警告 */}
      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
        <p>
          {t('final_timestamp_label')}:{' '}
          <strong>{new Date().toLocaleString()}</strong>
        </p>
        <p className="mt-2">
          {t('final_audit_notice')}
        </p>
      </div>
    </div>
  );
};

export default ServiceTermsModal;