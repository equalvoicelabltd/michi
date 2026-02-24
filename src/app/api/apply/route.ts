/**
 * /api/apply/route.ts
 * 儲存買手申請到 Supabase buyer_applications 表
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
      name: body.name,
      name_jp: body.nameJp || null,
      email: body.email,
      whatsapp: body.whatsapp || null,
      wechat: body.wechat || null,
      line: body.line || null,
      city: body.city === '其他' ? body.cityOther : body.city,
      residency: body.residency,
      specialties: body.specialties,
      other_specialty: body.otherSpecialty || null,
      languages: body.languages,
      commission: body.commission,
      min_order: body.minOrder ? parseInt(body.minOrder) : null,
      response_time: body.responseTime,
      bio: body.bio,
      experience: body.experience,
      highlight: body.highlight || null,
      status: 'pending',
      submitted_at: new Date().toISOString(),
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