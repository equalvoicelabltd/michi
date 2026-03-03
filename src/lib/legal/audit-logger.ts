/**
 * src/lib/legal/audit-logger.ts
 *
 * Michi 審計日誌系統
 * 記錄所有用戶同意、交易和爭議，用於法律防守
 *
 * 核心原則：
 * 1. 記錄用戶知情同意（consent_audit_log）
 * 2. 記錄交易（transaction_audit_log - 無支付字段）
 * 3. 記錄爭議處理（dispute_log）
 * 4. 記錄賣家行為（seller_verification_audit）
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * 記錄用戶同意
 * 用於法律防守：證明用戶知道風險並同意
 */
export async function recordConsent(params: {
  userId?: string;
  anonymousUserId?: string;
  consentType: 'platform_disclaimer' | 'buyer_warning' | 'final_confirmation';
  ipAddress: string;
  userAgent: string;
  jurisdiction: 'US' | 'HK' | 'JP' | 'OTHER';
  termsVersion: string;
  step1Complete?: boolean;
  step2Complete?: boolean;
  step3Complete?: boolean;
  termsHash?: string; // SHA256 hash of accepted terms
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('consent_audit_log')
      .insert({
        user_id: params.userId || null,
        anonymous_user_id: params.anonymousUserId || null,
        consent_type: params.consentType,
        ip_address: params.ipAddress,
        user_agent: params.userAgent,
        browser_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        jurisdiction: params.jurisdiction,
        terms_version: params.termsVersion,
        step_1_platform_disclaimer: params.step1Complete ?? false,
        step_2_buyer_warning: params.step2Complete ?? false,
        step_3_final_confirmation: params.step3Complete ?? false,
        terms_hash: params.termsHash,
        timestamp: new Date().toISOString(),
      });

    if (error) {
      console.error('[AuditLogger] Failed to record consent:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Consent recorded successfully');
    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in recordConsent:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 記錄交易（Michi 無支付參與的證據）
 * 關鍵：此表無「支付」或「退款」字段
 * 用於法庭上證明 Michi 不是銷售者
 */
export async function logTransaction(params: {
  buyerId: string;
  sellerId: string;
  productDescription: string;
  productPriceJpy: number;
  michiPlatformFee?: number;
  totalPriceHkd: number;
  inquiryTime: Date;
  contactInitiatedTime: Date;
  michiInvolved?: 'none' | 'referred_only' | 'other';
  michiActionNotes?: string;
}): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('transaction_audit_log')
      .insert({
        buyer_id: params.buyerId,
        seller_id: params.sellerId,
        product_description: params.productDescription,
        product_price_jpy: params.productPriceJpy,
        michi_platform_fee: params.michiPlatformFee || 0,
        total_price_hkd: params.totalPriceHkd,
        inquiry_time: params.inquiryTime.toISOString(),
        contact_initiated: params.contactInitiatedTime.toISOString(),
        michi_involved: params.michiInvolved || 'none',
        michi_action_notes: params.michiActionNotes,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[AuditLogger] Failed to log transaction:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Transaction logged:', data.id);
    return { success: true, transactionId: data.id };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in logTransaction:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 記錄爭議
 * 用於證明 Michi 的標準回應和非干預
 */
export async function logDispute(params: {
  transactionId: string;
  buyerId: string;
  sellerId?: string;
  disputeReason:
    | 'non_delivery'
    | 'fraud'
    | 'quality_issue'
    | 'communication_issue';
  disputeDescription: string;
  disputeAmount?: number;
  evidenceProvided?: string;
}): Promise<{ success: boolean; disputeId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('dispute_log')
      .insert({
        transaction_id: params.transactionId,
        buyer_id: params.buyerId,
        seller_id: params.sellerId,
        dispute_reason: params.disputeReason,
        dispute_description: params.disputeDescription,
        dispute_amount: params.disputeAmount,
        evidence_provided: params.evidenceProvided,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[AuditLogger] Failed to log dispute:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Dispute logged:', data.id);
    return { success: true, disputeId: data.id };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in logDispute:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 記錄 Michi 對爭議的標準回應
 * 關鍵：使用預設模板，證明 Michi 沒有個案干預
 */
export async function recordDisputeResponse(params: {
  disputeId: string;
  responseTemplate:
    | 'standard_non_intervention'
    | 'chargeback_guidance'
    | 'seller_contact';
  responseText?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // 預設模板
    const templates: Record<string, string> = {
      standard_non_intervention: `感謝您的通知。根據 Michi 服務條款，我們是純媒介平台，不參與交易。\n\n建議步驟：\n1. 直接聯繫買手\n2. 若無回應，向支付平台要求退款（信用卡/PayPal）\n3. 若涉及欺詐，向當地執法機構舉報\n\nMichi 無法提供退款或強制買手行動。`,
      chargeback_guidance: `感謝您的通知。您可以通過支付平台爭議功能獲得幫助：\n\nPayPal: 提出「商品未收到」或「描述不符」案例\n信用卡：向銀行申請退款\n銀行轉帳：向銀行舉報欺詐\n\nMichi 無法參與此過程。`,
      seller_contact: `感謝您的通知。您可以：\n\n1. 通過原始聯繫方式聯繫買手\n2. 要求發貨證明\n3. 若買手無回應，進行退款\n\nMichi 提供的聯繫方式：[買手信息]`,
    };

    const response = params.responseText || templates[params.responseTemplate];

    const { error } = await supabase
      .from('dispute_log')
      .update({
        michi_response_date: new Date().toISOString(),
        michi_response: response,
        michi_response_template_used: params.responseTemplate,
        status: 'acknowledged',
      })
      .eq('id', params.disputeId);

    if (error) {
      console.error('[AuditLogger] Failed to record dispute response:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Dispute response recorded');
    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in recordDisputeResponse:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 更新交易爭議狀態
 * 用於追蹤爭議解決方式
 */
export async function updateTransactionDisputeStatus(params: {
  transactionId: string;
  disputeFiled: boolean;
  disputeReason?: string;
  resolution?: 'buyer_seller_direct' | 'chargeback' | 'police_report' | 'unresolved';
  resolutionDate?: Date;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('transaction_audit_log')
      .update({
        dispute_filed: params.disputeFiled,
        dispute_filed_date: params.disputeFiled ? new Date().toISOString() : null,
        dispute_reason: params.disputeReason,
        resolution_method: params.resolution,
        resolution_date: params.resolutionDate?.toISOString(),
        status: params.resolution === 'unresolved' ? 'unresolved' : 'resolved',
      })
      .eq('id', params.transactionId);

    if (error) {
      console.error('[AuditLogger] Failed to update transaction status:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Transaction dispute status updated');
    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in updateTransactionDisputeStatus:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 記錄賣家驗證和投訴
 * 用於證明 Michi 對賣家進行了監督
 */
export async function recordSellerComplaint(params: {
  sellerId: string;
  complaintType:
    | 'fraud'
    | 'non_delivery'
    | 'quality'
    | 'communication';
  complaintDescription: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // 首先獲取當前計數
    const { data: currentData } = await supabase
      .from('seller_verification_audit')
      .select('complaints_received, fraud_complaints, non_delivery_complaints, quality_complaints, communication_complaints')
      .eq('seller_id', params.sellerId)
      .single();

    const updates: Record<string, any> = {
      complaints_received: (currentData?.complaints_received || 0) + 1,
    };

    // 更新特定投訴計數
    switch (params.complaintType) {
      case 'fraud':
        updates.fraud_complaints = (currentData?.fraud_complaints || 0) + 1;
        break;
      case 'non_delivery':
        updates.non_delivery_complaints = (currentData?.non_delivery_complaints || 0) + 1;
        break;
      case 'quality':
        updates.quality_complaints = (currentData?.quality_complaints || 0) + 1;
        break;
      case 'communication':
        updates.communication_complaints = (currentData?.communication_complaints || 0) + 1;
        break;
    }

    // 如果投訴過多，自動發警告
    if (updates.complaints_received >= 3 && !currentData?.warning_issued) {
      updates.warning_issued = true;
      updates.warning_issue_date = new Date().toISOString();
      updates.warning_reason = `已收到 ${updates.complaints_received} 個投訴。`;
    }

    // 如果投訴更多，自動暫停
    if (updates.complaints_received >= 10 && !currentData?.account_suspended) {
      updates.account_suspended = true;
      updates.suspension_date = new Date().toISOString();
      updates.suspension_reason = `因多個投訴（共 ${updates.complaints_received} 個）而暫停認證。`;
    }

    const { error } = await supabase
      .from('seller_verification_audit')
      .update(updates)
      .eq('seller_id', params.sellerId);

    if (error) {
      console.error('[AuditLogger] Failed to record seller complaint:', error);
      return { success: false, error: error.message };
    }

    console.log('[AuditLogger] Seller complaint recorded and audit updated');
    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in recordSellerComplaint:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * 獲取賣家的投訴摘要
 * 用於審視賣家是否應被警告或暫停
 */
export async function getSellerComplaintSummary(sellerId: string) {
  try {
    const { data, error } = await supabase
      .from('seller_verification_audit')
      .select(
        'complaints_received, fraud_complaints, non_delivery_complaints, quality_complaints, communication_complaints, warning_issued, account_suspended'
      )
      .eq('seller_id', sellerId)
      .single();

    if (error) {
      console.error('[AuditLogger] Failed to get seller summary:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in getSellerComplaintSummary:', err);
    return null;
  }
}

/**
 * 系統日誌（Admin 可查看）
 * 用於內部審計和合規性檢查
 */
export async function logSystemAction(params: {
  logType: string;
  action: string;
  triggeredBy: 'user_action' | 'automated_system' | 'admin_action';
  triggeredById?: string;
  userId?: string;
  sellerId?: string;
  transactionId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('michi_system_logs')
      .insert({
        log_type: params.logType,
        action: params.action,
        triggered_by: params.triggeredBy,
        triggered_by_id: params.triggeredById,
        user_id: params.userId,
        seller_id: params.sellerId,
        transaction_id: params.transactionId,
        details: params.details || {},
        ip_address: params.ipAddress,
      });

    if (error) {
      console.error('[AuditLogger] Failed to log system action:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error in logSystemAction:', err);
    return { success: false, error: String(err) };
  }
}