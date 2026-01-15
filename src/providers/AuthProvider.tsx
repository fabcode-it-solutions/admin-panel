'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useIsAuthenticated } from '@/store/authStore';
import { Loader } from '@/components/ui/Loader';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

export interface AuthProviderProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthProvider({ children, requireAuth = true }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { refreshUser, isLoading } = useAuthStore();
  const isAuthenticated = true;

  useEffect(() => {
    // Try to refresh user session on mount
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    if (!isLoading && requireAuth) {
      const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route));

      // Redirect to login if not authenticated and trying to access protected route
      if (!isAuthenticated && !isPublicRoute) {
        router.push('/login');
      }

      // Redirect to dashboard if authenticated and trying to access auth pages
      if (isAuthenticated && isPublicRoute) {
        router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, pathname, router, requireAuth]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: { redirectTo?: string }
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthStore();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push(options?.redirectTo || '/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader size="lg" text="Loading..." />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Hook for programmatic auth checks
export function useRequireAuth(redirectTo: string = '/login') {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
}
