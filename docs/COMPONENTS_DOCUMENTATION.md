# Complete Components Documentation

## 📚 Table of Contents

1. [Core Input Components](#core-input-components)
2. [Selection Components](#selection-components)
3. [Form Components](#form-components)
4. [Display Components](#display-components)
5. [Feedback Components](#feedback-components)
6. [Navigation Components](#navigation-components)
7. [Layout Components](#layout-components)
8. [Typography Components](#typography-components)
9. [Data Components](#data-components)

---

## Core Input Components

### Button

Professional button component with multiple variants and states.

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;           // Button content
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;                   // Show loading spinner
  disabled?: boolean;                  // Disable button
  fullWidth?: boolean;                 // Take full container width
  leftIcon?: React.ReactNode;          // Icon on the left
  rightIcon?: React.ReactNode;         // Icon on the right
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}
```

**Usage:**
```tsx
import { Button } from '@/components/ui/Button';
import { Plus, Save } from 'lucide-react';

// Basic button
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>

// With variant and size
<Button variant="destructive" size="lg">
  Delete
</Button>

// With loading state
<Button loading={isSubmitting} type="submit">
  Submit
</Button>

// With icons
<Button leftIcon={<Plus />}>
  Add Item
</Button>

<Button rightIcon={<Save />} variant="success">
  Save Changes
</Button>

// Full width
<Button fullWidth variant="outline">
  Full Width Button
</Button>

// Icon only
<Button size="icon" variant="ghost">
  <Settings />
</Button>
```

---

### Input

Text input component with validation and icons.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;                      // Input label
  error?: string;                      // Error message
  helperText?: string;                 // Helper text below input
  leftIcon?: React.ReactNode;          // Icon on the left
  rightIcon?: React.ReactNode;         // Icon on the right
  fullWidth?: boolean;                 // Take full container width
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  className?: string;
}
```

**Usage:**
```tsx
import { Input } from '@/components/ui/Input';
import { Mail, Lock } from 'lucide-react';

// Basic input
<Input
  label="Username"
  placeholder="Enter username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// With validation
<Input
  label="Email"
  type="email"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>

// Password with toggle
<Input
  type="password"
  label="Password"
  leftIcon={<Lock />}
/>

// With icon
<Input
  type="email"
  placeholder="Email address"
  leftIcon={<Mail />}
/>

// Disabled state
<Input
  label="Read Only"
  value="Cannot edit this"
  disabled
/>
```

---

### Textarea

Multi-line text input component.

**Props:**
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;                      // Textarea label
  error?: string;                      // Error message
  helperText?: string;                 // Helper text
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { Textarea } from '@/components/ui/Textarea';

// Basic textarea
<Textarea
  label="Description"
  placeholder="Enter description"
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// With validation
<Textarea
  label="Comments"
  error={errors.comments}
  helperText="Maximum 500 characters"
  maxLength={500}
/>

// No resize
<Textarea
  label="Fixed Size"
  resize="none"
/>
```

---

## Selection Components

### Select

Dropdown select component.

**Props:**
```typescript
interface SelectProps {
  options: SelectOption[];             // Array of options
  value?: string;                      // Selected value
  onChange?: (value: string) => void;  // Change handler
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import { Select } from '@/components/ui/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', disabled: true },
];

<Select
  label="Fruit"
  options={options}
  value={selectedFruit}
  onChange={setSelectedFruit}
  placeholder="Select a fruit"
/>

// With validation
<Select
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}
  error={errors.country}
  required
/>
```

---

### SearchSelect

Searchable dropdown component.

**Props:**
```typescript
interface SearchSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;          // Placeholder for search input
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { SearchSelect } from '@/components/ui/SearchSelect';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  // ... many more options
];

<SearchSelect
  label="Country"
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Select country"
  searchPlaceholder="Search countries..."
/>
```

---

### Switch

Toggle switch component.

**Props:**
```typescript
interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;                      // Label text
  description?: string;                // Description text
  disabled?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { Switch } from '@/components/ui/Switch';

// Basic switch
<Switch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
  label="Enable notifications"
/>

// With description
<Switch
  checked={darkMode}
  onCheckedChange={setDarkMode}
  label="Dark Mode"
  description="Enable dark theme across the application"
/>

// Disabled
<Switch
  checked={true}
  disabled
  label="Cannot change"
/>
```

---

## Form Components

### Checkbox

Checkbox input component.

**Props:**
```typescript
interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;   // Can be string or JSX
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { Checkbox } from '@/components/ui/Checkbox';

// Basic checkbox
<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>

// With error
<Checkbox
  label="I agree"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={errors.agreement}
/>

// With JSX label
<Checkbox
  label={
    <span>
      I agree to the <a href="/terms">Terms</a>
    </span>
  }
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// Disabled
<Checkbox
  label="Read only"
  checked={true}
  disabled
/>
```

---

### Radio

Radio button group component.

**Props:**
```typescript
interface RadioProps {
  options: RadioOption[];              // Array of radio options
  value?: string;                      // Selected value
  onChange?: (value: string) => void;
  name: string;                        // Input name
  label?: string;                      // Group label
  error?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import { Radio } from '@/components/ui/Radio';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

// Vertical (default)
<Radio
  label="Select an option"
  name="choices"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// Horizontal
<Radio
  label="Size"
  name="size"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
  value={size}
  onChange={setSize}
  orientation="horizontal"
/>

// With error
<Radio
  label="Payment method"
  name="payment"
  options={paymentOptions}
  value={payment}
  onChange={setPayment}
  error={errors.payment}
/>
```

---

### DatePicker

Date picker component with calendar.

**Props:**
```typescript
interface DatePickerProps {
  value?: Date;                        // Selected date
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;                      // Minimum selectable date
  maxDate?: Date;                      // Maximum selectable date
  className?: string;
}
```

**Usage:**
```tsx
import { DatePicker } from '@/components/ui/DatePicker';

// Basic date picker
<DatePicker
  label="Birth Date"
  value={birthDate}
  onChange={setBirthDate}
  placeholder="Select date"
/>

// With date restrictions
<DatePicker
  label="Appointment"
  value={appointmentDate}
  onChange={setAppointmentDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
/>

// With validation
<DatePicker
  label="Event Date"
  value={eventDate}
  onChange={setEventDate}
  error={errors.eventDate}
/>
```

---

### FileUpload

File upload component with drag & drop.

**Props:**
```typescript
interface FileUploadProps {
  accept?: string;                     // Accepted file types (e.g., 'image/*')
  multiple?: boolean;                  // Allow multiple files
  maxSize?: number;                    // Max file size in bytes
  maxFiles?: number;                   // Max number of files
  onUpload: (files: File[]) => void | Promise<void>;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  className?: string;
}
```

**Usage:**
```tsx
import { FileUpload } from '@/components/ui/FileUpload';

// Basic file upload
<FileUpload
  label="Upload Files"
  onUpload={handleUpload}
/>

// Images only
<FileUpload
  label="Upload Images"
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}  // 5MB
  onUpload={handleImageUpload}
/>

// With restrictions
<FileUpload
  label="Documents"
  accept=".pdf,.doc,.docx"
  maxFiles={3}
  maxSize={10 * 1024 * 1024}  // 10MB
  onUpload={handleDocUpload}
  helperText="Max 3 files, 10MB each"
/>

// Handle upload
const handleUpload = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
};
```

---

## Display Components

### Card

Container component with elevation.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;                     // Hover effect
  className?: string;
}

// Sub-components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

// Basic card
<Card>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>

// Full card
<Card hover>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your account settings</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Profile information...</p>
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>

// Stats card
<Card>
  <CardHeader>
    <CardTitle className="text-sm">Total Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231</div>
    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
  </CardContent>
</Card>
```

---

### Badge

Small status indicator component.

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'outline';
  dot?: boolean;                       // Show dot indicator
  className?: string;
}
```

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge';

// Basic badge
<Badge>New</Badge>

// With variants
<Badge variant="success">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Info</Badge>

// With dot indicator
<Badge variant="success" dot>
  Online
</Badge>

// In table or list
<div className="flex items-center gap-2">
  <span>Status:</span>
  <Badge variant="success">Verified</Badge>
</div>
```

---

### Avatar

User avatar component with fallback.

**Props:**
```typescript
interface AvatarProps {
  src?: string;                        // Image URL
  name?: string;                       // Name for initials fallback
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: React.ReactNode;          // Custom fallback
  className?: string;
}
```

**Usage:**
```tsx
import { Avatar } from '@/components/ui/Avatar';

// With image
<Avatar
  src="/user.jpg"
  name="John Doe"
  size="md"
/>

// With initials fallback
<Avatar
  name="John Doe"
  size="lg"
/>

// Different sizes
<Avatar src="/user.jpg" size="xs" />
<Avatar src="/user.jpg" size="sm" />
<Avatar src="/user.jpg" size="md" />
<Avatar src="/user.jpg" size="lg" />
<Avatar src="/user.jpg" size="xl" />

// Custom fallback
<Avatar
  fallback={<User />}
  size="md"
/>

// In list
<div className="flex items-center gap-3">
  <Avatar src="/user.jpg" name="John Doe" />
  <div>
    <p className="font-medium">John Doe</p>
    <p className="text-sm text-muted-foreground">john@example.com</p>
  </div>
</div>
```

---

### EmptyState

Empty state placeholder component.

**Props:**
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;              // Icon to display
  title: string;                       // Main message
  description?: string;                // Description text
  action?: React.ReactNode;            // Action button
  className?: string;
}
```

**Usage:**
```tsx
import { EmptyState } from '@/components/ui/EmptyState';
import { Inbox, Plus } from 'lucide-react';

// Basic empty state
<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="No messages"
  description="You don't have any messages yet"
/>

// With action
<EmptyState
  icon={<Inbox />}
  title="No items found"
  description="Get started by creating your first item"
  action={
    <Button leftIcon={<Plus />}>
      Create Item
    </Button>
  }
/>

// Search results
<EmptyState
  icon={<Search />}
  title="No results found"
  description={`No results for "${searchQuery}"`}
/>
```

---

## Feedback Components

### Loader

Loading spinner component.

**Props:**
```typescript
interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;                       // Loading text
  className?: string;
}
```

**Usage:**
```tsx
import { Loader } from '@/components/ui/Loader';

// Basic loader
<Loader />

// With text
<Loader text="Loading..." />

// Different variants
<Loader variant="spinner" size="lg" />
<Loader variant="dots" />
<Loader variant="pulse" />

// In button
<Button disabled>
  <Loader size="sm" className="mr-2" />
  Loading...
</Button>

// Full page
<div className="h-screen flex items-center justify-center">
  <Loader size="xl" text="Loading application..." />
</div>
```

---

### Skeleton

Skeleton loader for content placeholders.

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}
```

**Usage:**
```tsx
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';

// Basic skeleton
<Skeleton width={200} height={20} />

// Different variants
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={200} />
<Skeleton variant="text" width="80%" />

// Pre-built skeletons
<SkeletonCard />
<SkeletonTable rows={5} />
<SkeletonAvatar size={64} />
<SkeletonText lines={3} />

// Card placeholder
<div className="space-y-3">
  <Skeleton variant="rectangular" height={200} />
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="40%" />
</div>
```

---

### Progress

Progress bar component.

**Props:**
```typescript
interface ProgressProps {
  value: number;                       // 0-100
  max?: number;                        // Max value (default 100)
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;                 // Show percentage
  label?: string;                      // Custom label
  animated?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import { Progress } from '@/components/ui/Progress';

// Basic progress
<Progress value={75} />

// With label
<Progress
  value={60}
  showLabel
  label="Upload Progress"
/>

// Different variants
<Progress value={90} variant="success" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="danger" />

// Different sizes
<Progress value={75} size="sm" />
<Progress value={75} size="md" />
<Progress value={75} size="lg" />

// File upload example
const [progress, setProgress] = useState(0);

<Progress
  value={progress}
  showLabel
  label="Uploading files"
  variant={progress === 100 ? 'success' : 'default'}
/>
```

---

### Toast

Toast notification system.

**Props:**
```typescript
// Toast is configured via Provider
interface ToastProviderProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;                   // Auto-dismiss time (ms)
}

// Usage with toast function
toast.success(message, options);
toast.error(message, options);
toast.warning(message, options);
toast.info(message, options);
toast(message, options);              // Default
```

**Usage:**
```tsx
import { toast } from 'sonner';

// Success toast
toast.success('Changes saved successfully!');

// Error toast
toast.error('Failed to save changes');

// With description
toast.success('Account created', {
  description: 'Welcome to our platform!',
});

// Custom duration
toast.info('Processing request', {
  duration: 5000,
});

// With action
toast('New message', {
  description: 'You have a new message from John',
  action: {
    label: 'View',
    onClick: () => console.log('View clicked'),
  },
});

// Loading toast
const toastId = toast.loading('Uploading...');
// Later update it
toast.success('Upload complete!', { id: toastId });

// Promise toast
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: 'Data loaded',
    error: 'Failed to load',
  }
);
```

---

### Modal

Modal dialog component.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  footer?: React.ReactNode;
}
```

**Usage:**
```tsx
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

// Basic modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
>
  <p>This action cannot be undone.</p>
</Modal>

// With footer
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Item"
  size="md"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>

// Form modal
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Add New User"
  size="lg"
  closeOnOverlayClick={false}
>
  <form onSubmit={handleSubmit}>
    <Input label="Name" />
    <Input label="Email" type="email" />
    <Button type="submit">Add User</Button>
  </form>
</Modal>
```

---

### Tooltip

Tooltip component.

**Props:**
```typescript
interface TooltipProps {
  children: React.ReactNode;           // Trigger element
  content: React.ReactNode;            // Tooltip content
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;              // Delay before showing (ms)
  className?: string;
}
```

**Usage:**
```tsx
import { Tooltip } from '@/components/ui/Tooltip';

// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different positions
<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>

// Icon with tooltip
<Tooltip content="Delete item">
  <Button size="icon" variant="ghost">
    <Trash />
  </Button>
</Tooltip>

// Custom delay
<Tooltip content="Delayed tooltip" delayDuration={500}>
  <span>Hover and wait</span>
</Tooltip>
```

---

### Accordion

Expandable accordion component.

**Props:**
```typescript
interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';        // Allow one or multiple open
  defaultValue?: string | string[];
  value?: string | string[];           // Controlled
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;               // Allow closing all
  className?: string;
  itemClassName?: string;
}

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import { Accordion, SimpleAccordion } from '@/components/ui/Accordion';

