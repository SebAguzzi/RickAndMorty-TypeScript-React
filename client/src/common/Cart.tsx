import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppSelector } from "../redux/hooks";
import { HorizontalCardComponent } from "../components/HorizontalCard";

interface CartComponentsProps {
  open: boolean;
  handleStateViewDrawer: () => void;
}

export const CartComponent: React.FC<CartComponentsProps> = ({
  open,
  handleStateViewDrawer,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const items = useAppSelector((state) => state.cartReducer);

  return (
    <Drawer anchor={"right"} open={open}>
      <Box sx={{ width: isSmallScreen ? "100%" : "25em", p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Cart</Typography>
          <IconButton color="primary" onClick={() => handleStateViewDrawer()}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {items.length > 0 ? (
          <Stack spacing={2}>
            {items.map(({ id, image, name }) => (
              <HorizontalCardComponent
                key={id}
                id={id}
                image={image}
                name={name}
              />
            ))}
          </Stack>
        ) : (
          "Nothing here"
        )}
      </Box>
    </Drawer>
  );
};
