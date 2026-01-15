'use client';

import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  itemClassName?: string;
  collapsible?: boolean;
}

const AccordionComponent: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  itemClassName,
  collapsible = true,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return type === 'single' ? '' : [];
  });

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const isOpen = useCallback(
    (itemId: string) => {
      if (type === 'single') {
        return value === itemId;
      }
      return Array.isArray(value) && value.includes(itemId);
    },
    [value, type]
  );

  const handleToggle = useCallback(
    (itemId: string) => {
      let newValue: string | string[];

      if (type === 'single') {
        // Single accordion
        if (value === itemId && collapsible) {
          newValue = '';
        } else {
          newValue = itemId;
        }
      } else {
        // Multiple accordion
        const currentValue = Array.isArray(value) ? value : [];
        if (currentValue.includes(itemId)) {
          newValue = currentValue.filter((id) => id !== itemId);
        } else {
          newValue = [...currentValue, itemId];
        }
      }

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, type, collapsible, controlledValue, onValueChange]
  );

  return (
    <div className={cn('w-full space-y-2', className)}>
      {items.map((item) => {
        const open = isOpen(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              'border border-border rounded-lg overflow-hidden bg-card',
              itemClassName
            )}
          >
            {/* Trigger */}
            <button
              type="button"
              onClick={() => !item.disabled && handleToggle(item.id)}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center justify-between p-4 text-left transition-colors',
                'hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                item.disabled && 'opacity-50 cursor-not-allowed',
                open && 'bg-accent/30'
              )}
              aria-expanded={open}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && (
                  <span className="text-muted-foreground">{item.icon}</span>
                )}
                <span className="font-medium text-foreground">{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 text-sm text-muted-foreground border-t border-border">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const Accordion = memo(AccordionComponent);

// Simple single-item accordion for convenience
export interface SimpleAccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const SimpleAccordion: React.FC<SimpleAccordionProps> = ({
  title,
  children,
  icon,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden bg-card', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4  text-sm text-muted-foreground border-t border-border">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