// Single accordion
<Accordion
  type="single"
  items={[
    {
      id: '1',
      title: 'What is Next.js?',
      content: 'Next.js is a React framework...',
    },
    {
      id: '2',
      title: 'How to install?',
      content: 'Run npm install next react react-dom',
    },
  ]}
/>

// Multiple accordions
<Accordion
  type="multiple"
  defaultValue={['1', '2']}
  items={faqItems}
/>

// With icons
<Accordion
  items={[
    {
      id: '1',
      title: 'Account',
      icon: <User />,
      content: 'Account settings...',
    },
  ]}
/>

// Simple accordion
<SimpleAccordion title="Click to expand">
  <p>Hidden content here</p>
</SimpleAccordion>
```

---

## Navigation Components

### Tabs

Tabbed content component.

**Props:**
```typescript
interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;                      // Controlled
  onValueChange?: (value: string) => void;
  variant?: 'line' | 'pills';
  className?: string;
}

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import { Tabs } from '@/components/ui/Tabs';

// Basic tabs
<Tabs
  tabs={[
    {
      id: 'overview',
      label: 'Overview',
      content: <div>Overview content</div>,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      content: <div>Analytics content</div>,
    },
  ]}
/>

// With icons
<Tabs
  tabs={[
    {
      id: 'profile',
      label: 'Profile',
      icon: <User />,
      content: <ProfileForm />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings />,
      content: <SettingsForm />,
    },
  ]}
