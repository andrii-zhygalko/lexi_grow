import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { UserNav } from './UserNav';
import { UserBar } from './UserBar';

export function Header() {
  return (
    <header className='px-[100px] py-5 bg-background-white'>
      <div className='flex items-center justify-between'>
        <Link href='/dictionary' className='flex items-center gap-4'>
          <Icon id='#lexigrow' className='h-10 w-10' aria-hidden='true' />
          <span className='-mb-1.5 font-primary text-[22px] font-semibold leading-8 text-text-primary'>
            LexiGrow
          </span>
        </Link>

        <UserNav />
        <UserBar />
      </div>
    </header>
  );
}
