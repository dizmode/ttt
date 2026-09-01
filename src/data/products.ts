import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'item-0001',
    sku: 'ITEM-0001',
    name: 'Show Me Your Kitties Pink Tee',
    category: 'T-Shirts',
    description: 'Custom "Show Me Your Kitties" graphic design on a soft pink tee.',
    price: 25,
    stock: 10,
    image: '/images/ttt-stok/showmeyourkitties/pink.jpg',
  },
  {
    id: 'item-0002',
    sku: 'ITEM-0002',
    name: 'Show Me Your Kitties Green Tee',
    category: 'T-Shirts',
    description: 'Custom "Show Me Your Kitties" graphic design on a soft green tee.',
    price: 25,
    stock: 10,
    image: '/images/ttt-stok/showmeyourkitties/green.jpg',
  },
  {
    id: 'item-0003',
    sku: 'ITEM-0003',
    name: 'Lucky Red Tee',
    category: 'T-Shirts',
    description: 'Classic Lucky Lager single print design on a vibrant red tee.',
    price: 25,
    stock: 10,
    image: '/images/ttt-stok/Luckysingleprint/lucky-red-tee.jpg',
  },
  {
    id: 'item-0004',
    sku: 'ITEM-0004',
    name: 'Lucky Hoodie',
    category: 'Hoodies',
    description: 'Cozy pullover hoodie featuring the signature Lucky single print.',
    price: 55,
    stock: 10,
    image: '/images/ttt-stok/Luckysingleprint/lucky-hoodie.jpg',
  },
  {
    id: 'item-0005',
    sku: 'ITEM-0005',
    name: 'Turtle Green Tee',
    category: 'T-Shirts',
    description: 'Island sea turtle graphic on a comfortable green tee.',
    price: 25,
    stock: 10,
    image: '/images/ttt-stok/turtle-green-tee.jpg',
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