/>

// Pills variant
<Tabs
  variant="pills"
  tabs={tabsData}
/>

// Controlled
const [activeTab, setActiveTab] = useState('tab1');

<Tabs
  value={activeTab}
  onValueChange={setActiveTab}
  tabs={tabs}
/>
```

---

### Breadcrumbs

Navigation breadcrumb component.

**Props:**
```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;                  // Show home icon
  homeHref?: string;                   // Home link
  separator?: React.ReactNode;         // Custom separator
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}
```

**Usage:**
```tsx
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Basic breadcrumbs
<Breadcrumbs
  items={[
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ]}
/>

// Without home
<Breadcrumbs
  showHome={false}
  items={breadcrumbItems}
/>

// Custom separator
<Breadcrumbs
  separator={<ChevronRight />}
  items={items}
/>

// With icons
<Breadcrumbs
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
    { label: 'Users', href: '/users', icon: <Users /> },
    { label: 'John Doe' },
  ]}
/>
```

---

### DropdownMenu

Dropdown menu component.

**Props:**
```typescript
// Composed of multiple sub-components
<DropdownMenu>
  <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Label</DropdownMenuLabel>
    <DropdownMenuCheckboxItem>Checkbox</DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup>
      <DropdownMenuRadioItem>Radio</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Usage:**
