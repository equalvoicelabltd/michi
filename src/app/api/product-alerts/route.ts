/**
 * /api/product-alerts/route.ts
 *
 * POST   → 登記商品提醒（公開）
 * DELETE → 退訂
 * GET    → verify email / trigger notifications (admin)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// ═══════════════════════════════════════════════════════════
// POST — 登記商品提醒
// ═══════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const categories = body.categories || [];
    if (categories.length === 0) {
      return NextResponse.json({ success: false, error: 'Select at least one category' }, { status: 400 });
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('product_alerts')
      .select('id, active, verified')
      .eq('email', body.email)
      .single();

    if (existing) {
      // Update existing subscription
      const { error } = await supabase
        .from('product_alerts')
        .update({
          categories,
          name: body.name || null,
          frequency: body.frequency || 'daily',
          locale: body.locale || 'zh',
          active: true,
        })
        .eq('id', existing.id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription updated',
        already_verified: existing.verified,
      });
    }

    // New subscription
    const verifyToken = generateToken();
    const unsubToken = generateToken();

    const { data, error } = await supabase
      .from('product_alerts')
      .insert({
        email: body.email,
        name: body.name || null,
        categories,
        frequency: body.frequency || 'daily',
        locale: body.locale || 'zh',
        verified: false,
        verify_token: verifyToken,
        unsubscribe_token: unsubToken,
        active: true,
      })
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // TODO: Send verification email via Resend/SendGrid
    // For now, auto-verify
    await supabase
      .from('product_alerts')
      .update({ verified: true })
      .eq('id', data.id);

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
      id: data.id,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// DELETE — 退訂
// ═══════════════════════════════════════════════════════════
export async function DELETE(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    const query = supabase
      .from('product_alerts')
      .update({ active: false })
      .eq('email', email);

    // If token provided, verify it matches
    if (token) {
      query.eq('unsubscribe_token', token);
    }

    const { error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Unsubscribed' });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// GET — verify email or trigger notifications (admin)
// ═══════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  // Email verification
  if (action === 'verify') {
    const token = url.searchParams.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const { error } = await supabase
      .from('product_alerts')
      .update({ verified: true })
      .eq('verify_token', token);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email verified' });
  }

  // Admin: get subscriber count
  if (action === 'stats') {
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { count: total } = await supabase
      .from('product_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    const { count: verified } = await supabase
      .from('product_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)
      .eq('verified', true);

    return NextResponse.json({ success: true, total, verified });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}