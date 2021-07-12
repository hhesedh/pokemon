import { Route, Switch } from "react-router-dom";
import { POKEMONS_URL, POKEMON_DETALHES_URL } from "../constants/routes";
import { PokemonDetailsPage } from "../pages/PokemonDetailsPage";
import { PokemonsPage } from "../pages/PokemonsPage";

export const Routes = () => (
  <Switch>
    <Route path={POKEMONS_URL} component={PokemonsPage} exact />
    <Route path={POKEMON_DETALHES_URL} component={PokemonDetailsPage} />
  </Switch>
);
