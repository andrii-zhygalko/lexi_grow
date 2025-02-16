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
  createWord,
} from '@/redux/features/dictionary/operations';
import { fetchWords as fetchRecommendWords } from '@/redux/features/recommend/operations';
import { selectWords } from '@/redux/features/dictionary/selectors';
import { selectRecommendWords } from '@/redux/features/recommend/selectors';
import {
  selectDictionaryStatus,
  selectCategories as selectDictionaryCategories,
} from '@/redux/features/dictionary/selectors';
import { selectRecommendStatus } from '@/redux/features/recommend/selectors';
import { showSuccess } from '@/lib/utils/toast';
import { handleApiError, ApiError } from '@/lib/utils/error';
import { AddWordModal } from '../words-table/AddWordModal';
import { WordCategory } from '@/lib/types/dictionary';
import { AddWordFormData } from '@/lib/schemas/dictionary/add-word';

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
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = useAppSelector(selectDictionaryCategories);

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
      if ((error as ApiError).response?.status === 409) {
        handleApiError(
          error as ApiError,
          'Word already exists in your dictionary'
        );
      } else {
        handleApiError(error as ApiError);
      }
    } finally {
      setAddingWordIds((prev) => prev.filter((id) => id !== wordId));
    }
  };

  const handleAddNewWord = async (data: AddWordFormData) => {
    try {
      setIsSubmitting(true);
      await dispatch(
        createWord({
          en: data.en,
          ua: data.ua,
          category: data.category as WordCategory,
          isIrregular: data.isIrregular,
        })
      ).unwrap();
      showSuccess('Word added successfully');
      setIsAddWordModalOpen(false);
      dispatch(fetchDictionaryWords());
      dispatch(fetchStatistics());
    } catch (error) {
      handleApiError(error as ApiError);
    } finally {
      setIsSubmitting(false);
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
              onClick={() => setIsAddWordModalOpen(true)}
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

      {variant === 'dictionary' && (
        <AddWordModal
          categories={categories}
          isOpen={isAddWordModalOpen}
          onClose={() => setIsAddWordModalOpen(false)}
          onSubmit={handleAddNewWord}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
