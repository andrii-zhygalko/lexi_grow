import { createAsyncThunk } from '@reduxjs/toolkit';
import { trainingApi } from '@/services/api/training';
import type { TrainingAnswer } from '@/lib/types/training';
import { ApiError, handleApiError, serializeError } from '@/lib/utils/error';
import { addAnswer } from './trainingSlice';

export const fetchTasks = createAsyncThunk(
  'training/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await trainingApi.getTasks();
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const submitAllAnswers = createAsyncThunk(
  'training/submitAllAnswers',
  async (
    {
      answers,
      lastAnswer,
    }: { answers: TrainingAnswer[]; lastAnswer?: TrainingAnswer },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (lastAnswer) {
        dispatch(addAnswer(lastAnswer));
      }

      const allAnswers = lastAnswer ? [...answers, lastAnswer] : answers;

      if (allAnswers.length === 0) {
        return [];
      }

      return await trainingApi.submitAnswers(allAnswers);
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
