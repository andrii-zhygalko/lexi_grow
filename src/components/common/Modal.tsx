'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-background-overlay" />
      <DialogContent className="fixed bottom-0 left-0 right-0 p-0 border-0">
        <div className="w-full max-w-[375px] mx-auto rounded-t-[25px] bg-brand-primaryLight">
          {title && (
            <DialogHeader className="px-4 pt-8">
              <DialogTitle className="font-primary text-[30px] font-semibold leading-8 tracking-[-0.6px] text-text-primary">
                {title}
              </DialogTitle>
            </DialogHeader>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
