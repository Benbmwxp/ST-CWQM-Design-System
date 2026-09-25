import type { AnchorHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  arrow?: boolean;
}

export function TextLink({ children, arrow = true, className, href = '#', ...props }: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn('inline-flex items-center gap-2xs text-sm font-semibold text-action-primary hover:underline dark:text-content-subtle', className)}
      {...props}
    >
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" />}
    </a>
  );
}
