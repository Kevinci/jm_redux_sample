import { AppState } from "apps/flight-app/src/app/+state/app.interfaces";
import { createSelector } from "@ngrx/store";
import { App } from './app.interfaces';

// s.app.counter

export const getAppState = (s: AppState) => s.app;

export const getCounter = createSelector(
  getAppState,
  (state: App) => state.counter
);

