import type { Metadata } from 'next';
import Image from 'next/image';

import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'Gallery - T-Shirts That Talk',
  description: 'Our Work - T-Shirts That Talk',
};

const images = [
  {
    src: '/gallery/484184984_1141348597781048_1679903062633985221_n.jpg',
    alt: 'Store interior — hats and graphic tees on display',
  },
  {
    src: '/gallery/62228270_2289724351292221_8573372931818651648_n.jpg',
    alt: 'Lucky Lager tie-dye hoodies',
  },
  {
    src: '/gallery/480333936_1121981009717807_3842261181288192422_n.jpg',
    alt: 'Lucky Lager sweaters in three colours',
  },
  {
    src: '/gallery/495336612_3941293369468636_1510033938996121355_n.jpg',
    alt: 'Lucky Lager hats',
  },
  {
    src: '/gallery/122719010_2707409176190401_233264942713643545_n.jpg',
    alt: 'D.A.R.E. — Drugs Are Really Expensive tee',
  },
  {
    src: '/gallery/495994832_3942649789332994_8017912591730873636_n.jpg',
    alt: 'Graphic cut-out tank top on mannequin',
  },
  {
    src: '/gallery/485807900_1148391017076806_8609734473259415003_n.jpg',
    alt: 'Daily Sales sign — weekly specials board',
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <SiteNav />
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-sign text-5xl text-black">Our Work</h1>
        <p className="mt-2 text-zinc-700">A colourful peek at the latest drops and local favourites.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((item) => (
            <figure key={item.src} className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <Image
                src={item.src}
                alt={item.alt}
                width={480}
                height={420}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
