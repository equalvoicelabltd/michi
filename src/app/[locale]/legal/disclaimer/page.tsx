'use client';

import React from 'react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-red-900 mb-4">
            ⚠️ DISCLAIMER - 重要免責聲明
          </h1>
          <p className="text-red-900 mb-4 font-semibold">
            Michi 是一個純信息中介平台。我們不參與任何交易、不處理支付、不驗證商品品質，對任何交易爭議不承擔責任。
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. 平台性質</h2>
            <p className="text-gray-700">
              Michi 是一個信息媒介，連接買家與日本代購買手。我們提供聯繫信息和驗證，但不參與實際交易。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. 無保證</h2>
            <p className="text-gray-700 mb-3">
              Michi 明確聲明：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>不保證買手的誠實性、可靠性或服務品質</li>
              <li>不保證商品的真實性、品質或合法性</li>
              <li>不保證發貨、交付或退款</li>
              <li>不保證交易的安全性或成功</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. 用戶責任</h2>
            <p className="text-gray-700">
              通過使用 Michi，您同意：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>您獨自承擔所有交易風險</li>
              <li>您獨自進行盡職調查（驗證買手身份、研究聲譽等）</li>
              <li>您獨自負責支付和資金安全</li>
              <li>您不能追究 Michi 對任何問題的責任</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. 責任限制</h2>
            <p className="text-gray-700">
              Michi 及其所有人、員工、代理人對以下情況不承擔責任：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>買手欺詐或不發貨</li>
              <li>商品品質問題或假冒商品</li>
              <li>未發貨或運輸遺失</li>
              <li>支付遺失或被盜</li>
              <li>海關沒收</li>
              <li>任何財務損失或傷害</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. 爭議解決</h2>
            <p className="text-gray-700">
              Michi 不調解或解決買家-買手之間的爭議。您必須：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>直接與買手溝通</li>
              <li>向支付提供商（PayPal、銀行、信用卡公司）要求退款</li>
              <li>向當地執法機構報告欺詐</li>
            </ul>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h2 className="text-2xl font-bold text-yellow-900 mb-3">⚠️ 法律聲明</h2>
            <p className="text-yellow-900">
              本免責聲明對所有用戶具有法律約束力。通過訪問或使用 Michi，您表示同意本免責聲明中的所有條款。如果您不同意，請不要使用本平台。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}