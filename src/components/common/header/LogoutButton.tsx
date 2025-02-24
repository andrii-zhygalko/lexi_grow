'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { signout } from '@/redux/features/auth/operations';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
  onLogout?: () => void;
}

export function LogoutButton({
  variant = 'desktop',
  className,
  onLogout,
}: LogoutButtonProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(signout()).unwrap();
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={cn(
        'p-1 font-primary text-base font-medium group',
        variant === 'mobile' &&
          'text-text-inverse justify-start p-0 active:text-text-inverse/70 hover:text-text-inverse/70 group',
        variant === 'desktop' && 'ml-4',
        className
      )}
    >
      Log out
      <Icon
        id="#arrow-right-logout"
        className={cn(
          'ml-1.5 h-4 w-4 fill-none transition-all duration-200 group-hover:translate-x-0.5 mb-0.5 group-active:translate-x-0.5',
          variant === 'desktop'
            ? 'stroke-text-primary group-hover:stroke-brand-primary'
            : 'stroke-text-inverse group-hover:stroke-text-inverse/70'
        )}
        aria-hidden="true"
      />
    </Button>
  );
}
