import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge our custom scales, so `text-sm` (size) and
// `text-content-muted` (colour) are not treated as the same group.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] }],
      shadow: [{ shadow: ['card', 'raised'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
