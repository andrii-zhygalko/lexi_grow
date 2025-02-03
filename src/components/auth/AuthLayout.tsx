"use client";

import { PropsWithChildren } from "react";
import Icon from "@/components/common/Icon";
import { AuthFeatures } from "./AuthFeatures";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AuthLayoutProps extends PropsWithChildren {
  illustrationAlt: string;
  variant: "login" | "register";
}

export function AuthLayout({
  children,
  illustrationAlt,
  variant,
}: AuthLayoutProps) {
  return (
    <main className='relative min-h-screen w-full bg-background-page md:bg-auth-gradient lg:px-[100px]'>
      <div className='mx-auto w-full max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]'>
        <header className='w-full px-4 pt-4 md:px-8 md:pt-6 lg:px-0 lg:pt-8'>
          <Link href='/'>
            <div className='flex items-center gap-4'>
              <Icon
                id='#lexigrow'
                className='h-9 w-9 md:h-12 md:w-12'
                aria-hidden='true'
              />
              <span className='-mb-1.5 font-primary text-[22px] font-semibold leading-8 text-text-primary md:text-[22px] md:leading-8'>
                LexiGrow
              </span>
            </div>
          </Link>
        </header>
        <div className='relative lg:min-h-[800px]'>
          <div
            className={cn(
              "flex flex-col items-center",
              "lg:grid lg:grid-template-columns-[628px_1fr]"
            )}>
            <div
              className={cn(
                "order-2 flex w-full justify-center",
                "mt-[43px] md:mt-[140px]",
                "md:px-[70px] lg:px-0",
                "lg:order-1 lg:max-w-[628px]",
                variant === "login"
                  ? "mt-[43px] lg:mt-[114px]"
                  : "mt-2 lg:mt-16"
              )}>
              <AnimatePresence mode='wait'>{children}</AnimatePresence>
            </div>

            <div
              className={cn(
                "order-1 flex flex-col items-center",
                "md:order-3 lg:order-2",
                "lg:absolute lg:right-0 lg:top-[103px]",
                "lg:w-[498px]"
              )}>
              <div className='relative mt-3 h-[191px] w-[247px] md:hidden lg:block lg:h-[435px] lg:w-[498px]'>
                <Image
                  src='/images/illustration.png'
                  alt={illustrationAlt}
                  fill
                  priority
                  className='object-contain'
                  sizes='(max-width: 767px) 247px, (min-width: 1440px) 498px'
                />
              </div>
              <AuthFeatures variant={variant} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
