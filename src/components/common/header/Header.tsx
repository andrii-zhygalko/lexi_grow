'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { UserNav } from './UserNav';
import { UserBar } from './UserBar';
import { MobileMenu } from '../MobileMenu';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-background-white px-4 py-5 md:px-8 lg:px-[100px]">
      <div className="flex items-center justify-between">
        <Link href="/dictionary" className="flex items-center gap-2 sm:gap-4">
          <Icon
            id="#lexigrow"
            className="h-9 w-9 md:h-10 md:w-10 lg:h-10 lg:w-10"
            aria-hidden="true"
          />
          <span className="-mb-1.5 font-primary text-lg font-semibold leading-6 text-text-primary md:text-[22px] md:leading-8 lg:text-[22px] lg:leading-8">
            LexiGrow
          </span>
        </Link>

        {!isMobile && (
          <>
            <UserNav variant="desktop" />
            <UserBar />
          </>
        )}

        {isMobile && (
          <div className="flex items-center">
            <UserBar hiddenLogout={true} />

            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(true)}
              className="ml-5 p-1"
              aria-label="Open navigation menu"
            >
              <Icon
                id="#burger"
                className="h-[22px] w-8 stroke-text-primary md:h-7 md:w-10"
                aria-hidden="true"
              />
            </Button>
          </div>
        )}
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
