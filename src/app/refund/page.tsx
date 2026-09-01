export const metadata = {
  title: 'Refund Policy | T-Shirts That Talk',
  description: 'Refund and return details for purchases from T-Shirts That Talk.',
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black sm:text-5xl">Refund Policy</h1>
        <p className="mt-4 text-sm text-zinc-600">Last updated: October 1, 2026</p>

        <div className="mt-8 space-y-6 text-zinc-700">
          <p>
            Returns are accepted within 30 days of delivery for unworn and unwashed items in original condition.
          </p>

          <p>
            Custom or personalized items are final sale unless there is a printing defect or fulfillment error.
          </p>

          <p>
            Customers are responsible for return shipping unless the item arrived damaged or incorrect.
          </p>

          <p>
            To start a return request, email tshirtsthattalk@gmail.com with your order number and reason for return.
          </p>
        </div>
      </section>
    </main>
  );
}
