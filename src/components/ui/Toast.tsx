'use client';

import React, { memo } from 'react';
import { Toaster as Sonner } from 'sonner';
import { useResolvedTheme } from '@/store/themeStore';

export interface ToastProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
}

const ToastComponent: React.FC<ToastProps> = ({
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
}) => {
  const theme = useResolvedTheme();

  return (
    <Sonner
      position={position}
      theme={theme}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      toastOptions={{
        classNames: {
          toast: 'rounded-lg border border-border shadow-lg',
          title: 'font-semibold',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  );
};

export const Toast = memo(ToastComponent);

// Export toast function from sonner
export { toast } from 'sonner';
