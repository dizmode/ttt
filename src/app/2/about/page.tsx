import type { Metadata } from 'next';

import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'About - T-Shirts That Talk',
  description:
    'About T-Shirts That Talk in Qualicum Beach, BC — handmade tie-dye, custom prints, and unique slogan tees.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <SiteNav />
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-6 shadow-xl backdrop-blur md:p-10">
          <h1 className="font-sign text-5xl text-black">About Us</h1>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-zinc-700">
              <p>
                T-Shirts That Talk is a small, independent retail shop nestled in the Hilliers area of Qualicum Beach, BC — owned and run by <strong>Jambo</strong>, a passionate creator who believes your shirt should say something worth reading.
              </p>
              <p>
                We specialize in <strong>handmade tie-dye apparel</strong>, <strong>humorous & unique slogan tees</strong>, <strong>lucky gear</strong>, and fully <strong>custom printed clothing</strong>. Every piece is crafted with care, personality, and a whole lot of colour.
              </p>
              <p>
                Whether you&apos;re looking for a one-of-a-kind tie-dye, a shirt that&apos;ll make your friends laugh, or a fully custom order for your team or event — we&apos;ve got you covered. Affordable, fun, and proudly local.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-sm">
                <span className="rounded-full border border-pink-300 bg-pink-50 px-3 py-1">🌈 Handmade Tie-Dye</span>
                <span className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1">😄 Funny Slogans</span>
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1">🍀 Lucky Gear</span>
                <span className="rounded-full border border-violet-300 bg-violet-50 px-3 py-1">🖨️ Custom Prints</span>
              </div>
            </div>

            <div className="space-y-4">
              <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500">Find Us</h2>
                <p className="mt-2 text-zinc-700">📍 #2 - 3125 Van Horne Rd.<br />Qualicum Beach, BC V9K 2R3<br /><em>(Hilliers area)</em></p>
              </article>
              <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500">Get In Touch</h2>
                <p className="mt-2 text-zinc-700">📞 <a href="tel:2509518869" className="text-cyan-700 hover:underline">(250) 951-8869</a></p>
                <p className="text-zinc-700">✉️ <a href="mailto:tshirtsthattalk@gmail.com" className="text-cyan-700 hover:underline">tshirtsthattalk@gmail.com</a></p>
              </article>
              <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500">Follow Along</h2>
                <p className="mt-2 text-zinc-700">📘 <a href="https://facebook.com/tshirtsthattalkbc" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline">Facebook</a></p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
