'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    title: 'Tie-Dye Drop',
    subtitle: 'Handmade Tie-Dye',
    image: '/gallery/62228270_2289724351292221_8573372931818651648_n.jpg',
    phrase: 'This shirt starts conversations for you.',
  },
  {
    title: 'Lucky Lager Crew',
    subtitle: 'Lucky Gear',
    image: '/gallery/480333936_1121981009717807_3842261181288192422_n.jpg',
    phrase: 'Luck on your chest. Confidence in your stride.',
  },
  {
    title: 'Graphic Heat',
    subtitle: 'Funny Slogans',
    image: '/gallery/122719010_2707409176190401_233264942713643545_n.jpg',
    phrase: 'If it speaks your mind, wear it.',
  },
  {
    title: 'Cut-Out Energy',
    subtitle: 'Custom Prints',
    image: '/gallery/495994832_3942649789332994_8017912591730873636_n.jpg',
    phrase: 'Custom and loud, exactly like your ideas.',
  },
];

export function LuckyGearGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="font-sign text-4xl text-black sm:text-5xl">Lucky Gear & Fresh Finds</h2>
        <p className="mt-2 text-zinc-700">Festival pop-up vibes, small-town island charm.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={480}
              height={640}
              className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">{item.subtitle}</p>
              <h3 className="mt-1 text-lg font-black text-black">{item.title}</h3>
            </div>
            <p className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-2xl bg-black/80 p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
              {item.phrase}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
