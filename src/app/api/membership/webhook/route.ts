/**
 * src/app/api/membership/webhook/route.ts
 *
 * Stripe Webhook — 接收付款事件，更新會員狀態
 *
 * Env vars needed:
 *   STRIPE_WEBHOOK_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    // In production, verify webhook signature with STRIPE_WEBHOOK_SECRET
    // const sig = request.headers.get('stripe-signature');

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_email || session.metadata?.email;
        if (!email) break;

        await supabase
          .from('buyer_memberships')
          .update({
            status: 'active',
            plan: session.metadata?.plan || 'monthly',
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            current_period_start: new Date().toISOString(),
          })
          .eq('email', email);

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const periodEnd = new Date(invoice.lines?.data?.[0]?.period?.end * 1000);

        if (customerId) {
          await supabase
            .from('buyer_memberships')
            .update({
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: periodEnd.toISOString(),
            })
            .eq('stripe_customer_id', customerId);
        }
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.paused': {
        const sub = event.data.object;
        const customerId = sub.customer;

        if (customerId) {
          await supabase
            .from('buyer_memberships')
            .update({ status: 'cancelled', plan: 'free' })
            .eq('stripe_customer_id', customerId);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        if (customerId) {
          await supabase
            .from('buyer_memberships')
            .update({ status: 'expired' })
            .eq('stripe_customer_id', customerId);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[webhook] Error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}