'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@supabase/supabase-js';
import { recordConsent } from '@/lib/legal/audit-logger';

interface ServiceTermsModalProps {
  onAccepted?: () => void;
  isOpen?: boolean;
}

export const ServiceTermsModal: React.FC<ServiceTermsModalProps> = ({
  onAccepted,
  isOpen = true,
}) => {
  const t = useTranslations('legal');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getJurisdiction = (): 'US' | 'HK' | 'JP' | 'OTHER' => {
    if (typeof window === 'undefined') return 'US';
    const pathname = window.location.pathname;
    const locale = pathname.split('/')[1];
    switch (locale) {
      case 'zh': return 'HK';
      case 'zh-CN': return 'OTHER';
      case 'ja': return 'JP';
      default: return 'US';
    }
  };

  const jurisdiction = getJurisdiction();

  useEffect(() => {
    setMounted(true);
  }, []);

  const recordConsentAudit = async () => {
    try {
      setIsLoading(true);
      let userIp = 'unknown';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          userIp = ipData.ip;
        }
      } catch (err) {
        console.warn('Could not fetch IP:', err);
      }

      const result = await recordConsent({
        anonymousUserId: `anon_${Date.now()}`,
        consentType: 'final_confirmation',
        ipAddress: userIp,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        jurisdiction: jurisdiction,
        termsVersion: 'v1.0_2026-03-01',
        step1Complete: step >= 1,
        step2Complete: step >= 2,
        step3Complete: step >= 3,
      });

      if (!result.success) {
        console.error('Error recording consent:', result.error);
        setError(t('error_consent_failed'));
        return false;
      }

      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(t('error_unexpected'));
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

    const success = await recordConsentAudit();
    if (success) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('michi_terms_accepted', 'true');
        localStorage.setItem('michi_terms_accepted_date', new Date().toISOString());
        localStorage.setItem('michi_jurisdiction', jurisdiction);
        window.location.reload();
      }
      onAccepted?.();
    }
  };

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-2">
            {step === 1 && t('step1_title')}
            {step === 2 && t('step2_title')}
            {step === 3 && t('step3_title')}
          </h1>
          <p className="text-blue-100 text-sm">{t('step_progress', { current: step, total: 3 })}</p>
        </div>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                <h2 className="text-lg font-bold text-red-900 mb-4">⚠️ {t('disclaimer_title')}</h2>
                <ul className="space-y-3 text-sm text-red-900">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>
                        <strong>{t(`disclaimer_point${i}_title`)}</strong>
                        <br />
                        {t(`disclaimer_point${i}_desc`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-6">
                <h2 className="text-lg font-bold text-orange-900 mb-4">⚠️ {t('buyer_warning_title')}</h2>
                <div className="space-y-4 text-sm text-orange-900">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <h3 className="font-bold mb-1">{i}. {t(`buyer_warning_${i}_title`)}</h3>
                      <p>{t(`buyer_warning_${i}_desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-3">{t('confirmation_summary_title')}</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-600">✓</span>
                      {t(`confirmation_summary_${i}`)}
                    </li>
                  ))}
                </ul>
              </div>

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
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i}>{t(`final_confirm_point${i}`)}</li>
                      ))}
                    </ul>
                  </span>
                </label>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

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
            disabled={(step === 3 && !accepted) || isLoading}
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

export default ServiceTermsModal;