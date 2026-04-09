import { ContactForm } from '@/components/contact-form';
import { DailyDeals } from '@/components/daily-deals';
import { Hero } from '@/components/hero';
import { LuckyGearGrid } from '@/components/lucky-gear-grid';
import { ReviewTeaser } from '@/components/review-teaser';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'T-Shirts That Talk',
  description:
    'T-Shirts That Talk in Qualicum Beach, BC — tie-dye apparel, funny slogan tees, lucky gear, and custom prints.',
  telephone: '+1-250-951-8869',
  email: 'tshirtsthattalk@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '#2 - 3125 Van Horne Rd.',
    addressLocality: 'Qualicum Beach',
    addressRegion: 'BC',
    postalCode: 'V9K 2R3',
    addressCountry: 'CA',
  },
  owner: {
    '@type': 'Person',
    name: 'Jambo',
  },
  sameAs: [
    'https://facebook.com/tshirtsthattalkbc',
    'https://instagram.com/tshirts_that_talk',
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <SiteNav />
      <Hero />
      <DailyDeals />
      <LuckyGearGrid />
      <ReviewTeaser />
      <ContactForm />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}

