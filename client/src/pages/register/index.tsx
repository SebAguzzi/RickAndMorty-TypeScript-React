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
import { registerUser } from "../../redux/thunks/auth.thunk";
import { resetRegistration } from "../../redux/slices/register.slice";

type RegisterType = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ problem, setProblem ] = React.useState<string | null>(null);  
  const { accessToken } = useAppSelector((state) => state.authReducer);
  

  const formik = useFormik<RegisterType>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterValidate,
    onSubmit: async (values: RegisterType) => {   
      setProblem("");
      resetRegistration();
      const { payload } = await dispatch(registerUser(values));
      if (payload.message !== 'Registration successful.') {
        setProblem(payload.response.data?.message);
      } else {
        navigate("/login");   
      }
    },
  });

  const handleRegisterClick = () => {
    navigate("/login");
  };

  return accessToken ? (
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
              Register
            </Typography>
            {problem && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
              {problem}
            </Typography>
          )}            
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
              <div
                style={{
                  width: "98%", // Ancho del 50% (puedes ajustarlo)
                  height: "1px",
                  backgroundColor: "#B0B0B0", // Un color más claro (ajusta el color)
                  margin: "10px auto", // Margen vertical 10px y centrado horizontalmente
                }}
              />

              <Button
                fullWidth
                variant="outlined"
                onClick={handleRegisterClick}
                sx={{ mt: 1.5, mb: 1.5, fontWeight: "bold", fontSize: "16px" }}
              >
                Already have an account?
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
