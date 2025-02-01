import Image from 'next/image';
import Icon from '@/components/common/Icon';
import { LoginForm } from '@/components/forms/auth-forms/LoginForm';

export default function LoginPage() {
  return (
    <main className='relative min-h-screen w-full bg-background-page md:bg-auth-gradient lg:px-[100px]'>
      <div className='mx-auto w-full max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]'>
        <div className='w-full px-4 pt-4 md:px-8 md:pt-6 lg:px-0 lg:pt-8'>
          <div className='flex items-center gap-4'>
            <Icon id='#lexigrow' className='h-9 w-9 md:h-12 md:w-12' />
            <span className='-mb-1.5 font-primary text-lg font-semibold leading-6 text-text-primary md:text-[22px] md:leading-8'>
              LexiGrow
            </span>
          </div>
        </div>
        <div className='flex flex-col items-center lg:mt-[114px] lg:flex-row lg:justify-between lg:gap-20'>
          <div className='order-2 mt-[43px] flex w-full justify-center md:mt-[140px] md:px-[70px] lg:order-1 lg:mt-0 lg:px-0 lg:max-w-[628px]'>
            <LoginForm />
          </div>
          <div className='order-1 flex flex-col items-center md:order-3 lg:order-2'>
            <div className='relative mt-3 h-[191px] w-[247px] md:hidden lg:mt-0 lg:block lg:h-[435px] lg:w-[498px]'>
              <Image
                src='/images/illustration.png'
                alt='Login illustration'
                fill
                priority
                className='object-contain'
                sizes='(max-width: 767px) 247px, (min-width: 1440px) 498px'
              />
            </div>
            <div className='mt-4 flex items-center gap-2 text-center font-primary text-sm text-text-secondary md:mt-[172px] md:text-base md:leading-6 md:pb-[106px] lg:mt-4 lg:pb-0'>
              <span>Word</span>
              <span>·</span>
              <span>Translation</span>
              <span>·</span>
              <span>Grammar</span>
              <span>·</span>
              <span>Progress</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
