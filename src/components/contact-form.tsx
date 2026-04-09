'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [status, setStatus] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confetti({
      particleCount: 100,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#ef5da8', '#7d3cff', '#13d8d8', '#f8d648'],
    });
    setStatus('Thanks for reaching out. We will get back to you soon.');
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-md md:grid-cols-2 sm:p-8">
        <div>
          <h2 className="font-sign text-4xl text-black sm:text-5xl">Get In Touch</h2>
          <h3 className="mt-4 text-xl font-black text-black">Contact Information</h3>
          <div className="mt-5 space-y-4 text-sm text-zinc-700">
            <p>
              <span className="font-bold text-black">📍 Location</span>
              <br />
              #2 - 3125 Van Horne Rd. Qualicum Beach, BC V9K 2R3 (Hilliers area)
            </p>
            <p>
              <span className="font-bold text-black">📞 Phone</span>
              <br />
              <a className="text-cyan-700 hover:underline" href="tel:2509518869">(250) 951-8869</a>
            </p>
            <p>
              <span className="font-bold text-black">✉️ Email</span>
              <br />
              <a className="text-cyan-700 hover:underline" href="mailto:tshirtsthattalk@gmail.com">tshirtsthattalk@gmail.com</a>
            </p>
            <p>
              <span className="font-bold text-black">👤 Owner</span>
              <br />
              Jambo
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black text-black">Send us a Message</h3>
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold text-zinc-700">Name</label>
              <input id="name" name="name" required placeholder="Your name" className="w-full rounded-xl border border-black/20 bg-white px-4 py-2 text-black placeholder:text-zinc-400 focus:border-black focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-zinc-700">Email</label>
              <input id="email" type="email" name="email" required placeholder="your@email.com" className="w-full rounded-xl border border-black/20 bg-white px-4 py-2 text-black placeholder:text-zinc-400 focus:border-black focus:outline-none" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold text-zinc-700">Message</label>
              <textarea id="message" name="message" rows={4} required placeholder="Tell us about your design..." className="w-full rounded-xl border border-black/20 bg-white px-4 py-2 text-black placeholder:text-zinc-400 focus:border-black focus:outline-none" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
            {status ? <p className="text-sm font-semibold text-emerald-700">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
