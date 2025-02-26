import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Icon from './Icon';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  background?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  background = 'bg-brand-primary',
  children,
  className,
  contentClassName,
  hideTitle = false,
  hideDescription = false,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-background-overlayLight data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'p-0 border-0',
          'data-[state=open]:duration-200',
          '[&>button]:hidden',
          'max-h-[90vh] flex flex-col',
          'rounded-[30px]',
          'overflow-hidden',
          background,
          className
        )}
      >
        <div className={cn('flex-shrink-0 ', contentClassName)}>
          <DialogHeader className="relative px-4 md:px-16 pt-12">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="absolute right-5 top-5 p-0 group z-10"
              >
                <Icon
                  id="#close"
                  className="h-8 w-8 stroke-text-inverse fill-none group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>

            <DialogTitle
              className={cn(
                hideTitle && 'sr-only',
                !hideTitle &&
                  'font-primary text-2xl md:text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-text-inverse'
              )}
            >
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription
                className={cn(
                  hideDescription && 'sr-only',
                  !hideDescription &&
                    'mt-4 md:mt-5 font-primary text-base md:text-xl font-normal leading-[30px] text-text-inverse/80'
                )}
              >
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <div
          className={cn(
            'px-4 md:px-16',
            'pb-12',
            'w-full flex-1 overflow-y-auto scrollbar-thin',
            'scrollbar-track-transparent scrollbar-thumb-border-inputAccentLight/50',
            'hover:scrollbar-thumb-border-inputAccentLight transition-colors',
            contentClassName
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
