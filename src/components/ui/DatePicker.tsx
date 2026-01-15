'use client';

import React, { useState, memo } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import 'react-day-picker/dist/style.css';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  label,
  error,
  disabled,
  minDate,
  maxDate,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            error && 'border-destructive'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : placeholder}
        </Button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Calendar Dropdown */}
            <div className="absolute z-[99] mt-2 p-3 bg-popover border border-border rounded-lg shadow-lg">
              <DayPicker
                mode="single"
                selected={value}
                onSelect={(date) => {
                  onChange?.(date);
                  setIsOpen(false);
                }}
                disabled={[
                  ...(minDate ? [{ before: minDate }] : []),
                  ...(maxDate ? [{ after: maxDate }] : []),
                ]}
                className="rdp-custom"
              />
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}

      {/* Custom DayPicker styles */}
      <style jsx global>{`
        .rdp-custom {
          --rdp-cell-size: 40px;
          --rdp-accent-color: hsl(var(--primary));
          --rdp-background-color: hsl(var(--primary) / 0.1);
        }

        .rdp-custom .rdp-month {
          width: 100%;
        }

        .rdp-custom .rdp-caption {
          display: flex;
          justify-content: center;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .rdp-custom .rdp-caption_label {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .rdp-custom .rdp-nav {
          display: flex;
          gap: 0.25rem;
        }

        .rdp-custom .rdp-nav_button {
          width: 2rem;
          height: 2rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rdp-custom .rdp-nav_button:hover {
          background-color: hsl(var(--accent));
        }

        .rdp-custom .rdp-head_cell {
          font-weight: 500;
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }

        .rdp-custom .rdp-cell {
          text-align: center;
        }

        .rdp-custom .rdp-day {
          width: var(--rdp-cell-size);
          height: var(--rdp-cell-size);
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .rdp-custom .rdp-day:hover:not(.rdp-day_selected) {
          background-color: hsl(var(--accent));
        }

        .rdp-custom .rdp-day_selected {
          background-color: var(--rdp-accent-color);
          color: hsl(var(--primary-foreground));
        }

        .rdp-custom .rdp-day_disabled {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }

        .rdp-custom .rdp-day_outside {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export const DatePicker = memo(DatePickerComponent);
