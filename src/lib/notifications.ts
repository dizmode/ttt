export type OrderNotificationItem = {
  name: string;
  quantity: number;
  price?: number;
};

export type OrderNotificationPayload = {
  orderId: string;
  provider: 'PayPal' | 'Stripe' | 'Direct';
  customerName?: string;
  customerEmail?: string;
  totalAmount: string;
  currency?: string;
  items?: OrderNotificationItem[];
  shippingAddress?: string;
  notes?: string;
};

export const NOTIFICATION_RECIPIENTS = [
  'berdy403@gmail.com',
  'deenyx@icloud.com',
];

export async function sendOrderNotification(payload: OrderNotificationPayload): Promise<void> {
  const currency = (payload.currency || 'CAD').toUpperCase();
  const itemsText = payload.items && payload.items.length > 0
    ? payload.items.map((item) => `- ${item.name} x${item.quantity}${item.price ? ` ($${item.price.toFixed(2)} ea)` : ''}`).join('\n')
    : 'No item breakdown provided';

  const subject = `🎉 NEW ORDER RECEIVED: ${payload.orderId} (${currency} $${payload.totalAmount})`;

  const textBody = `
New purchase completed on T-Shirts That Talk!

----------------------------------------
Order ID: ${payload.orderId}
Payment Provider: ${payload.provider}
Total Paid: $${payload.totalAmount} ${currency}

Customer Details:
Name: ${payload.customerName || 'N/A'}
Email: ${payload.customerEmail || 'N/A'}

Shipping Address:
${payload.shippingAddress || 'N/A'}

Order Notes:
${payload.notes || 'None'}

Items Purchased:
${itemsText}
----------------------------------------
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' })} (Pacific Time)
`;

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #eee; padding: 24px; borderRadius: 12px;">
  <h2 style="color: #000; margin-top: 0;">🎉 New Order Received!</h2>
  <p style="font-size: 16px; font-weight: bold;">Order ID: <span style="color: #7C5CFC;">${payload.orderId}</span></p>

  <div style="background-color: #f7f7f5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
    <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${payload.provider}</p>
    <p style="margin: 4px 0;"><strong>Total Paid:</strong> $${payload.totalAmount} ${currency}</p>
    <p style="margin: 4px 0;"><strong>Customer Name:</strong> ${payload.customerName || 'N/A'}</p>
    <p style="margin: 4px 0;"><strong>Customer Email:</strong> ${payload.customerEmail || 'N/A'}</p>
  </div>

  <h3 style="margin-bottom: 8px;">Shipping Address</h3>
  <p style="white-space: pre-wrap; background: #fafafa; padding: 12px; border-radius: 6px;">${payload.shippingAddress || 'N/A'}</p>

  ${payload.notes ? `<h3 style="margin-bottom: 8px;">Order Notes</h3><p style="background: #fafafa; padding: 12px; border-radius: 6px;">${payload.notes}</p>` : ''}

  <h3 style="margin-bottom: 8px;">Items Purchased</h3>
  <ul style="padding-left: 20px;">
    ${payload.items?.map((item) => `<li style="margin-bottom: 6px;"><strong>${item.name}</strong> &times; ${item.quantity} ${item.price ? `($${item.price.toFixed(2)} each)` : ''}</li>`).join('') || '<li>No items listed</li>'}
  </ul>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
  <p style="font-size: 12px; color: #777;">T-Shirts That Talk — Automated Sales Notification</p>
</div>
`;

  console.log('[NEW ORDER NOTIFICATION]', {
    to: NOTIFICATION_RECIPIENTS,
    subject,
    orderId: payload.orderId,
    total: payload.totalAmount,
    customer: payload.customerEmail,
  });

  // 1. Send via Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'T-Shirts That Talk <orders@resend.dev>',
          to: NOTIFICATION_RECIPIENTS,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('Failed to send email via Resend API:', errText);
      } else {
        console.log('Order notification email sent successfully via Resend to:', NOTIFICATION_RECIPIENTS);
      }
    } catch (err) {
      console.error('Error invoking Resend API:', err);
    }
  }

  // 2. Send via Webhook if NOTIFICATION_WEBHOOK_URL is configured (Discord, Slack, Make, Zapier, etc.)
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New Order ${payload.orderId}** ($${payload.totalAmount} ${currency}) from ${payload.customerName || payload.customerEmail || 'Customer'} via ${payload.provider}`,
          text: textBody,
          payload,
        }),
      });
      console.log('Order notification sent to webhook');
    } catch (err) {
      console.error('Error sending webhook notification:', err);
    }
  }
}
