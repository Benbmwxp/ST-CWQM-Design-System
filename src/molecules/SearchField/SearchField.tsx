import { forwardRef, type InputHTMLAttributes } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { inputFrame } from '../../atoms/Input/Input';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  /** Shows a clear (x) button when there is a value. */
  clearable?: boolean;
  /** Adds a chevron and a suggestion list, for site pickers. */
  options?: string[];
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ value, onChange, clearable, options, className, id, placeholder = 'Search…', ...props }, ref) => {
    const listId = options ? `${id ?? 'search'}-options` : undefined;
    return (
      <div className={cn(inputFrame, 'relative flex items-center gap-xs px-sm', className)}>
        <Search aria-hidden className="size-5 shrink-0 text-content-accent" />
        <input
          ref={ref}
          id={id}
          type="search"
          list={listId}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-semibold text-content-accent outline-none placeholder:font-normal placeholder:text-content-muted [&::-webkit-search-cancel-button]:hidden"
          {...props}
        />
        {clearable && value && (
          <button type="button" aria-label="Clear" onClick={() => onChange('')} className="rounded-sm p-3xs text-content-accent hover:bg-surface-subtle">
            <X aria-hidden className="size-4" />
          </button>
        )}
        {options && (
          <>
            <ChevronDown aria-hidden className="size-5 shrink-0 text-content-accent" />
            <datalist id={listId}>{options.map((o) => <option key={o} value={o} />)}</datalist>
          </>
        )}
      </div>
    );
  }
);
SearchField.displayName = 'SearchField';
