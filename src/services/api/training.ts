import { api } from './config';
import type {
  TrainingTask,
  TrainingAnswer,
  TrainingResult,
} from '@/lib/types/training';

export const trainingApi = {
  async getTasks() {
    const response = await api.get<{ tasks: TrainingTask[] }>('/words/tasks');
    return response.data.tasks;
  },

  async submitAnswers(answers: TrainingAnswer[]) {
    const response = await api.post<TrainingResult[]>(
      '/words/answers',
      answers
    );
    return response.data;
  },
};
