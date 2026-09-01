import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | T-Shirts That Talk',
  description: 'How T-Shirts That Talk collects and uses personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-600">Last updated: October 1, 2026</p>

        <div className="mt-8 space-y-6 text-zinc-700">
          <p>
            T-Shirts That Talk collects information you provide at checkout or through contact forms, including your name,
            email, shipping address, and order details. We use this information only to process orders, communicate with you,
            and meet legal obligations.
          </p>

          <p>
            We use Vercel Analytics for optional site performance measurement. Analytics loads only after you accept consent
            through our cookie prompt. You can decline optional analytics and continue using the site.
          </p>

          <p>
            We do not sell personal information. We share information only with service providers needed to deliver your order
            or comply with legal requirements.
          </p>

          <p>
            To request data access or deletion, contact us at{' '}
            <a className="font-semibold text-black underline" href="mailto:tshirtsthattalk@gmail.com">
              tshirtsthattalk@gmail.com
            </a>
            .
          </p>

          <p>
            For additional terms, see our{' '}
            <Link href="/terms" className="font-semibold text-black underline">
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
