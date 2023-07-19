import * as yup from 'yup';

export const LoginValidate = yup.object().shape({
    username: yup.string().trim().required("El email es requerido"),
    password: yup.string().trim().required("La password es requerida"),
})