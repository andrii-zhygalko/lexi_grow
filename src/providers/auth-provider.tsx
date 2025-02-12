'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getCurrentUser } from '@/redux/features/auth/operations';
import { authService } from '@/services/api/auth';
import { useAppToast } from '@/lib/utils';

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { showError } = useAppToast();

  useEffect(() => {
    async function checkAuth() {
      const token = authService.getToken();

      if (token) {
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          if (error instanceof Error && error.message.includes('401')) {
            showError('Authentication failed');
            authService.removeToken();
          }
        }
      }
    }

    checkAuth();
  }, [dispatch, showError]);

  return <>{children}</>;
}
