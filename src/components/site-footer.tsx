import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-black py-0.5 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-1 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-sm font-bold">T-Shirts That Talk - Qualicum Beach, BC</h3>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Visit</h4>
          <Link
            href="https://www.google.com/maps?q=T-Shirts+That+Talk,+3125+Van+Horne+Rd,+Qualicum+Beach,+BC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-300 transition hover:text-cyan-200"
          >
            Open map
          </Link>
          <div className="mt-0.5">
            <Link href="https://facebook.com/tshirtsthattalkbc" target="_blank" rel="noopener noreferrer" className="block text-xs text-cyan-300 transition hover:text-cyan-200">
              Facebook
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Made Local</h4>
          <p className="text-xs text-zinc-300">Made with love in Qualicum Beach, BC.</p>
        </div>
      </div>
    </footer>
  );
}
