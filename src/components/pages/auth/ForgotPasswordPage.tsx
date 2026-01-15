'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Heading, Text } from '@/components/typography';
import { Card } from '@/components/ui/Card';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setEmailSent(true);
      toast.success('Reset link sent!', {
        description: 'Check your email for the password reset link',
      });
    } catch (error: any) {
      toast.error('Failed to send reset link', {
        description: error.message || 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success('Reset link resent!');
    } catch (error: any) {
      toast.error('Failed to resend link');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>

            <div className="space-y-2">
              <Heading level="h3">Check your email</Heading>
              <Text variant="muted">
                We've sent a password reset link to
                <br />
                <span className="font-medium text-foreground">{email}</span>
              </Text>
            </div>

            <div className="w-full space-y-3 pt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={handleResend}
                loading={isLoading}
              >
                Resend email
              </Button>

              <Button
                variant="ghost"
                fullWidth
                onClick={() => router.push('/login')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <Text size="sm" variant="muted">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResend}
              className="text-primary hover:underline font-medium"
            >
              try again
            </button>
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Heading level="h2">Forgot password?</Heading>
        <Text variant="muted" align={'center'}>
          No worries, we'll send you reset instructions
        </Text>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={error}
          leftIcon={<Mail className="h-4 w-4" />}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          size="lg"
        >
          Send reset link
        </Button>
      </form>

      {/* Back to Login */}
      <Button
        variant="ghost"
        fullWidth
        onClick={() => router.push('/login')}
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Button>
    </div>
  );
}
