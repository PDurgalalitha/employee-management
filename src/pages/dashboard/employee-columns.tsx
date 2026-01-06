import { calculateAge } from '../../utils.ts';
import Avatar from '@mui/material/Avatar';
import { type GridColDef } from '@mui/x-data-grid';
import type { Employee} from "../../store/employee.ts"
import styles from "./index.module.scss";
import { ActionColumn } from '../../components/actioncolumn/index.tsx';

export const EmployeeColumns: GridColDef<Employee>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'profile',
    headerName: 'Profile',
    renderCell: (params)=>{
        console.log("params", params)
        return (
          <div className={styles.profile}>
            <Avatar alt={params.row.name} src={params.row.profile} />
            <span>{params.row.name.length>20 ? params.row.name.slice(0, 20)+ "...": params.row.name}  </span>
          </div>
        );
    },
    width: 200
  },
  // {
  //   field: 'name',
  //   headerName: 'Name',
  //   width: 150,
  // },
  {
    field: 'dob',
    headerName: 'Age',
    valueFormatter: (value, row)=> calculateAge(value),
    width: 110,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    valueFormatter:(value)=> value==='male'? 'M': "F",
    width: 110,
  },
   {
    field: 'state',
    headerName: 'State',
    width: 200
  },
   {
    field: 'status',
    headerName: 'status',
    renderCell: (params)=>{
    console.log("params", params)
    return (
      <div className={styles.status}>
        <span className={params.row.status? styles.active: styles.inactive}>{params.row.status ? "active": "inactive"}  </span>
      </div>
    );
    },
    width: 200
  },

   {
    field: 'actions',
    headerName: 'actions',
    width: 200,
    renderCell:(params)=>{
        return <ActionColumn params={params}/>
    }
   },
];