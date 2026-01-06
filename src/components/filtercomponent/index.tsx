// import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState} from '../../store/index.ts'
import { setFilters } from '../../store/employee.ts';
import { useState } from 'react';
import NewEmployee from '../newemployee/index.tsx';
import styles from './index.module.scss'
import {downloadEmployeeExcel} from "../../utils.ts";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface FilterComponentProps{
    getAllEmployess: ()=> void;
}
export const FilterComponent: React.FC<FilterComponentProps> = ({getAllEmployess}) =>{
    const data = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleCloseDrawer = (flag: boolean)=>{
        setOpenDrawer(flag)
        getAllEmployess()
    }
    const handleFilters=(type: "searchQuery" | "gender" | "status", value: string)=>{
        dispatch(setFilters({[type]:value}))
    }
    return (
        <div className={styles.container}>
            <input value = {data?.filters?.searchQuery} type="text" placeholder="search by name" className={styles.search} onChange={(e)=>handleFilters("searchQuery", e.target.value)}/>
            <select name="gender" className={styles.filter} onChange={(e)=>handleFilters("gender", e.target.value)}>
                <option >filter by gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select name="status" className={styles.filter} onChange={(e)=>handleFilters("status", e.target.value)}>
                <option >filter by status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </select>
            <button onClick={()=>setOpenDrawer(true)} className={styles.button}>Add Employee</button>
            <button onClick={()=>downloadEmployeeExcel(data?.employeeList || [])} className={styles.button}>Print</button>
           {
            openDrawer && <NewEmployee type= {"create"} defaultValues={null} openDrawer={openDrawer} handleCloseDrawer={handleCloseDrawer}/>
           }
        </div>
    )
}
