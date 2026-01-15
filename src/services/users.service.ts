/**
 * Users Service
 * All user-related API calls (object-based, no classes)
 */

import { apiClient, ApiResponse } from '@/lib/api-client';
import { API_ENDPOINTS, buildUrl } from '@/lib/endpoints';
import { User } from './auth.service';

/* =========================
   Types
========================= */

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const usersService = {
  /**
   * Get paginated list of users
   */
  getUsers(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const url = buildUrl(API_ENDPOINTS.users.list, params);
    return apiClient.get<PaginatedResponse<User>>(url);
  },

  /**
   * Get user by ID
   */
  getUserById(
    id: string
  ): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<{ user: User }>(
      API_ENDPOINTS.users.byId(id)
    );
  },

  /**
   * Create new user
   */
  createUser(
    data: CreateUserData
  ): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post<{ user: User }>(
      API_ENDPOINTS.users.create,
      data
    );
  },

  /**
   * Update user
   */
  updateUser(
    id: string,
    data: UpdateUserData
  ): Promise<ApiResponse<{ user: User }>> {
    return apiClient.put<{ user: User }>(
      API_ENDPOINTS.users.update(id),
      data
    );
  },

  /**
   * Delete user
   */
  deleteUser(
    id: string
  ): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(
      API_ENDPOINTS.users.delete(id)
    );
  },

  /**
   * Get current user profile
   */
  getProfile(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<{ user: User }>(
      API_ENDPOINTS.users.profile
    );
  },

  /**
   * Update current user profile
   */
  updateProfile(
    data: UpdateUserData
  ): Promise<ApiResponse<{ user: User }>> {
    return apiClient.put<{ user: User }>(
      API_ENDPOINTS.users.updateProfile,
      data
    );
  },

  /**
   * Change password
   */
  changePassword(
    data: ChangePasswordData
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      API_ENDPOINTS.users.changePassword,
      data
    );
  },

  /**
   * Upload user avatar
   */
  uploadAvatar(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ url: string }>> {
    return apiClient.uploadFile<{ url: string }>(
      API_ENDPOINTS.upload.single,
      file,
      onProgress
    );
  },
};
