import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order confirmation - T-Shirts That Talk',
  description: 'Order confirmation page for T-Shirts That Talk.',
};

type OrderConfirmationPageProps = {
  searchParams: {
    orderId?: string;
  };
};

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">Order confirmed</p>
          <h1 className="mt-6 text-4xl font-black text-black sm:text-5xl">Thank you for your purchase.</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700">
            Your order {searchParams.orderId ? <strong>#{searchParams.orderId}</strong> : 'has been received'}. We will send a confirmation email shortly and reach out if we need any additional details.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/2/products" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900">
              Continue shopping
            </Link>
            <Link href="/2" className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
