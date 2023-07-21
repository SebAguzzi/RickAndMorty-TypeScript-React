import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartComponent } from "./Cart";
import { logout } from "../redux/slices/auth.slice";

export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const items = useAppSelector((state) => state.cartReducer);
  const [open, setOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handlerLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleStateViewDrawer = () => {
    setOpen((state) => !state);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>SebAguzzi</Typography>
              </Grid>
              <Grid item>
                {isAuth ? (
                  <Button variant="contained" onClick={handlerLogout}>Logout</Button>
                ) : (
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      color="primary"
                      onClick={() => handleStateViewDrawer()}
                    >
                      <Badge color="error" badgeContent={items.length}>
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => navigate("login")}
                    >
                      Login
                    </Button>
                    <Button variant="outlined">Register</Button>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <CartComponent
        open={open}
        handleStateViewDrawer={handleStateViewDrawer}
      />
    </Box>
  );
};
