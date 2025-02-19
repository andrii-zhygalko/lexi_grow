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
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentClassName,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-background-overlayLight data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'p-0 border-0 bg-transparent',
          'data-[state=open]:duration-200',
          '[&>button]:hidden',
          className
        )}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute right-5 top-5 p-0 group z-10"
            >
              <Icon
                id="#close"
                className="h-8 w-8 stroke-text-inverse fill-none group-hover:scale-110 transition-scale duration-200"
                aria-hidden="true"
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {description && (
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className={cn('w-full', contentClassName)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
