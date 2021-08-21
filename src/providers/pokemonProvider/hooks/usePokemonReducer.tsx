import { useReducer } from "react";
import IPokemon from "../../../models/IPokemon";

type Action =
  | { type: "load" }
  | { type: "success"; payload: IPokemon[] }
  | { type: "error" };

export interface State {
  pokemons: IPokemon[] | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: State = {
  pokemons: null,
  isLoading: false,
  hasError: false,
};

function pokemonReducer(state: State, action: Action): State {
  switch (action.type) {
    case "load":
      return { ...state, isLoading: true, hasError: false };
    case "success":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        pokemons: action.payload,
      };
    case "error":
      return { ...state, isLoading: false, hasError: true };

    default:
      return { ...state };
  }
}

export const usePokemonReducer = () => useReducer(pokemonReducer, initialState);
