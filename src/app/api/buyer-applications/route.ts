/**
 * /api/buyer-applications/route.ts
 *
 * POST → 買手提交申請（公開）
 * GET  → Admin 查看申請列表（需要 admin key）
 * PATCH → Admin 審批（approve / reject）
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ═══════════════════════════════════════════════════════════
// POST — 公開: 買手提交申請
// ═══════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['name', 'email', 'location', 'specialty'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase
      .from('buyer_applications')
      .insert({
        name: body.name,
        name_jp: body.name_jp || null,
        email: body.email,
        phone: body.phone || null,
        location: body.location,
        specialty: body.specialty,
        categories: body.categories || [],
        languages: body.languages || [],
        experience_years: body.experience_years || 0,
        bio: body.bio || null,
        portfolio_url: body.portfolio_url || null,

        // Services
        service_livestream: body.service_livestream || false,
        service_photo: body.service_photo || false,
        service_queueing: body.service_queueing || false,
        service_shipping: body.service_shipping || false,
        livestream_rate: body.livestream_rate || null,
        photo_rate: body.photo_rate || null,
        queue_rate: body.queue_rate || null,
        shipping_note: body.shipping_note || null,

        // Pricing
        commission_rate: body.commission_rate || 10,
        min_order_amount: body.min_order_amount || null,
        payment_methods: body.payment_methods || [],
        payment_terms: body.payment_terms || 'deposit',
        deposit_rate: body.deposit_rate || '50%',

        // Premium
        is_premium_application: body.is_premium || false,
        premium_monthly_fee: body.is_premium ? '¥29,800' : null,

        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[apply] Supabase error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      application_id: data.id,
      message: 'Application submitted successfully',
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// GET — Admin: 查看申請列表
// ═══════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const status = new URL(request.url).searchParams.get('status') || 'pending';

  const { data, error } = await supabase
    .from('buyer_applications')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, applications: data });
}

// ═══════════════════════════════════════════════════════════
// PATCH — Admin: 審批申請 (approve → 自動建立 buyer 記錄)
// ═══════════════════════════════════════════════════════════
export async function PATCH(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, action, admin_notes } = await request.json();

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Update application status
    const { data: app, error: updateError } = await supabase
      .from('buyer_applications')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        admin_notes: admin_notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    // If approved → create a buyer record
    if (action === 'approve' && app) {
      const { error: buyerError } = await supabase.from('buyers').insert({
        name: app.name,
        name_jp: app.name_jp,
        bio: app.bio,
        base_location: app.location,
        categories: app.categories,
        languages: app.languages,
        commission_rate: app.commission_rate,
        experience_years: app.experience_years,
        specialty: app.specialty,
        portfolio_url: app.portfolio_url,

        service_livestream: app.service_livestream,
        service_photo: app.service_photo,
        service_queueing: app.service_queueing,
        service_shipping: app.service_shipping,
        livestream_rate: app.livestream_rate,
        photo_rate: app.photo_rate,
        queue_rate: app.queue_rate,
        shipping_note: app.shipping_note,

        min_order_amount: app.min_order_amount,
        payment_terms: app.payment_terms,
        deposit_rate: app.deposit_rate,
        payment_methods: { methods: app.payment_methods },

        is_premium: app.is_premium_application || false,
        premium_since: app.is_premium_application ? new Date().toISOString() : null,

        verified: true,
        verification_date: new Date().toISOString(),
        rating: 0,
        total_reviews: 0,
        completed_orders: 0,
        response_time_hours: 24,
      });

      if (buyerError) {
        console.error('[approve] Failed to create buyer:', buyerError);
        return NextResponse.json({
          success: true,
          warning: 'Application approved but buyer creation failed: ' + buyerError.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      status: action === 'approve' ? 'approved' : 'rejected',
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}