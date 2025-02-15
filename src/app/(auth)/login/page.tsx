'use client';

import { Suspense, useEffect } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/forms/auth-forms/LoginForm';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { showError } from '@/lib/utils';

export default function LoginPage() {
  useEffect(() => {
    requestAnimationFrame(() => {
      const authError = sessionStorage.getItem('auth_error');

      if (authError) {
        showError(authError);
        sessionStorage.removeItem('auth_error');
      }
    });
  }, []);

  return (
    <AuthLayout illustrationAlt="Login illustration" variant="login">
      <Suspense fallback={<LoadingScreen />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
