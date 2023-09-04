import * as yup from "yup";

export const LoginValidate = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .min(6, "Password must be between 6 and 20 characters")
    .max(20, "Password must be between 6 and 20 characters"),
});

export const RegisterValidate = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .min(6, "Password must be between 6 and 20 characters")
    .max(20, "Password must be between 6 and 20 characters"),
    confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null as any], "Passwords must match") // Comprueba que coincida con "password"
    .required("Please confirm your password"),
});
