'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import type { ShippingInfo } from '@/types';

const defaultShipping: ShippingInfo = {
  name: '',
  email: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'Canada',
  notes: '',
};

function CartContent() {
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [shipping, setShipping] = useState<ShippingInfo>(defaultShipping);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('paypal');
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('canceled')) {
      setError('Checkout was canceled. Your cart items are still saved.');
    } else if (searchParams.get('error')) {
      setError('An error occurred during PayPal processing. Please try again.');
    }
  }, [searchParams]);

  const cartItems = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product);

  const subtotal = cartItems.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setShipping((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    if (cartItems.length === 0) {
      setError('Your cart is empty. Add something before checking out.');
      setStatus('error');
      return;
    }

    if (!shipping.name || !shipping.email || !shipping.address || !shipping.city || !shipping.postalCode) {
      setError('Please fill in all required shipping fields.');
      setStatus('error');
      return;
    }

    if (!acceptedPolicies) {
      setError('Please accept the Terms, Refund Policy, and Privacy Policy before placing your order.');
      setStatus('error');
      return;
    }

    const orderPayload = {
      items: cartItems.map((item) => ({ productId: item.product!.id, quantity: item.quantity })),
      shipping,
    };

    try {
      const endpoint = paymentMethod === 'paypal' ? '/api/paypal/checkout' : '/api/checkout';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.error ?? 'Unable to submit order.');
      }

      const data = await response.json();
      if (!data?.url) {
        throw new Error('Unable to start secure payment.');
      }

      window.location.assign(data.url);
    } catch (submissionError) {
      setError(String(submissionError));
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">Your cart</p>
            <h1 className="mt-3 text-4xl font-black text-black sm:text-5xl">Review and checkout</h1>
            <p className="mt-4 max-w-2xl text-zinc-700">
              Confirm your items, enter shipping details, and place your order. We&apos;ll email you a confirmation right away.
            </p>
          </div>
          <Link
            href="/2/products"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100"
          >
            Continue shopping
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-black text-black">Cart items</h2>
              {cartItems.length === 0 ? (
                <p className="mt-5 text-zinc-600">Your cart is empty. Add items from the shop to continue.</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product!.id} className="rounded-3xl border border-black/10 bg-[#f7f7f5] p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">{item.product!.category}</p>
                          <h3 className="mt-2 text-xl font-bold text-black">{item.product!.name}</h3>
                          <p className="mt-2 text-sm text-zinc-600">{item.product!.description}</p>
                        </div>

                        <div className="flex flex-col items-start gap-3 sm:items-end">
                          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
                            <button
                              type="button"
                              onClick={() => setQuantity(item.product!.id, item.quantity - 1)}
                              className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold"
                            >
                              –
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(item.product!.id, item.quantity + 1)}
                              className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm text-zinc-600">${(item.product!.price * item.quantity).toFixed(2)}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product!.id)}
                            className="text-sm font-semibold text-red-600 transition hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-black text-black">Shipping details</h2>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-700">Name</span>
                    <input
                      value={shipping.name}
                      onChange={(event) => handleChange('name', event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-700">Email</span>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">Address</span>
                  <input
                    value={shipping.address}
                    onChange={(event) => handleChange('address', event.target.value)}
                    required
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-700">City</span>
                    <input
                      value={shipping.city}
                      onChange={(event) => handleChange('city', event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-700">Province</span>
                    <input
                      value={shipping.province}
                      onChange={(event) => handleChange('province', event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-700">Postal code</span>
                    <input
                      value={shipping.postalCode}
                      onChange={(event) => handleChange('postalCode', event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">Country</span>
                  <input
                    value={shipping.country}
                    onChange={(event) => handleChange('country', event.target.value)}
                    required
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">Order notes</span>
                  <textarea
                    value={shipping.notes}
                    onChange={(event) => handleChange('notes', event.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-3xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-black outline-none focus:border-black"
                  />
                </label>

                <div className="space-y-3">
                  <span className="text-sm font-semibold text-zinc-700">Select payment method</span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                        paymentMethod === 'paypal' ? 'border-yellow-500 bg-yellow-50/50' : 'border-black/10 bg-[#f7f7f5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 accent-yellow-500"
                      />
                      <div>
                        <p className="text-sm font-bold text-black">PayPal</p>
                        <p className="text-xs text-zinc-600">Pay with PayPal or card</p>
                      </div>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                        paymentMethod === 'stripe' ? 'border-black bg-zinc-100' : 'border-black/10 bg-[#f7f7f5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === 'stripe'}
                        onChange={() => setPaymentMethod('stripe')}
                        className="h-4 w-4 accent-black"
                      />
                      <div>
                        <p className="text-sm font-bold text-black">Credit / Debit Card</p>
                        <p className="text-xs text-zinc-600">Secure checkout via Stripe</p>
                      </div>
                    </label>
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={acceptedPolicies}
                    onChange={(event) => setAcceptedPolicies(event.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-sm text-zinc-700">
                    I agree to the{' '}
                    <Link href="/terms" className="font-semibold text-black underline">
                      Terms and Conditions
                    </Link>
                    ,{' '}
                    <Link href="/refund" className="font-semibold text-black underline">
                      Refund Policy
                    </Link>
                    , and{' '}
                    <Link href="/privacy" className="font-semibold text-black underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <p className="text-xs leading-5 text-zinc-600">
                  Your shipping and contact information is used only for order fulfillment, customer support, and legal record-keeping.
                </p>

                {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  disabled={status === 'submitting' || cartItems.length === 0}
                  className={`inline-flex w-full items-center justify-center rounded-3xl px-6 py-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-zinc-300 ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#FFC439] text-black hover:bg-[#F2BA31]'
                      : 'bg-black text-white hover:bg-zinc-900'
                  }`}
                >
                  {status === 'submitting'
                    ? 'Redirecting to secure payment…'
                    : paymentMethod === 'paypal'
                      ? 'Pay with PayPal'
                      : 'Continue to Credit Card Payment'}
                </button>
              </form>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-black text-black">Order summary</h2>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-black/10 pt-4 text-lg font-black text-black">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-black text-black">Delivery notes</h2>
              <p className="mt-4 text-sm leading-6 text-zinc-700">
                Orders are processed quickly. If you are local to Qualicum Beach, you can also select pickup in the notes field and we will follow up with a pickup time.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] text-zinc-600">
          Loading cart...
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
