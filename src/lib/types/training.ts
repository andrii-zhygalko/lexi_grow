export interface TrainingTask {
  _id: string;
  en?: string;
  ua?: string;
  task: 'en' | 'ua';
}

export interface TrainingAnswer {
  _id: string;
  en: string;
  ua: string;
  task: 'en' | 'ua';
}

export interface TrainingResult extends TrainingAnswer {
  isDone: boolean;
}

export type TaskQuestion<T extends TrainingTask> = T['task'] extends 'en'
  ? T['ua']
  : T['en'];

export interface TrainingState {
  tasks: TrainingTask[];
  currentTaskIndex: number;
  answers: TrainingAnswer[];
  results: TrainingResult[];
  isLoading: boolean;
  error: string | null;
}
