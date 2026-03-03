/**
 * src/app/[locale]/disputes/page.tsx
 *
 * Michi 爭議報告頁面
 *
 * 功能：
 * - 用戶報告爭議（買手不發貨、欺詐等）
 * - 展示 Michi 的標準立場（無法干預）
 * - 指導用戶如何自行解決（Chargeback、警察報告）
 * - 記錄爭議到審計日誌
 * - 显示常見問題和解決方案
 */

'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@supabase/supabase-js';
import { logDispute, recordDisputeResponse } from '@/lib/legal/audit-logger';

interface DisputeFormData {
  sellerName: string;
  transactionDate: string;
  productDescription: string;
  disputeReason: 'non_delivery' | 'fraud' | 'quality_issue' | 'communication_issue';
  disputeDescription: string;
  evidenceProvided: string;
  amountInvolved: number;
  paymentMethod: string;
}

export default function DisputesPage() {
  const t = useTranslations('disputes');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [formData, setFormData] = useState<DisputeFormData>({
    sellerName: '',
    transactionDate: '',
    productDescription: '',
    disputeReason: 'non_delivery',
    disputeDescription: '',
    evidenceProvided: '',
    amountInvolved: 0,
    paymentMethod: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'report' | 'faq' | 'solutions'>('report');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amountInvolved' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError(t('error_must_login'));
        setIsLoading(false);
        return;
      }

      // 記錄爭議到審計日誌
      const result = await logDispute({
        transactionId: 'temp_' + Date.now(), // 實際應該有真實交易 ID
        buyerId: user.id,
        disputeReason: formData.disputeReason,
        disputeDescription: formData.disputeDescription,
        disputeAmount: formData.amountInvolved,
        evidenceProvided: formData.evidenceProvided,
      });

      if (!result.success) {
        setError(t('error_failed_to_submit'));
        setIsLoading(false);
        return;
      }

      // 自動回應
      await recordDisputeResponse({
        disputeId: result.disputeId!,
        responseTemplate: 'standard_non_intervention',
      });

      setSubmitted(true);
      setFormData({
        sellerName: '',
        transactionDate: '',
        productDescription: '',
        disputeReason: 'non_delivery',
        disputeDescription: '',
        evidenceProvided: '',
        amountInvolved: 0,
        paymentMethod: '',
      });
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('page_title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('page_subtitle')}
          </p>
        </div>

        {/* 警告框 */}
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-red-900 mb-3">
            ⚠️ {t('critical_notice_title')}
          </h2>
          <p className="text-red-900 mb-3">
            {t('critical_notice_desc')}
          </p>
          <ul className="space-y-2 text-sm text-red-800 list-disc list-inside">
            <li>{t('critical_point_1')}</li>
            <li>{t('critical_point_2')}</li>
            <li>{t('critical_point_3')}</li>
          </ul>
        </div>

        {/* 標籤 */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('report')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'report'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('tab_report_dispute')}
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'solutions'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('tab_solutions')}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'faq'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('tab_faq')}
          </button>
        </div>

        {/* 報告爭議 */}
        {activeTab === 'report' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('submitted_success_title')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('submitted_success_message')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                  {t('button_submit_another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 基本信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {t('section_basic_info')}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('field_seller_name')} *
                      </label>
                      <input
                        type="text"
                        name="sellerName"
                        value={formData.sellerName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder={t('placeholder_seller_name')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('field_transaction_date')} *
                      </label>
                      <input
                        type="date"
                        name="transactionDate"
                        value={formData.transactionDate}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('field_product_description')} *
                    </label>
                    <input
                      type="text"
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder={t('placeholder_product')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('field_amount')} *
                      </label>
                      <input
                        type="number"
                        name="amountInvolved"
                        value={formData.amountInvolved}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('field_payment_method')} *
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="">{t('select_payment_method')}</option>
                        <option value="paypal">PayPal</option>
                        <option value="credit_card">{t('option_credit_card')}</option>
                        <option value="bank_transfer">{t('option_bank_transfer')}</option>
                        <option value="other">{t('option_other')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 爭議詳情 */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    {t('section_dispute_details')}
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('field_dispute_reason')} *
                    </label>
                    <select
                      name="disputeReason"
                      value={formData.disputeReason}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="non_delivery">{t('reason_non_delivery')}</option>
                      <option value="fraud">{t('reason_fraud')}</option>
                      <option value="quality_issue">{t('reason_quality')}</option>
                      <option value="communication_issue">{t('reason_communication')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('field_dispute_description')} *
                    </label>
                    <textarea
                      name="disputeDescription"
                      value={formData.disputeDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder={t('placeholder_dispute_description')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('field_evidence')}
                    </label>
                    <textarea
                      name="evidenceProvided"
                      value={formData.evidenceProvided}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder={t('placeholder_evidence')}
                    />
                  </div>
                </div>

                {/* 錯誤提示 */}
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* 提交按鈕 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition disabled:cursor-not-allowed"
                >
                  {isLoading ? t('button_submitting') : t('button_submit_dispute')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* 解決方案 */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <SolutionCard
              title={t('solution_paypal_title')}
              description={t('solution_paypal_desc')}
              steps={[
                t('solution_paypal_step1'),
                t('solution_paypal_step2'),
                t('solution_paypal_step3'),
                t('solution_paypal_step4'),
              ]}
            />

            <SolutionCard
              title={t('solution_credit_card_title')}
              description={t('solution_credit_card_desc')}
              steps={[
                t('solution_credit_card_step1'),
                t('solution_credit_card_step2'),
                t('solution_credit_card_step3'),
              ]}
            />

            <SolutionCard
              title={t('solution_police_title')}
              description={t('solution_police_desc')}
              steps={[
                t('solution_police_step1'),
                t('solution_police_step2'),
                t('solution_police_step3'),
              ]}
            />
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <FAQItem
              question={t('faq_1_question')}
              answer={t('faq_1_answer')}
            />
            <FAQItem
              question={t('faq_2_question')}
              answer={t('faq_2_answer')}
            />
            <FAQItem
              question={t('faq_3_question')}
              answer={t('faq_3_answer')}
            />
            <FAQItem
              question={t('faq_4_question')}
              answer={t('faq_4_answer')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 解決方案卡片組件
 */
function SolutionCard({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ol className="space-y-2 list-decimal list-inside text-gray-700">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

/**
 * FAQ 項目組件
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center font-semibold text-gray-900 hover:text-pink-600 transition"
      >
        {question}
        <span className={`transition transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <p className="mt-3 text-gray-600 text-sm">{answer}</p>
      )}
    </div>
  );
}