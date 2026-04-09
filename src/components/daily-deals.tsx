'use client';

import { motion } from 'framer-motion';

const deals = [
  { day: 'Monday', name: 'Hoodie Monday', offer: '20% off all Hoodies', emoji: '🧥', tone: 'from-fuchsia-500 to-purple-500' },
  { day: 'Tuesday', name: 'Tie Dye Tuesdays', offer: '20% off Tie Dye Tees & Tanks', emoji: '🌈', tone: 'from-cyan-400 to-blue-500' },
  { day: 'Wednesday', name: 'HumpDay Wednesdays', offer: '20% off X-Rated gear', emoji: '🔥', tone: 'from-amber-400 to-orange-500' },
  { day: 'Thursday', name: 'Thirsty Thursdays', offer: '20% off Beer gear', emoji: '🍺', tone: 'from-yellow-300 to-amber-500' },
  { day: 'Friday', name: '3 For Fridays', offer: 'Buy 3, Get One Free!', emoji: '🎉', tone: 'from-rose-500 to-pink-500' },
  { day: 'Saturday', name: "Smokin' Saturdays", offer: '20% off 420-Related items', emoji: '💨', tone: 'from-emerald-500 to-lime-500' },
  { day: 'Sunday', name: 'Sunday Brunch', offer: '15% off — Opening til 2pm', emoji: '🥞', tone: 'from-sky-400 to-indigo-500' },
  { day: 'Every Day', name: '🍀 Lucky Gear', offer: 'Always in stock!', emoji: '🍀', tone: 'from-teal-400 to-cyan-500' },
];

export function DailyDeals() {
  return (
    <section id="deals" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.82))] p-5 shadow-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center opacity-[0.08] mix-blend-multiply" />

        <div className="relative mb-6">
          <h2 className="font-sign text-4xl text-black sm:text-5xl">🔥 Daily Deals</h2>
          <p className="mt-2 max-w-xl text-zinc-700">
            Something on sale every single day — come check it out!
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="relative -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4"
        >
          {deals.map((deal) => (
            <motion.article
              key={deal.day}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`relative min-w-[260px] rounded-3xl border border-white/50 bg-gradient-to-br ${deal.tone} p-[1px] shadow-lg md:min-w-0`}
            >
              <div className="h-full rounded-3xl bg-white/92 p-4 backdrop-blur-sm">
                <p className="text-2xl">{deal.emoji}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">{deal.day}</p>
                <h3 className="mt-2 text-xl font-black text-black">{deal.name}</h3>
                <p className="mt-2 text-sm text-zinc-700">{deal.offer}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
