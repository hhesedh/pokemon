import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPokemonDetalhesUrl } from "../constants/routes";

interface Props {
  name: string;
  image: string;
  id: string;
  deletePokemon: (name: string) => Promise<void>;
}

export const PokeCard: React.FC<Props> = ({
  name,
  image,
  id,
  deletePokemon,
}) => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title className="text-center">{name}</Card.Title>
      <div className="text-center">
        <Link to={getPokemonDetalhesUrl(id)}>
          <Button variant="primary">Ver Detalhes</Button>
        </Link>
        <Button
          variant="danger"
          className="ml-1"
          onClick={() => deletePokemon(name)}
        >
          Deletar
        </Button>
      </div>
    </Card.Body>
  </Card>
);
