'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-background-page px-4 md:px-8 lg:px-[100px]">
      <div className="mx-auto w-full max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]">
        <header className="w-full pt-4 md:pt-6 lg:pt-8">
          <Link href="/dictionary" className="inline-flex items-center gap-4">
            <Icon
              id="#lexigrow"
              className="h-9 w-9 md:h-12 md:w-12"
              aria-hidden="true"
            />
            <span className="-mb-1.5 font-primary text-[22px] font-semibold leading-8 text-text-primary">
              LexiGrow
            </span>
          </Link>
        </header>

        <div className="mt-10 py-8 flex flex-col items-center justify-center md:mt-16 lg:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-primary text-[80px] font-bold leading-none tracking-tight text-brand-primary md:text-[140px]">
              404
            </h1>

            <div className="mt-6 space-y-2 md:mt-8">
              <p className="font-primary text-2xl font-semibold text-text-primary md:text-3xl">
                Oops! This page is lost in translation
              </p>
              <p className="font-primary text-lg text-text-secondary md:text-xl">
                схоже, ця сторінка загубилася у перекладі
              </p>
            </div>

            <div className="relative mx-auto mt-4 h-[180px] w-[180px] md:h-[240px] md:w-[240px]">
              <Image
                src="/images/open_book.png"
                alt="Open book illustration"
                fill
                priority
                className="object-contain"
              />
            </div>

            <Button
              asChild
              className="mt-8 h-14 min-w-[200px] rounded-[30px] font-primary text-lg font-bold md:mt-12"
            >
              <Link href="/dictionary">Return to Dictionary</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
