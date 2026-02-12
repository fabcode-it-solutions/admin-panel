"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import "react-day-picker/dist/style.css";

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
  enableRange?: boolean;
  rangeValue?: DateRange | undefined;
  onRangeChange?: (range: DateRange | undefined) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick a date",
  label,
  error,
  disabled,
  minDate,
  maxDate,
  className,
  enableRange,
  rangeValue,
  onRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------
   Smart dropdown positioning
  ---------------------------------------------- */
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const calendarHeight = 360; // safe estimate

    setOpenUpward(spaceBelow < calendarHeight);
  }, [isOpen]);
  const dayPickerProps = enableRange
    ? {
        mode: "range" as const,
        selected: rangeValue,
        onSelect: (range: DateRange | undefined) => {
          onRangeChange?.(range);
        },
        required: false, // 🔑 important
      }
    : {
        mode: "single" as const,
        selected: value,
        onSelect: (date: Date | undefined) => {
          onChange?.(date);
          setIsOpen(false);
        },
      };
  return (
    <div className={cn("relative", className)} ref={triggerRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => setIsOpen((p) => !p)}
        animate={false}
        className={cn(
          "w-full justify-start text-left font-normal transition-none", // ⬅ no hover scale
          !value && "text-muted-foreground",
          error && "border-destructive",
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, "PPP") : placeholder}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar */}
          <div
            className={cn(
              "absolute z-[99] p-3 bg-popover border border-border rounded-lg shadow-lg",
              openUpward ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            <DayPicker
              {...dayPickerProps}
              disabled={[
                ...(maxDate ? [{ before: maxDate }] : []),
                ...(minDate ? [{ after: minDate }] : []),
              ]}
              fromDate={minDate}
              toDate={maxDate}
              captionLayout="dropdown" // ✅ Month + Year dropdowns
              className="rdp-custom"
            />
          </div>
        </>
      )}

      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}

      {/* Custom styles */}
      <style jsx global>{`
        .rdp-custom {
          --rdp-cell-size: 40px;
          --rdp-accent-color: hsl(var(--primary));
          --rdp-background-color: hsl(var(--primary) / 0.1);
        }

        .rdp-custom .rdp-caption {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .rdp-custom select {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }

        .rdp-custom .rdp-day {
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .rdp-custom .rdp-day_selected {
          background-color: var(--rdp-accent-color);
          color: hsl(var(--primary-foreground));
        }

        .rdp-custom .rdp-day:hover:not(.rdp-day_selected) {
          background-color: hsl(var(--accent));
        }
      `}</style>
    </div>
  );
};

export const DatePicker = memo(DatePickerComponent);
