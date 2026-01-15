/**
 * Auth Store
 * Zustand store for authentication state management
 * Uses the new fetch-based API client
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authService,
  User,
  LoginCredentials,
  SignupData,
} from "@/services/auth.service";
import { apiClient } from "@/lib/api-client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  // Auth actions
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;

  // Email verification
  verifyEmail: (token: string, otp?: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;

  // Password reset
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;

  // User management
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;

  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;

  // Loading state
  setLoading: (isLoading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);

          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Signup
      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signup(data);

          // If backend auto-logs in after signup
          if (response.data.accessToken) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            // If email verification required
            set({
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || "Signup failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Verify email
      verifyEmail: async (token: string, otp?: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.verifyEmail({ token, otp });

          // Refresh user to get updated emailVerified status
          await get().refreshUser();

          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Email verification failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Resend verification email
      resendVerification: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resendVerification(email);
          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to resend verification email",
            isLoading: false,
          });
          throw error;
        }
      },

      // Forgot password
      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.forgotPassword(email);
          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to send reset email",
            isLoading: false,
          });
          throw error;
        }
      },

      // Reset password
      resetPassword: async (
        token: string,
        password: string,
        confirmPassword: string
      ) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resetPassword({ token, password, confirmPassword });
          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Password reset failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Refresh current user
      refreshUser: async () => {
        const token = apiClient.getAccessToken();

        if (!token) {
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authService.getCurrentUser();
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          // Token is invalid, clear auth
          apiClient.clearAuth();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Set user
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      // Set error
      setError: (error: string | null) => {
        set({ error });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage",
      // Only persist user and isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for optimized component re-renders
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// Computed selectors
export const useUserRole = () => useAuthStore((state) => state.user?.role);
export const useIsEmailVerified = () =>
  useAuthStore((state) => state.user?.emailVerified);
