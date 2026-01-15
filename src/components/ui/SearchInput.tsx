'use client';

import React, { useState, useEffect, forwardRef, memo } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (value: string) => void;
  debounceMs?: number;
  loading?: boolean;
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchInputComponent = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      onSearch,
      debounceMs = 500,
      loading = false,
      onClear,
      showClearButton = true,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, debounceMs);

    useEffect(() => {
      onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleClear = () => {
      setValue('');
      onClear?.();
    };

    return (
      <div className={cn('relative', className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all'
          )}
          {...props}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {showClearButton && value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchInputComponent.displayName = 'SearchInput';

export const SearchInput = memo(SearchInputComponent);
