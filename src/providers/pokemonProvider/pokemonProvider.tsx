import { createContext, ReactNode, useContext } from "react";
import IPokemon from "../../models/IPokemon";
import { useProvidePokemon } from "./hooks/useProvidePokemon";

interface IPokemonContext {
  pokemons: IPokemon[] | null;
  hasError: boolean;
  isLoading: boolean;
  getPokemons: () => Promise<void>;
  deletePokemon: (name: string) => void;
}
const PokemonContext = createContext<IPokemonContext | null>(null);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const value = useProvidePokemon();
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemonContext must be inside a Provider with a value");
  }

  return context;
};
