import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'Shop Online - Coming Soon',
  description: 'Our online shop is under construction. Check back soon for ordering.',
};

export default function ShopOnlinePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <SiteNav />
      <section className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[3rem] border border-black/10 bg-gradient-to-br from-orange-100 via-white to-amber-100 p-10 shadow-2xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-black text-4xl text-white shadow-xl">
              🚧
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-600">Online shop</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-black sm:text-6xl">Coming soon</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
              Our shop is currently under construction. We&apos;re getting the inventory and checkout ready so you can order hats, tees, and local favourites online soon.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/2"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-900"
              >
                Back to home
              </Link>
              <Link
                href="/2/contact"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-100"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
