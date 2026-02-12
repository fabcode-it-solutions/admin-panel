"use client";

import React, { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "../typography";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  fullWidth?: boolean;
  required?: boolean;

  /** EXISTING */
  charLimit?: number;
  onValueChange?: (value: string) => void;

  /** NEW */
  minLength?: number;
}

export const Textarea = memo<TextareaProps>(
  ({
    label,
    error,
    helperText,
    resize = "vertical",
    fullWidth = true,
    required,
    className,
    disabled,
    charLimit,
    minLength,
    onValueChange,
    onChange,
    ...props
  }) => {
    const [inputValue, setInputValue] = useState("");
    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let value = e.target.value;

      // Enforce character limit (existing logic untouched)
      if (charLimit && value.length > charLimit) {
        value = value.slice(0, charLimit);
        e.target.value = value;
      }

      setInputValue(value);

      // Send value to parent
      onValueChange?.(value);

      // Preserve default onChange if passed
      onChange?.(e);
    };

    const minLengthError =
      minLength && inputValue.length > 0 && inputValue.length < minLength
        ? `Minimum ${minLength} characters required`
        : null;

    const hasError = !!error || !!minLengthError;

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <textarea
          defaultValue={props.defaultValue}
          minLength={minLength}
          className={cn(
            "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            resizeClasses[resize],
            hasError
              ? "border-destructive focus:ring-destructive"
              : "focus:ring-ring",
            className,
          )}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...props}
        />

        <Flex justify={"between"}>
          {(error || helperText || minLengthError) && (
            <p
              className={cn(
                "text-sm",
                error || minLengthError
                  ? "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {error || minLengthError || helperText}
            </p>
          )}

          {charLimit && (
            <p className="text-sm text-muted-foreground">
              {inputValue?.length || 0}/{charLimit}
            </p>
          )}
        </Flex>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
