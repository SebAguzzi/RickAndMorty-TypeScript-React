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

export const Detail: React.FC = () => {
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
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid sx={{ mt: 4 }} container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">{character?.name}</Typography>
              <Divider />
              <Box sx={{ mt: 1, mb: 1 }}>
                {character?.status === "Alive" ? (
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={character?.status}
                  />
                ) : character?.status === "unknown" ? (
                  <Chip
                    color={"warning"}
                    variant="outlined"
                    label={character?.status}
                  />
                ) : (
                  <Chip
                    color={"error"}
                    variant="outlined"
                    label={character?.status}
                  />
                )}
              </Box>
              <Divider />
              <Typography variant="h6">{character?.species}</Typography>
              <Divider />
              <Typography variant="h6">{character?.gender}</Typography>
              <Divider />
              <Typography variant="h6">{character?.origin.name}</Typography>
              <Divider />
            </Grid>
            <Grid item xs={4}>
              <img
                src={character?.image}
                style={{ width: "100%", borderRadius: "0.5em" }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
