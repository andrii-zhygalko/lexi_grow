import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
// import dictionaryReducer from './features/dictionary/dictionarySlice';
// import trainingReducer from './features/training/trainingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // dictionary: dictionaryReducer,
    // training: trainingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
