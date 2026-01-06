import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from 'react';
import { useSelector,  useDispatch } from 'react-redux';
import NewEmployee from '../newemployee/index.tsx';
import { 
  Menu, MenuItem, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, Button, Snackbar 
} from '@mui/material';
import { DELETE } from '../../service/index.ts';
import { endpoints } from '../../constants.ts';
import { getAllEmployess } from '../../utils.ts';
import styles from "./index.module.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { type RootState} from '../../store/index.ts'

interface ActionColumnProps{
    params: any;
}

export const ActionColumn: React.FC<ActionColumnProps> = ({params})=>{
    const data = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackBar] = useState<{open: boolean, message: string} | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const handleCloseMenu = ()=>{
        setAnchorEl(null);
    }
    const handleEdit = ()=>{
        setEdit(true)
        handleCloseMenu()
    }
    const handleDelete = ()=>{
        handleCloseMenu()
        setDelete(true)
    }
    const closeDeleteDialog = () => setDelete(false);
    const confirmDelete = async()=>{
        setLoading(true)
        await DELETE(endpoints.users + `/${params.row.id}`)
        .then(res => {
            if(res.status){
                setSnackBar({open: true, message: "Deleted successfully"})
                getAllEmployess(setLoading, dispatch, setSnackBar)
            }
        }).catch(res=>{
            setSnackBar({open: true, message: "something went wrong. Please try again later!!"})
        }).finally(()=>{
            closeDeleteDialog()
            setLoading(false)
        })
        
    }
    const handleCloseSnackBar = ()=>{
        setSnackBar(null)
    }
    return (
        <div>
            <IconButton onClick={(e)=> setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl} 
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        {
            isEdit && <NewEmployee type= {"edit"} defaultValues={params?.row} openDrawer={isEdit} handleCloseDrawer={(flag: boolean)=> setEdit(flag)} employeeId= {params?.row.id}/>
        }
        {
            isDelete && 
            <Dialog open={isDelete} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{params.row.name}</strong>? 
                        This action cannot be undone.
                    </DialogContentText>:
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    {
                        loading ? 
                        <div className={styles.loader}><CircularProgress /></div> :
                        <Button onClick={confirmDelete} color="error" variant="contained" autoFocus>
                            Delete
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        }
        {/* <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackbar?.open || false}
            // autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            message={snackbar?.message}
            /> */}
    </div> 
    )
}