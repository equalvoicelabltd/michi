/**
 * /api/apply/route.ts
 * 儲存買手申請（含附加服務欄位）到 Supabase
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { error } = await supabase.from('buyer_applications').insert({
      // 基本資料
      name:             body.name,
      name_jp:          body.nameJp || null,
      email:            body.email,
      whatsapp:         body.whatsapp || null,
      wechat:           body.wechat || null,
      line:             body.line || null,
      // 在日資訊
      city:             body.city === '其他' ? body.cityOther : body.city,
      residency:        body.residency,
      // 專長
      specialties:      body.specialties,
      other_specialty:  body.otherSpecialty || null,
      languages:        body.languages,
      // 附加服務
      offers_livestream:    body.offersLivestream,
      livestream_rate:      body.offersLivestream ? body.livestreamRate : null,
      livestream_unit:      body.offersLivestream ? body.livestreamUnit : null,
      offers_photo_video:   body.offersPhotoVideo,
      photo_video_rate:     body.offersPhotoVideo ? body.photoVideoRate : null,
      offers_queueing:      body.offersQueueing,
      queueing_rate:        body.offersQueueing ? body.queueingRate : null,
      queueing_unit:        body.offersQueueing ? body.queueingUnit : null,
      offers_shipping:      body.offersShipping,
      shipping_methods:     body.offersShipping ? body.shippingMethods : [],
      // 付款
      payment_terms:        body.paymentTerms,
      deposit_rate:         body.paymentTerms === 'deposit' ? body.depositRate : null,
      // 服務詳情
      commission:       body.commission,
      min_order:        body.minOrder ? parseInt(body.minOrder) : null,
      response_time:    body.responseTime,
      // 自我介紹
      bio:              body.bio,
      experience:       body.experience,
      highlight:        body.highlight || null,
      // 狀態
      status:           'pending',
      submitted_at:     new Date().toISOString(),
    });

    if (error) {
      console.error('[apply] Supabase error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}