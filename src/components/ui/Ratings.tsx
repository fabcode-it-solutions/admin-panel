"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
  className?: string;
  emptyLabel?: string;

  /** ⭐ NEW */
  labels?: string[];
}


const DEFAULT_LABELS = [
  "Poor",
  "Fair",
  "Good",
  "Very Good",
  "Excellent",
];

export function Rating({
  value,
  defaultValue = 0,
  max = 5,
  readOnly = false,
  disabled = false,
  allowClear = true,
  size = "md",
  onChange,
  className,
  emptyLabel = "No rating",
  labels = DEFAULT_LABELS,
}: RatingProps) {
  const [internalValue, setInternalValue] =
    React.useState(defaultValue);
  const [hoverValue, setHoverValue] =
    React.useState<number | null>(null);

  const isControlled = value !== undefined;
  const rating = isControlled ? value : internalValue;
  const isInteractive = !readOnly && !disabled;

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleSelect = (star: number) => {
    if (!isInteractive) return;

    const next =
      allowClear && star === rating ? 0 : star;

    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      role="radiogroup"
      aria-disabled={disabled}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const filled =
          hoverValue !== null
            ? starValue <= hoverValue
            : starValue <= rating;

        const label =
          labels[index] ?? `${starValue} star`;

        return (
          <button
            key={starValue}
            type="button"
            className={cn(
              "relative group transition-colors",
              isInteractive
                ? "cursor-pointer"
                : "cursor-default"
            )}
            onClick={() => handleSelect(starValue)}
            onMouseEnter={() =>
              isInteractive && setHoverValue(starValue)
            }
            onMouseLeave={() =>
              isInteractive && setHoverValue(null)
            }
            disabled={disabled}
            role="radio"
            aria-checked={starValue === rating}
            aria-label={label}
          >
            <Star
              className={cn(
                sizes[size],
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />

            {/* ⭐ TOOLTIP */}
            <span
              className="
                pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                rounded bg-black px-2 py-1 text-[10px] text-white
                opacity-0 transition-opacity group-hover:opacity-100
                whitespace-nowrap
              "
            >
              {label}
            </span>
          </button>
        );
      })}

      {!rating && (
        <span className="ml-2 text-xs text-muted-foreground">
          {emptyLabel}
        </span>
      )}
    </div>
  );
}
