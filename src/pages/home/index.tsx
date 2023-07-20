import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { characters } from "../../api/characters";
import { CardComponent } from "../../components";
import { TypeCharacter } from "./interface/character.interface";
import { Grid } from "@mui/material";

export const HomePage: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<TypeCharacter[] | null>(
    null
  );

  useEffect(() => {
    characters
      .getAll({ page: 1 })
      .then((r) => {
        setAllCharacters(r.data.results);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Button fullWidth variant="contained">
        Estamos en home
      </Button>
      <div>
        {allCharacters?.length !== 0 ? (
          <Grid container spacing={2} direction="row" >
            {allCharacters?.map((character) => (
              <Grid item xs={3} >
                <CardComponent
                  key={character.id}
                  image={character.image}
                  name={character.name}
                  species={character.species}
                  status={character.status}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};
