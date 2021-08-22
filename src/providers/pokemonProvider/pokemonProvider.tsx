import { createContext, ReactNode, useContext } from "react";
import { usePokemonReducer } from "./hooks/usePokemonReducer";

type ContextType = ReturnType<typeof usePokemonReducer> | null;
const PokemonContext = createContext<ContextType>(null);

export const PokemonProvider = ({ children }: { children: ReactNode }) => (
  <PokemonContext.Provider value={usePokemonReducer()}>
    {children}
  </PokemonContext.Provider>
);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemonContext must be inside a Provider with a value");
  }

  return context;
};
