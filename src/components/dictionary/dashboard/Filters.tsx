import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/common/Icon';
import {
  fetchCategories as fetchDictionaryCategories,
  fetchWords as fetchDictionaryWords,
} from '@/redux/features/dictionary/operations';
import {
  fetchCategories as fetchRecommendCategories,
  fetchWords as fetchRecommendWords,
} from '@/redux/features/recommend/operations';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { WordCategory } from '@/lib/types/dictionary';
import { cn } from '@/lib/utils';
import {
  selectCategories as selectDictionaryCategories,
  selectDictionaryStatus,
  selectFilters as selectDictionaryFilters,
} from '@/redux/features/dictionary/selectors';
import {
  selectRecommendCategories,
  selectRecommendStatus,
  selectRecommendFilters,
} from '@/redux/features/recommend/selectors';
import { setFilter as setDictionaryFilter } from '@/redux/features/dictionary/dictionarySlice';
import { setFilter as setRecommendFilter } from '@/redux/features/recommend/recommendSlice';
import { MAX_SEARCH_LENGTH } from '@/lib/constants/dashboard';

interface FiltersProps {
  variant: 'dictionary' | 'recommend';
}

export function Filters({ variant }: FiltersProps) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(
    variant === 'dictionary' ? selectDictionaryStatus : selectRecommendStatus
  );
  const categories = useAppSelector(
    variant === 'dictionary'
      ? selectDictionaryCategories
      : selectRecommendCategories
  );
  const filters = useAppSelector(
    variant === 'dictionary' ? selectDictionaryFilters : selectRecommendFilters
  );
  const [searchValue, setSearchValue] = useState(filters.keyword);
  const [searchError, setSearchError] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    dispatch(
      variant === 'dictionary'
        ? fetchDictionaryCategories()
        : fetchRecommendCategories()
    );
  }, [dispatch, variant]);

  useEffect(() => {
    const value = debouncedSearch.trim();

    if (value.length > MAX_SEARCH_LENGTH) {
      setSearchError(`Keyword cannot exceed ${MAX_SEARCH_LENGTH} characters`);
      return;
    }

    if (value && !/^(?!.*--)(?!^-)(?!.*-$)[\p{L}\p{M}\s\-]+$/u.test(value)) {
      setSearchError('Please enter a valid word or phrase');
      return;
    }

    setSearchError('');
    const sanitizedValue = value.replace(/\s+/g, ' ');

    const setFilter =
      variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
    const fetchWords =
      variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

    dispatch(setFilter({ key: 'keyword', value: sanitizedValue }));

    dispatch(fetchWords());
  }, [debouncedSearch, dispatch, variant]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    setSearchError('');
  };

  const handleCategoryChange = (value: WordCategory | 'all') => {
    const setFilter =
      variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
    const fetchWords =
      variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

    dispatch(
      setFilter({
        key: 'category',
        value: value === 'all' ? null : value,
      })
    );

    if (value !== 'verb') {
      dispatch(setFilter({ key: 'isIrregular', value: null }));
    } else {
      dispatch(setFilter({ key: 'isIrregular', value: false }));
    }

    dispatch(fetchWords());
  };

  const handleVerbTypeChange = (isIrregular: boolean) => {
    const setFilter =
      variant === 'dictionary' ? setDictionaryFilter : setRecommendFilter;
    const fetchWords =
      variant === 'dictionary' ? fetchDictionaryWords : fetchRecommendWords;

    dispatch(setFilter({ key: 'isIrregular', value: isIrregular }));
    dispatch(fetchWords());
  };

  return (
    <div className="flex items-center gap-2" role="search">
      <div className="relative">
        <Input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Escape' && handleSearchClear()}
          placeholder="Find the word"
          maxLength={MAX_SEARCH_LENGTH}
          className="h-12 min-w-[300px] rounded-[15px] border-border-default px-6 py-3 font-primary text-base font-medium placeholder:text-text-primary"
          aria-label="Search words"
          aria-describedby={searchError ? 'search-error' : undefined}
          aria-invalid={!!searchError}
          aria-busy={status === 'loading'}
        />
        <Icon
          id="#search"
          className={cn(
            'absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 stroke-text-primary fill-none',
            status === 'loading' && 'animate-[scale_1s_ease-in-out_infinite]'
          )}
          aria-hidden="true"
        />
        {searchError && (
          <p
            id="search-error"
            className="absolute -bottom-6 left-0 text-sm text-text-error"
            role="alert"
          >
            {searchError}
          </p>
        )}
      </div>

      <div className="relative">
        <Select
          value={filters.category || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger
            className="h-12 min-w-[200px] rounded-[15px] border-border-default px-6 py-3 font-primary text-base font-medium shadow-none"
            aria-label="Select word category"
          >
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filters.category === 'verb' && (
        <div
          className="flex gap-4 ml-2.5"
          role="radiogroup"
          aria-label="Verb type"
        >
          {[
            { label: 'Regular', value: false },
            { label: 'Irregular', value: true },
          ].map(({ label, value }) => (
            <label
              key={label}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative w-[18px] h-[18px]">
                <input
                  type="radio"
                  checked={filters.isIrregular === value}
                  onChange={() => handleVerbTypeChange(value)}
                  className="peer sr-only"
                  aria-checked={filters.isIrregular === value}
                />
                <Icon
                  id="#radio-btn"
                  className="absolute inset-0 size-[18px] fill-none stroke-[1.5] stroke-radio-unchecked group-hover:stroke-brand-primary transition-colors duration-200 peer-checked:opacity-0"
                />
                <Icon
                  id="#radio-btn-checked"
                  className="absolute scale-125 inset-0 size-[18px] stroke-[3] fill-radio-checked stroke-background-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                />
              </div>
              <span className="font-primary text-[14px] text-[#121417] leading-normal">
                {label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
