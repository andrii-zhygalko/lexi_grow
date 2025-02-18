import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean;
  variant?: 'default' | 'light';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, variant = 'default', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded-[15px] border transition-[border] duration-200 ease-in-out',
          'font-primary text-base leading-6',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'default' && [
            'border-border-default bg-transparent px-[18px] py-4',
            'text-text-primary placeholder:text-text-primary',
            'hover:border-border-hover',
            'focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-border-hover',
          ],
          variant === 'light' && [
            'border-border-inputLight bg-transparent px-[18px] py-4',
            'text-text-inverse placeholder:text-text-inverse',
            'hover:border-border-inverse',
            'focus:border-border-inverse focus:outline-none focus:ring-1 focus:ring-border-inputAccentLight',
          ],
          error && [
            'border-status-error',
            'hover:border-status-error',
            'focus:border-status-error focus:ring-status-error',
          ],
          variant === 'light' &&
            error && [
              'border-status-errorDark',
              'hover:border-status-errorDark',
              'focus:border-status-errorDark focus:ring-status-errorDark',
            ],
          !error &&
            props.value && [
              'border-status-success',
              'hover:border-status-success',
              'focus:border-status-success focus:ring-status-success',
            ],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
