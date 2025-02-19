import { RootState } from '@/redux/store';
import type { TrainingTask } from '@/lib/types/training';

export const selectTrainingTasks = (state: RootState) => state.training.tasks;
export const selectCurrentTaskIndex = (state: RootState) =>
  state.training.currentTaskIndex;
export const selectCurrentTask = (state: RootState): TrainingTask => {
  const tasks = state.training.tasks;
  const currentIndex = state.training.currentTaskIndex;
  return tasks[currentIndex];
};
export const selectTrainingAnswers = (state: RootState) =>
  state.training.answers;
export const selectTrainingResults = (state: RootState) =>
  state.training.results;
export const selectTrainingIsLoading = (state: RootState) =>
  state.training.isLoading;
export const selectTrainingError = (state: RootState) => state.training.error;
