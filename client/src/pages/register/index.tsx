import React from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RegisterValidate } from "../../utils/validateForm";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { registerUser, authThunk } from "../../redux/thunks/auth.thunk";

type RegisterType = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC<{}> = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [registrationError, setRegistrationError] = React.useState<
    string | null
  >(null);
  console.log("error", registrationError);

  const formik = useFormik<RegisterType>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterValidate,
    onSubmit: async (values: RegisterType) => {   
          await dispatch(registerUser(values));
          await dispatch(authThunk(values));
    },
  });

  return (
    // isAuth ? (
    //   <Navigate to="/" replace />
    // ) :
    // (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4" align="center">
              Register
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                name="confirmPassword"
                margin="normal"
                type="password" // Tipo de campo contraseña
                fullWidth
                label="Confirm Password" // Etiqueta para confirmar la contraseña
                sx={{ mt: 1.5, mb: 1.5 }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 1.5, fontWeight: "bold", fontSize: "16px" }}
              >
                Create account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
