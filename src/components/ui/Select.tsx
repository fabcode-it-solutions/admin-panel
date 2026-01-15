'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Select = memo<SelectProps>(
  ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    error,
    helperText,
    disabled,
    required,
    fullWidth = true,
    className,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={cn(
              'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'pr-10',
              error && 'border-destructive focus:ring-destructive',
              !value && 'text-muted-foreground',
              className
            )}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="text-foreground"
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none',
              disabled ? 'text-muted-foreground' : 'text-foreground'
            )}
          />
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';