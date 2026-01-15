'use client';

import React, { memo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Flex } from '../typography';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  required?: boolean;

  /** NEW */
  charLimit?: number;
  onValueChange?: (value: string) => void;
}

export const Textarea = memo<TextareaProps>(
  ({
    label,
    error,
    helperText,
    resize = 'vertical',
    fullWidth = true,
    required,
    className,
    disabled,
    charLimit,
    onValueChange,
    onChange,
    ...props
  }) => {
    const [inputValue, setInputValue]= useState('');
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let value = e.target.value;

      // Enforce character limit
      if (charLimit && value.length > charLimit) {    
        value = value.slice(0, charLimit);
        e.target.value = value;
      }
    setInputValue(value)
      // Send value to parent
      onValueChange?.(value);

      // Preserve default onChange if passed
      onChange?.(e);
    };

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <textarea
        defaultValue={props.defaultValue}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            resizeClasses[resize],
            error && 'border-destructive focus:ring-destructive',
            className
          )}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...props}
        />

       <Flex justify={'between'}> {(error || helperText) && (
          <p
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
        {charLimit && (
          <p className="text-sm text-muted-foreground">
            {inputValue?.length || 0}/{charLimit}
          </p>
        )}</Flex>
 
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
