import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { getPayPalAccessToken, getPayPalBaseUrl } from '@/lib/paypal';

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

    const requestedQuantities = new Map<string, number>();
    for (const item of body.items) {
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return NextResponse.json({ error: `Invalid quantity for product: ${item.productId}` }, { status: 400 });
      }

      const totalQuantity = (requestedQuantities.get(item.productId) ?? 0) + quantity;
      requestedQuantities.set(item.productId, totalQuantity);
    }

    const validItems: Array<{ product: (typeof products)[0]; quantity: number }> = [];
    let subtotal = 0;

    for (const [productId, quantity] of requestedQuantities) {
      const product = products.find((entry) => entry.id === productId);
      if (!product || quantity > product.stock) {
        return NextResponse.json({ error: 'One or more products are invalid or out of stock.' }, { status: 400 });
      }
      validItems.push({ product, quantity });
      subtotal += product.price * quantity;
    }

    const shippingFee = 9.99;
    const total = subtotal + shippingFee;

    const accessToken = await getPayPalAccessToken();
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const orderId = `TTT-${Date.now()}`;

    const paypalOrderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          description: `Order ${orderId} - T-Shirts That Talk`,
          amount: {
            currency_code: 'CAD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'CAD',
                value: subtotal.toFixed(2),
              },
              shipping: {
                currency_code: 'CAD',
                value: shippingFee.toFixed(2),
              },
            },
          },
          items: validItems.map(({ product, quantity }) => ({
            name: product.name.slice(0, 127),
            description: (product.description || '').slice(0, 127),
            unit_amount: {
              currency_code: 'CAD',
              value: product.price.toFixed(2),
            },
            quantity: String(quantity),
            category: 'PHYSICAL_GOODS',
          })),
          shipping: {
            name: {
              full_name: shippingName,
            },
            address: {
              address_line_1: shipping.address.trim().slice(0, 300),
              admin_area_2: shipping.city.trim().slice(0, 120),
              admin_area_1: shipping.province.trim().slice(0, 300),
              postal_code: shipping.postalCode.trim().slice(0, 60),
              country_code: shipping.country?.toLowerCase().includes('us') ? 'US' : 'CA',
            },
          },
        },
      ],
      application_context: {
        brand_name: 'T-Shirts That Talk',
        locale: 'en-CA',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
        return_url: `${origin}/api/paypal/capture?orderId=${encodeURIComponent(orderId)}`,
        cancel_url: `${origin}/2/cart?canceled=1`,
      },
    };

    const paypalResponse = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paypalOrderPayload),
    });

    if (!paypalResponse.ok) {
      const errorData = await paypalResponse.text();
      console.error('PayPal Order Creation Error:', errorData);
      return NextResponse.json({ error: 'Failed to create PayPal order session.' }, { status: 500 });
    }

    const orderData = await paypalResponse.json();
    const approveLink = orderData.links?.find((link: { rel: string; href: string }) => link.rel === 'approve');

    if (!approveLink?.href) {
      return NextResponse.json({ error: 'PayPal approval URL not found.' }, { status: 500 });
    }

    return NextResponse.json({ url: approveLink.href }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected PayPal checkout error.';
    console.error('PayPal Checkout Route Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
