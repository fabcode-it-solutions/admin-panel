'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/typography';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const user = useAuthStore((state) => state.user);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-verify if token is in URL
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !verified) {
      handleAutoVerify(token);
    }
  }, [searchParams]);

  const handleAutoVerify = async (token: string) => {
    setIsAutoVerifying(true);
    try {
      await verifyEmail(token);
      setVerified(true);
      toast.success('Email verified!', {
        description: 'Your email has been verified successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid or expired verification link';
      toast.error('Verification failed', {
        description: message,
      });
    } finally {
      setIsAutoVerifying(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === OTP_LENGTH - 1 && value) {
      const otpString = newOtp.join('');
      if (otpString.length === OTP_LENGTH) {
        handleVerify(otpString);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
    
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < OTP_LENGTH) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or submit if complete
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex < OTP_LENGTH - 1) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      handleVerify(newOtp.join(''));
    }
  };

  const handleVerify = async (otpString: string) => {
    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      await verifyEmail(otpString);
      setVerified(true);
      toast.success('Email verified!', {
        description: 'Your email has been verified successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again';
      setError('Invalid verification code');
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
      toast.error('Verification failed', {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // In real app, call resend API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Verification code sent!', {
        description: 'Check your email for the new code',
      });
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-verifying
  if (isAutoVerifying) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size="lg" text="Verifying your email..." />
      </div>
    );
  }

  // Verified
  if (verified) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>

            <div className="space-y-2">
              <Heading level="h3">Email verified!</Heading>
              <Text variant="muted">
                Your email has been verified successfully.
                <br />
                You can now access your dashboard.
              </Text>
            </div>

            <Button
              fullWidth
              onClick={() => router.push('/dashboard')}
              className="mt-4"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>
        <Heading level="h2">Verify your email</Heading>
        <Text variant="muted">
          We&apos;ve sent a 6-digit code to
          <br />
          <span className="font-medium text-foreground">
            {user?.email || 'your email'}
          </span>
        </Text>
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className={cn(
                'w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 transition-all',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                error
                  ? 'border-destructive'
                  : digit
                  ? 'border-primary'
                  : 'border-input',
                'bg-background'
              )}
            />
          ))}
        </div>

        {error && (
          <Text size="sm" variant="muted" className="text-destructive text-center">
            {error}
          </Text>
        )}

        <Button
          type="button"
          fullWidth
          onClick={() => handleVerify(otp.join(''))}
          loading={isLoading}
          disabled={otp.join('').length !== OTP_LENGTH}
          size="lg"
        >
          Verify Email
        </Button>
      </div>

      {/* Resend */}
      <div className="text-center">
        <Text variant="muted" size="sm">
          Didn&apos;t receive the code?{' '}
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="font-medium text-primary hover:underline disabled:opacity-50"
          >
            Resend
          </button>
        </Text>
      </div>

      {/* Back to Login */}
      <div className="text-center text-sm">
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
