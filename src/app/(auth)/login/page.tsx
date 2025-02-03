import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/forms/auth-forms/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout illustrationAlt='Login illustration' variant='login'>
      <LoginForm />
    </AuthLayout>
  );
}
