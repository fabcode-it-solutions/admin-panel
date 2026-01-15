/**
 * API Client
 * Fetch-based API client for Next.js with TypeScript
 * Features:
 * - CSRF protection
 * - Token refresh
 * - Request/Response interceptors
 * - Error handling
 * - SSR/CSR compatible
 * - Automatic retries
 */

import { API_CONFIG, REQUEST_HEADERS, AUTH_CONFIG } from '@/config/api.config';
import { createApiError, ApiError } from './api-error';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface RequestConfig extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
  skipCSRF?: boolean;
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;
  private csrfToken: string | null = null;
  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultTimeout = API_CONFIG.timeout;
  }

  /**
   * Check if code is running in browser
   */
  private get isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Get full URL
   */
  private getFullUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.baseURL}${url.startsWith('/') ? url : `/${url}`}`;
  }

  /**
   * Create AbortController with timeout
   */
  private createTimeoutSignal(timeout: number): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  }

  /**
   * Build request headers
   */
  private async buildHeaders(config?: RequestConfig): Promise<HeadersInit> {
    const headers: HeadersInit = {
      ...REQUEST_HEADERS,
      ...config?.headers,
    };

    // Add CSRF token
    if (!config?.skipCSRF) {
      const csrfToken = this.getCsrfToken();
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }
    }

    // Add auth token
    if (!config?.skipAuth) {
      const token = this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Core request method
   */
  private async request<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const fullUrl = this.getFullUrl(url);
    const timeout = config?.timeout || this.defaultTimeout;
    const retries = config?.retries ?? 1;
    const retryDelay = config?.retryDelay ?? 1000;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const headers = await this.buildHeaders(config);
        const signal = this.createTimeoutSignal(timeout);

        // Make request
        const response = await fetch(fullUrl, {
          ...config,
          headers,
          signal,
          credentials: 'include', // Important for cookies
        });

        // Extract CSRF token from response headers
        const csrfToken = response.headers.get('x-csrf-token');
        if (csrfToken) {
          this.setCsrfToken(csrfToken);
        }

        // Handle non-ok responses
        if (!response.ok) {
          await this.handleErrorResponse(response, url, config);
        }

        // Parse response
        const data = await this.parseResponse<T>(response);

        // Log if enabled
        if (API_CONFIG.enableLogging) {
          this.logRequest(url, config?.method || 'GET', response.status, data);
        }

        return data;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on auth errors
        if (ApiError.isApiError(error) && [401, 403].includes(error.statusCode)) {
          throw error;
        }

        // Retry on network/timeout errors
        if (attempt < retries) {
          await this.delay(retryDelay * (attempt + 1));
          continue;
        }

        throw this.handleRequestError(error);
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response, url: string, config?: RequestConfig) {
    let errorData: any = {};
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { message: await response.text() };
      }
    } catch {
      errorData = { message: response.statusText };
    }

    // Handle 401 - Unauthorized (token expired)
    if (response.status === 401 && !url.includes('/auth/refresh')) {
      const newToken = await this.handleTokenRefresh();
      if (newToken) {
        // Retry original request with new token
        return this.request(url, config);
      }
      this.handleAuthError();
    }

    // Handle 403 - CSRF token error
    if (response.status === 403 && errorData.message?.toLowerCase().includes('csrf')) {
      await this.fetchCsrfToken();
      return this.request(url, config);
    }

    const error = createApiError(
      response.status,
      errorData.message || 'Request failed',
      errorData.errors,
      errorData.code
    );

    throw error;
  }

  /**
   * Handle token refresh
   */
  private async handleTokenRefresh(): Promise<string | null> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return null;

        const response = await fetch(this.getFullUrl('/auth/refresh'), {
          method: 'POST',
          headers: REQUEST_HEADERS,
          credentials: 'include',
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          this.clearAuth();
          return null;
        }

        const data = await response.json();
        const { accessToken, refreshToken: newRefreshToken } = data.data;

        this.setAccessToken(accessToken);
        if (newRefreshToken) {
          this.setRefreshToken(newRefreshToken);
        }

        return accessToken;
      } catch (error) {
        this.clearAuth();
        return null;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Handle authentication error
   */
  private handleAuthError() {
    this.clearAuth();
    if (this.isBrowser && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  /**
   * Parse response
   */
  private async parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    const text = await response.text();
    return {
      data: text as unknown as T,
      success: true,
    };
  }

  /**
   * Handle request errors
   */
  private handleRequestError(error: unknown): ApiError {
    if (ApiError.isApiError(error)) {
      return error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return createApiError(408, 'Request timeout');
      }
      if (error.message.includes('Failed to fetch')) {
        return createApiError(0, 'Network error. Please check your connection.');
      }
      return createApiError(0, error.message);
    }

    return createApiError(0, 'An unexpected error occurred');
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Log request (development only)
   */
  private logRequest(url: string, method: string, status: number, data: any) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🌐 API ${method} ${url}`);
      console.log('Status:', status);
      console.log('Response:', data);
      console.groupEnd();
    }
  }

  // ==================== CSRF Token Management ====================

  /**
   * Fetch CSRF token from server
   */
  async fetchCsrfToken(): Promise<string> {
    try {
      const response = await this.request<{ csrfToken: string }>('/auth/csrf-token', {
        skipCSRF: true,
      });
      const token = response.data.csrfToken;
      this.setCsrfToken(token);
      return token;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      throw error;
    }
  }

  setCsrfToken(token: string) {
    this.csrfToken = token;
    if (this.isBrowser) {
      sessionStorage.setItem(AUTH_CONFIG.csrfTokenStorageKey, token);
    }
  }

  getCsrfToken(): string | null {
    if (!this.csrfToken && this.isBrowser) {
      this.csrfToken = sessionStorage.getItem(AUTH_CONFIG.csrfTokenStorageKey);
    }
    return this.csrfToken;
  }

  // ==================== Token Management ====================

  setAccessToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(AUTH_CONFIG.tokenStorageKey, token);
    }
  }

  getAccessToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(AUTH_CONFIG.tokenStorageKey);
    }
    return null;
  }

  setRefreshToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(AUTH_CONFIG.refreshTokenStorageKey, token);
    }
  }

  getRefreshToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(AUTH_CONFIG.refreshTokenStorageKey);
    }
    return null;
  }

  clearAuth() {
    this.csrfToken = null;
    if (this.isBrowser) {
      localStorage.removeItem(AUTH_CONFIG.tokenStorageKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenStorageKey);
      sessionStorage.removeItem(AUTH_CONFIG.csrfTokenStorageKey);
    }
  }

  // ==================== HTTP Methods ====================

  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  // ==================== File Upload ====================

  async uploadFile<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        
        // Upload progress
        if (onProgress) {
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded * 100) / e.total);
              onProgress(progress);
            }
          });
        }

        // Load
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(createApiError(xhr.status, 'Upload failed'));
          }
        });

        // Error
        xhr.addEventListener('error', () => {
          reject(createApiError(0, 'Network error during upload'));
        });

        // Abort
        xhr.addEventListener('abort', () => {
          reject(createApiError(0, 'Upload cancelled'));
        });

        // Open and send
        const fullUrl = this.getFullUrl(url);
        xhr.open('POST', fullUrl);
        
        // Set headers
        const token = this.getAccessToken();
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        }

        xhr.send(formData);
      } catch (error) {
        reject(this.handleRequestError(error));
      }
    });
  }

  async uploadMultipleFiles<T = any>(
    url: string,
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return new Promise(async (resolve, reject) => {
      try {
        const xhr = new XMLHttpRequest();
        
        if (onProgress) {
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded * 100) / e.total);
              onProgress(progress);
            }
          });
        }

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(createApiError(xhr.status, 'Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(createApiError(0, 'Network error during upload'));
        });

        const fullUrl = this.getFullUrl(url);
        xhr.open('POST', fullUrl);
        
        const token = this.getAccessToken();
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        }

        xhr.send(formData);
      } catch (error) {
        reject(this.handleRequestError(error));
      }
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiError };