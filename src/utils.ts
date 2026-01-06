import type { Dispatch } from "@reduxjs/toolkit";
import { endpoints } from "./constants.ts";
import { GET } from "./service/index.ts";
import { setEmployeeList, setEmployeeCount } from "./store/employee.ts";
import * as XLSX from 'xlsx';
export function calculateAge(date: Date){
  const dob = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // If the current month is before the birth month, 
  // or if it's the same month but the current day is before the birth day,
  // the person hasn't had their birthday yet this year.
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
} 

export const getAllEmployess = async(setLoading: (flag: boolean)=>void, dispatch: Dispatch, setError: (params: {open: boolean, message: string})=>void) => {
    setLoading(true)
    await GET(endpoints.users)
    .then((res)=>{
      if(res.status){
        dispatch(setEmployeeList(res?.data || []))
        dispatch(setEmployeeCount(res?.data || []))
      }
    }).catch(()=>{
        setError({open: true, message: 'something went wrong. Please try again!!'})
    }).finally(()=>{
        setLoading(false)
    }) 
}

 
export const downloadEmployeeExcel = (employeeList: any[]) => {

  const worksheet = XLSX.utils.json_to_sheet(employeeList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  XLSX.writeFile(workbook, "Employee_List.xlsx");
};