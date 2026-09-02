import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, getPayPalBaseUrl } from '@/lib/paypal';
import { sendOrderNotification } from '@/lib/notifications';

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
      const purchaseUnit = captureData.purchase_units?.[0];
      const payer = captureData.payer;
      const customerName = payer?.name?.given_name
        ? `${payer.name.given_name} ${payer.name.surname || ''}`.trim()
        : purchaseUnit?.shipping?.name?.full_name;
      const customerEmail = payer?.email_address;
      const totalAmount =
        purchaseUnit?.payments?.captures?.[0]?.amount?.value ||
        purchaseUnit?.amount?.value ||
        '0.00';
      const currency = purchaseUnit?.amount?.currency_code || 'CAD';

      const addr = purchaseUnit?.shipping?.address;
      const shippingAddress = addr
        ? `${purchaseUnit?.shipping?.name?.full_name || ''}\n${addr.address_line_1 || ''} ${addr.address_line_2 || ''}\n${addr.admin_area_2 || ''}, ${addr.admin_area_1 || ''} ${addr.postal_code || ''}\n${addr.country_code || ''}`.trim()
        : 'N/A';

      const items = purchaseUnit?.items?.map(
        (item: { name?: string; quantity?: string | number; unit_amount?: { value?: string } }) => ({
          name: item.name || 'Product',
          quantity: Number(item.quantity || 1),
          price: Number(item.unit_amount?.value || 0),
        })
      );

      await sendOrderNotification({
        orderId: orderId || token,
        provider: 'PayPal',
        customerName,
        customerEmail,
        totalAmount,
        currency,
        items,
        shippingAddress,
      }).catch((err) => console.error('Notification error:', err));

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
