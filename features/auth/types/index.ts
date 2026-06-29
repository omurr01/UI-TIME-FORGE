export type UserRole = 'employee' | 'supervisor' | 'hr_finance' | 'admin';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  registrationStatus: RegistrationStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export type AuthResult<T> =
  | { success: true; data: T }
  | { success: false; error: AuthError };
