import { ReactNode } from 'react';

// Common types
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
export type Status = 'idle' | 'loading' | 'success' | 'error';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  lastLogin?: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Table types
export interface Column<T = any> {
  key: string;
  header: string;
  accessor?: (row: T) => any;
  cell?: (value: any, row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedRows?: string[];
  onSelectRows?: (ids: string[]) => void;
  className?: string;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  showPageSize?: boolean;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export interface PaginatedData<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Select types
export interface SelectOption<T = any> {
  value: string;
  label: string;
  disabled?: boolean;
  data?: T;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

// Form types
export interface FormField {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: Size;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

// API types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// Filter types
export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number';
  options?: SelectOption[];
}

export interface FilterState {
  [key: string]: any;
}

// Search types
export interface SearchResult<T = any> {
  items: T[];
  total: number;
  query: string;
}

// File upload types
export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload: (files: File[]) => void | Promise<void>;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Chart types
export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

// Dashboard types
export interface DashboardStats {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: ReactNode;
}

// Permission types
export type Permission =
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'settings.view'
  | 'settings.edit';

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

// Tab types
export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

// Infinite scroll types
export interface InfiniteScrollProps<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => ReactNode;
  loader?: ReactNode;
  endMessage?: ReactNode;
  className?: string;
}
