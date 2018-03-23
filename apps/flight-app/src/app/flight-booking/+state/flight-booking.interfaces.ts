import { Flight } from "@flight-workspace/flight-api";

export interface FlightBooking {
  flights: Flight[];
  loading: boolean;
}

// Wrapper, ignore for now
export interface FlightBookingState {
  readonly flightBooking: FlightBooking;
}
