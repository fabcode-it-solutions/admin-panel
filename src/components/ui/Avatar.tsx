'use client';

import React, { memo, useState } from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: React.ReactNode;
  className?: string;
}

export const Avatar = memo<AvatarProps>(
  ({ src, name, size = 'md', fallback, className }) => {
    const [imageError, setImageError] = useState(false);

    const sizes = {
      xs: 'h-6 w-6 text-[10px]',
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const iconSizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    };

    const getInitials = (name: string) => {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    };

    const showInitials = !src || imageError;
    const initials = name ? getInitials(name) : null;

    return (
      <div
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
          'bg-muted text-muted-foreground font-medium',
          sizes[size],
          className
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : showInitials && initials ? (
          <span>{initials}</span>
        ) : fallback ? (
          fallback
        ) : (
          <User className={iconSizes[size]} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
