'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Component, UserPlus, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/Button';
import { useThemeStore } from '@/store/themeStore';

export default function IndexPage() {
  const { toggleTheme, resolvedTheme } = useThemeStore();
  

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
        
      {/* Theme Toggle */}
   <div className="absolute top-6 right-6">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <Component className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Get started by exploring our components, signing up, or accessing your dashboard
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Components Button */}
            <Link href="/components">
              <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit">
                    <Component className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Components
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Explore our UI component library
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Signup Button */}
            <Link href="/signup">
              <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl w-fit">
                    <UserPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Sign Up
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Create a new account to get started
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dashboard Button */}
            <Link href="/dashboard">
              <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit">
                    <LayoutDashboard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Dashboard
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Access your personal dashboard
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}