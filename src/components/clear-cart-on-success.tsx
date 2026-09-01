'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

type ClearCartOnSuccessProps = {
  shouldClear: boolean;
};

export function ClearCartOnSuccess({ shouldClear }: ClearCartOnSuccessProps) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!shouldClear) {
      return;
    }

    clearCart();
  }, [clearCart, shouldClear]);

  return null;
}
