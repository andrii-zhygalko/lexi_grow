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
import { AddWordModal } from '../words-table/AddWordModal';
import { WordCategory, AddWordFormData } from '@/lib/types/dictionary';
import { useSearchParams } from 'next/navigation';

interface DashboardProps {
  variant: 'dictionary' | 'recommend';
}

export function Dashboard({ variant }: DashboardProps) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [addingWordIds, setAddingWordIds] = useState<string[]>([]);
  const dictionaryWords = useAppSelector(selectWords);
  const recommendWords = useAppSelector(selectRecommendWords);
  const dictionaryStatus = useAppSelector(selectDictionaryStatus);
  const recommendStatus = useAppSelector(selectRecommendStatus);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(
    searchParams.get('openAddWord') === 'true'
  );
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

  useEffect(() => {
    setIsAddWordModalOpen(searchParams.get('openAddWord') === 'true');
  }, [searchParams]);

  const isLoading =
    variant === 'dictionary'
      ? dictionaryStatus === 'loading'
      : recommendStatus === 'loading';

  const words =
    variant === 'dictionary' ? dictionaryWords.results : recommendWords.results;

  const handleAddWord = (wordId: string) => {
    setAddingWordIds((prev) => [...prev, wordId]);

    dispatch(addWordToDictionary(wordId))
      .then((result) => {
        if (addWordToDictionary.fulfilled.match(result)) {
          showSuccess('Word added to dictionary successfully');
        }
      })
      .finally(() => {
        setAddingWordIds((prev) => prev.filter((id) => id !== wordId));
      });
  };

  const handleAddNewWord = (data: AddWordFormData) => {
    setIsSubmitting(true);

    dispatch(
      createWord({
        en: data.en,
        ua: data.ua,
        category: data.category as WordCategory,
        isIrregular: data.isIrregular,
      })
    )
      .then((result) => {
        if (createWord.fulfilled.match(result)) {
          showSuccess('Word added successfully');
          setIsAddWordModalOpen(false);
          dispatch(fetchDictionaryWords());
          dispatch(fetchStatistics());
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleCloseModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('openAddWord');
    window.history.replaceState({}, '', url);
    setIsAddWordModalOpen(false);
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
          onClose={handleCloseModal}
          onSubmit={handleAddNewWord}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
