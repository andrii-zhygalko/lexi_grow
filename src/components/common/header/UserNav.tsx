import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dictionary', href: '/dictionary' },
  { name: 'Recommend', href: '/recommend' },
  { name: 'Training', href: '/training' },
];

export function UserNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto">
      <ul className="flex items-center gap-2">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex h-[48px] min-w-[100px] items-center justify-center rounded-[15px] px-5 py-3',
                'font-primary text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-brand-primary text-background-page'
                  : 'text-text-primary hover:text-brand-primary'
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
