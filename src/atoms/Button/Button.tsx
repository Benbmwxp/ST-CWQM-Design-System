import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-xs whitespace-nowrap font-sans font-semibold rounded-md border ' +
    'transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-action-primary text-content-on-action border-transparent hover:bg-action-primary-hover',
        secondary:
          'bg-action-secondary text-content-accent border-line-default shadow-card hover:bg-action-secondary-hover',
        ghost: 'bg-transparent text-content-accent border-transparent hover:bg-action-secondary-hover',
      },
      size: {
        sm: 'h-8 px-sm text-sm',
        md: 'h-10 px-md text-md',
        lg: 'h-12 px-xl text-lg',
      },
      block: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size, block }), className)} {...props} />
  )
);
Button.displayName = 'Button';
