import { useCallback } from "react";
import { pokemonUrl } from "../../../constants/endpoint";
import IPokemon from "../../../models/IPokemon";
import { Request } from "../../../request/request";
import { usePokemonReducer } from "./usePokemonReducer";

interface IPokemonResponse {
  count: number;
  previous?: string;
  next?: string;
  results: IPokemon[];
}

const api = new Request();
export function useProvidePokemon() {
  const [{ pokemons, isLoading, hasError }, dispatch] = usePokemonReducer();

  const getPokemons = useCallback(async () => {
    try {
      dispatch({ type: "load" });

      const response = await api.get<IPokemonResponse>(pokemonUrl);

      if (response && response.data) {
        const { data } = response;
        dispatch({ type: "success", payload: data.results });
      }
    } catch (err) {
      dispatch({ type: "error" });
    }
  }, [dispatch]);

  const deletePokemon = useCallback(
    (name: string) => {
      dispatch({ type: "load" });
      const pokemonsFiltered = pokemons?.filter(
        (pokemon) => pokemon.name !== name
      );

      if (pokemonsFiltered) {
        dispatch({ type: "success", payload: pokemonsFiltered });
      }
    },
    [dispatch, pokemons]
  );

  return { pokemons, hasError, isLoading, getPokemons, deletePokemon };
}
