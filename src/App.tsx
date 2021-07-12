import "./App.css";
import { getImageById } from "./constants/endpoint";
import { usePokemons } from "./hooks/usePokemons";

function handleUrlImage(url: string) {
  const id = url.split("/").reverse()[1];
  const imageUrl = getImageById(id);
  return imageUrl;
}
function App() {
  const { pokemons, loading, error, deletePokemon } = usePokemons();

  if (loading) return <h1>Carregando...</h1>;
  if (error) return <h1>Error</h1>;
  if (pokemons.length === 0) return <h1>Lista Vazia...</h1>;
  return (
    <div className="App">
      {pokemons.map(({ name, url }) => (
        <div key={name}>
          <h1>{name}</h1>
          <button onClick={() => deletePokemon(name)}>apagar</button>
          <img src={handleUrlImage(url)} alt="name" />
        </div>
      ))}
    </div>
  );
}

export default App;
