'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = memo<EmptyStateProps>(
  ({ icon, title, description, action, className }) => {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center text-center py-12 px-4',
          className
        )}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground opacity-50">
            {icon}
          </div>
        )}

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {description}
          </p>
        )}

        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
