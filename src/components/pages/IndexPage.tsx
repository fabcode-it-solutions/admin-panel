'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Moon,
  Sun,
  Component,
  Github,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useThemeStore } from '@/store/themeStore';
import MainHeader from '../layout/MainHeader';

export default function AdvancedHomePage() {
  const { toggleTheme, resolvedTheme } = useThemeStore();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stats = [
    { value: '50+', label: 'Components', icon: Component },
    { value: '99.9%', label: 'Type Coverage', icon: CheckCircle2 },
    { value: '<100ms', label: 'First Paint', icon: Zap },
    { value: '100%', label: 'Responsive', icon: TrendingUp },
  ];


  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2">
              <Badge variant="secondary" className="px-4 py-1">
                <Sparkles className="h-3 w-3 mr-2" />
                v2.0 - Now with App Router
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 bg-clip-text text-transparent leading-tight"
            >
              The Admin Panel       
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Production-ready admin panel with authentication, 50+ components, and everything you
              need to ship faster. Built with Next.js, TypeScript, and modern best practices.
            </motion.p>

          

            {/* Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600 " />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 ">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}