import type { Metadata } from 'next';
import Link from 'next/link';
import { ClearCartOnSuccess } from '@/components/clear-cart-on-success';
import { getStripeServerClient } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Order confirmation - T-Shirts That Talk',
  description: 'Order confirmation page for T-Shirts That Talk.',
};

type OrderConfirmationPageProps = {
  searchParams: {
    orderId?: string;
    session_id?: string;
    paypal_order_id?: string;
    status?: string;
  };
};

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  let paymentStatus: 'paid' | 'pending' | 'unknown' = 'unknown';
  const sessionId = searchParams.session_id;
  const paypalOrderId = searchParams.paypal_order_id;
  const rawStatus = searchParams.status;

  if (paypalOrderId || rawStatus === 'paid') {
    paymentStatus = 'paid';
  } else if (sessionId) {
    try {
      const stripe = getStripeServerClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') {
        paymentStatus = 'paid';
      } else {
        paymentStatus = 'pending';
      }
    } catch {
      paymentStatus = 'unknown';
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <ClearCartOnSuccess shouldClear={paymentStatus === 'paid'} />
      <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">Order status</p>
          <h1 className="mt-6 text-4xl font-black text-black sm:text-5xl">Thank you for your purchase.</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700">
            {paymentStatus === 'paid'
              ? `Payment received for order ${searchParams.orderId ? `#${searchParams.orderId}` : ''}. We will send a confirmation email shortly.`
              : paymentStatus === 'pending'
                ? `Your order ${searchParams.orderId ? `#${searchParams.orderId}` : ''} is received and payment is processing.`
                : `Your order ${searchParams.orderId ? `#${searchParams.orderId}` : ''} has been received. If payment was interrupted, you can return to cart and try again.`}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/2/products" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900">
              Continue shopping
            </Link>
            <Link href="/welcome" className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
