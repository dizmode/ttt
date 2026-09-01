'use client';

import { ContactForm } from '@/components/contact-form';
import { DailyDeals } from '@/components/daily-deals';
import { Hero } from '@/components/hero';
import { LuckyGearGrid } from '@/components/lucky-gear-grid';
import { ReviewTeaser } from '@/components/review-teaser';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';

export default function WelcomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'T-Shirts That Talk',
    description:
      'T-Shirts That Talk in Qualicum Beach, BC — tie-dye apparel, funny slogan tees, lucky gear, and custom prints.',
  };

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

