import Link from 'next/link';

export default function Welcome() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-16"
      style={{
        background:
          'radial-gradient(circle at 15% 25%, rgba(239,93,168,0.28), transparent 45%), radial-gradient(circle at 85% 10%, rgba(125,60,255,0.24), transparent 40%), radial-gradient(circle at 80% 80%, rgba(19,216,216,0.22), transparent 35%), #f7f7f5',
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          T-Shirts That Talk
        </h1>
        <p className="mt-2 text-base text-zinc-500">Qualicum Beach, BC — Choose your experience</p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-5 sm:flex-row">
        <Link
          href="/1/index.html"
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-8 py-10 text-center shadow-lg backdrop-blur-sm transition hover:scale-[1.02] hover:shadow-xl"
        >
          <span className="text-3xl">🎨</span>
          <span className="text-xl font-bold text-black">Classic Site</span>
          <span className="text-sm text-zinc-500">Original design — simple &amp; direct</span>
        </Link>

        <Link
          href="/2"
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-black px-8 py-10 text-center shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
        >
          <span className="text-3xl">✨</span>
          <span className="text-xl font-bold text-white">New Site</span>
          <span className="text-sm text-zinc-400">Festival redesign — premium &amp; animated</span>
        </Link>
      </div>
    </main>
  );
}
