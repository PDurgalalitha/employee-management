import { createSlice, type PayloadAction }  from '@reduxjs/toolkit';

export type Employee = {
  id: number,
  name: string,
  gender: string,
  profile: string,
  dob: Date | null,
  state: string,
  status: boolean
}
export type filtersType = {
      searchQuery: string,
      gender: string,
      status: string
    }
export interface EmployeeData {
    employeeList: Employee[] | null
    total: number,
    activeEmployeeCount: number,
    inactiveEmployeeCount: number
    filters : filtersType | null
}

const initialState: EmployeeData = { 
  employeeList : null,
  total: 0,
  activeEmployeeCount: 0,
  inactiveEmployeeCount: 0,
  filters: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeList: (state, action: PayloadAction<Employee[]>) => {
      state.employeeList = action?.payload
      
    },
    setEmployeeCount: (state, action:PayloadAction<Employee[]>)=>{
      state.total = action?.payload?.length
      const activeCount = action?.payload?.filter((each: Employee)=> each.status).length
      state.activeEmployeeCount = activeCount
      state.inactiveEmployeeCount = action?.payload?.length - activeCount
    },
    clearEmployeeList: (state) => {
      state.employeeList = null
      state.total = 0
      state.activeEmployeeCount = 0
      state.inactiveEmployeeCount = 0
    },
    setFilters: (state, action:PayloadAction<any>)=>{
      state.filters = {...state.filters, ...action.payload}
    },
    clearFilters: (state)=>{
      state.filters = null
    }
  },
});

export const { setEmployeeList,setEmployeeCount, clearEmployeeList, setFilters, clearFilters } = employeeSlice.actions;
export default employeeSlice.reducer;
