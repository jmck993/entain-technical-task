import * as redux from "redux";
import { NedsRaceSummary, RaceCategory } from "../nedsApi";

/**
 * Used to assign the races this app is aware of.
 */
interface SetRacesAction extends redux.Action<"setRaces"> {
  races: NedsRaceSummary[];
}

export function isSetRacesAction(
  action: redux.AnyAction
): action is SetRacesAction {
  return action.type === "setRaces";
}

export function setRaces(races: NedsRaceSummary[]): SetRacesAction {
  return { type: "setRaces", races };
}

/**
 * Used to prompt the app to refresh its races list.
 */
export type RefreshAction = redux.Action<"refresh">;

export function isRefreshAction(
  action: redux.AnyAction
): action is RefreshAction {
  return action.type === "refresh";
}

export function refresh(): RefreshAction {
  return { type: "refresh" };
}

/**
 * Used to toggle a filter mode on or off.
 */
export interface ToggleFilterMode extends redux.Action<"toggleFilterMode"> {
  mode: RaceCategory;
}

export function isToggleFilterModeAction(
  action: redux.AnyAction
): action is ToggleFilterMode {
  return action.type === "toggleFilterMode";
}

export function toggleFilterMode(mode: RaceCategory): ToggleFilterMode {
  return { type: "toggleFilterMode", mode };
}

export type Action = SetRacesAction | RefreshAction | ToggleFilterMode;
