'use client';

import React, { useEffect, memo } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSidebarOpen, useUIStore } from '@/store/uiStore';
import { useBreakpoint } from '@/hooks/useMediaQuery';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
}

const DashboardLayoutComponent: React.FC<DashboardLayoutProps> = ({
  children,
  className,
  showHeader = true,
  showSidebar = true,
}) => {
  const pathname = usePathname();
  const sidebarOpen = useSidebarOpen();
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const { isMobile, isTablet } = useBreakpoint();

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Auto-collapse sidebar on tablet
  useEffect(() => {
    if (isTablet && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isTablet]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      {showSidebar && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && isMobile && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="lg:hidden"
                >
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          'min-h-screen transition-all duration-300',
          showSidebar && 'lg:ml-[280px]',
          showSidebar && !sidebarOpen && 'lg:ml-[80px]'
        )}
      >
        {/* Header */}
        {showHeader && <Header />}

        {/* Page Content */}
        <main
          className={cn(
            'p-4 md:p-6 lg:p-8',
            showHeader && 'pt-4',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export const DashboardLayout = memo(DashboardLayoutComponent);
