'use client';

import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { Check, X, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TagOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TagSelectProps {
  // Basic props
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  type?: string;

  // Options and values
  options?: TagOption[];
  selectedValues?: TagOption[];
  inputValue?: string;

  // Mode settings
  selectMode?: 'single' | 'multiple';
  limit?: number;

  // Behavior flags
  enableEnter?: boolean;
  openOptions?: boolean;
  enablePaste?: boolean;
  pasteSeparator?: string;

  // Callbacks
  onInputChange?: (value: string) => void;
  onSelectionChange?: (values: TagOption[]) => void;
  validatePastedValue?: (value: string) => boolean;

  // Optional link for "Add New"
  href?: string;
}

const TagSelectComponent: React.FC<TagSelectProps> = ({
  name,
  label,
  placeholder = '',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  type,
  options = [],
  selectedValues: controlledSelectedValues,
  inputValue: controlledInputValue,
  selectMode = 'single',
  limit,
  enableEnter = false,
  openOptions = false,
  enablePaste = true,
  pasteSeparator = ',',
  onInputChange,
  onSelectionChange,
  validatePastedValue,
  href,
}) => {
  // Internal state
  const [internalInputValue, setInternalInputValue] = useState('');
  const [internalSelectedValues, setInternalSelectedValues] = useState<TagOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [innerError, setInnerError] = useState<string>();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMultiple = selectMode === 'multiple';

  // Use controlled or internal state
  const inputValue = controlledInputValue !== undefined ? controlledInputValue : internalInputValue;
  const selectedValues = controlledSelectedValues !== undefined ? controlledSelectedValues : internalSelectedValues;

  const setInputValue = (value: string) => {
    setInternalInputValue(value);
    onInputChange?.(value);
  };

  const setSelectedValues = (updater: TagOption[] | ((prev: TagOption[]) => TagOption[])) => {
    const newValue = typeof updater === 'function' ? updater(selectedValues) : updater;
    setInternalSelectedValues(newValue);
    onSelectionChange?.(newValue);
  };

  // Filter options based on input
  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear inner errors when limit issue is resolved
  const shouldClearError = innerError && limit && selectedValues.length < limit;
  
  useEffect(() => {
    if (shouldClearError) {
      const timeoutId = setTimeout(() => {
        setInnerError(undefined);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [shouldClearError]);

  // Handle selection
  const handleSelect = (option: TagOption) => {
    if (disabled || option.disabled) return;

    // Check limit
    if (
      limit &&
      selectedValues.length >= limit &&
      !selectedValues.some((o) => o.value === option.value)
    ) {
      setInnerError(`You have reached the maximum of ${limit} ${label || 'items'}`);
      return;
    }

    if (isMultiple) {
      setSelectedValues((prev) => {
        const exists = prev.some((o) => o.value === option.value);
        return exists ? prev.filter((o) => o.value !== option.value) : [...prev, option];
      });
    } else {
      setSelectedValues([option]);
      setShowDropdown(false);
    }

    setInputValue('');
    setActiveIndex(-1);

    // Return focus to input
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Handle tag removal
  const handleRemoveTag = (val: string) => {
    if (disabled) return;
    setSelectedValues((prev) => prev.filter((o) => o.value !== val));
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!enablePaste || !isMultiple || disabled) return;

    const pastedText = e.clipboardData.getData('text');

    if (pastedText.includes(pasteSeparator)) {
      e.preventDefault();

      const values = pastedText
        .split(pasteSeparator)
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
        .filter((v) => (validatePastedValue ? validatePastedValue(v) : true));

      if (values.length === 0) return;

      const newOptions: TagOption[] = values.map((val) => ({
        label: val,
        value: val,
      }));

      if (limit) {
        const remainingSlots = limit - selectedValues.length;

        if (newOptions.length > remainingSlots) {
          setInnerError(
            `You can only add ${remainingSlots} more item(s). ${
              newOptions.length - remainingSlots
            } item(s) were not added.`
          );

          const allowedOptions = newOptions.slice(0, remainingSlots);
          setSelectedValues((prev) => [...prev, ...allowedOptions]);

          setTimeout(() => setInnerError(undefined), 4000);
          return;
        }
      }

      setSelectedValues((prev) => {
        const existing = new Set(prev.map((o) => o.value));
        const unique = newOptions.filter((o) => !existing.has(o.value));
        return [...prev, ...unique];
      });

      setInputValue('');
    }
  };

  // Keyboard navigation
 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (disabled) return;

  if (e.key === 'Escape') {
    setShowDropdown(false);
    setActiveIndex(-1);
    return;
  }

  // ENTER KEY BEHAVIOR
  if (e.key === 'Enter') {
    // 1️⃣ If dropdown open & options exist → select option
    if (showDropdown && filteredOptions.length > 0) {
      e.preventDefault();

      const optionToSelect =
        activeIndex >= 0
          ? filteredOptions[activeIndex]
          : filteredOptions[0]; // 👈 FIRST OPTION AUTO SELECT

      handleSelect(optionToSelect);
      return;
    }

    // 2️⃣ Else create custom tag (if enabled)
    if (enableEnter && inputValue.trim()) {
      e.preventDefault();
      handleSelect({
        label: inputValue.trim(),
        value: inputValue.trim(),
      });
      return;
    }
  }

  // Arrow navigation
  if (!showDropdown) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setActiveIndex((prev) =>
      prev < filteredOptions.length - 1 ? prev + 1 : prev
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
  } else if (e.key === 'Home') {
    e.preventDefault();
    setActiveIndex(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    setActiveIndex(filteredOptions.length - 1);
  }
};


  const displayError = error || innerError;

  return (
    <div className={cn('flex flex-col relative', className)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium mb-2 flex items-center justify-between text-foreground">
          <span>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
          {selectMode === 'multiple' && selectedValues.length > 1 && (
            <button
              type="button"
              onClick={() => setSelectedValues([])}
              disabled={disabled}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-3 w-3" />
              Clear All
            </button>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onPaste={handlePaste}
          onFocus={() => {
            if (openOptions) {
              setShowDropdown(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 py-2 text-sm bg-background border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'placeholder:text-muted-foreground',
            displayError && 'border-destructive focus:ring-destructive',
            !displayError && 'border-input',
            disabled && 'opacity-50 cursor-not-allowed bg-muted'
          )}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${name}-error` : helperText ? `${name}-help` : undefined}
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? `${name}-listbox` : undefined}
          role="combobox"
          aria-activedescendant={activeIndex >= 0 ? `${name}-option-${activeIndex}` : undefined}
        />

        {/* Dropdown Options */}
        {(openOptions ? showDropdown : inputValue) && showDropdown && filteredOptions.length > 0 && (
          <div
            role="listbox"
            id={`${name}-listbox`}
            className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-popover shadow-lg"
          >
            {filteredOptions.map((opt, index) => {
              const isSelected = selectedValues.some((v) => v.value === opt.value);
              const isActive = index === activeIndex;

              return (
                <div
                  key={`${opt.value}-${index}`}
                  id={`${name}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !opt.disabled && handleSelect(opt)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors text-sm',
                    isActive && 'bg-accent',
                    !isActive && 'hover:bg-accent/50',
                    opt.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isMultiple && (
                    <div className="relative">
                      <div
                        className={cn(
                          'w-4 h-4 border rounded-sm flex items-center justify-center transition-colors',
                          isSelected
                            ? 'bg-primary border-primary'
                            : 'border-input bg-background'
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                    </div>
                  )}
                  <span className={cn(opt.disabled && 'text-muted-foreground')}>{opt.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results + Add Link */}
        {inputValue && showDropdown && filteredOptions.length === 0 && (
          <div className="absolute z-50 w-full mt-1 rounded-lg border border-border bg-popover shadow-lg">
            <div className="px-3 py-2 text-center text-sm text-muted-foreground">
              No results found
            </div>
            {href && (
              <a
                href={href}
                className="flex items-center gap-2 justify-center p-2 text-sm text-primary hover:bg-accent border-t border-border transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add {label}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedValues.map((val) => (
            <span
              key={val.value}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium"
            >
              {val.label}
              <button
                type="button"
                onClick={() => handleRemoveTag(val.value)}
                disabled={disabled}
                className="text-primary hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Remove ${val.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Error Message */}
      {displayError && (
        <p className="mt-1.5 text-sm text-destructive flex items-center gap-1" id={`${name}-error`}>
          <span className="w-1 h-1 rounded-full bg-destructive" />
          {displayError}
        </p>
      )}

      {/* Help Text */}
      {!displayError && helperText && (
        <p className="mt-1.5 text-sm text-muted-foreground" id={`${name}-help`}>
          {helperText}
          {enablePaste && isMultiple && (
            <span className="ml-1 opacity-70">
              • Paste {pasteSeparator}-separated values to add multiple
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export const TagSelect = memo(TagSelectComponent);
// Demo Component
export default function TagSelectDemo() {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TagOption[]>([]);

  const tagOptions: TagOption[] = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "Node.js", value: "nodejs" },
    { label: "CSS", value: "css" },
    { label: "HTML", value: "html" },
  ];

  const categoryOptions: TagOption[] = [
    { label: "Technology", value: "tech" },
    { label: "Design", value: "design" },
    { label: "Business", value: "business" },
  ];

  return (
    <div className="">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Improved TagSelect Component
          </h1>
          <p className="text-gray-400">
            With paste support, keyboard navigation, and accessibility improvements
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Multi-Select with Paste
          </h2>
          <TagSelect
            label="Skills"
            name="skills"
            selectMode="multiple"
            options={tagOptions}
            placeholder="Type or paste skills..."
            helperText="Try pasting: React, Vue, Angular"
            onSelectionChange={setSelectedTags}
            selectedValues={selectedTags}
            enablePaste={true}
            enableEnter={true}
            limit={5}
            openOptions={true}
          />
          
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Selected:</p>
            <code className="text-xs text-green-400">
              {JSON.stringify(selectedTags, null, 2)}
            </code>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Single Select
          </h2>
          <TagSelect
            label="Category"
            name="category"
            selectMode="single"
            options={categoryOptions}
            placeholder="Select a category..."
            required={true}
            onSelectionChange={setSelectedCategory}
            selectedValues={selectedCategory}
            openOptions={true}
          />
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Email Input (Custom Validation)
          </h2>
          <TagSelect
            label="Email Recipients"
            name="emails"
            selectMode="multiple"
            options={[]}
            placeholder="Enter or paste email addresses..."
            helperText="Paste comma-separated emails"
            enablePaste={true}
            enableEnter={true}
            validatePastedValue={(val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)}
            type="email"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-blue-400 font-semibold mb-2">✨ New Features:</h3>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>Paste comma-separated values to create multiple tags</li>
            <li>Full keyboard navigation (Arrow keys, Enter, Escape, Home/End)</li>
            <li>Improved accessibility (ARIA labels, roles)</li>
            <li>Better error handling and visual feedback</li>
            <li>Performance optimizations with useMemo</li>
            <li>Disabled state support</li>
            <li>Custom paste validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const tagSelectPropsData = [
  {
    id: '1',
    prop: 'name',
    required: 'No',
    description: 'Name attribute for the input (useful for forms & accessibility).',
    options: 'Any string',
  },
  {
    id: '2',
    prop: 'label',
    required: 'No',
    description: 'Label displayed above the tag select input.',
    options: 'String',
  },
  {
    id: '3',
    prop: 'placeholder',
    required: 'No',
    description: 'Placeholder text shown inside the input.',
    options: 'String',
  },
  {
    id: '4',
    prop: 'error',
    required: 'No',
    description: 'Error message displayed below the component.',
    options: 'String',
  },
  {
    id: '5',
    prop: 'helperText',
    required: 'No',
    description: 'Helper text shown when no error is present.',
    options: 'String',
  },
  {
    id: '6',
    prop: 'required',
    required: 'No',
    description: 'Marks the field as required.',
    options: 'true | false',
  },
  {
    id: '7',
    prop: 'disabled',
    required: 'No',
    description: 'Disables the input and all interactions.',
    options: 'true | false',
  },
  {
    id: '8',
    prop: 'className',
    required: 'No',
    description: 'Additional Tailwind or custom CSS classes.',
    options: 'Any valid CSS class string',
  },

  // Options & Values
  {
    id: '9',
    prop: 'options',
    required: 'No',
    description: 'Available options that can be selected.',
    options:
      'Array of TagOption\n' +
      '{ value: string; label: string; disabled?: boolean }',
  },
  {
    id: '10',
    prop: 'selectedValues',
    required: 'No',
    description: 'Currently selected tag values (controlled mode).',
    options: 'TagOption[]',
  },
  {
    id: '11',
    prop: 'inputValue',
    required: 'No',
    description: 'Input value (controlled mode).',
    options: 'String',
  },

  // Mode & Limits
  {
    id: '12',
    prop: 'selectMode',
    required: 'No',
    description: 'Selection mode for tags.',
    options:
      'single (default)\n' +
      'multiple',
  },
  {
    id: '13',
    prop: 'limit',
    required: 'No',
    description: 'Maximum number of tags allowed.',
    options: 'Number',
  },

  // Behavior Flags
  {
    id: '14',
    prop: 'enableEnter',
    required: 'No',
    description: 'Allows creating/selecting a tag using Enter or Tab.',
    options: 'true | false',
  },
  {
    id: '15',
    prop: 'openOptions',
    required: 'No',
    description: 'Automatically opens dropdown on focus.',
    options: 'true | false',
  },
  {
    id: '16',
    prop: 'enablePaste',
    required: 'No',
    description: 'Allows pasting multiple values to create tags.',
    options: 'true | false',
  },
  {
    id: '17',
    prop: 'pasteSeparator',
    required: 'No',
    description: 'Separator used when pasting multiple values.',
    options: '"," (default) or any string',
  },

  // Callbacks
  {
    id: '18',
    prop: 'onInputChange',
    required: 'No',
    description: 'Triggered when input value changes.',
    options: '(value: string) => void',
  },
  {
    id: '19',
    prop: 'onSelectionChange',
    required: 'No',
    description: 'Triggered when selected tags change.',
    options: '(values: TagOption[]) => void',
  },
  {
    id: '20',
    prop: 'validatePastedValue',
    required: 'No',
    description: 'Validates each pasted value before adding.',
    options: '(value: string) => boolean',
  },

  // Add New Link
  {
    id: '21',
    prop: 'href',
    required: 'No',
    description: 'Optional link shown when no results are found.',
    options: 'URL string',
  },
];
