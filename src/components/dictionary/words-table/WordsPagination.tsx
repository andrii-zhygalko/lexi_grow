import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchWords as fetchDictionaryWords } from '@/redux/features/dictionary/operations';
import { fetchWords as fetchRecommendWords } from '@/redux/features/recommend/operations';
import { selectPaginationData as selectDictionaryPaginationData } from '@/redux/features/dictionary/selectors';
import { selectRecommendPaginationData } from '@/redux/features/recommend/selectors';
import { setFilter as setDictionaryFilter } from '@/redux/features/dictionary/dictionarySlice';
import { setFilter as setRecommendFilter } from '@/redux/features/recommend/recommendSlice';

const baseButtonStyles =
  'p-0 h-9 rounded-lg border border-border-default hover:text-brand-primary';
const iconButtonStyles = 'w-[32px] h-[32px] p-0';
const pageButtonStyles =
  'w-[32px] h-[32px] font-primary text-[13px] font-semibold';
const iconStyles =
  'h-4 w-4 fill-text-primary transition-colors duration-200 group-hover:fill-brand-primary';
const activePageStyles =
  'bg-brand-primary text-text-inverse hover:text-text-inverse hover:bg-brand-primary';

interface WordsPaginationProps {
  className?: string;
  variant: 'dictionary' | 'recommend';
}

export function WordsPagination({ className, variant }: WordsPaginationProps) {
  const dispatch = useAppDispatch();
  const { page, totalPages, hasWords } = useAppSelector(
    variant === 'dictionary'
      ? selectDictionaryPaginationData
      : selectRecommendPaginationData
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    const setFilter =
      variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
    const fetchWords =
      variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

    dispatch(setFilter({ key: 'page', value: newPage }));
    dispatch(fetchWords());
  };

  const getPageNumbers = () => {
    if (totalPages <= (isMobile ? 4 : 7)) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (isMobile) {
      if (totalPages <= 4) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (page <= 2) {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        pages.push(totalPages);
        return pages;
      }

      if (page < totalPages - 1) {
        pages.push(page - 1);
        pages.push(page);
        pages.push('...');
        pages.push(totalPages);
      } else {
        if (page === totalPages - 1) {
          pages.push(page - 1);
          pages.push(page);
          pages.push(totalPages);
        } else {
          pages.push(page - 2);
          pages.push(page - 1);
          pages.push(page);
        }
      }
    } else {
      pages.push(1);

      let startPage: number;
      let endPage: number;

      if (page <= 3) {
        startPage = 2;
        endPage = 5;
        pages.push(...range(startPage, endPage));
        pages.push('...');
      } else if (page >= totalPages - 2) {
        pages.push('...');
        startPage = totalPages - 4;
        endPage = totalPages - 1;
        pages.push(...range(startPage, endPage));
      } else {
        pages.push('...');
        startPage = page - 1;
        endPage = page + 1;
        pages.push(...range(startPage, endPage));
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (!hasWords || totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex justify-center gap-2.5', className)}>
      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
        onClick={() => handlePageChange(1)}
        disabled={page === 1 || !hasWords}
      >
        <Icon id="#pagination-first" className={iconStyles} />
      </Button>

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1 || !hasWords}
      >
        <Icon id="#prev" className={iconStyles} />
      </Button>

      {getPageNumbers().map((pageNum, index) => (
        <Button
          key={`${pageNum}-${index}`}
          variant="ghost"
          className={cn(
            baseButtonStyles,
            pageButtonStyles,
            'group',
            pageNum === page && activePageStyles
          )}
          onClick={() =>
            typeof pageNum === 'number' && handlePageChange(pageNum)
          }
          disabled={typeof pageNum === 'string' || !hasWords}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages || !hasWords}
      >
        <Icon id="#next" className={iconStyles} />
      </Button>

      <Button
        variant="ghost"
        className={cn(baseButtonStyles, iconButtonStyles, 'group')}
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages || !hasWords}
      >
        <Icon id="#pagination-last" className={iconStyles} />
      </Button>
    </div>
  );
}
