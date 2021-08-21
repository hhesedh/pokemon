import { ReactNode } from "react";
import { PokemonProvider } from "./pokemonProvider/pokemonProvider";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <PokemonProvider>{children}</PokemonProvider>
);
