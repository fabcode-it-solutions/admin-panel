'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  id?: string;
}

export const Card = memo<CardProps>(({ children, hover = false, className, id }) => {
  return (
    <div
    id={id}
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const CardHeader = memo<CardHeaderProps>(({ children, className, id }) => {
  return (
    <div id={id} className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = memo<CardTitleProps>(({ children, className }) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = memo<CardDescriptionProps>(
  ({ children, className }) => {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = memo<CardContentProps>(({ children, className }) => {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
});

CardContent.displayName = 'CardContent';

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = memo<CardFooterProps>(({ children, className }) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';
