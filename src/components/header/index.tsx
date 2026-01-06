import Avatar from "@mui/material/Avatar"
import { routes, USER } from "../../constants.ts"
import { useNavigate } from "react-router-dom"
import styles from './index.module.scss'
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = ()=>{
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem(USER)|| "")
    const handleLogout = () => {
        localStorage.setItem(USER, "")
        navigate(routes.login)
    }
    return(
        <div className={styles.header}>
            <div className={styles.name}>
            <Avatar>{user?.name?.[0]}</Avatar>
            {user?.name}
            </div>
            <div className={styles.name}>
                <LogoutIcon/>
                <span onClick={handleLogout} className={styles.logout}>Log out</span>
            </div>
        </div>
    )
}