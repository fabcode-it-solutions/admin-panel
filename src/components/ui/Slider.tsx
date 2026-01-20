"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./Input";

export interface SliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
  disabled?: boolean;
  formatLabel?: (value: number) => string;
  showTooltip?: boolean;
  showInputs?: boolean;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  onValueChange,
  className,
  disabled = false,
  formatLabel,
  showTooltip = false,
  showInputs = false,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState<number | null>(null); // Index of thumb being dragged
  const sliderRef = useRef<HTMLDivElement>(null);

  // Validate value matches range logic (ensure sorted)
  const safeValue = value
    .map((v) => Math.min(Math.max(v, min), max))
    .sort((a, b) => a - b);

  const getPercentage = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1,
      );
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    },
    [min, max, step],
  );

  const handlePointerDown = (index: number) => (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(index);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(null);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (disabled || isDragging === null) return;
    e.preventDefault();

    const newValue = getValueFromPointer(e.clientX);
    const newValues = [...safeValue];

    // Constrain logic
    if (safeValue.length === 2) {
      if (isDragging === 0) {
        // Dragging min thumb
        const limit = safeValue[1] - minStepsBetweenThumbs * step;
        newValues[0] = Math.min(newValue, limit);
      } else {
        // Dragging max thumb
        const limit = safeValue[0] + minStepsBetweenThumbs * step;
        newValues[1] = Math.max(newValue, limit);
      }
    } else {
      // Single thumb
      newValues[0] = newValue;
    }

    if (newValues[isDragging] !== safeValue[isDragging]) {
      onValueChange?.(newValues);
    }
  };

  // Handle track click to jump to value
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return;
    // Only if not dragging (though pointer events might prevent this overlap, good to be safe)
    if (isDragging !== null) return;

    const clickValue = getValueFromPointer(e.clientX);

    // Find closest thumb
    let closestIndex = 0;
    let minDiff = Infinity;

    safeValue.forEach((val, index) => {
      const diff = Math.abs(val - clickValue);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    const newValues = [...safeValue];
    // Check constraints
    if (newValues.length === 2) {
      if (closestIndex === 0) {
        const limit = newValues[1] - minStepsBetweenThumbs * step;
        newValues[0] = Math.min(clickValue, limit);
      } else {
        const limit = newValues[0] + minStepsBetweenThumbs * step;
        newValues[1] = Math.max(clickValue, limit);
      }
    } else {
      newValues[0] = clickValue;
    }

    onValueChange?.(newValues);
  };

  const handleInputChange = (index: number, valStr: string) => {
    const val = parseFloat(valStr);
    if (isNaN(val)) return;

    const newValues = [...safeValue];
    newValues[index] = val;

    // Basic clamping for valid range, let parent/safeValue logic handle strict bounds if needed
    // But we should try to respect the constraints to avoid weird jumps
    if (newValues.length === 2) {
      if (index === 0) {
        // Changing min
        const limit = newValues[1] - minStepsBetweenThumbs * step;
        if (val > limit) newValues[index] = limit;
      } else {
        // Changing max
        const limit = newValues[0] + minStepsBetweenThumbs * step;
        if (val < limit) newValues[index] = limit;
      }
    }

    // Clamp to min/max
    newValues[index] = Math.min(Math.max(newValues[index], min), max);

    onValueChange?.(newValues);
  };

  const isRange = safeValue.length > 1;

  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      {showInputs && isRange && (
        <Input
          type="number"
          value={safeValue[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="w-20 h-9"
          disabled={disabled}
        />
      )}

      <div
        className={cn(
          "relative flex w-full touch-none select-none items-center py-4",
          disabled && "opacity-50 cursor-not-allowed",
          !showInputs && className, // Apply className here if not showing inputs wrapper
        )}
        ref={sliderRef}
        onClick={handleTrackClick}
      >
        {/* Track */}
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          {/* Range Fill */}
          <div
            className="absolute h-full bg-primary"
            style={{
              left:
                safeValue.length > 1 ? `${getPercentage(safeValue[0])}%` : "0%",
              right:
                safeValue.length > 1
                  ? `${100 - getPercentage(safeValue[1])}%`
                  : `${100 - getPercentage(safeValue[0])}%`,
            }}
          />
        </div>

        {/* Thumbs */}
        {safeValue.map((val, index) => (
          <div
            key={index}
            className={cn(
              "absolute flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:border-accent-foreground",
              isDragging === index && "scale-110 border-primary",
            )}
            style={{
              left: `calc(${getPercentage(val)}% - 10px)`, // Center the 20px thumb
              cursor: disabled ? "not-allowed" : "grab",
            }}
            onPointerDown={handlePointerDown(index)}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
          >
            {showTooltip && (isDragging === index || !isDragging) && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border">
                {formatLabel ? formatLabel(val) : val}
              </div>
            )}
          </div>
        ))}
      </div>

      {showInputs && (
        <Input
          type="number"
          value={isRange ? safeValue[1] : safeValue[0]}
          onChange={(e) => handleInputChange(isRange ? 1 : 0, e.target.value)}
          className="w-20 h-9"
          disabled={disabled}
        />
      )}
    </div>
  );
}
