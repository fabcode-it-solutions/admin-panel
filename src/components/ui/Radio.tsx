'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

export const Radio = memo<RadioProps>(
  ({
    options,
    value,
    onChange,
    name,
    label,
    error,
    helperText,
    orientation = 'vertical',
    disabled,
    className,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn('space-y-3', className)}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex gap-4',
            orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'
          )}
        >
          {options.map((option) => {
            const isDisabled = disabled || option.disabled;
            const isChecked = value === option.value;

            return (
              <div key={option.value} className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className={cn(
                      'peer h-5 w-5 shrink-0 rounded-full border border-input bg-background',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      'cursor-pointer appearance-none',
                      error && 'border-destructive focus:ring-destructive'
                    )}
                  />
                  <div
                    className={cn(
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      'h-2.5 w-2.5 rounded-full bg-primary pointer-events-none',
                      'opacity-0 peer-checked:opacity-100 transition-opacity'
                    )}
                  />
                </div>

                <label
                  htmlFor={`${name}-${option.value}`}
                  className={cn(
                    'text-sm font-medium leading-none cursor-pointer',
                    isDisabled && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
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

Radio.displayName = 'Radio';
