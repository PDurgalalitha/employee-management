import styles from "./index.module.scss"
import { LoginSchema } from "./login-schema.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { routes, USER } from "../../constants.ts";

type FormData = {
  name: string,
  email: string
}
const Login: React.FC = ()=>{
  const [snackbar, setSnackBar] = useState<{open: boolean, message: string} | null>(null)
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur", // Validate on blur
  });
  const navigate = useNavigate()
  const onSubmit = (data: FormData) => {
    if(errors?.email || errors?.name ){
      return ; 
    }
    localStorage.setItem(USER, JSON.stringify(data))
    setSnackBar({
      open: true,
      message: "Authroized successfully"
    })
     setTimeout(() => {
      reset();
      navigate(routes.dashboard);
    }, 1000);
  };
  const handleClose = ()=>{
    setSnackBar(null)
  }

    return(
        <div className={styles.container}>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.fields_container}>
        <p className={styles.header}>Login </p>
        {/* Name Field */}
        <div className={styles.fields}>
          <label className={styles.fields_name}>Name</label>
          <input type="text" {...register("name")}  className={styles.fields_input}/>
          {errors.name && <p className = {styles.error}>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className={styles.fields}>
          <label className={styles.fields_name}>Email</label>
          <input type="text" {...register("email")} className={styles.fields_input}/>
          {errors.email && (
            <p className = {styles.error}>{errors.email.message}</p>
          )}
        </div>
        <button type="submit" className={styles.button}>submit</button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar?.open || false}
        // autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar?.message}
      />
        </div>
    )
}

export default Login;




