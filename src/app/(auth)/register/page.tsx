import { Suspense } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/forms/auth-forms/RegisterForm';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export default function RegisterPage() {
  return (
    <AuthLayout illustrationAlt="Register illustration" variant="register">
      <Suspense fallback={<LoadingScreen />}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
