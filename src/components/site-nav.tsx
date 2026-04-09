import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { href: '/2', label: 'Home' },
  { href: '/2/about', label: 'About' },
  { href: '/2/gallery', label: 'Gallery' },
  { href: '/2/contact', label: 'Contact' },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-purple-500/20 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/images.jpeg"
            alt="T-Shirts That Talk logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-black/15 object-cover"
            priority
          />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-black sm:text-base">
            T-Shirts That Talk
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
