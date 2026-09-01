import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';
import { getStripeServerClient } from '@/lib/stripe';

type CheckoutBody = {
  items?: Array<{ productId: string; quantity: number }>;
  shipping?: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    notes?: string;
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const shipping = body.shipping;
    if (
      !shipping?.name?.trim() ||
      !shipping.email?.trim() ||
      !shipping.address?.trim() ||
      !shipping.city?.trim() ||
      !shipping.province?.trim() ||
      !shipping.postalCode?.trim()
    ) {
      return NextResponse.json({ error: 'Complete shipping information is required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    const shippingName = shipping.name.trim();
    const customerEmail = shipping.email.trim();

    const requestedQuantities = new Map<string, number>();
    for (const item of body.items) {
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return NextResponse.json({ error: `Invalid quantity for product: ${item.productId}` }, { status: 400 });
      }

      const totalQuantity = (requestedQuantities.get(item.productId) ?? 0) + quantity;
      requestedQuantities.set(item.productId, totalQuantity);
    }

    for (const [productId, quantity] of requestedQuantities) {
      const product = products.find((entry) => entry.id === productId);
      if (!product || quantity > product.stock) {
        return NextResponse.json({ error: 'One or more products are invalid or out of stock.' }, { status: 400 });
      }
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = Array.from(requestedQuantities, ([productId, quantity]) => {
      const product = products.find((entry) => entry.id === productId)!;
      return {
        price_data: {
          currency: 'cad',
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              productId: product.id,
              sku: product.sku,
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      };
    });

    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: 'Shipping',
          description: 'Standard shipping',
        },
        unit_amount: 999,
      },
      quantity: 1,
    });

    const stripe = getStripeServerClient();
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const orderId = `TTT-${Date.now()}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      line_items: lineItems,
      metadata: {
        orderId,
        shippingName,
      },
      success_url: `${origin}/2/order-confirmation?session_id={CHECKOUT_SESSION_ID}&orderId=${encodeURIComponent(orderId)}`,
      cancel_url: `${origin}/2/cart?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected checkout error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