```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu';

// Basic dropdown
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleEdit}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete}>
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// With sections
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Layout Components

### Sidebar

Application sidebar with navigation.

**Props:**
```typescript
interface SidebarProps {
  navItems?: NavItem[];                // Navigation items
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: Omit<NavItem, 'children'>[];  // Nested items
}
```

**Usage:**
```tsx
import { Sidebar } from '@/components/layout/Sidebar';

// Default navigation
<Sidebar />

// Custom navigation
const customNav = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home />,
  },
  {
    label: 'Users',
    href: '/users',
    icon: <Users />,
    badge: 12,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings />,
    children: [
      { label: 'General', href: '/settings/general', icon: <></> },
      { label: 'Security', href: '/settings/security', icon: <></> },
    ],
  },
];

<Sidebar navItems={customNav} />
```

---

### Header

Application header with search and actions.

**Props:**
```typescript
interface HeaderProps {
  className?: string;
  showSearch?: boolean;                // Show search bar
  showNotifications?: boolean;         // Show notifications
}
```

**Usage:**
```tsx
import { Header } from '@/components/layout/Header';

// Default header
<Header />

// Without search
<Header showSearch={false} />

// Minimal header
<Header
  showSearch={false}
  showNotifications={false}
/>
```

---

### DashboardLayout

Complete dashboard layout wrapper.

**Props:**
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
}
```

