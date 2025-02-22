import { Skeleton } from '@/components/ui/skeleton';

export function TrainingRoomSkeleton() {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <Skeleton className="h-[58px] w-[58px] rounded-full border-[6px] border-background-skeleton bg-background-skeleton/40" />
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
      </div>

      <div className="rounded-[15px] bg-background-white p-[18px]">
        <div className="flex">
          <div className="relative h-[302px] flex-1 rounded-l-lg border-r border-border-light bg-background-secondary p-[22px]">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[200px] bg-background-skeleton" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full bg-background-skeleton" />
                <Skeleton className="h-6 w-16 bg-background-skeleton" />
              </div>
            </div>

            <div className="absolute bottom-6">
              <Skeleton className="h-8 w-24 bg-background-skeleton" />
            </div>
          </div>

          <div className="flex-1 rounded-r-lg bg-background-secondary p-[22px]">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[200px] bg-background-skeleton" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full bg-background-skeleton" />
                <Skeleton className="h-6 w-16 bg-background-skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex gap-2.5">
        <Skeleton className="h-14 w-[200px] rounded-[30px] bg-background-skeleton" />
        <Skeleton className="h-14 w-[200px] rounded-[30px] bg-background-skeleton" />
      </div>
    </div>
  );
}
