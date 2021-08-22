import { pokemonUrl } from "../constants/endpoint";
import { createRequest } from "../factory/request";
import IPokemon from "../models/IPokemon";

interface IPokemonResponse {
  count: number;
  previous?: string;
  next?: string;
  results: IPokemon[];
}

const api = createRequest();

export const getPokemons = async (): Promise<IPokemonResponse | null> => {
  const response = await api.get<IPokemonResponse>(pokemonUrl);
  if (response && response.data) {
    return response.data;
  }
  return null;
};
