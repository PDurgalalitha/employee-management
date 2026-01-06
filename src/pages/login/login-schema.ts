import * as yup from "yup";

export const LoginSchema = yup.object().shape({
   name: yup
     .string()
     .trim()
     .required("name is required")
     .min(3, "name must be at least 3 characters"),
   email: yup
     .string()
     .trim()
     .required("email is required")
     .email("invalid email format"),

});