/**
 * API Error Classes
 * Custom error handling for API requests
 */

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  code?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors?: Record<string, string[]>;
  public code?: string;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Check if error is an ApiError instance
   */
  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  /**
   * Get first error message from validation errors
   */
  getFirstError(): string | undefined {
    if (!this.errors) return undefined;
    const firstKey = Object.keys(this.errors)[0];
    return this.errors[firstKey]?.[0];
  }

  /**
   * Get all error messages as flat array
   */
  getAllErrors(): string[] {
    if (!this.errors) return [this.message];
    return Object.values(this.errors).flat();
  }

  /**
   * Convert to plain object
   */
  toJSON(): ApiErrorResponse {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
      code: this.code,
    };
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Network error occurred') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiError {
  constructor(message = 'Request timeout') {
    super(message, 408);
    this.name = 'TimeoutError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Access forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', errors?: Record<string, string[]>) {
    super(message, 422, errors);
    this.name = 'ValidationError';
  }
}

export class ServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

/**
 * Factory function to create appropriate error based on status code
 */
export function createApiError(
  statusCode: number,
  message: string,
  errors?: Record<string, string[]>,
  code?: string
): ApiError {
  switch (statusCode) {
    case 0:
      return new NetworkError(message);
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    case 408:
      return new TimeoutError(message);
    case 422:
      return new ValidationError(message, errors);
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message);
    default:
      return new ApiError(message, statusCode, errors, code);
  }
}