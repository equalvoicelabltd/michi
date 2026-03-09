/**
 * src/app/api/membership/route.ts
 *
 * POST   → 註冊免費會員（90日試用）
 * GET    → 檢查會員狀態
 * PATCH  → Stripe checkout 成功後更新
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TRIAL_DAYS = 90;

// ═══════════════════════════════════════════════════════════
// POST — 註冊免費試用會員
// ═══════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Check existing
    const { data: existing } = await supabase
      .from('buyer_memberships')
      .select('id, status, plan, trial_end')
      .eq('email', email)
      .single();

    if (existing) {
      const isTrialActive = existing.status === 'trial' && new Date(existing.trial_end) > new Date();
      const isActive = existing.status === 'active';
      return NextResponse.json({
        success: true,
        membership: {
          ...existing,
          is_active: isTrialActive || isActive,
          message: 'Already registered',
        },
      });
    }

    // Create new trial membership
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);

    const { data, error } = await supabase
      .from('buyer_memberships')
      .insert({
        email,
        name: name || null,
        plan: 'free',
        status: 'trial',
        trial_start: new Date().toISOString(),
        trial_end: trialEnd.toISOString(),
      })
      .select('id, email, status, plan, trial_end')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      membership: { ...data, is_active: true },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// GET — 檢查會員狀態
// ═══════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  const email = new URL(request.url).searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const { data, error } = await supabase
    .from('buyer_memberships')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return NextResponse.json({ is_member: false, is_active: false });
  }

  const now = new Date();
  const isTrialActive = data.status === 'trial' && new Date(data.trial_end) > now;
  const isPaidActive = data.status === 'active' && data.current_period_end && new Date(data.current_period_end) > now;

  // Auto-expire trial
  if (data.status === 'trial' && !isTrialActive) {
    await supabase.from('buyer_memberships').update({ status: 'expired' }).eq('id', data.id);
    return NextResponse.json({ is_member: true, is_active: false, status: 'expired', plan: data.plan });
  }

  const daysLeft = isTrialActive
    ? Math.ceil((new Date(data.trial_end).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return NextResponse.json({
    is_member: true,
    is_active: isTrialActive || isPaidActive,
    status: data.status,
    plan: data.plan,
    trial_days_left: daysLeft,
    trial_end: data.trial_end,
  });
}