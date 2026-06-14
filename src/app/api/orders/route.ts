import { NextResponse } from 'next/server';
import { products } from '@/data/products';

const orders: Array<{
  orderId: string;
  items: Array<{ productId: string; quantity: number; price: number }>;
  shipping: Record<string, string>;
  total: number;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Order must include at least one item.' }, { status: 400 });
  }

  if (!body?.shipping || typeof body.shipping !== 'object') {
    return NextResponse.json({ error: 'Shipping information is required.' }, { status: 400 });
  }

  const orderItems = body.items.map((item: { productId: string; quantity: number }) => {
    const product = products.find((product) => product.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    return {
      productId: product.id,
      quantity: Number(item.quantity),
      price: product.price,
    };
  });

  const subtotal = orderItems.reduce((total: number, item: { productId: string; quantity: number; price: number }) => {
    return total + item.price * item.quantity;
  }, 0);
  const shippingCost = orderItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shippingCost;

  const orderId = `TTT-${Date.now()}`;
  orders.push({
    orderId,
    items: orderItems,
    shipping: body.shipping,
    total,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ orderId }, { status: 201 });
}
