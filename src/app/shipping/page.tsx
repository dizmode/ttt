export const metadata = {
  title: 'Shipping Policy | T-Shirts That Talk',
  description: 'Shipping timelines and delivery details for T-Shirts That Talk orders.',
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black sm:text-5xl">Shipping Policy</h1>
        <p className="mt-4 text-sm text-zinc-600">Last updated: October 1, 2026</p>

        <div className="mt-8 space-y-6 text-zinc-700">
          <p>
            Standard shipping is currently charged at checkout and fulfilled from Qualicum Beach, BC.
          </p>

          <p>
            Most orders are processed within 1 to 3 business days. Delivery timing depends on destination and carrier service.
          </p>

          <p>
            International orders may be subject to duties, taxes, or customs fees imposed by the destination country. Those
            fees are the responsibility of the customer.
          </p>

          <p>
            For local customers, pickup requests can be noted at checkout and confirmed by email.
          </p>
        </div>
      </section>
    </main>
  );
}
