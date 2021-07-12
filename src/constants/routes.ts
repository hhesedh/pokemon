export const POKEMONS_URL = "/";
const POKEMON_DETALHES = "/pokemon/";
export const POKEMON_DETALHES_URL = `${POKEMON_DETALHES}:id`;
export const getPokemonDetalhesUrl = (id: string) => `${POKEMON_DETALHES}${id}`;