**Usage:**
```tsx
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// In your page
export default function MyPage() {
  return (
    <DashboardLayout>
      <h1>Page Content</h1>
      {/* Your page content */}
    </DashboardLayout>
  );
}

// Without sidebar
<DashboardLayout showSidebar={false}>
  <Content />
</DashboardLayout>

// In layout file
export default function Layout({ children }) {
  return (
    <AuthProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthProvider>
  );
}
```

---

## Typography Components

### Heading

Heading component (h1-h6).

**Props:**
```typescript
interface HeadingProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}
```

**Usage:**
```tsx
import { Heading } from '@/components/typography';

// Different levels
<Heading level="h1">Main Title</Heading>
<Heading level="h2">Section Title</Heading>
<Heading level="h3">Subsection</Heading>

// Custom weight
<Heading level="h2" weight="light">
  Light Heading
</Heading>

// SEO (render h1 but style as h2)
<Heading as="h1" level="h2">
  Styled Title
</Heading>
```

---

### Text

Text component with variants.

**Props:**
```typescript
interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'label';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  variant?: 'default' | 'muted' | 'primary' | 'secondary' | 'destructive' | 'success';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;                  // Single line ellipsis
  className?: string;
}
```

**Usage:**
```tsx
import { Text } from '@/components/typography';

// Basic text
<Text>This is a paragraph</Text>

// Different sizes
<Text size="xs">Extra small text</Text>
<Text size="sm">Small text</Text>
<Text size="lg">Large text</Text>

// Variants
<Text variant="muted">Muted text</Text>
<Text variant="primary">Primary text</Text>
<Text variant="destructive">Error text</Text>

// Truncate
<Text truncate>
  This is a very long text that will be truncated with ellipsis
</Text>

// As span
<Text as="span" size="sm">Inline text</Text>
```

---

### Container

Max-width container component.

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**Usage:**
```tsx
import { Container } from '@/components/typography';

// Basic container
<Container>
  <h1>Page Content</h1>
</Container>

// Different sizes
<Container size="sm">Narrow content</Container>
<Container size="xl">Wide content</Container>
<Container size="full">Full width</Container>

// Custom padding
<Container size="lg" padding="xl">
  Content with large padding
</Container>
```

---

### Flex

Flexbox layout component.

**Props:**
```typescript
interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**Usage:**
```tsx
import { Flex } from '@/components/typography';

// Basic flex
<Flex gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// Centered
<Flex align="center" justify="center">
  <Button>Centered Button</Button>
</Flex>

// Space between
<Flex justify="between" align="center">
  <Heading level="h2">Title</Heading>
  <Button>Action</Button>
</Flex>

// Column layout
<Flex direction="col" gap="lg">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
</Flex>

// Responsive cards
<Flex wrap="wrap" gap="md">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Flex>
```

---

## Data Components

### Table

Data table with sorting and selection.

**Props:**
```typescript
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedRows?: string[];             // Array of IDs
  onSelectRows?: (ids: string[]) => void;
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  rowKey?: keyof T | ((row: T) => string);
  className?: string;
}

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  accessor?: (row: T) => any;
  cell?: (value: any, row: T) => React.ReactNode;
}
```

**Usage:**
```tsx
import { Table } from '@/components/ui/Table';

const columns = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'destructive'}>
        {value}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: (_, row) => (
      <Button size="sm" onClick={() => handleEdit(row)}>
        Edit
      </Button>
    ),
  },
];

