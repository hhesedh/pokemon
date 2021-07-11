import { useEffect, useState } from "react";
import { pokemonUrl } from "../constants/endpoint";
import { Request } from "../request/request";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const { isRequestError } = Request;
const api = new Request();

interface IPokemon {
  name: string;
  url: string;
}
interface IPokemonResponse {
  count: number;
  previous?: string;
  next?: string;
  results: IPokemon[];
}

export function usePokemons() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPokemons() {
      try {
        setLoading(true);
        const response = await api.get<IPokemonResponse>(pokemonUrl);
        if (response && response.data) {
          const { data } = response;
          setPokemons(data.results);
        }
        setError(false);
      } catch (err) {
        if (isRequestError(err)) {
          console.log("é um erro de request:");
        }
        setError(true);
        console.log(err);
      }

      setLoading(false);
    }

    getPokemons();
  }, []);

  async function deletePokemon(name: string) {
    try {
      /* aqui pode ter estado de erro ou loading */
      const swalResponse = await MySwal.fire({
        icon: "warning",
        title: `<p>Tem certeza que deseja deletar o pokemon ${name}?</p>`,
        footer: "Pokemon 2021",
        showDenyButton: true,
        confirmButtonText: `Ok`,
        denyButtonText: `Cancelar`,
      });
      if (!swalResponse.isConfirmed) return;

      const pokemonsFiltered = pokemons.filter(
        (pokemon) => pokemon.name !== name
      );
      setPokemons(pokemonsFiltered);

      await MySwal.fire({
        icon: "success",
        title: `<p>O pokemon ${name} foi deletado com sucesso!</p>`,
        footer: "Pokemon 2021",
        confirmButtonText: `Ok`,
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  return { pokemons, loading, error, deletePokemon };
}
