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
import { LoginValidate } from "../../utils/validateForm";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { authThunk } from "../../redux/thunks/auth.thunk";

type LoginType = {
  username: string;
  password: string;
};

const LoginPage: React.FC<{}> = () => {
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<LoginType>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginValidate,
    onSubmit: (values: LoginType) => {
      dispatch(authThunk(values));
    },
  });

  const handleRegisterClick = () => {
    navigate("/register");
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
              Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                type="text"
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

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 1.5, fontWeight: "bold", fontSize: "16px" }}
              >
                Login
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
                Create new account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
