import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, getPayPalBaseUrl } from '@/lib/paypal';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token'); // PayPal Order ID
  const orderId = searchParams.get('orderId') || '';
  const origin = request.nextUrl.origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!token) {
    return NextResponse.redirect(`${origin}/2/cart?error=missing_paypal_token`);
  }

  try {
    const accessToken = await getPayPalAccessToken();

    const captureResponse = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${token}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureResponse.ok) {
      const errorData = await captureResponse.text();
      console.error('PayPal Capture Error:', errorData);
      return NextResponse.redirect(`${origin}/2/cart?error=paypal_capture_failed`);
    }

    const captureData = await captureResponse.json();

    if (captureData.status === 'COMPLETED') {
      return NextResponse.redirect(
        `${origin}/2/order-confirmation?paypal_order_id=${encodeURIComponent(token)}&orderId=${encodeURIComponent(orderId)}&status=paid`
      );
    }

    return NextResponse.redirect(
      `${origin}/2/order-confirmation?paypal_order_id=${encodeURIComponent(token)}&orderId=${encodeURIComponent(orderId)}&status=pending`
    );
  } catch (error) {
    console.error('PayPal Capture Route Exception:', error);
    return NextResponse.redirect(`${origin}/2/cart?error=paypal_processing_error`);
  }
}
