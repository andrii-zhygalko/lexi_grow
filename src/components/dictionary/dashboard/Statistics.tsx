'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectStatistics } from '@/redux/features/dictionary/selectors';

export function Statistics() {
  const { totalCount } = useAppSelector(selectStatistics);

  return (
    <div className="flex items-center gap-2">
      <span className="font-primary text-base font-medium">
        To study: {totalCount}
      </span>
    </div>
  );
}
