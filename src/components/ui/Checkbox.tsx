'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id:string;
}

export const Checkbox = memo<CheckboxProps>(
  ({
    checked,
    onChange,
    label,
    error,
    helperText,
    disabled,
    required,
    className,
    id
  }) => {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              id={id}
              required={required}
              className={cn(
                'peer h-5 w-5 shrink-0 rounded border border-input bg-background',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'cursor-pointer appearance-none',
                error && 'border-destructive focus:ring-destructive'
              )}
            />
            <Check
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'h-3 w-3 text-primary-foreground pointer-events-none z-10',
                'opacity-0 peer-checked:opacity-100 transition-opacity'
              )}
            />
            <div
              className={cn(
                'absolute inset-0 rounded bg-primary',
                'opacity-0 peer-checked:opacity-100 transition-opacity',
                'pointer-events-none'
              )}
            />
          </div>

          {label && (
            <label 
            htmlFor={id}
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                disabled && 'cursor-not-allowed opacity-70'
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              'text-sm ml-8',
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

Checkbox.displayName = 'Checkbox';