import { NedsRaceSummary, RaceCategory } from "../nedsApi";
import { setRaces, toggleFilterMode } from "./actions";
import { createStore } from "./store";

test("uses setRaces to set the list of races", () => {
  const store = createStore();
  const symbol: NedsRaceSummary[] = [];
  store.dispatch(setRaces(symbol));
  const state = store.getState();
  expect(state.races).toBe(symbol);
});

const raceCategories = [
  RaceCategory.Greyhound,
  RaceCategory.Harness,
  RaceCategory.Horse,
];

test.each(raceCategories)(
  "uses toggleFilterMode toggle filter mode for %s",
  (mode) => {
    const store = createStore();
    store.dispatch(toggleFilterMode(mode));
    const state = store.getState();
    expect(state.filterMode).toBe(mode);
  }
);

test.each(raceCategories)(
  "can use toggleFilterMode for %s to toggle off",
  (mode) => {
    const store = createStore();
    store.dispatch(toggleFilterMode(mode));
    store.dispatch(toggleFilterMode(mode));
    const state = store.getState();
    expect(state.filterMode).toBe(undefined);
  }
);
