import './globals.css';
import type { Metadata } from 'next';
import { Inter, Kaushan_Script } from 'next/font/google';
import { ComplianceConsent } from '@/components/compliance-consent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const signPainter = Kaushan_Script({
  subsets: ['latin'],
  variable: '--font-sign',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tshirtsthattalk.space'),
  title: 'T-Shirts That Talk - Qualicum Beach, BC',
  description: 'T-Shirts That Talk in Qualicum Beach, BC — tie-dye apparel, funny slogan tees, lucky gear, and custom prints.',
  openGraph: {
    title: 'T-Shirts That Talk - Qualicum Beach, BC',
    description: 'Welcome to T-Shirts That Talk. Home of Tie Dyes & Lucky Gear.',
    type: 'website',
    locale: 'en_CA',
    images: [
      {
        url: '/images/293070750_518357363413511_1563771426478272162_n.png',
        width: 1200,
        height: 630,
        alt: 'T-Shirts That Talk logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${signPainter.variable} font-sans antialiased`}>
        {children}
        <ComplianceConsent />
      </body>
    </html>
  )
}
