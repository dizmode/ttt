import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-black text-white shadow hover:bg-zinc-800 focus-visible:ring-zinc-900',
        ghost:
          'bg-white/70 text-black backdrop-blur hover:bg-white focus-visible:ring-zinc-400',
        outline:
          'border border-black/30 bg-white text-black hover:bg-zinc-100 focus-visible:ring-zinc-600',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-full px-4',
        lg: 'h-12 rounded-full px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
