import * as yup from "yup";

export const NewEmployeeSchema = yup.object().shape({
  profile: yup.string().required("profile is required"),
  name: yup
    .string()
    .trim()
    .required("name is required")
    .min(3, "name must be at least 3 characters"),
  gender: yup
    .string()
    .required("gender is required"),
  dob: yup
    .string()
    // .date()
    // .trim()
    .required("date of birth is required"),
  state: yup
    .string()
    .trim()
    .required("state is required"),
  status: yup
    .string()
    // .boolean()
    .required("status is required"),  
});

export type EmployeeFormData = yup.InferType<typeof NewEmployeeSchema>;