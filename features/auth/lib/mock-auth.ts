import type {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  AuthResult,
  AuthSession,
  User,
} from '../types';

const MOCK_DELAY = 1200;

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'employee@timeforge.com',
    password: 'Password1!',
    firstName: 'Alex',
    lastName: 'Johnson',
    role: 'employee',
    department: 'Engineering',
    registrationStatus: 'approved',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'supervisor@timeforge.com',
    password: 'Password1!',
    firstName: 'Morgan',
    lastName: 'Chen',
    role: 'supervisor',
    department: 'Engineering',
    registrationStatus: 'approved',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'hr@timeforge.com',
    password: 'Password1!',
    firstName: 'Jordan',
    lastName: 'Martinez',
    role: 'hr_finance',
    department: 'Human Resources',
    registrationStatus: 'approved',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'admin@timeforge.com',
    password: 'Password1!',
    firstName: 'Riley',
    lastName: 'Thompson',
    role: 'admin',
    department: 'IT',
    registrationStatus: 'approved',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    email: 'pending@timeforge.com',
    password: 'Password1!',
    firstName: 'Sam',
    lastName: 'Wilson',
    role: 'employee',
    department: 'Marketing',
    registrationStatus: 'pending',
    emailVerified: true,
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: '6',
    email: 'rejected@timeforge.com',
    password: 'Password1!',
    firstName: 'Casey',
    lastName: 'Brown',
    role: 'employee',
    department: 'Sales',
    registrationStatus: 'rejected',
    emailVerified: true,
    createdAt: '2024-06-01T00:00:00Z',
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateToken(): string {
  return Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('');
}

export async function mockLogin(
  credentials: LoginCredentials
): Promise<AuthResult<{ session: AuthSession; redirectPath: string }>> {
  await delay(MOCK_DELAY);

  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
  );

  if (!user) {
    return {
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
    };
  }

  if (user.password !== credentials.password) {
    return {
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
    };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      error: {
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Please verify your email address before signing in.',
      },
    };
  }

  if (user.registrationStatus === 'pending') {
    return {
      success: false,
      error: {
        code: 'REGISTRATION_PENDING',
        message: 'Your account is pending approval from an administrator.',
      },
    };
  }

  if (user.registrationStatus === 'rejected') {
    return {
      success: false,
      error: {
        code: 'REGISTRATION_REJECTED',
        message: 'Your registration has been declined.',
      },
    };
  }

  const { password: _, ...safeUser } = user;
  const session: AuthSession = {
    user: safeUser,
    token: generateToken(),
    expiresAt: new Date(Date.now() + (credentials.rememberMe ? 30 : 1) * 24 * 60 * 60 * 1000).toISOString(),
  };

  const roleRedirects: Record<string, string> = {
    employee: '/dashboard/employee',
    supervisor: '/dashboard/supervisor',
    hr_finance: '/dashboard/hr-finance',
    admin: '/dashboard/admin',
  };

  return {
    success: true,
    data: { session, redirectPath: roleRedirects[safeUser.role] },
  };
}

export async function mockRegister(
  data: RegisterData
): Promise<AuthResult<{ message: string }>> {
  await delay(MOCK_DELAY);

  const emailExists = mockUsers.some(
    (u) => u.email.toLowerCase() === data.email.toLowerCase()
  );

  if (emailExists) {
    return {
      success: false,
      error: {
        code: 'EMAIL_EXISTS',
        message: 'An account with this email address already exists.',
        field: 'email',
      },
    };
  }

  return {
    success: true,
    data: {
      message: 'Registration submitted successfully. Please check your email to verify your account.',
    },
  };
}

export async function mockForgotPassword(
  data: ForgotPasswordData
): Promise<AuthResult<{ message: string }>> {
  await delay(MOCK_DELAY);

  return {
    success: true,
    data: {
      message: `If an account exists for ${data.email}, you will receive a password reset link shortly.`,
    },
  };
}

export async function mockResetPassword(
  data: ResetPasswordData
): Promise<AuthResult<{ message: string }>> {
  await delay(MOCK_DELAY);

  if (data.token !== 'valid-reset-token') {
    return {
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'This password reset link is invalid or has expired.',
      },
    };
  }

  return {
    success: true,
    data: { message: 'Your password has been reset successfully.' },
  };
}

export async function mockResendVerification(
  email: string
): Promise<AuthResult<{ message: string }>> {
  await delay(MOCK_DELAY);

  return {
    success: true,
    data: { message: `Verification email resent to ${email}.` },
  };
}
