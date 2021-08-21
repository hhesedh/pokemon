import { Container, Row, Col } from "react-bootstrap";
import { PokeCard } from "../components/PokeCard";
import { usePokemons } from "../hooks/usePokemons";
import { handleUrlImage } from "../utils/imageUrlUtils";
import { getIdFromUrl } from "../utils/urlUtils";

export const PokemonsPage = () => {
  const { pokemons, isLoading, hasError, deletePokemon } = usePokemons();

  if (isLoading) return <h1>Carregando...</h1>;
  if (hasError) return <h1>Error</h1>;
  if (!pokemons || pokemons.length === 0) return <h1>Lista Vazia...</h1>;
  return (
    <Container>
      <Row>
        {pokemons.map(({ name, url }) => (
          <Col className="mb-3" key={name}>
            <PokeCard
              id={getIdFromUrl(url)}
              name={name}
              image={handleUrlImage(url)}
              deletePokemon={deletePokemon}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
