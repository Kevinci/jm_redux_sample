import { Flight } from "@flight-workspace/flight-api";

export const FlightsLoadedActionType = 'FLIGHTS_LOADED';
export const FlightsLoadActionType = 'FLIGHTS_LOAD';
export const FlightsUpdateActionType = 'FLIGHTS_UPDATE';

export class FlightsLoadedAction {
  readonly type = FlightsLoadedActionType;
  constructor(readonly flights: Flight[]) {
  }
}

export class FlightsLoadAction {
  readonly type = FlightsLoadActionType;
  constructor(readonly from: string, readonly to: string, readonly  urgent: boolean ) {
  }
}

export class FlightsUpdateAction {
  readonly type = FlightsUpdateActionType;
  constructor(readonly flight: Flight) {
  }
}


export type FlightBookingAction = 
              FlightsLoadedAction 
              | FlightsLoadAction 
              | FlightsUpdateAction;

