import * as Yup from "yup";

export const registration = Yup.object({
  name: Yup.string().min(3).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string().min(5).required("Please enter password"),
  confirmPassword: Yup.string()
    .min(5)
    .required("Password and confirm password is not match"),
});
