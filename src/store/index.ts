// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employee.ts';

export const employeeStore = configureStore({
  reducer: {
    employee: employeeReducer,
    // Add other slices here: user: userReducer, etc.
  },
});

// Types for your App
export type RootState = ReturnType<typeof employeeStore.getState>;
export type AppDispatch = typeof employeeStore.dispatch;
