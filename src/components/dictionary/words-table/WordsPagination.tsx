'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchWords as fetchDictionaryWords } from '@/redux/features/dictionary/operations';
import { fetchWords as fetchRecommendWords } from '@/redux/features/recommend/operations';
import {
  selectFilters as selectDictionaryFilters,
  selectPaginationData as selectDictionaryPaginationData,
} from '@/redux/features/dictionary/selectors';
import {
  selectRecommendFilters,
  selectRecommendPaginationData,
} from '@/redux/features/recommend/selectors';
import { setFilter as setDictionaryFilter } from '@/redux/features/dictionary/dictionarySlice';
import { setFilter as setRecommendFilter } from '@/redux/features/recommend/recommendSlice';

const baseButtonStyles =
  'h-9 rounded-lg border border-border-default hover:text-brand-primary';
const iconButtonStyles = 'w-9 p-0';
const pageButtonStyles = 'min-w-[36px] font-primary text-[13px] font-semibold';
const iconStyles =
  'h-4 w-4 fill-text-primary transition-colors duration-200 group-hover:fill-brand-primary';
const activePageStyles =
  'bg-brand-primary text-text-inverse hover:text-text-inverse hover:bg-brand-primary';

interface WordsPaginationProps {
  className?: string;
  variant: 'dictionary' | 'recommend';
}

export function WordsPagination({ className, variant }: WordsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { page, totalPages, hasWords } = useAppSelector(
    variant === 'dictionary'
      ? selectDictionaryPaginationData
      : selectRecommendPaginationData
  );
  const filters = useAppSelector(
    variant === 'dictionary' ? selectDictionaryFilters : selectRecommendFilters
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const urlPage =
        Number(
          searchParams.get(variant === 'dictionary' ? 'dict_page' : 'rec_page')
        ) || 1;
      if (urlPage !== filters.page) {
        const setFilter =
          variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
        const fetchWords =
          variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

        dispatch(setFilter({ key: 'page', value: urlPage }));
        dispatch(fetchWords());
      }
    }
  }, [searchParams, dispatch, filters.page, variant]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      variant === 'dictionary' ? 'dict_page' : 'rec_page',
      newPage.toString()
    );
    router.push(`?${params.toString()}`);

    const setFilter =
      variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
    const fetchWords =
      variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

    dispatch(setFilter({ key: 'page', value: newPage }));
    dispatch(fetchWords());
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

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
