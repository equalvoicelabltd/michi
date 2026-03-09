/**
 * src/app/api/membership/checkout/route.ts
 *
 * POST → 建立 Stripe Checkout Session（月費 / 年費）
 *
 * Env vars needed:
 *   STRIPE_SECRET_KEY
 *   NEXT_PUBLIC_BASE_URL (e.g. https://michi-rho.vercel.app)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://michi-rho.vercel.app';

// Prices in GBP pence
const PLANS = {
  monthly: { amount: 500, interval: 'month' as const, name: 'Michi Monthly — £5/month' },
  yearly:  { amount: 5000, interval: 'year' as const, name: 'Michi Yearly — £50/year (save £10)' },
};

export async function POST(request: NextRequest) {
  if (!STRIPE_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  try {
    const { email, plan, locale } = await request.json();

    if (!email || !plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    // Create Stripe Checkout Session via API (no SDK needed)
    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('customer_email', email);
    params.append('success_url', `${BASE_URL}/${locale || 'zh'}/membership/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${BASE_URL}/${locale || 'zh'}/membership`);
    params.append('line_items[0][price_data][currency]', 'gbp');
    params.append('line_items[0][price_data][unit_amount]', String(selectedPlan.amount));
    params.append('line_items[0][price_data][recurring][interval]', selectedPlan.interval);
    params.append('line_items[0][price_data][product_data][name]', selectedPlan.name);
    params.append('line_items[0][quantity]', '1');
    params.append('metadata[email]', email);
    params.append('metadata[plan]', plan);

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (session.error) {
      return NextResponse.json({ error: session.error.message }, { status: 500 });
    }

    // Update membership with Stripe customer ID if available
    if (session.customer) {
      await supabase
        .from('buyer_memberships')
        .update({ stripe_customer_id: session.customer })
        .eq('email', email);
    }

    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}