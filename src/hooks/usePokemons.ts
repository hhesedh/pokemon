import { useCallback, useEffect } from "react";

import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { usePokemonContext } from "../providers/pokemonProvider/pokemonProvider";

const MySwal = withReactContent(Swal);

const fireConfigs = (name: string) => {
  const fireConfirmConfig: SweetAlertOptions = {
    icon: "warning",
    title: `<p>Tem certeza que deseja deletar o pokemon ${name}?</p>`,
    footer: "Pokemon 2021",
    showDenyButton: true,
    confirmButtonText: `Ok`,
    denyButtonText: `Cancelar`,
  };

  const fireSuccessConfig: SweetAlertOptions = {
    icon: "success",
    title: `<p>O pokemon ${name} foi deletado com sucesso!</p>`,
    footer: "Pokemon 2021",
    confirmButtonText: `Ok`,
  };

  return { fireConfirmConfig, fireSuccessConfig };
};

const fireErrorConfig: SweetAlertOptions = {
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
};

export function usePokemons() {
  const {
    pokemons,
    isLoading,
    hasError,
    getPokemons,
    deletePokemon: delPokemon,
  } = usePokemonContext();

  useEffect(() => {
    async function getValues() {
      await getPokemons();
    }
    getValues();
  }, [getPokemons]);

  const deletePokemon = useCallback(
    async (name: string) => {
      try {
        const { fireConfirmConfig, fireSuccessConfig } = fireConfigs(name);
        const swalResponse = await MySwal.fire(fireConfirmConfig);
        if (!swalResponse.isConfirmed) return;
        delPokemon(name);
        await MySwal.fire(fireSuccessConfig);
      } catch (err) {
        MySwal.fire(fireErrorConfig);
      }
    },
    [delPokemon]
  );

  return {
    pokemons,
    isLoading,
    hasError,
    deletePokemon,
  };
}
