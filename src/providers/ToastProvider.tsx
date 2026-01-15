'use client';

import React from 'react';
import { Toaster } from 'sonner';
import { useResolvedTheme } from '@/store/themeStore';

export interface ToastProviderProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;
}

export function ToastProvider({
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
  duration = 4000,
}: ToastProviderProps) {
  const theme = useResolvedTheme();

  return (
    <Toaster
      position={position}
      theme={theme}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      duration={duration}
      toastOptions={{
        classNames: {
          toast: 'rounded-lg border border-border shadow-lg',
          title: 'font-semibold text-sm',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
          cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/80',
          closeButton: 'bg-background border border-border hover:bg-accent',
          error: 'border-destructive/50',
          success: 'border-success/50',
          warning: 'border-warning/50',
          info: 'border-info/50',
        },
      }}
    />
  );
}
