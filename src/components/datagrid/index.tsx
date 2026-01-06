import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/index.ts';
import type { Employee} from "../../store/employee.ts"




interface CommonDataGridProps{
    loading: boolean,
    rows: Employee[] |null | undefined,
    columns: GridColDef<Employee>[] 
}

const CommonDataGrid:React.FC<CommonDataGridProps> = ({loading, rows, columns}) =>{
    const data = useSelector((state: RootState) => state.employee);
    
    return (
       <div>
        <DataGrid
            loading={loading}
            rows={rows || []}
            columns={columns}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableColumnSorting
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
        />
    </div>
    )
}

export default CommonDataGrid

