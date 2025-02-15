'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getCurrentUser } from '@/redux/features/auth/operations';
import { authService } from '@/services/api/auth';

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = authService.getToken();

    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return <>{children}</>;
}
