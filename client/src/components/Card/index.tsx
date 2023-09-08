import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/cart.slice";
import { setItem } from "../../utils/localStorage";

type CardProps = {
  image: string;
  name: string;
  id: number;
};

export const CardComponent: React.FC<CardProps> = ({ image, name, id }) => {
  const [disabledBtn, setDisabledBtn] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itemExists = useAppSelector((state) => state.cartReducer);

  React.useEffect(() => {
    itemExists.some((item) => item.id === id)
      ? setDisabledBtn(true)
      : setDisabledBtn(false);
      // setDisabledBtn(itemExist.some((item) => item.id === id))
      setItem('cart', itemExists);
  }, [itemExists, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        image,
      })
    );
  };

  return (
    <Card>
      <CardMedia component="img" height="auto" width="100%" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "1rem"  }}>
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: "column" }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          sx={{ mb: 1 }}
          onClick={() => navigate(`/character/${id}`)}
        >
          Learn More
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabledBtn}
          sx={{ mb: 1 }}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
