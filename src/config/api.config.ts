/**
 * API Configuration
 * Centralized configuration for API client
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  enableLogging: process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true',
  enableMockAPI: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
} as const;

export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const;

export const AUTH_CONFIG = {
  tokenStorageKey: 'access_token',
  refreshTokenStorageKey: 'refresh_token',
  csrfTokenStorageKey: 'csrf_token',
} as const;