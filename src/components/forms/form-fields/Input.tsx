import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded-[15px] border border-border-default bg-transparent px-[18px] py-4',
          'font-primary text-base leading-6 text-text-primary',
          'placeholder:text-text-primary',
          'transition-[border] duration-200 ease-in-out',
          'hover:border-border-hover',
          'focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-border-hover',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && [
            'border-status-error',
            'hover:border-status-error',
            'focus:border-status-error focus:ring-status-error',
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
