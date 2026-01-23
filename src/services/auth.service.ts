/**
 * Auth Service
 * All authentication-related API calls (object-based)
 */

import { apiClient, ApiResponse } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/endpoints';

/* =========================
   Types
========================= */

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  emailVerified?: boolean;
  isActive?: boolean;
}
export interface Report {
  id: string;
  reportId: string;
  reportedBy: string;
  reportedUser: string;
  type: "Spam" | "Abuse" | "Fake" | "Harassment";
  description: string;
  status: "Pending" | "In Review" | "Resolved" | "Rejected";
  createdAt: string;
}

export interface LoginCredentials {
  loginIdentifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface VerifyEmailData {
  token: string;
  otp?: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

/* =========================
   Auth Service
========================= */

export const authService = {
  /**
   * Login user
   */
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );

    // Store tokens
    if (response.data.accessToken) {
      apiClient.setAccessToken(response.data.accessToken);
    }
    if (response.data.refreshToken) {
      apiClient.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  /**
   * Signup new user
   */
  async signup(
    data: SignupData
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.auth.signup,
      data
    );

    // Store tokens if returned (auto-login after signup)
    if (response.data.accessToken) {
      apiClient.setAccessToken(response.data.accessToken);
    }
    if (response.data.refreshToken) {
      apiClient.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<void>(API_ENDPOINTS.auth.logout);
    } finally {
      // Always clear local auth data, even if API call fails
      apiClient.clearAuth();
    }
  },

  /**
   * Get current user
   */
  getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<{ user: User }>(
      API_ENDPOINTS.auth.me
    );
  },

  /**
   * Verify email with token/OTP
   */
  verifyEmail(
    data: VerifyEmailData
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      API_ENDPOINTS.auth.verifyEmail,
      data
    );
  },

  /**
   * Resend verification email
   */
  resendVerification(
    email: string
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      API_ENDPOINTS.auth.resendVerification,
      { email }
    );
  },

  /**
   * Request password reset
   */
  forgotPassword(
    email: string
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      API_ENDPOINTS.auth.forgotPassword,
      { email }
    );
  },

  /**
   * Reset password with token
   */
  resetPassword(
    data: ResetPasswordData
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      API_ENDPOINTS.auth.resetPassword,
      data
    );
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    const refreshToken = apiClient.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    );

    // Update tokens
    if (response.data.accessToken) {
      apiClient.setAccessToken(response.data.accessToken);
    }
    if (response.data.refreshToken) {
      apiClient.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  /**
   * Get CSRF token
   */
  getCsrfToken(): Promise<string> {
    return apiClient.fetchCsrfToken();
  },
};
