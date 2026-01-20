'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  ShoppingCart,
  Calendar,
  Mail,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarOpen, useUIStore } from '@/store/uiStore';
import { useUser, useAuthStore } from '@/store/authStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { SimpleAccordion } from '../ui/Accordion';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: Omit<NavItem, 'children'>[];
}

const defaultNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
    badge: 4,
  },
  // {
  //   label: 'Products',
  //   href: '/dashboard/products',
  //   icon: <ShoppingCart className="h-5 w-5" />,
  //   children: [
  //     { label: 'All Products', href: '/products', icon: <></> },
  //     { label: 'Categories', href: '/products/categories', icon: <></> },
  //     { label: 'Inventory', href: '/products/inventory', icon: <></> },
  //   ],
  // },
  {
    label: 'Role & Permission',
    href: '/dashboard/roles-permission',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  // {
  //   label: 'Analytics',
  //   href: '/dashboard/analytics',
  //   icon: <BarChart3 className="h-5 w-5" />,
  // },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText className="h-5 w-5" />,
    badge: 5,
  },
  // {
  //   label: 'Calendar',
  //   href: '/calendar',
  //   icon: <Calendar className="h-5 w-5" />,
  // },
  // {
  //   label: 'Messages',
  //   href: '/dashboard/messages',
  //   icon: <Mail className="h-5 w-5" />,
  //   badge: 3,
  // },
  {
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: <Bell className="h-5 w-5" />,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export interface SidebarProps {
  navItems?: NavItem[];
  className?: string;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  navItems = defaultNavItems,
  className,
}) => {
  const pathname = usePathname();
  const sidebarOpen = useSidebarOpen();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const user = useUser();
  const logout = useAuthStore((state) => state.logout);

  const NavLink = ({ item, nested = false }: { item: NavItem; nested?: boolean }) => {
    const isActive = pathname === item.href;

    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg transition-all group',
          'hover:bg-accent hover:text-accent-foreground',
          isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
          !sidebarOpen && 'justify-center',
          nested && 'pl-12 text-sm'
        )}
      >
        <span className="shrink-0">{item.icon}</span>
        {sidebarOpen && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  'px-2 py-0.5 text-xs font-semibold rounded-full',
                  isActive
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (!sidebarOpen && item.badge) {
      return (
        <Tooltip content={`${item.label} (${item.badge})`} side="right">
          {linkContent}
        </Tooltip>
      );
    }

    if (!sidebarOpen) {
      return (
        <Tooltip content={item.label} side="right">
          {linkContent}
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarOpen ? 280 : 80,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-40',
        className
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
        )}

        {sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin">
        {navItems.map((item) => (
          <div key={item.href}>
            {item.children && sidebarOpen ? (
              <SimpleAccordion
                title={item.label}
                icon={item.icon}
                className="mb-1"
              >
                <div className="space-y-1 mt-2">
                  {item.children.map((child) => (
                    <NavLink key={child.href} item={child} nested />
                  ))}
                </div>
              </SimpleAccordion>
            ) : (
              <NavLink item={item} />
            )}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        {sidebarOpen ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.avatar}
                name={user?.name || 'User'}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="w-full"
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Tooltip content={user?.name || 'User'} side="right">
              <div className="flex justify-center">
                <Avatar
                  src={user?.avatar}
                  name={user?.name || 'User'}
                  size="md"
                />
              </div>
            </Tooltip>
            <Tooltip content="Logout" side="right">
              <Button
                variant="outline"
                size="icon"
                onClick={logout}
                className="w-full"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Collapse Button (when collapsed) */}
      {!sidebarOpen && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="w-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </motion.aside>
  );
};

export const Sidebar = memo(SidebarComponent);
