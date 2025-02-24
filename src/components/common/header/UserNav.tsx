'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dictionary', href: '/dictionary' },
  { name: 'Recommend', href: '/recommend' },
  { name: 'Training', href: '/training' },
];

export function UserNav({
  variant = 'desktop',
}: {
  variant?: 'desktop' | 'mobile';
}) {
  const pathname = usePathname();

  return (
    <nav className={variant === 'desktop' ? 'mx-auto' : ''}>
      <ul
        className={cn(
          'flex items-start gap-2',
          variant === 'mobile' && 'flex-col gap-4'
        )}
      >
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center justify-center rounded-[15px] px-5 py-3 transition-colors',
                variant === 'desktop' &&
                  'h-[48px] min-w-[100px] font-primary text-sm font-medium md:text-base',
                variant === 'mobile' &&
                  'h-12 w-full justify-start font-primary text-sm font-medium md:min-w-[148px] md:text-lg',
                pathname === item.href
                  ? variant === 'desktop'
                    ? 'bg-brand-primary text-background-page'
                    : 'bg-background-page text-text-primary justify-center'
                  : variant === 'desktop'
                  ? 'text-text-primary hover:text-brand-primary'
                  : 'text-text-inverse hover:text-text-inverse/70 px-0'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
