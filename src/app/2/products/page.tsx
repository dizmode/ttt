'use client';

import Image from 'next/image';
import Link from 'next/link';

import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const getQuantity = useCartStore((state) => state.getQuantity);

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">Shop the store</p>
            <h1 className="mt-3 text-4xl font-black text-black sm:text-5xl">Popular items & local favourites</h1>
            <p className="mt-4 max-w-2xl text-zinc-700">
              Choose from a small curated collection of hats, tees, and ready-to-ship goods. Add items to your cart, enter shipping details, and place your order online.
            </p>
          </div>

          <Link
            href="/2/cart"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900"
          >
            View cart
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const quantityInCart = getQuantity(product.id);
            const available = product.stock - quantityInCart;

            return (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg">
                <div className="relative h-72 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">{product.category}</p>
                  <h2 className="mt-3 text-2xl font-black text-black">{product.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xl font-bold text-black">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-zinc-500">Stock: {available > 0 ? available : 0}</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      disabled={available <= 0}
                      onClick={() => addItem(product.id)}
                      className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-300"
                    >
                      {available > 0 ? 'Add to cart' : 'Sold out'}
                    </button>
                    {quantityInCart > 0 ? (
                      <p className="text-sm text-zinc-600">In cart: {quantityInCart}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
