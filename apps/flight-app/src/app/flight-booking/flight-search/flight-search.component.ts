import {Component, OnInit} from '@angular/core';

import { FlightService, Flight } from '@flight-workspace/flight-api';
import { EventService } from '../../event.service';
import { Observable } from 'rxjs/Observable';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import { Store } from '@ngrx/store';
import { FlightsLoadedAction, FlightsLoadAction, FlightsUpdateAction } from '../+state/flight-booking.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { take } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  flights$: Observable<Flight[]>;
  loading$: Observable<boolean>;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<FlightBookingState>,
    private flightService: FlightService,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    
    this.flights$ = this.store.select(s => s.flightBooking.flights);      
    this.loading$ = this.store.select(s => s.flightBooking.loading);
    
    let flights: Flight[];
    
    
    

  }

  select(f: Flight, selected: boolean) {
    this.eventService.flightSelected(f);
    this.basket[f.id] = selected;
  }

  search(): void {
    if (!this.from || !this.to) return;
    this.store.dispatch(new FlightsLoadAction(this.from, this.to, this.urgent));
  }

  delay(): void {
    
    this.flights$.pipe(take(1)).subscribe(flights => {
      let flight = flights[0];
  
      let oldDate = new Date(flight.date);
      let newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      let newFlight = { ...flight, date: newDate.toISOString() };
      
      this.store.dispatch(new FlightsUpdateAction(newFlight));
    });
  }

}

