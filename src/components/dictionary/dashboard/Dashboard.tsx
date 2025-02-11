import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { Filters } from './Filters';
import { Statistics } from './Statistics';
import { WordsTable } from '../words-table/WordsTable';

export function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Filters />

        <div className="flex items-center gap-4">
          <Statistics />

          <Button
            variant="ghost"
            className="p-1 font-primary text-base font-medium group"
          >
            Add word
            <Icon
              id="#plus"
              className="mb-1 ml-2 h-5 w-5 stroke-brand-primary fill-none transition-transform duration-200 group-hover:scale-125"
              aria-hidden="true"
            />
          </Button>

          <Button
            variant="ghost"
            asChild
            className="p-1 font-primary text-base font-medium group"
          >
            <Link href="/training">
              Train oneself
              <Icon
                id="#arrow-right"
                className="mb-1 ml-2 h-5 w-5 stroke-brand-primary fill-none transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7">
        <WordsTable />
      </div>
    </div>
  );
}
