'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider requireAuth={true}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
}
