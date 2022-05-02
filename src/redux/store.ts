import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import { Action } from "./actions";
import { reducer } from "./reducer";
import { State } from "./state";

export type Middleware = ThunkMiddleware<State, AnyAction, undefined>;

export function createStore(middleware?: Middleware) {
  return configureStore<State, Action>({
    reducer,
    middleware: middleware ? [middleware] : undefined,
  });
}
