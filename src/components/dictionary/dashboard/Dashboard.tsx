'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { Filters } from './Filters';
import { Statistics } from './Statistics';
import { WordsTable } from '../words-table/WordsTable';
import { WordsPagination } from '../words-table/WordsPagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchWords as fetchDictionaryWords,
  fetchStatistics,
  addWordToDictionary,
} from '@/redux/features/dictionary/operations';
import { fetchWords as fetchRecommendWords } from '@/redux/features/recommend/operations';
import { selectWords } from '@/redux/features/dictionary/selectors';
import { selectRecommendWords } from '@/redux/features/recommend/selectors';
import { selectDictionaryStatus } from '@/redux/features/dictionary/selectors';
import { selectRecommendStatus } from '@/redux/features/recommend/selectors';
import { showError, showSuccess } from '@/lib/utils/toast';
import { ApiError, getErrorMessage } from '@/lib/utils/error';

interface DashboardProps {
  variant: 'dictionary' | 'recommend';
}

export function Dashboard({ variant }: DashboardProps) {
  const dispatch = useAppDispatch();
  const [addingWordIds, setAddingWordIds] = useState<string[]>([]);
  const dictionaryWords = useAppSelector(selectWords);
  const recommendWords = useAppSelector(selectRecommendWords);
  const dictionaryStatus = useAppSelector(selectDictionaryStatus);
  const recommendStatus = useAppSelector(selectRecommendStatus);

  useEffect(() => {
    if (variant === 'dictionary') {
      dispatch(fetchDictionaryWords());
    } else {
      dispatch(fetchRecommendWords());
    }
    dispatch(fetchStatistics());
  }, [dispatch, variant]);

  const isLoading =
    variant === 'dictionary'
      ? dictionaryStatus === 'loading'
      : recommendStatus === 'loading';

  const words =
    variant === 'dictionary' ? dictionaryWords.results : recommendWords.results;

  const handleAddWord = async (wordId: string) => {
    try {
      setAddingWordIds((prev) => [...prev, wordId]);

      await dispatch(addWordToDictionary(wordId)).unwrap();
      showSuccess('Word added to dictionary successfully');
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      if ((error as ApiError).response?.status === 409) {
        showError('Word already exists in your dictionary');
      } else {
        showError(errorMessage);
      }
    } finally {
      setAddingWordIds((prev) => prev.filter((id) => id !== wordId));
    }
  };

  const renderWordsTable = () => {
    if (variant === 'dictionary') {
      return (
        <WordsTable variant="dictionary" words={words} isLoading={isLoading} />
      );
    }
    return (
      <WordsTable
        variant="recommend"
        words={words}
        isLoading={isLoading}
        onWordAdd={handleAddWord}
        addingWordIds={addingWordIds}
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Filters variant={variant} />

        <div className="flex items-center gap-4">
          <Statistics />

          {variant === 'dictionary' && (
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
          )}

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
        {renderWordsTable()}
        <WordsPagination className="mt-7" variant={variant} />
      </div>
    </div>
  );
}
