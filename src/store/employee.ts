// src/features/counterSlice.ts
import { createSlice, type PayloadAction }  from '@reduxjs/toolkit';
 
export interface EmployeeData {
  value: number;
}

const initialState: EmployeeData = { value: 0 };

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  
  },
});

// Export actions for use in components
export const { increment } = employeeSlice.actions;
// Export the reducer for the store
export default employeeSlice.reducer;
