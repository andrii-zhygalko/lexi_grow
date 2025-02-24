'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/selectors';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { UserNav } from './header/UserNav';
import { LogoutButton } from './header/LogoutButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const user = useAppSelector(selectUser);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleNavigationClick = () => {
      if (isOpen) {
        onClose();
      }
    };

    const links = menuRef.current?.querySelectorAll('a');
    links?.forEach((link) => {
      link.addEventListener('click', handleNavigationClick);
    });

    return () => {
      links?.forEach((link) => {
        link.removeEventListener('click', handleNavigationClick);
      });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background-overlayLight"
            aria-hidden="true"
          />

          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-[185px] overflow-hidden bg-brand-primary md:w-[300px]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-grow flex-col p-4 md:px-8 md:py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-primary text-base font-medium text-text-inverse md:text-xl">
                      {user?.name}
                    </span>
                    <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-[30px] bg-background-page md:ml-2.5 md:h-12 md:w-12">
                      <Icon
                        id="#user"
                        className="h-5 w-5 fill-brand-primary md:h-6 md:w-6"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="p-0"
                    aria-label="Close menu"
                  >
                    <Icon
                      id="#close"
                      className="h-6 w-6 fill-none stroke-text-inverse md:h-8 md:w-8"
                      aria-hidden="true"
                    />
                  </Button>
                </div>

                <div className="flex-grow min-h-[20px] max-h-[170px] md:max-h-[170px]" />

                <div>
                  <UserNav variant="mobile" />
                </div>

                <LogoutButton
                  variant="mobile"
                  className="mt-4 md:text-lg"
                  onLogout={onClose}
                />
              </div>

              <div className="relative  h-[250px] md:h-[330px] w-full overflow-hidden">
                <Image
                  src="/images/illustration_mob.png"
                  alt="Illustration"
                  width={498}
                  height={435}
                  className="absolute bottom-8 md:bottom-16  left-1/2 -translate-x-1/2 scale-150 object-bottom"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
