import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/forms/auth-forms/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout illustrationAlt='Register illustration' variant='register'>
      <RegisterForm />
    </AuthLayout>
  );
}
