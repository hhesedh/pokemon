import { Dispatch, useReducer, useCallback } from "react";
import IPokemon from "../../../models/IPokemon";
import { getPokemons as requestPokemon } from "../../../services/http";

interface UserPokemonReducerReturnType {
  getPokemons: () => Promise<void>;
  deletePokemon: (name: string) => void;
  pokemons: IPokemon[] | null;
  isLoading: boolean;
  hasError: boolean;
}

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

/* HELPERS */
const delPokemonFromState = ({ name, state }: { name: string; state: State }) =>
  state.pokemons ? state.pokemons.filter((it) => it.name !== name) : null;

/* REDUCER */
function reducer(state: State, action: Action): State {
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
      return {
        ...state,
        pokemons: delPokemonFromState({ state, name: action.payload }),
      };

    default:
      return { ...state };
  }
}

/* Action Creators */
const getPokemons = (dispatch: Dispatch<Action>) => async () => {
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

const deletePokemon = (dispatch: Dispatch<Action>) => (name: string) => {
  dispatch({ type: "delete", payload: name });
};

export const usePokemonReducer = (): UserPokemonReducerReturnType => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    ...state,
    getPokemons: useCallback(() => getPokemons(dispatch)(), []),
    deletePokemon: useCallback(
      (name: string) => deletePokemon(dispatch)(name),
      []
    ),
  };
};
