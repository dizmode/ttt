import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { getStripeServerClient } from '@/lib/stripe';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { sendOrderNotification } from '@/lib/notifications';

export const runtime = 'nodejs';

function getShippingDetails(session: Stripe.Checkout.Session) {
  const address = session.shipping_details?.address;

  return {
    name: session.shipping_details?.name ?? session.metadata?.shippingName ?? '',
    address: address
      ? {
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          postalCode: address.postal_code,
          country: address.country,
        }
      : null,
  };
}

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 400 });
  }

  try {
    const payload = await request.text();
    const stripe = getStripeServerClient();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== 'paid' || !session.id || !session.metadata?.orderId || !session.customer_email) {
      return NextResponse.json({ error: 'Paid session is missing required order data.' }, { status: 400 });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ['data.price.product'],
    });
    const items = lineItems.data.flatMap((item) => {
      const product = item.price?.product;
      const productId = typeof product === 'string' || !product || product.deleted
        ? undefined
        : product.metadata.productId;

      if (!productId) {
        return [];
      }

      return [{
        productId,
        name: item.description ?? 'Product',
        quantity: item.quantity ?? 0,
        amount: item.amount_total ?? 0,
      }];
    });

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from('orders').upsert(
      {
        order_id: session.metadata.orderId,
        stripe_session_id: session.id,
        email: session.customer_email,
        status: 'paid',
        currency: session.currency ?? 'cad',
        total_amount: session.amount_total ?? 0,
        shipping: getShippingDetails(session),
        items,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_session_id' },
    );

    if (error) {
      throw new Error(`Unable to save order: ${error.message}`);
    }

    const shippingDetails = getShippingDetails(session);
    const shippingStr = shippingDetails.address
      ? `${shippingDetails.name}\n${shippingDetails.address.line1 || ''} ${shippingDetails.address.line2 || ''}\n${shippingDetails.address.city || ''}, ${shippingDetails.address.state || ''} ${shippingDetails.address.postalCode || ''}\n${shippingDetails.address.country || ''}`.trim()
      : shippingDetails.name || 'N/A';

    await sendOrderNotification({
      orderId: session.metadata.orderId,
      provider: 'Stripe',
      customerName: shippingDetails.name,
      customerEmail: session.customer_email,
      totalAmount: ((session.amount_total ?? 0) / 100).toFixed(2),
      currency: session.currency || 'cad',
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.amount ? i.amount / 100 / (i.quantity || 1) : 0,
      })),
      shippingAddress: shippingStr,
    }).catch((err) => console.error('Stripe notification error:', err));

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected webhook error.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
