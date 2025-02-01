import React, { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Icon from '@/components/common/Icon';

type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  label?: string;
  error?: string;
  children: React.ReactElement<{
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }>;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, children, className, ...props }, ref) => {
    const fieldId = children.props.id;
    const errorId = fieldId ? `${fieldId}-error` : undefined;

    return (
      <div ref={ref} className={cn('relative space-y-2', className)} {...props}>
        {label && fieldId && (
          <Label
            htmlFor={fieldId}
            className='font-primary text-base leading-6 text-text-primary'>
            {label}
          </Label>
        )}

        {error && errorId
          ? React.cloneElement<React.HTMLAttributes<FormControlElement>>(
              children,
              {
                'aria-describedby': errorId,
                'aria-invalid': true,
              }
            )
          : children}

        {error && (
          <div
            id={errorId}
            role='alert'
            aria-live='polite'
            className='absolute -bottom-5 left-0 flex items-center gap-1'>
            <Icon
              id='#error'
              className='h-[18px] w-[18px] fill-status-error'
              aria-hidden='true'
            />
            <span className='font-primary text-xs leading-[18px] tracking-[0.12px] text-status-error -mb-0.5'>
              {error}
            </span>
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
