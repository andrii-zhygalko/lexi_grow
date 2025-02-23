'use client';
import { colors } from '@/lib/constants/colors';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchTasks,
  submitAllAnswers,
} from '@/redux/features/training/operations';
import {
  nextTask,
  addAnswer,
  resetTraining,
} from '@/redux/features/training/trainingSlice';
import {
  selectTrainingTasks,
  selectCurrentTaskIndex,
  selectCurrentTask,
  selectTrainingAnswers,
  selectTrainingResults,
  selectTrainingIsLoading,
} from '@/redux/features/training/selectors';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { EmptyTraining } from '@/components/training/EmptyTraining';
import { TrainingRoom } from '@/components/training/TrainingRoom';
import { WellDoneModal } from '@/components/training/WellDoneModal';
import { TrainingRoomSkeleton } from '@/components/training/TrainingRoomSkeleton';

export default function TrainingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTrainingTasks);
  const currentTaskIndex = useAppSelector(selectCurrentTaskIndex);
  const currentTask = useAppSelector(selectCurrentTask);
  const answers = useAppSelector(selectTrainingAnswers);
  const results = useAppSelector(selectTrainingResults);
  const isLoading = useAppSelector(selectTrainingIsLoading);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
    return () => {
      dispatch(resetTraining());
    };
  }, [dispatch]);

  const handleNext = (answer: string) => {
    if (answer.trim()) {
      dispatch(
        addAnswer({
          ...currentTask,
          ...(currentTask.task === 'en'
            ? { en: answer.trim(), ua: currentTask.ua! }
            : { ua: answer.trim(), en: currentTask.en! }),
        })
      );
    }
    dispatch(nextTask());
  };

  const handleSave = async (lastAnswer?: string) => {
    if (!answers.length && !lastAnswer?.trim()) return;

    const lastAnswerData = lastAnswer?.trim()
      ? {
          ...currentTask,
          ...(currentTask.task === 'en'
            ? { en: lastAnswer.trim(), ua: currentTask.ua! }
            : { ua: lastAnswer.trim(), en: currentTask.en! }),
        }
      : undefined;
    setIsSubmitting(true);
    dispatch(submitAllAnswers({ answers, lastAnswer: lastAnswerData }))
      .then((result) => {
        if (submitAllAnswers.fulfilled.match(result)) {
          setShowResults(true);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-page px-[100px] pt-16 pb-24">
        <TrainingRoomSkeleton />
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="flex min-h-[80vh] items-center bg-background-page px-[100px]">
        <EmptyTraining />
      </div>
    );
  }

  const progress = Math.round((answers.length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-background-page px-[100px] pt-16 pb-24">
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <ProgressCircle
            value={progress}
            thickness={6}
            size={58}
            backgroundColor={colors.background.white}
            fillColor={colors.brand.primary}
          />
          <span className="absolute inset-0 flex items-center justify-center font-primary text-base font-medium leading-6 text-text-primary">
            {answers.length}
          </span>
        </div>
      </div>

      <TrainingRoom
        task={currentTask}
        isLastTask={currentTaskIndex === tasks.length - 1}
        onNext={handleNext}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        onCancel={() => router.back()}
        answers={answers}
      />

      <WellDoneModal
        isOpen={showResults}
        onOpenChange={() => setShowResults(false)}
        results={results}
      />
    </div>
  );
}
