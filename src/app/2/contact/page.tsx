import type { Metadata } from 'next';

import { ContactForm } from '@/components/contact-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'Contact - T-Shirts That Talk',
  description: 'Contact T-Shirts That Talk for questions, custom orders, and pickup details.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <SiteNav />
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-xl backdrop-blur md:p-10">
          <h1 className="font-sign text-5xl text-black">Contact us</h1>
          <p className="mt-4 max-w-3xl text-zinc-700">
            Have a custom order request, shipping question, or local pickup inquiry? Send us a message and we&apos;ll get back to you promptly.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
