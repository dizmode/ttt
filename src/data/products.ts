import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'hat-001',
    sku: 'HAT-001',
    name: 'Island Dad Hat',
    category: 'Hats',
    description: 'Relaxed fit cap with embroidered logo and island vibes.',
    price: 28,
    stock: 12,
    image: '/gallery/495336612_3941293369468636_1510033938996121355_n.jpg',
  },
  {
    id: 'hat-002',
    sku: 'HAT-002',
    name: 'Lucky Logo Cap',
    category: 'Hats',
    description: 'Classic curved brim cap with a bold Lucky Gear patch.',
    price: 32,
    stock: 8,
    image: '/gallery/495994832_3942649789332994_8017912591730873636_n.jpg',
  },
  {
    id: 'shirt-001',
    sku: 'SHIRT-001',
    name: 'Tie-Dye Festival Tee',
    category: 'Popular Items',
    description: 'Bright cotton tee with a custom hand-dyed finish.',
    price: 34,
    stock: 15,
    image: '/gallery/62228270_2289724351292221_8573372931818651648_n.jpg',
  },
  {
    id: 'hoodie-001',
    sku: 'HOODIE-001',
    name: 'Custom Print Crewneck',
    category: 'Popular Items',
    description: 'Soft crewneck sweatshirt ready for your own custom artwork.',
    price: 48,
    stock: 6,
    image: '/gallery/480333936_1121981009717807_3842261181288192422_n.jpg',
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
