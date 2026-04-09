import Image from 'next/image';

export function Hero() {
  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.28),transparent_25%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.24),transparent_26%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.28),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.74),rgba(255,255,255,0.3))] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:p-4">
        <div className="mx-auto w-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-sm">
        <Image
          src="/images/293070750_518357363413511_1563771426478272162_n.png"
          alt="T-Shirts That Talk hero artwork"
          width={1600}
          height={670}
          priority
          className="h-auto w-full object-cover"
        />
        </div>
      </div>
    </section>
  );
}
