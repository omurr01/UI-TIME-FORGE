'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AuthCard, AuthCardHeader } from '@/features/auth/components/auth-card';
import { AuthAlert } from '@/features/auth/components/auth-alert';
import { PasswordInput } from '@/features/auth/components/password-input';
import { mockRegister } from '@/features/auth/lib/mock-auth';
import { registerSchema, type RegisterFormData } from '@/features/auth/lib/validation';

const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Legal',
  'Customer Success',
  'Product',
  'Design',
  'IT',
  'Executive',
];

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  async function onSubmit(data: RegisterFormData) {
    setServerError(null);

    const result = await mockRegister(data);

    if (!result.success) {
      setServerError(result.error.message);
      return;
    }

    router.push('/verify-email');
  }

  return (
    <AuthCard className="max-w-lg mx-auto">
      <AuthCardHeader
        title="Create your account"
        description="Submit your registration and an admin will review and approve your access."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && <AuthAlert variant="error" message={serverError} />}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Jane"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Smith"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane.smith@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={(val) => setValue('department', val, { shouldValidate: true })}>
              <SelectTrigger id="department" aria-invalid={!!errors.department}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && (
              <p className="text-xs text-destructive">{errors.department.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="jobTitle">Job title</Label>
            <Input
              id="jobTitle"
              placeholder="Software Engineer"
              aria-invalid={!!errors.jobTitle}
              {...register('jobTitle')}
            />
            {errors.jobTitle && (
              <p className="text-xs text-destructive">{errors.jobTitle.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            showStrength
            aria-invalid={!!errors.password}
            value={password ?? ''}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Repeat your password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            value={watch('confirmPassword') ?? ''}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          By registering, you agree to TimeForge&apos;s{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Submitting registration...
            </>
          ) : (
            'Submit registration'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </AuthCard>
  );
}
