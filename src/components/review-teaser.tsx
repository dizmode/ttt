const reviews = [
  {
    name: 'Local Customer',
    quote:
      'Amazing tie-dye selection and super friendly service. Found exactly what I wanted.',
  },
  {
    name: 'Happy Shopper',
    quote:
      'Great custom print quality and fast turnaround. Highly recommend this shop.',
  },
  {
    name: 'Returning Visitor',
    quote:
      'Fun designs, fair prices, and a welcoming vibe every time I stop by.',
  },
  {
    name: 'Tourist from Nanaimo',
    quote:
      "Unique shirts and lucky gear you can't find elsewhere. Worth the visit.",
  },
];

export function ReviewTeaser() {
  return (
    <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-md sm:p-8">
        <h2 className="font-sign text-4xl text-black sm:text-5xl">⭐ Google Reviews</h2>
        <p className="mt-2 text-zinc-700">
          See what customers are saying about T-Shirts That Talk.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
          <iframe
            title="Google Reviews - T-Shirts That Talk"
            src="https://www.google.com/maps?q=T-Shirts+That+Talk,+3125+Van+Horne+Rd,+Qualicum+Beach,+BC&z=15&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="mt-2 text-sm text-zinc-700">{review.quote}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {review.name}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.google.com/maps?q=T-Shirts+That+Talk,+3125+Van+Horne+Rd,+Qualicum+Beach,+BC"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Read Reviews on Google
          </a>
          <a
            href="https://www.google.com/maps?q=T-Shirts+That+Talk,+3125+Van+Horne+Rd,+Qualicum+Beach,+BC"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/30 bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
