const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const apiBaseUrl = "https://pokeapi.co/api/v2/";
export const pokemonUrl = `${apiBaseUrl}pokemon`;
export const getImageById = (id: string) => `${imageUrl}${id}.png`;
