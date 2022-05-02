import { Reducer } from "@reduxjs/toolkit";
import { Action, isSetRacesAction, isToggleFilterModeAction } from "./actions";
import { defaultState, State } from "./state";

export const reducer: Reducer<State, Action> = (
  state = defaultState,
  action
) => {
  if (isSetRacesAction(action)) {
    return { ...state, races: action.races };
  }

  if (isToggleFilterModeAction(action)) {
    if (state.filterMode === action.mode) {
      return { ...state, filterMode: undefined };
    }

    return { ...state, filterMode: action.mode };
  }

  return { ...state };
};
