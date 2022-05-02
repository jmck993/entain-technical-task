import { NedsRaceSummary, RaceCategory } from "../nedsApi";

export interface State {
  races: NedsRaceSummary[];
  filterMode: RaceCategory | undefined;
}

export const defaultState: State = {
  races: [],
  filterMode: undefined,
};
