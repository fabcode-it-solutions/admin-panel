"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface TimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  use12Hours?: boolean;
  className?: string;
  disabled?: boolean;
}

export function TimePicker({
  value,
  onChange,
  use12Hours = true,
  className,
  disabled,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const date = value || new Date();

  // Get current values
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  if (use12Hours) {
    hours = hours % 12 || 12;
  }

  // Generators
  const hoursList = use12Hours
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const minutesList = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["AM", "PM"];

  const handleTimeChange = (
    type: "hour" | "minute" | "period",
    val: number | string,
  ) => {
    const newDate = new Date(date);
    const currentHours = newDate.getHours();

    if (type === "hour") {
      const newHour = Number(val);
      if (use12Hours) {
        const isPM = currentHours >= 12;
        if (isPM && newHour !== 12) newDate.setHours(newHour + 12);
        else if (!isPM && newHour === 12) newDate.setHours(0);
        else newDate.setHours(newHour);
      } else {
        newDate.setHours(newHour);
      }
    } else if (type === "minute") {
      newDate.setMinutes(Number(val));
    } else if (type === "period" && use12Hours) {
      if (val === "PM" && currentHours < 12)
        newDate.setHours(currentHours + 12);
      if (val === "AM" && currentHours >= 12)
        newDate.setHours(currentHours - 12);
    }

    onChange?.(newDate);
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: use12Hours,
    });
  };

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      <Button
        variant="outline"
        className={cn(
          "w-[180px] justify-start text-left font-normal",
          !value && "text-muted-foreground",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Clock className="mr-2 h-4 w-4" />
        {value ? formatTime(value) : "Pick a time"}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 flex h-64 w-auto min-w-[200px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
          {/* Hours */}
          <div className="flex-1 overflow-y-auto border-r scrollbar-hide">
            <div className="p-1">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground text-center mb-1">
                Hr
              </div>
              {hoursList.map((h) => (
                <div
                  key={h}
                  className={cn(
                    "cursor-pointer rounded-sm px-2 py-1 text-center text-sm hover:bg-accent hover:text-accent-foreground",
                    h === hours &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                  onClick={() => handleTimeChange("hour", h)}
                >
                  {h.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>

          {/* Minutes */}
          <div className="flex-1 overflow-y-auto border-r scrollbar-hide">
            <div className="p-1">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground text-center mb-1">
                Min
              </div>
              {minutesList.map((m) => (
                <div
                  key={m}
                  className={cn(
                    "cursor-pointer rounded-sm px-2 py-1 text-center text-sm hover:bg-accent hover:text-accent-foreground",
                    m === minutes &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                  onClick={() => handleTimeChange("minute", m)}
                >
                  {m.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>

          {/* Period (Only for 12h) */}
          {use12Hours && (
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-1">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground text-center mb-1">
                  Am/Pm
                </div>
                {periods.map((p) => (
                  <div
                    key={p}
                    className={cn(
                      "cursor-pointer rounded-sm px-2 py-1 text-center text-sm hover:bg-accent hover:text-accent-foreground",
                      p === period &&
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    )}
                    onClick={() => handleTimeChange("period", p)}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