// Basic table
<Table
  columns={columns}
  data={users}
  loading={isLoading}
/>

// With row selection
<Table
  columns={columns}
  data={users}
  selectedRows={selectedIds}
  onSelectRows={setSelectedIds}
  onRowClick={(row) => router.push(`/users/${row.id}`)}
/>

// Striped and sticky header
<Table
  columns={columns}
  data={data}
  striped
  stickyHeader
/>
```

---

### Pagination

Pagination component.

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  showPageSize?: boolean;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}
```

**Usage:**
```tsx
import { Pagination } from '@/components/ui/Pagination';

// Basic pagination
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>

// With page size selector
<Pagination
  currentPage={page}
  totalPages={totalPages}
  pageSize={pageSize}
  totalItems={100}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  showPageSize
/>

// Custom page sizes
<Pagination
  currentPage={page}
  totalPages={pages}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[10, 25, 50, 100]}
/>

// Complete example
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const { data, total } = useQuery({
  page,
  pageSize,
});

<Table data={data} columns={columns} />
<Pagination
  currentPage={page}
  totalPages={Math.ceil(total / pageSize)}
  totalItems={total}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  showPageSize
/>
```

---

### SearchInput

Search input with debounce.

**Props:**
```typescript
interface SearchInputProps {
  onSearch: (value: string) => void;   // Debounced callback
  debounceMs?: number;                 // Debounce delay (default 500)
  loading?: boolean;
  onClear?: () => void;
  showClearButton?: boolean;
  placeholder?: string;
  className?: string;
}
```

**Usage:**
```tsx
import { SearchInput } from '@/components/ui/SearchInput';

// Basic search
<SearchInput
  onSearch={handleSearch}
  placeholder="Search users..."
/>

// With loading
<SearchInput
  onSearch={handleSearch}
  loading={isSearching}
  debounceMs={300}
/>

// Full example
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);

const handleSearch = async (value: string) => {
  setQuery(value);
  if (!value) {
    setResults([]);
    return;
  }
  
  setLoading(true);
  const data = await searchAPI(value);
  setResults(data);
  setLoading(false);
};

<SearchInput
  onSearch={handleSearch}
  loading={loading}
  onClear={() => {
    setQuery('');
    setResults([]);
  }}
/>
```

---

### InfiniteLoader

Infinite scroll component.

**Props:**
```typescript
interface InfiniteLoaderProps<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  loader?: React.ReactNode;            // Custom loader
  endMessage?: React.ReactNode;        // End message
  threshold?: number;                  // Intersection threshold (0-1)
  className?: string;
  itemClassName?: string;
}
```

**Usage:**
```tsx
import { InfiniteLoader } from '@/components/ui/InfiniteLoader';

const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);

const loadMore = async () => {
  setLoading(true);
  const newItems = await fetchItems(page);
  setItems([...items, ...newItems]);
  setPage(page + 1);
  setHasMore(newItems.length > 0);
  setLoading(false);
};

<InfiniteLoader
  items={items}
  hasMore={hasMore}
  isLoading={loading}
  onLoadMore={loadMore}
  renderItem={(item, index) => (
    <Card key={item.id}>
      <CardContent>{item.title}</CardContent>
    </Card>
  )}
/>

// With custom loader
<InfiniteLoader
  items={products}
  hasMore={hasMore}
  isLoading={loading}
  onLoadMore={loadMore}
  renderItem={(product) => <ProductCard product={product} />}
  loader={<Loader text="Loading products..." />}
  endMessage={<p>No more products</p>}
/>
```

---

## 🎯 Quick Reference

### Import Paths
```tsx
// UI Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

// Layout Components
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Typography
import { Heading, Text, Container, Flex } from '@/components/typography';

// Toast
import { toast } from 'sonner';

// Stores
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useUIStore } from '@/store/uiStore';
```

### Common Patterns

**Form with validation:**
```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={errors.email}
    required
  />
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>
```

**Data table with pagination:**
```tsx
<Table columns={columns} data={data} loading={loading} />
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

**Modal form:**
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add User"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  }
>
  <Input label="Name" />
  <Input label="Email" type="email" />
</Modal>
```

---

## 📖 Additional Resources

- **Type Definitions:** `src/types/index.ts`
- **Utility Functions:** `src/lib/utils.ts`
- **API Client:** `src/lib/api.ts`
- **Custom Hooks:** `src/hooks/`
- **State Management:** `src/store/`

---

**🎊 All components are production-ready and fully tested!**

