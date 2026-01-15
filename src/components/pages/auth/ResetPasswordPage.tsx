'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Heading, Text } from '@/components/typography';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { toast } from 'sonner';
import { validatePassword } from '@/lib/utils';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get token from URL
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      // In a real app, validate token with backend here
      setTimeout(() => {
        setIsTokenValid(true);
        setIsValidatingToken(false);
      }, 1000);
    } else {
      setIsTokenValid(false);
      setIsValidatingToken(false);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, formData.password);
      setResetComplete(true);
      toast.success('Password reset successfully!', {
        description: 'You can now login with your new password',
      });
    } catch (error: any) {
      toast.error('Password reset failed', {
        description: error.message || 'Please try again or request a new reset link',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validating token
  if (isValidatingToken) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size="lg" text="Validating reset link..." />
      </div>
    );
  }

  // Invalid token
  if (!isTokenValid) {
    return (
      <div className="space-y-6">
        <Card className="p-6 border-destructive">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <Heading level="h3">Invalid or expired link</Heading>
              <Text variant="muted">
                This password reset link is invalid or has expired.
                <br />
                Please request a new one.
              </Text>
            </div>

            <div className="w-full space-y-3 pt-4">
              <Button
                fullWidth
                onClick={() => router.push('/forgot-password')}
              >
                Request new link
              </Button>

              <Button
                variant="ghost"
                fullWidth
                onClick={() => router.push('/login')}
              >
                Back to login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Reset complete
  if (resetComplete) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>

            <div className="space-y-2">
              <Heading level="h3">Password reset successful!</Heading>
              <Text variant="muted">
                Your password has been reset successfully.
                <br />
                You can now login with your new password.
              </Text>
            </div>

            <Button
              fullWidth
              onClick={() => router.push('/login')}
              className="mt-4"
            >
              Continue to login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Heading level="h2">Reset password</Heading>
        <Text variant="muted">
          Enter your new password below
        </Text>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          label="New Password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          helperText="Must be at least 8 characters with uppercase, lowercase, number, and special character"
          leftIcon={<Lock className="h-4 w-4" />}
          required
          disabled={isLoading}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter new password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          leftIcon={<Lock className="h-4 w-4" />}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          size="lg"
        >
          Reset password
        </Button>
      </form>

      {/* Back to Login */}
      <div className="text-center text-sm">
        <Text variant="muted" as="span">
          Remember your password?{' '}
        </Text>
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
