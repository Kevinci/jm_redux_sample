import {FlightBooking} from './flight-booking.interfaces';
import {FlightBookingAction} from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';

export function flightBookingReducer(state: FlightBooking, action: FlightBookingAction): FlightBooking {
  switch (action.type) {
    case 'FLIGHTS_LOADED': {
      return { flights: action.flights, loading: false }
    }
    case 'FLIGHTS_LOAD': {
      return { flights: [], loading: true }
    }
    case 'FLIGHTS_UPDATE': {

      let idx = state.flights.findIndex(f => f.id == action.flight.id);
      // state.flights[idx] = action.fight; 
      let newArray: Flight[] = [
        ...state.flights.slice(0, idx),
        action.flight,
        ...state.flights.slice(idx+1)
      ];
      return { loading: state.loading, flights: newArray };

    }
    default: {
      return state;
    }
  }
}
