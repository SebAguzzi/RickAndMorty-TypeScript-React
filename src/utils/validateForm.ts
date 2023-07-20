import * as yup from "yup";

export const LoginValidate = yup.object().shape({
  username: yup.string().trim().required("El email es requerido"),
  password: yup
    .string()
    .trim()
    .required("La password es requerida")
    .min(6, "La password debe tener al menos 6 caracteres")
    .max(20, "La password debe tener menos de 20 caracteres"),
});
