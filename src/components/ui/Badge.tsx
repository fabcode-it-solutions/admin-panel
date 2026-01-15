'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info'
    | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge = memo<BadgeProps>(
  ({ children, variant = 'default', dot = false, className }) => {
    const variants = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-green-500 text-white dark:bg-green-600',
      warning: 'bg-yellow-500 text-white dark:bg-yellow-600',
      info: 'bg-blue-500 text-white dark:bg-blue-600',
      outline: 'border border-input bg-background text-foreground',
    };

    const dotVariants = {
      default: 'bg-primary-foreground',
      secondary: 'bg-secondary-foreground',
      destructive: 'bg-destructive-foreground',
      success: 'bg-white',
      warning: 'bg-white',
      info: 'bg-white',
      outline: 'bg-foreground',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          variants[variant],
          className
        )}
      >
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              dotVariants[variant]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
