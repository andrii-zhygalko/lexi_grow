'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function EmptyTraining() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col-reverse lg:flex-row items-center gap-8 justify-center">
      <div>
        <h2 className="font-primary text-base md:text-xl font-medium leading-[30px] text-text-primary">
          You don&apos;t have a single word to learn right now.
        </h2>
        <p className="max-w-[581px] mt-8 font-primary text-sm md:text-base font-normal leading-6 text-text-primary">
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className="mt-16 flex  flex-col md:flex-row gap-2 md:gap-2.5">
          <Link
            href="/dictionary?openAddWord=true"
            className="flex h-14 md:w-[200px] items-center justify-center rounded-[30px] bg-brand-primary font-primary text-lg font-bold leading-7 text-text-inverse transition-colors duration-200 hover:bg-brand-primaryHover"
          >
            Add word
          </Link>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="h-14 md:w-[200px] border md:border shadow-sm rounded-[30px] border-brand-primary font-primary text-lg font-bold leading-7 text-text-secondary md:text-brand-primary max-md:border-none max-md:shadow-none"
          >
            Cancel
          </Button>
        </div>
      </div>
      <Image
        src="/images/training_empty.png"
        alt="No words to learn"
        width={203}
        height={230}
        className="h-[230px] w-[203px]"
        priority
      />
    </div>
  );
}
