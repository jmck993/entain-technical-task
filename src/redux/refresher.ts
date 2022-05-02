import { getNedsRaces, NedsRaceSummary, RaceCategory } from "../nedsApi";
import { secondsUntil } from "../utils";
import {
  isRefreshAction,
  isToggleFilterModeAction,
  refresh,
  setRaces,
} from "./actions";
import { selectFilterMode } from "./selectors";
import { Middleware } from "./store";

function isUpcomingOrOneMinuteSinceStarted(race: NedsRaceSummary) {
  return secondsUntil(race.advertised_start.seconds) > -60;
}

function isMatchingFilterModeIfDefined(filterMode: RaceCategory | undefined) {
  return (race: NedsRaceSummary) =>
    filterMode === undefined ? race : race.category_id === filterMode;
}

function ascendingOrder(raceA: NedsRaceSummary, raceB: NedsRaceSummary) {
  return raceA.advertised_start.seconds - raceB.advertised_start.seconds;
}

/**
 * Uses the Neds API to get the list of races.
 *
 * Also refreshes this list if a filter mode is toggled.
 */
export const refresher: Middleware =
  (store) => (next) => async (action) => {
    if (isRefreshAction(action)) {
      const filterMode = selectFilterMode(store.getState());
      const response = await getNedsRaces(10);
      const races = Object.values(response.data.race_summaries)
        .filter(isUpcomingOrOneMinuteSinceStarted)
        .filter(isMatchingFilterModeIfDefined(filterMode))
        .sort(ascendingOrder);

      store.dispatch(setRaces(races));
    }

    if (isToggleFilterModeAction(action)) {
      next(action);
      store.dispatch(refresh());
      return;
    }

    next(action);
  };
