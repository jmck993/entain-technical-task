import { createSelector } from "@reduxjs/toolkit";
import { State } from "./state";

export const selectRaces = createSelector(
  [(state: State) => state.races, (_, amount: number) => amount],
  (races, amount) => races.slice(0, amount)
);

export const selectFilterMode = createSelector(
  (state: State) => state.filterMode,
  (filterMode) => filterMode
);
