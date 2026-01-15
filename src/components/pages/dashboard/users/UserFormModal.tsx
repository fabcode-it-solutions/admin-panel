'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'sonner';
import { useMutation } from '@/hooks/useApi';
import { usersService } from '@/services/users.service';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['admin', 'editor', 'user']),
  isActive: z.boolean(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any; // Existing user for edit mode
  onSuccess?: () => void;
}

export function UserFormModal({ isOpen, onClose, user, onSuccess }: UserFormModalProps) {
  const isEditMode = !!user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          phone: user.phone || '',
          bio: user.bio || '',
        }
      : {
          name: '',
          email: '',
          password: '',
          role: 'user',
          isActive: true,
          phone: '',
          bio: '',
        },
  });

  const isActive = watch('isActive');

  const createMutation = useMutation(
    (data: any) => usersService.createUser(data),
    {
      onSuccess: () => {
        toast.success('User created successfully');
        reset();
        onClose();
        onSuccess?.();
      },
      onError: (error: any) => {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]: [string, any]) => {
            toast.error(messages[0]);
          });
        } else {
          toast.error(error.message || 'Failed to create user');
        }
      },
    }
  );

  const updateMutation = useMutation(
    (data: any) => usersService.updateUser(user.id, data),
    {
      onSuccess: () => {
        toast.success('User updated successfully');
        onClose();
        onSuccess?.();
      },
      onError: (error: any) => {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]: [string, any]) => {
            toast.error(messages[0]);
          });
        } else {
          toast.error(error.message || 'Failed to update user');
        }
      },
    }
  );

  const onSubmit = (data: UserFormData) => {
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit User' : 'Add New User'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
            {isEditMode ? 'Update User' : 'Create User'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="John Doe"
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="john@example.com"
          required
        />

        {/* Password (only for create) */}
        {!isEditMode && (
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="••••••••"
            required
            helperText="Minimum 8 characters"
          />
        )}

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          placeholder="+1 (555) 000-0000"
        />

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <Select
            options={[
              { value: 'user', label: 'User - Basic access' },
              { value: 'editor', label: 'Editor - Can edit content' },
              { value: 'admin', label: 'Admin - Full access' },
            ]}
            value={watch('role')}
            onChange={(value) => setValue('role', value as any)}
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* Bio */}
        <Textarea
          label="Bio"
          {...register('bio')}
          error={errors.bio?.message}
          placeholder="Tell us about yourself..."
          rows={3}
        />

        {/* Active Status */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Active Status
            </label>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isActive ? 'User can access the system' : 'User account is disabled'}
            </p>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => setValue('isActive', checked)}
          />
        </div>
      </form>
    </Modal>
  );
}