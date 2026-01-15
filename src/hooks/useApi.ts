/**
 * API Hooks
 * Custom React hooks for API calls with loading, error handling, and caching
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError } from '@/lib/api-error';
import { ApiResponse } from '@/lib/api-client';

export interface UseApiOptions {
  immediate?: boolean; // Fetch immediately on mount
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Generic hook for API calls
 */
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFunction(...args);
        
        if (isMountedRef.current) {
          setData(response.data);
          options.onSuccess?.(response.data);
        }
      } catch (err) {
        const apiError = err as ApiError;
        if (isMountedRef.current) {
          setError(apiError);
          options.onError?.(apiError);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [options.immediate, execute]);

  return { data, isLoading, error, execute, reset };
}

/**
 * Hook for mutation operations (POST, PUT, DELETE)
 */
export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mutationFn(variables);
        
        if (isMountedRef.current) {
          setData(response.data);
          options.onSuccess?.(response.data);
        }

        return response;
      } catch (err) {
        const apiError = err as ApiError;
        if (isMountedRef.current) {
          setError(apiError);
          options.onError?.(apiError);
        }
        throw err;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [mutationFn, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    mutate, 
    reset,
    isSuccess: !!data && !error,
    isError: !!error,
  };
}

/**
 * Hook for queries with caching
 */
export function useQuery<T = any>(
  queryKey: string[],
  queryFn: () => Promise<ApiResponse<T>>,
  options: UseApiOptions & { 
    enabled?: boolean;
    refetchInterval?: number;
    staleTime?: number;
  } = {}
) {
  const { enabled = true, refetchInterval, staleTime = 0 } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    const now = Date.now();
    
    // Skip if data is still fresh
    if (data && now - lastFetchTime < staleTime) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await queryFn();
      
      if (isMountedRef.current) {
        setData(response.data);
        setLastFetchTime(Date.now());
        options.onSuccess?.(response.data);
      }
    } catch (err) {
      const apiError = err as ApiError;
      if (isMountedRef.current) {
        setError(apiError);
        options.onError?.(apiError);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [queryFn, data, lastFetchTime, staleTime, options]);

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, ...queryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refetch interval
  useEffect(() => {
    if (enabled && refetchInterval && refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [enabled, refetchInterval, fetchData]);

  const refetch = useCallback(() => {
    setLastFetchTime(0); // Force refetch
    return fetchData();
  }, [fetchData]);

  return {
    data:{data, pagination:{}},
    isLoading,
    error,
    refetch,
    isSuccess: !!data && !error,
    isError: !!error,
  };
}

/**
 * Hook for infinite loading/pagination
 */
export function useInfiniteQuery<T = any>(
  queryFn: (page: number) => Promise<ApiResponse<{ data: T[]; hasMore: boolean }>>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await queryFn(page);
      
      if (isMountedRef.current) {
        setData(prev => [...prev, ...response.data.data]);
        setHasMore(response.data.hasMore);
        setPage(prev => prev + 1);
        options.onSuccess?.(response.data);
      }
    } catch (err) {
      const apiError = err as ApiError;
      if (isMountedRef.current) {
        setError(apiError);
        options.onError?.(apiError);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [page, isLoading, hasMore, queryFn, options]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setIsLoading(false);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    isLoading,
    error,
    hasMore,
    fetchMore,
    reset,
  };
}