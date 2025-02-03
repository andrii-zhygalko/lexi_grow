"use client";

import { useAppSelector } from "@/redux/hooks";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { selectUser, selectIsLoading } from "@/redux/features/auth/selectors";
import { Header } from "@/components/common/header/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen'>
      <Header />
      <main>{children}</main>
    </div>
  );
}
