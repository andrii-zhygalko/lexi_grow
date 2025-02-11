'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/selectors';
import { signout } from '@/redux/features/auth/operations';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';

export function UserBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(signout()).unwrap();
    router.push('/login');
  };

  return (
    <div className='flex items-center'>
      <span className='text-text-primary font-primary text-xl font-medium'>
        {user?.name}
      </span>

      <div className='ml-2.5 flex h-12 w-12 items-center justify-center rounded-[30px] bg-brand-primary'>
        <Icon
          id='#user'
          className='h-6 w-6 fill-text-inverse/70'
          aria-hidden='true'
        />
      </div>

      <Button
        variant='ghost'
        onClick={handleLogout}
        className='p-1 ml-4 font-primary text-base font-medium group'>
        Log out
        <Icon
          id='#arrow-right-logout'
          className='mb-1.5 ml-1.5 h-4 w-4 stroke-text-primary fill-none transition-transform duration-200 group-hover:translate-x-1'
          aria-hidden='true'
        />
      </Button>
    </div>
  );
}
