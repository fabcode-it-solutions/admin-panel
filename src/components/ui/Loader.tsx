'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

export interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

export const Loader = memo<LoaderProps>(
  ({ variant = 'spinner', size = 'md', text, className }) => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const dotSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-3 w-3',
    };

    if (variant === 'spinner') {
      return (
        <div className={cn('flex items-center gap-2', className)}>
          <svg
            className={cn(
              'animate-spin text-primary',
              sizes[size]
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {text && (
            <span className="text-sm text-muted-foreground">{text}</span>
          )}
        </div>
      );
    }

    if (variant === 'dots') {
      return (
        <div className={cn('flex items-center gap-2', className)}>
          <div className="flex items-center gap-1">
            <div
              className={cn(
                'rounded-full bg-primary animate-bounce',
                dotSizes[size]
              )}
              style={{ animationDelay: '0ms' }}
            />
            <div
              className={cn(
                'rounded-full bg-primary animate-bounce',
                dotSizes[size]
              )}
              style={{ animationDelay: '150ms' }}
            />
            <div
              className={cn(
                'rounded-full bg-primary animate-bounce',
                dotSizes[size]
              )}
              style={{ animationDelay: '300ms' }}
            />
          </div>
          {text && (
            <span className="text-sm text-muted-foreground">{text}</span>
          )}
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div className={cn('flex items-center gap-2', className)}>
          <div
            className={cn(
              'rounded-full bg-primary animate-pulse',
              sizes[size]
            )}
          />
          {text && (
            <span className="text-sm text-muted-foreground">{text}</span>
          )}
        </div>
      );
    }

    return null;
  }
);

Loader.displayName = 'Loader';
