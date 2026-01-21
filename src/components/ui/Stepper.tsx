"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Step {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  renderStepContent?: (stepIndex: number) => React.ReactNode;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  orientation = "horizontal",
  responsive = true,
  renderStepContent,
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";
  const isFinished = currentStep > steps.length - 1;

  // Detect mobile
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobileVertical =
    responsive && orientation === "horizontal" && isMobile;

  const showInlineContent = isVertical || isMobileVertical;
  const showCenteredContent =
    orientation === "horizontal" && !isMobileVertical;

  return (
    <>
      {/* STEPPER */}
      <div
        className={cn(
          "flex",
          showInlineContent
            ? "flex-col gap-0"
            : "flex-row items-start w-full",
          className
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          const isLast = index === steps.length - 1;
          const isClickable = !!onStepChange;

          return (
            <React.Fragment key={step.id || index}>
              {/* STEP HEADER */}
              <div
                className={cn(
                  "relative flex items-center",
                  showInlineContent
                    ? "flex-row pb-8"
                    : "flex-col flex-1",
                  isLast && showInlineContent && "pb-0"
                )}
                onClick={() => isClickable && onStepChange?.(index)}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
              >
                {/* STEP CIRCLE */}
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted || isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground bg-background",
                    isClickable && "cursor-pointer"
                  )}
                >
                  {isFinished ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">
                      {index + 1}
                    </span>
                  )}

                  {isCurrent && (
                    <motion.div
                      layoutId="stepper-ring"
                      className="absolute inset-0 -m-1 rounded-full border-2 border-primary/30"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* LABELS */}
                <div
                  className={cn(
                    "ml-4 flex flex-col",
                    !showInlineContent &&
                      "ml-0 mt-3 items-center text-center"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  )}
                </div>

                {/* VERTICAL CONNECTOR */}
                {!isLast && showInlineContent && (
                  <div
                    className={cn(
                      "absolute left-4 top-8 bottom-0 w-0.5",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>

              {/* INLINE STEP CONTENT (VERTICAL / MOBILE) */}
              {showInlineContent &&
                isCurrent &&
                renderStepContent && (
                  <div className="ml-12 mb-6">
                    {renderStepContent(index)}
                  </div>
                )}

              {/* HORIZONTAL CONNECTOR */}
              {!isLast && !showInlineContent && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 mt-3",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* CENTERED CONTENT (HORIZONTAL DESKTOP) */}
      {showCenteredContent && renderStepContent && (
        <div className="mt-8 flex justify-center w-full">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full px-10"
          >
            {renderStepContent(currentStep)}
          </motion.div>
        </div>
      )}
    </>
  );
}
