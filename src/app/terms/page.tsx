import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | T-Shirts That Talk',
  description: 'Terms for using T-Shirts That Talk and purchasing products.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black sm:text-5xl">Terms and Conditions</h1>
        <p className="mt-4 text-sm text-zinc-600">Last updated: October 1, 2026</p>

        <div className="mt-8 space-y-6 text-zinc-700">
          <p>
            By using this website, you agree to provide accurate information, use the site lawfully, and respect all applicable
            local, provincial, state, and federal regulations.
          </p>

          <p>
            Product availability and pricing may change without notice. We reserve the right to cancel or refuse orders if we
            detect fraudulent or invalid checkout information.
          </p>

          <p>
            To the fullest extent allowed by law, T-Shirts That Talk is not liable for indirect or consequential damages arising
            from use of this site or purchased products.
          </p>

          <p>
            Returns and exchange rules are described in our{' '}
            <Link href="/refund" className="font-semibold text-black underline">
              Refund Policy
            </Link>
            , and shipping expectations are described in our{' '}
            <Link href="/shipping" className="font-semibold text-black underline">
              Shipping Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
