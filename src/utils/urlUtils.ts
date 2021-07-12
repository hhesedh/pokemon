import { pokemonUrl } from "../constants/endpoint";

export const getIdFromUrl = (url: string) =>
  url.replace(`${pokemonUrl}/`, "").replace("/", "");
