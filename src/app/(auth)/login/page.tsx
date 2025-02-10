import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/forms/auth-forms/LoginForm";
import { LoadingScreen } from "@/components/common/LoadingScreen";

export default function LoginPage() {
  return (
    <AuthLayout illustrationAlt='Login illustration' variant='login'>
      <Suspense fallback={<LoadingScreen />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
