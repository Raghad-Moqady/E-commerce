import * as yup from 'yup';

export const validationSchema= yup.object({
  userName:yup.string().required("user name is required").min(3,"userName must be at least 3 character").max(30,"max is 30"),
  email:yup.string().required("email is required").email() ,
  password:yup.string().required("password is required").min(3,"password must be at least 3 digits").max(30,"max is 30")
})

export const loginSchema= yup.object({
  email:yup.string().required("email is required").email() ,
  password:yup.string().required("password is required").min(3,"password must be at least 3 digits").max(30,"max is 30")
})
export const sendCodeSchema= yup.object({
  email:yup.string().required("email is required").email() ,
 })

 export const forgetPasswordSchema= yup.object({
  email:yup.string().required("email is required").email() ,
  password:yup.string().required("password is required").min(3,"password must be at least 3 digits").max(30,"max is 30"),
  code:yup.string().required("Code is required").length(4,"Code must be 4 digits") 
})
export const CreateorderSchema= yup.object({
  couponName:yup.string() ,
  address:yup.string().required("Your Address is required"),
  phone:yup.string().required("Your Phone is required") 
})

