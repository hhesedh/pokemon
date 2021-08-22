import { Dispatch, useReducer, useCallback } from "react";
import IPokemon from "../../../models/IPokemon";
import { getPokemons as requestPokemon } from "../../../services/http";

type Action =
  | { type: "load" }
  | { type: "success"; payload: IPokemon[] }
  | { type: "error" }
  | { type: "delete"; payload: string };

export interface State {
  pokemons: IPokemon[] | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: State = {
  pokemons: null,
  isLoading: true,
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

    case "delete":
      const pokemonFiltered = state.pokemons?.filter(
        (pokemon) => pokemon.name !== action.payload
      );
      return pokemonFiltered
        ? { ...state, pokemons: pokemonFiltered }
        : { ...state };

    default:
      return { ...state };
  }
}

const get = (dispatch: Dispatch<Action>) => async () => {
  try {
    dispatch({ type: "load" });

    const data = await requestPokemon();

    if (data) {
      dispatch({ type: "success", payload: data.results });
    }
  } catch (err) {
    dispatch({ type: "error" });
  }
};
const del = (dispatch: Dispatch<Action>) => async (name: string) => {
  dispatch({ type: "delete", payload: name });
};

export const usePokemonReducer = () => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const getPokemons = useCallback(() => get(dispatch)(), []);
  const deletePokemon = useCallback((name: string) => del(dispatch)(name), []);
  return {
    ...state,
    deletePokemon,
    getPokemons,
  };
};
