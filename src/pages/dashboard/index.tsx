import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { type RootState} from '../../store/index.ts'
import styles from './index.module.scss';
import CommonDataGrid from '../../components/datagrid/index.tsx';
import { FilterComponent,  } from "../../components/filtercomponent/index.tsx";
import {EmployeeColumns} from "./employee-columns.tsx";
import Snackbar from '@mui/material/Snackbar';
import { getAllEmployess } from "../../utils.ts";

const Dashboard: React.FC = ()=>{
    const data = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackBar] = useState<{open: boolean, message: string} | null>(null)

    const filteredList = useMemo(() => {
    let list = data.employeeList || [];
    // Apply Gender Filter
    if (data?.filters?.gender) {
        list = list.filter((e) => data?.filters?.gender && e.gender.toLowerCase() === data?.filters?.gender);
    }
    // Apply Status Filter (ensure values match "true"/"false" strings)
    if (data?.filters?.status) {
        list = list.filter((e) => 
            (e.status && data.filters?.status === "true") || 
            (!e.status && data.filters?.status === "false")
        );
    }
    // Apply Search Filter
    if (data.filters?.searchQuery) {
        const query = data.filters.searchQuery.toLowerCase();
        list = list.filter((e) => e.name.toLowerCase().includes(query));
    }
    return list;
    }, [data.employeeList, data.filters]);


    useEffect(()=>{
        getAllEmployess(setLoading, dispatch, setSnackBar )    
    }, [])

    const handleCloseSnackBar =()=>{
        setSnackBar(null)
    }
    return(
        <div className={styles.dashboard}>
            <div className={styles.dashboard_header}>
                <div className={styles.count}>
                    Employee Dashboard
                </div>
                <div className={styles.status}>
                    <span>Total: {data.total}</span>
                    <span>Active: {data.activeEmployeeCount}</span>
                    <span>in-Active: {data.inactiveEmployeeCount}</span>
                </div>
            </div>
            <FilterComponent getAllEmployess={()=>getAllEmployess(setLoading, dispatch, setSnackBar )}/>
            <CommonDataGrid loading={loading} rows={filteredList} columns = {EmployeeColumns}/>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbar?.open || false}
                onClose={handleCloseSnackBar}
                message={snackbar?.message || ""}
                />
        </div>
    )
}

export default Dashboard;