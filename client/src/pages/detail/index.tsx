import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "../../api/characters";
import { ICharacter } from "./interfaces/character.interface";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const Detail: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    characters
      .getById({ id })
      .then((res) => {
        setCharacter(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                {character?.name}
              </Typography>
              <Divider />
              <Box sx={{ mt: 1, mb: 1 }}>
                <Chip
                  color={
                    character?.status === "Alive"
                      ? "primary"
                      : character?.status === "unknown"
                      ? "warning"
                      : "error"
                  }
                  variant="outlined"
                  label={character?.status}
                />
              </Box>
              <Divider />
              <Typography variant="h6">{character?.species}</Typography>
              <Divider />
              <Typography variant="h6">{character?.gender}</Typography>
              <Divider />
              <Typography variant="h6">{character?.origin.name}</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={character?.image}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "0.5em",
                  }}
                  alt=""
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Detail;
