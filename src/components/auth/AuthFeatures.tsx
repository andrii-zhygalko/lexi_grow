import { cn } from '@/lib/utils';

interface AuthFeaturesProps {
  variant: 'login' | 'register';
}

export function AuthFeatures({ variant }: AuthFeaturesProps) {
  const features = ['Word', 'Translation', 'Grammar', 'Progress'];

  return (
    <div
      className={cn(
        'flex items-center text-center font-primary text-base leading-6 text-text-secondary',
        variant === 'login' && [
          'mt-4',
          'md:mt-[172px]',
          'md:pb-[106px]',
          'lg:mt-4',
          'lg:pb-0',
        ],
        variant === 'register' && [
          'hidden',
          'md:flex',
          'md:mt-[98px]',
          'md:pb-[106px]',
          'lg:mt-4',
          'lg:pb-0',
        ]
      )}>
      {features.map((feature, index) => (
        <span key={`${feature}-${index}`} className='flex items-center'>
          {index > 0 && (
            <span className='mx-2' aria-hidden='true'>
              ·
            </span>
          )}
          {feature}
        </span>
      ))}
    </div>
  );
}
