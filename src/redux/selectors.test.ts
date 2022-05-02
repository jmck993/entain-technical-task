import { NedsRaceSummary } from "../nedsApi";
import { setRaces } from "./actions";
import { selectRaces } from "./selectors";
import { createStore } from "./store";

function createRaceSummary(meetingName: string): NedsRaceSummary {
  return {
    meeting_name: meetingName,
    advertised_start: {
      seconds: 0,
    },
  } as NedsRaceSummary;
}

const races: NedsRaceSummary[] = [
  createRaceSummary("zero"),
  createRaceSummary("one"),
  createRaceSummary("two"),
  createRaceSummary("three"),
  createRaceSummary("four"),
  createRaceSummary("five"),
  createRaceSummary("six"),
  createRaceSummary("seven"),
  createRaceSummary("eight"),
  createRaceSummary("nine"),
];

test.each([1, 5, 11])("selectRaces selects %s or less race(s)", (amount) => {
  const store = createStore();
  store.dispatch(setRaces([...races]));
  const state = store.getState();
  const selectedRaces = selectRaces(state, amount);
  expect(selectedRaces.length).toBeLessThanOrEqual(amount);
});
