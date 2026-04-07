import './globals.css';

export const metadata = {
  title: 'T-Shirts That Talk - Qualicum Beach, BC',
  description: 'T-Shirts That Talk in Qualicum Beach, BC — tie-dye apparel, funny slogan tees, lucky gear, and custom prints.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
