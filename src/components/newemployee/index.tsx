import styles from "./index.module.scss"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, type ChangeEvent } from "react";
import Snackbar from '@mui/material/Snackbar';
import { endpoints } from "../../constants.ts";
import { NewEmployeeSchema, type EmployeeFormData } from "./new-employee-schema.ts";
import Drawer from '@mui/material/Drawer';
import { POST, PUT } from "../../service/index.ts";
import { getAllEmployess } from "../../utils.ts";
import { useDispatch } from 'react-redux';
import Compressor from 'compressorjs';
import CircularProgress from '@mui/material/CircularProgress';

type FormData = {
  profile: string | null  
  name: string | null,
  gender: string | null
  dob: string | null  ,
  state: string | null,
  status: string | null  
}

interface NewEmployeeProps {
    type: "edit" |"create";
    defaultValues: FormData | null | undefined,
    openDrawer: boolean,
    handleCloseDrawer: (flag: boolean)=>void,
    employeeId?: string
}
const NewEmployee: React.FC<NewEmployeeProps> = ({type, defaultValues, openDrawer, handleCloseDrawer, employeeId})=>{
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const [preview, setPreview] = useState<string | null>(defaultValues? defaultValues.profile: null);
    const [snackbar, setSnackBar] = useState<{open: boolean, message: string} | null>(null)
    const [loading, setLoading] = useState(false)
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(NewEmployeeSchema),
    mode: "onBlur", // Validate on blur
    defaultValues: {
        profile: defaultValues?.profile || "",
        name: defaultValues?.name || "",
        gender: defaultValues?.gender?.toLowerCase() || "",
        dob: defaultValues?.dob ? defaultValues.dob.split('T')[0]: "" ,
        state: defaultValues?.state || "",
        status: defaultValues?.status !== undefined ? String(defaultValues.status) : ""
    }
  });
    console.log(errors, "new employee")

    const onSubmit = (data: FormData) => {
    console.log(data, "new employee")

    if( errors?.name || errors?.gender || errors?.dob || errors?.state || errors?.status ){
      return ; 
    }
    setLoading(true)
    const payload = {...data, dob: new Date(data?.dob!), status: data?.status === "true"}
    if(type=="create"){
    POST(endpoints.users, payload)
    .then((res)=>{
        console.log(res, "post call response")
        if(res.status){
            setSnackBar({
                open: true,
                message: "Employee Addedd successfully"
            })
            reset()
            handleCloseDrawer(false)
            getAllEmployess(setLoading, dispatch, setSnackBar)
        }
    })
    .catch((res)=>{

         setSnackBar({
            open: true,
            message: "something went wrong. Please try again!!"
        })
    })
    .finally(()=>{
        setLoading(false)
    })
    } else{
        PUT(endpoints.users+`/${employeeId}`, payload)
        .then((res)=>{
            console.log(res, "PUT call response")
            if(res.status){
                setSnackBar({
                    open: true,
                    message: "Employee data edited successfully"
                })
                reset()
                handleCloseDrawer(false)
                getAllEmployess(setLoading, dispatch, setSnackBar)
            }
        })
        .catch((res)=>{
            setSnackBar({
                open: true,
                message: "something went wrong. Please try again!!"
            })
        }) 
        .finally(()=>{
            setLoading(false)
        })
    }
    
  };
  const handleClose = ()=>{
    setSnackBar(null)
  }


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  new Compressor(file, {
    quality: 0.6,          // 60% quality (Good for Mock APIs)
    maxWidth: 500,         // Resize to 500px width
    success(result) {
      // 'result' is a Blob. Convert to Base64:
      const reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setValue("profile", base64);
      };
    },
    error(err) {
      console.error("Compression failed:", err.message);
    },
  });
};

    return(
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={()=>handleCloseDrawer(false)}
    >
        <div className={styles.container}>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.fields_container}>
        <p className={styles.header}>{type=="create"? "Add new Employee Details" : "Edit employee Details"} </p>
            <div className={styles.fields}>
                <label className={styles.fields_name}>Profile Picture</label>
                <div className={styles.profile_upload_wrapper}>
                {preview && (
                    <img src={preview} alt="Preview" className={styles.preview_img} />
                )}
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className={styles.fields_input}
                />
                <input type="hidden" {...register("profile")} />
                {errors?.profile && <p className = {styles.error}>{errors?.profile?.message}</p>}
            </div>
          </div>
        {/* Name Field */}
        <div className={styles.fields}>
          <label className={styles.fields_name}>Name</label>
          <input type="text" {...register("name")}  className={styles.fields_input}/>
          {errors.name && <p className = {styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.fields}>
          <label className={styles.fields_name}>Date of birth</label>
          <input type="date" {...register("dob")} max={today}  className={styles.fields_input}/>
          {errors.dob && <p className = {styles.error}>{errors.dob.message}</p>}
        </div>

        <div className={styles.fields}>
          <label className={styles.fields_name}>Gender</label>
            <label>
            <input type="radio" value = "male" {...register("gender")} />
            Male
            </label>
            <label>
            <input type="radio" value="female" {...register("gender")} />
            Female
            </label>
          {errors.name && <p className = {styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.fields}>
          <label className={styles.fields_name}>State</label>
          <input type="text" {...register("state")}  className={styles.fields_input}/>
          {errors.state && <p className = {styles.error}>{errors.state.message}</p>}
        </div>

        <div className={styles.fields}>
          <label className={styles.fields_name}>Status</label>
            <label>
            <input type="radio" value ="true" {...register("status")} />
            Active
            </label>
            <label>
            <input type="radio" value="false" {...register("status")} />
            inActive
            </label>
          {errors.status && <p className = {styles.error}>{errors.status.message}</p>}
        </div>
        {loading ? 
        <div className={styles.loader}><CircularProgress /></div> : <button type="submit"  className={styles.button}>submit</button>}
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar?.open || false}
        // autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar?.message}
      />
        </div>
        </Drawer>
    )
}

export default NewEmployee;




