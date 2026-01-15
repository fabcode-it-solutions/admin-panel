/**
 * API Endpoints Configuration
 * All API endpoints in one place for easy management
 */

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
    csrfToken: '/auth/csrf-token',
  },

  // Users
  users: {
    list: '/users',
    byId: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
  },

  // Roles & Permissions
  roles: {
    list: '/roles',
    byId: (id: string) => `/roles/${id}`,
    create: '/roles',
    update: (id: string) => `/roles/${id}`,
    delete: (id: string) => `/roles/${id}`,
  },

  permissions: {
    list: '/permissions',
    byRole: (roleId: string) => `/permissions/role/${roleId}`,
  },

  // File Upload
  upload: {
    single: '/upload/single',
    multiple: '/upload/multiple',
    byId: (id: string) => `/upload/${id}`,
  },

  // Dashboard
  dashboard: {
    stats: '/dashboard/stats',
    recentActivity: '/dashboard/recent-activity',
    analytics: '/dashboard/analytics',
  },

  // Settings
  settings: {
    get: '/settings',
    update: '/settings',
    general: '/settings/general',
    security: '/settings/security',
    notifications: '/settings/notifications',
  },

  // Audit Logs
  auditLogs: {
    list: '/audit-logs',
    byId: (id: string) => `/audit-logs/${id}`,
    export: '/audit-logs/export',
  },

  // Notifications
  notifications: {
    list: '/notifications',
    byId: (id: string) => `/notifications/${id}`,
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
    unreadCount: '/notifications/unread-count',
  },
} as const;

/**
 * Helper function to build URL with query parameters
 * @example
 * buildUrl(API_ENDPOINTS.users.list, { page: 1, limit: 10 })
 * // Returns: '/users?page=1&limit=10'
 */
export function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return endpoint;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}