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
import { Navigate, useNavigate } from "react-router-dom";
import { registerUser, authThunk } from "../../redux/thunks/auth.thunk"; 

type RegisterType = {
  username: string;
  password: string;
};

const RegisterPage: React.FC<{}> = () => {

  const { isRegistered } = useAppSelector((state) => state.registerReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik<RegisterType>({
    initialValues: {
        username: "",
        password: "",
    },
    validationSchema: RegisterValidate,
    onSubmit: (values: RegisterType) => {
        dispatch(registerUser(values));
        navigate("/");
    },
  });

  return isRegistered ? (
    <Navigate to="/" replace />
  ) : (
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
              Registro
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                type="email"
                fullWidth
                label="Correo Electrónico"
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

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Registrarse
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
