'use client';

import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface WordsPaginationProps {
  className?: string;
}

const baseButtonStyles =
  'h-9 rounded-lg border border-border-default hover:text-brand-primary';
const iconButtonStyles = 'w-9 p-0';
const pageButtonStyles = 'min-w-[36px] font-primary text-[13px] font-semibold';
const iconStyles = 'h-4 w-4 fill-text-primary transition-colors duration-200';
const activePageStyles =
  'bg-brand-primary text-text-inverse hover:text-text-inverse hover:bg-brand-primary';

export function WordsPagination({ className }: WordsPaginationProps) {
  return (
    <div className={cn('flex justify-center gap-2.5', className)}>
      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
      >
        <Icon
          id="#pagination-first"
          className={cn(iconStyles, 'group-hover:fill-brand-primary')}
        />
      </Button>

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
      >
        <Icon
          id="#prev"
          className={cn(iconStyles, 'group-hover:fill-brand-primary')}
        />
      </Button>

      {[1, 2, 3, '...', 10].map((page, index) => (
        <Button
          key={`${page}-${index}`}
          variant="ghost"
          className={cn(
            baseButtonStyles,
            pageButtonStyles,
            page === 1 && activePageStyles
          )}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
      >
        <Icon
          id="#next"
          className={cn(iconStyles, 'group-hover:fill-brand-primary')}
        />
      </Button>

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
      >
        <Icon
          id="#pagination-last"
          className={cn(iconStyles, 'group-hover:fill-brand-primary')}
        />
      </Button>
    </div>
  );
}
