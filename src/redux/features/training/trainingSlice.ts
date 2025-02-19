import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  TrainingState,
  TrainingTask,
  TrainingAnswer,
  TrainingResult,
} from '@/lib/types/training';
import { fetchTasks, submitAllAnswers } from './operations';

const initialState: TrainingState = {
  tasks: [],
  currentTaskIndex: 0,
  answers: [],
  results: [],
  isLoading: false,
  error: null,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    nextTask: (state) => {
      if (state.currentTaskIndex < state.tasks.length - 1) {
        state.currentTaskIndex += 1;
      }
    },
    addAnswer: (state, action: PayloadAction<TrainingAnswer>) => {
      state.answers.push(action.payload);
    },
    resetTraining: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<TrainingTask[]>) => {
          state.isLoading = false;
          state.tasks = action.payload;
          state.currentTaskIndex = 0;
          state.answers = [];
          state.results = [];
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(submitAllAnswers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        submitAllAnswers.fulfilled,
        (state, action: PayloadAction<TrainingResult[]>) => {
          state.isLoading = false;
          state.results = action.payload;
        }
      )
      .addCase(submitAllAnswers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to submit answers';
      });
  },
});

export const { nextTask, addAnswer, resetTraining } = trainingSlice.actions;
export default trainingSlice.reducer;
