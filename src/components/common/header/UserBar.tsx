'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/selectors';
import Icon from '@/components/common/Icon';
import { LogoutButton } from './LogoutButton';

interface UserBarProps {
  hiddenLogout?: boolean;
}

export function UserBar({ hiddenLogout = false }: UserBarProps) {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex items-center">
      <span className="font-primary text-base font-medium text-text-primary md:text-xl lg:text-xl">
        {user?.name}
      </span>

      <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-[30px] bg-brand-primary md:ml-2.5 md:h-12 md:w-12 lg:mb-1 lg:ml-2.5 lg:h-12 lg:w-12">
        <Icon
          id="#user"
          className="h-5 w-5 fill-text-inverse/70 md:h-6 md:w-6 lg:h-6 lg:w-6"
          aria-hidden="true"
        />
      </div>

      {!hiddenLogout && <LogoutButton variant="desktop" />}
    </div>
  );
}
